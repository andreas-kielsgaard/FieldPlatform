import { readFileSync } from "node:fs";
import path from "node:path";

import ts from "typescript";

import {
  CONTEXT_PATH_FORMAT,
  CONTEXT_RANGE_ENCODING,
  CONTEXT_RANGE_LINE_BASE,
} from "../schemas/shared.mjs";
import { hashContentSha256 } from "./content-hash.mjs";
import { buildFileManifest } from "./file-manifest.mjs";
import { resolveRepoRelativePath, toRepoRelativePosixPath } from "./repo-paths.mjs";

export const TYPESCRIPT_SOURCE_CHUNKER_VERSION = "typescript-source-extraction@0.1.0";

const extractableLanguages = new Set(["typescript", "tsx"]);
const testBlockCallees = new Set(["describe", "it", "test"]);

export function extractTypeScriptSource(options = {}) {
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  const manifest =
    options.manifest ??
    buildFileManifest({
      repoRoot,
      generatedAt: options.generatedAt,
      adapterConfig: options.adapterConfig,
    });
  const chunkerVersion = options.chunkerVersion ?? TYPESCRIPT_SOURCE_CHUNKER_VERSION;
  const files = manifest.files
    .filter(isExtractableTypeScriptManifestFile)
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((file) =>
      extractTypeScriptSourceFile({
        repoRoot,
        file,
        chunkerVersion,
      }),
    );

  return {
    chunkerVersion,
    files,
    symbols: files.flatMap((file) => file.symbols),
    chunks: files.flatMap((file) => file.chunks),
  };
}

export function extractTypeScriptSourceFile(options = {}) {
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  const repoPath = toSourceFileRepoPath(options.file ?? options.path, { repoRoot });
  const content =
    options.content ?? readFileSync(resolveRepoRelativePath(repoRoot, repoPath), "utf8");
  const chunkerVersion = options.chunkerVersion ?? TYPESCRIPT_SOURCE_CHUNKER_VERSION;
  const sourceFile = ts.createSourceFile(
    repoPath,
    content,
    ts.ScriptTarget.Latest,
    true,
    repoPath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const exportInfo = collectExportInfo(sourceFile);
  const imports = collectImports(sourceFile);
  const fileExports = [];
  const symbols = [];
  const declarationChunks = [];

  for (const statement of sourceFile.statements) {
    collectTopLevelDeclaration({
      statement,
      sourceFile,
      content,
      repoPath,
      chunkerVersion,
      exportInfo,
      fileExports,
      symbols,
      declarationChunks,
    });
  }

  const testChunks = collectTestChunks({
    sourceFile,
    content,
    repoPath,
    chunkerVersion,
  });
  const uniqueExports = uniqueStrings([...fileExports, ...exportInfo.exportedNames]);
  const moduleChunk = buildChunkMetadata({
    sourceFile,
    content,
    repoPath,
    chunkerVersion,
    kind: "module",
    name: repoPath,
    startOffset: 0,
    endOffset: content.length,
    symbols: symbols.map((symbol) => symbol.name),
    imports,
    exports: uniqueExports,
  });

  return {
    filePath: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
    language: repoPath.endsWith(".tsx") ? "tsx" : "typescript",
    symbols,
    chunks: [moduleChunk, ...declarationChunks, ...testChunks].sort(compareChunks),
  };
}

export function isExtractableTypeScriptManifestFile(file) {
  return (
    file?.inclusionStatus === "included" &&
    extractableLanguages.has(file.language) &&
    file.flags?.generated !== true &&
    file.flags?.archive !== true
  );
}

function collectTopLevelDeclaration(context) {
  const { statement } = context;

  if (ts.isFunctionDeclaration(statement)) {
    collectFunctionDeclaration(context, statement);
    return;
  }

  if (ts.isClassDeclaration(statement)) {
    collectNamedDeclaration(context, statement, "class", "class");
    return;
  }

  if (ts.isInterfaceDeclaration(statement)) {
    collectNamedDeclaration(context, statement, "interface", "interface");
    return;
  }

  if (ts.isTypeAliasDeclaration(statement)) {
    collectNamedDeclaration(context, statement, "type", "type");
    return;
  }

  if (ts.isEnumDeclaration(statement)) {
    collectNamedDeclaration(context, statement, "type", "type");
    return;
  }

  if (ts.isVariableStatement(statement)) {
    collectVariableStatement(context, statement);
  }
}

function collectFunctionDeclaration(context, declaration) {
  const name =
    declaration.name?.text ??
    (hasModifier(declaration, ts.SyntaxKind.DefaultKeyword) ? "default" : null);
  if (!name) {
    return;
  }

  const visibility = getDeclarationVisibility(declaration, name, context.exportInfo);
  const symbolKind = isReactComponentLikeFunction(name, declaration) ? "component" : "function";
  const symbol = buildSymbolMetadata({
    sourceFile: context.sourceFile,
    repoPath: context.repoPath,
    name,
    kind: symbolKind,
    visibility,
    node: declaration,
  });
  context.symbols.push(symbol);
  collectDeclarationExport(context.fileExports, declaration, name, context.exportInfo);

  if (visibility === "exported" || symbolKind === "component") {
    context.declarationChunks.push(
      buildChunkForNode({
        context,
        node: declaration,
        name,
        kind: symbolKind,
        visibility,
        symbols: [name],
      }),
    );
  }
}

function collectNamedDeclaration(context, declaration, symbolKind, chunkKind) {
  const name = declaration.name?.text;
  if (!name) {
    return;
  }

  const visibility = getDeclarationVisibility(declaration, name, context.exportInfo);
  context.symbols.push(
    buildSymbolMetadata({
      sourceFile: context.sourceFile,
      repoPath: context.repoPath,
      name,
      kind: symbolKind,
      visibility,
      node: declaration,
    }),
  );
  collectDeclarationExport(context.fileExports, declaration, name, context.exportInfo);
  context.declarationChunks.push(
    buildChunkForNode({
      context,
      node: declaration,
      name,
      kind: chunkKind,
      visibility,
      symbols: [name],
    }),
  );
}

function collectVariableStatement(context, statement) {
  const declarationList = statement.declarationList;
  const isConst = Boolean(declarationList.flags & ts.NodeFlags.Const);

  for (const declaration of declarationList.declarations) {
    if (!ts.isIdentifier(declaration.name)) {
      continue;
    }

    const name = declaration.name.text;
    const visibility = getDeclarationVisibility(statement, name, context.exportInfo);
    const initializer = declaration.initializer;
    const functionLikeInitializer = isFunctionLikeInitializer(initializer);
    const symbolKind = functionLikeInitializer
      ? isReactComponentLikeFunction(name, initializer)
        ? "component"
        : "function"
      : isConst
        ? "constant"
        : "variable";
    context.symbols.push(
      buildSymbolMetadata({
        sourceFile: context.sourceFile,
        repoPath: context.repoPath,
        name,
        kind: symbolKind,
        visibility,
        node: declaration,
      }),
    );
    collectDeclarationExport(context.fileExports, statement, name, context.exportInfo);

    if (functionLikeInitializer && (visibility === "exported" || symbolKind === "component")) {
      context.declarationChunks.push(
        buildChunkForNode({
          context,
          node: declarationList.declarations.length === 1 ? statement : declaration,
          name,
          kind: symbolKind === "component" ? "component" : "function",
          visibility,
          symbols: [name],
        }),
      );
    }
  }
}

function collectTestChunks({ sourceFile, content, repoPath, chunkerVersion }) {
  const chunks = [];

  function visit(node) {
    if (ts.isCallExpression(node)) {
      const callee = getCallRootIdentifier(node.expression);
      if (testBlockCallees.has(callee)) {
        const label = getStringLiteralArgument(node, 0);
        const name = label ? `${callee}:${label}` : callee;
        const chunkNode = ts.isExpressionStatement(node.parent) ? node.parent : node;
        chunks.push(
          buildChunkForOffsets({
            sourceFile,
            content,
            repoPath,
            chunkerVersion,
            kind: "test",
            name,
            startOffset: chunkNode.getStart(sourceFile),
            endOffset: chunkNode.getEnd(),
            symbols: [],
            imports: [],
            exports: [],
          }),
        );
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return chunks;
}

function collectExportInfo(sourceFile) {
  const exportedLocalNames = new Set();
  const exportedNames = [];
  const aliasesByLocalName = new Map();

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const specifier of statement.exportClause.elements) {
          const localName = specifier.propertyName?.text ?? specifier.name.text;
          const exportedName = specifier.name.text;
          exportedLocalNames.add(localName);
          exportedNames.push(exportedName);
          pushMapValue(aliasesByLocalName, localName, exportedName);
        }
      } else if (statement.moduleSpecifier) {
        exportedNames.push("*");
      }
      continue;
    }

    if (ts.isExportAssignment(statement)) {
      exportedNames.push("default");
    }
  }

  return {
    exportedLocalNames,
    exportedNames: uniqueStrings(exportedNames),
    aliasesByLocalName,
  };
}

function collectImports(sourceFile) {
  const imports = [];

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
      imports.push(statement.moduleSpecifier.text);
    }
  }

  return uniqueStrings(imports);
}

function collectDeclarationExport(fileExports, declaration, localName, exportInfo) {
  if (hasModifier(declaration, ts.SyntaxKind.DefaultKeyword)) {
    fileExports.push("default");
    return;
  }

  if (hasModifier(declaration, ts.SyntaxKind.ExportKeyword)) {
    fileExports.push(localName);
  }

  for (const alias of exportInfo.aliasesByLocalName.get(localName) ?? []) {
    fileExports.push(alias);
  }
}

function getDeclarationVisibility(declaration, localName, exportInfo) {
  return hasModifier(declaration, ts.SyntaxKind.ExportKeyword) ||
    hasModifier(declaration, ts.SyntaxKind.DefaultKeyword) ||
    exportInfo.exportedLocalNames.has(localName)
    ? "exported"
    : "local";
}

function buildSymbolMetadata({
  sourceFile,
  repoPath,
  name,
  kind,
  visibility,
  node,
  container = null,
}) {
  return {
    name,
    kind,
    visibility,
    definingLocation: {
      path: repoPath,
      pathFormat: CONTEXT_PATH_FORMAT,
      range: buildSourceRange(sourceFile, node.getStart(sourceFile), node.getEnd()),
    },
    container,
  };
}

function buildChunkForNode({ context, node, name, kind, visibility, symbols }) {
  return buildChunkForOffsets({
    sourceFile: context.sourceFile,
    content: context.content,
    repoPath: context.repoPath,
    chunkerVersion: context.chunkerVersion,
    kind,
    name,
    visibility,
    startOffset: node.getStart(context.sourceFile),
    endOffset: node.getEnd(),
    symbols,
    imports: [],
    exports: buildChunkExports({
      exportInfo: context.exportInfo,
      node,
      name,
      visibility,
    }),
  });
}

function buildChunkExports({ exportInfo, node, name, visibility }) {
  if (visibility !== "exported") {
    return [];
  }

  if (hasModifier(node, ts.SyntaxKind.DefaultKeyword)) {
    return ["default"];
  }

  return exportInfo.aliasesByLocalName.get(name) ?? [name];
}

function buildChunkForOffsets({
  sourceFile,
  content,
  repoPath,
  chunkerVersion,
  kind,
  name,
  visibility,
  startOffset,
  endOffset,
  symbols,
  imports,
  exports,
}) {
  return buildChunkMetadata({
    sourceFile,
    content,
    repoPath,
    chunkerVersion,
    kind,
    name,
    visibility,
    startOffset,
    endOffset,
    symbols,
    imports,
    exports,
  });
}

function buildChunkMetadata({
  sourceFile,
  content,
  repoPath,
  chunkerVersion,
  kind,
  name,
  visibility,
  startOffset,
  endOffset,
  symbols,
  imports,
  exports,
}) {
  const range = buildSourceRange(sourceFile, startOffset, endOffset);
  const contentHash = hashContentSha256(content.slice(startOffset, endOffset));
  const metadata = {
    chunkId: buildChunkId({
      repoPath,
      kind,
      name,
      range,
      contentHash,
    }),
    filePath: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
    name,
    kind,
    range,
    contentHash,
    chunkerVersion,
    symbols: uniqueStrings(symbols),
    imports: uniqueStrings(imports),
    exports: uniqueStrings(exports),
  };

  if (visibility) {
    metadata.visibility = visibility;
  }

  return metadata;
}

function buildChunkId({ repoPath, kind, name, range, contentHash }) {
  const seed = JSON.stringify({
    repoPath,
    kind,
    name,
    range,
    contentHash: contentHash.digest,
  });
  return `ts:${hashContentSha256(seed).digest.slice(0, 32)}`;
}

function buildSourceRange(sourceFile, startOffset, endOffset) {
  return {
    lineBase: CONTEXT_RANGE_LINE_BASE,
    encoding: CONTEXT_RANGE_ENCODING,
    start: sourceFile.getLineAndCharacterOfPosition(startOffset),
    end: sourceFile.getLineAndCharacterOfPosition(endOffset),
  };
}

function isReactComponentLikeFunction(name, node) {
  return isComponentLikeName(name) && containsJsx(node);
}

function isComponentLikeName(name) {
  return /^[A-Z]/.test(name);
}

function containsJsx(node) {
  let found = false;

  function visit(child) {
    if (found) {
      return;
    }

    if (
      ts.isJsxElement(child) ||
      ts.isJsxSelfClosingElement(child) ||
      ts.isJsxFragment(child) ||
      isReactCreateElementCall(child)
    ) {
      found = true;
      return;
    }

    ts.forEachChild(child, visit);
  }

  visit(node);
  return found;
}

function isReactCreateElementCall(node) {
  return (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "createElement" &&
    ts.isIdentifier(node.expression.expression) &&
    node.expression.expression.text === "React"
  );
}

function isFunctionLikeInitializer(node) {
  return node ? ts.isArrowFunction(node) || ts.isFunctionExpression(node) : false;
}

function getCallRootIdentifier(expression) {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return getCallRootIdentifier(expression.expression);
  }

  if (ts.isCallExpression(expression)) {
    return getCallRootIdentifier(expression.expression);
  }

  return null;
}

function getStringLiteralArgument(node, index) {
  const argument = node.arguments[index];
  return argument && (ts.isStringLiteral(argument) || ts.isNoSubstitutionTemplateLiteral(argument))
    ? argument.text
    : null;
}

function hasModifier(node, kind) {
  const modifiers =
    typeof ts.canHaveModifiers === "function" && ts.canHaveModifiers(node)
      ? (ts.getModifiers(node) ?? [])
      : (node.modifiers ?? []);
  return modifiers.some((modifier) => modifier.kind === kind);
}

function toSourceFileRepoPath(fileOrPath, { repoRoot }) {
  if (typeof fileOrPath === "string") {
    return toRepoRelativePosixPath(fileOrPath, { repoRoot });
  }

  if (fileOrPath?.path) {
    return toRepoRelativePosixPath(fileOrPath.path, { repoRoot });
  }

  throw new Error("Expected a manifest file entry or repository-relative TypeScript file path.");
}

function compareChunks(left, right) {
  const leftStart = left.range.start;
  const rightStart = right.range.start;
  return (
    left.filePath.localeCompare(right.filePath) ||
    leftStart.line - rightStart.line ||
    leftStart.character - rightStart.character ||
    left.kind.localeCompare(right.kind) ||
    String(left.name ?? "").localeCompare(String(right.name ?? ""))
  );
}

function uniqueStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))];
}

function pushMapValue(map, key, value) {
  const values = map.get(key) ?? [];
  values.push(value);
  map.set(key, values);
}
