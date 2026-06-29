import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildFileManifest } from "../../src/context/core/file-manifest.mjs";
import {
  extractTypeScriptSource,
  extractTypeScriptSourceFile,
} from "../../src/context/core/typescript-source-extraction.mjs";
import { fixturePath, loadTextFixture, stableJson } from "./context-test-helpers.mjs";

const moduleFixtureRepoPath = "apps/web/src/source-intelligence/module-fixture.ts";
const componentFixtureRepoPath = "apps/web/src/source-intelligence/component-fixture.tsx";

test("TypeScript fixture extraction produces deterministic symbols", () => {
  const content = loadTextFixture("source-extraction", "module-fixture.ts");
  const first = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content,
  });
  const second = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content,
  });

  assert.equal(stableJson(first.symbols), stableJson(second.symbols));
  assert.deepEqual(summarizeSymbols(first.symbols), [
    ["SourcePolicyRule", "interface", "exported"],
    ["LocalPolicyShape", "type", "local"],
    ["SourcePolicyKind", "type", "exported"],
    ["LocalPolicyMatcher", "class", "local"],
    ["SourcePolicyClassifier", "class", "exported"],
    ["localFormatter", "function", "local"],
    ["exportedFormatter", "function", "exported"],
    ["localHelper", "function", "local"],
    ["classifySourcePolicyPath", "function", "exported"],
    ["reexportedLocal", "function", "exported"],
  ]);
});

test("exported declarations and local declarations are distinguished", () => {
  const extraction = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content: loadTextFixture("source-extraction", "module-fixture.ts"),
  });
  const visibilityByName = new Map(
    extraction.symbols.map((symbol) => [symbol.name, symbol.visibility]),
  );
  const moduleChunk = extraction.chunks.find((chunk) => chunk.kind === "module");

  assert.equal(visibilityByName.get("classifySourcePolicyPath"), "exported");
  assert.equal(visibilityByName.get("exportedFormatter"), "exported");
  assert.equal(visibilityByName.get("reexportedLocal"), "exported");
  assert.equal(visibilityByName.get("localHelper"), "local");
  assert.equal(visibilityByName.get("localFormatter"), "local");
  assert.deepEqual(moduleChunk.exports, [
    "SourcePolicyRule",
    "SourcePolicyKind",
    "SourcePolicyClassifier",
    "exportedFormatter",
    "classifySourcePolicyPath",
    "exportedFromLocal",
  ]);
});

test("source ranges are zero-based UTF-16 positions and remain stable", () => {
  const content = loadTextFixture("source-extraction", "module-fixture.ts");
  const extraction = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content,
  });
  const exportedFunction = extraction.symbols.find(
    (symbol) => symbol.name === "classifySourcePolicyPath",
  );
  const expectedStart = positionForOffset(
    content,
    content.indexOf("export function classifySourcePolicyPath"),
  );
  const expectedEnd = positionForOffset(content, content.indexOf("const reexportedLocal") - 2);

  assert.equal(exportedFunction.definingLocation.range.lineBase, 0);
  assert.equal(exportedFunction.definingLocation.range.encoding, "utf-16");
  assert.deepEqual(exportedFunction.definingLocation.range.start, expectedStart);
  assert.deepEqual(exportedFunction.definingLocation.range.end, expectedEnd);
});

test("chunk IDs and content hashes are deterministic", () => {
  const content = loadTextFixture("source-extraction", "module-fixture.ts");
  const first = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content,
  });
  const second = extractTypeScriptSourceFile({
    path: moduleFixtureRepoPath,
    content,
  });
  const firstIdentities = first.chunks.map(chunkIdentity);
  const secondIdentities = second.chunks.map(chunkIdentity);

  assert.deepEqual(firstIdentities, secondIdentities);
  for (const identity of firstIdentities) {
    assert.match(identity.chunkId, /^ts:[a-f0-9]{32}$/);
    assert.equal(identity.contentHash.algorithm, "sha256");
    assert.match(identity.contentHash.digest, /^[a-f0-9]{64}$/);
  }
});

test("TSX fixture extraction detects component-like chunks", () => {
  const extraction = extractTypeScriptSourceFile({
    path: componentFixtureRepoPath,
    content: loadTextFixture("source-extraction", "component-fixture.tsx"),
  });
  const componentChunks = extraction.chunks
    .filter((chunk) => chunk.kind === "component")
    .map((chunk) => ({
      name: chunk.name,
      visibility: chunk.visibility,
      symbols: chunk.symbols,
    }));
  const renderValueSymbol = extraction.symbols.find((symbol) => symbol.name === "renderValue");

  assert.deepEqual(componentChunks, [
    {
      name: "PolicyCard",
      visibility: "exported",
      symbols: ["PolicyCard"],
    },
    {
      name: "LocalBadge",
      visibility: "local",
      symbols: ["LocalBadge"],
    },
    {
      name: "InlinePanel",
      visibility: "exported",
      symbols: ["InlinePanel"],
    },
  ]);
  assert.deepEqual(renderValueSymbol, {
    name: "renderValue",
    kind: "function",
    visibility: "local",
    definingLocation: renderValueSymbol.definingLocation,
    container: null,
  });
});

test("manifest policy excludes generated and archive TypeScript paths from extraction", (t) => {
  const repoRoot = createTempRepo(t, {
    "apps/web/src/source-intelligence/active.ts": "export const activeSource = true;\n",
    "apps/web/src/source-intelligence/active.test.ts": [
      'import { describe, test } from "vitest";',
      "",
      'describe("source extraction policy", () => {',
      '  test("uses manifest", () => {});',
      "});",
      "",
    ].join("\n"),
    "apps/web/.react-router/types/+types/root.ts": "export type GeneratedRoute = string;\n",
    "apps/web/build/server/generated.ts": "export const generated = true;\n",
    "Archive/legacy.ts": "export const archived = true;\n",
  });
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot,
  });
  const extraction = extractTypeScriptSource({
    repoRoot,
    manifest,
  });

  assert.deepEqual(
    extraction.files.map((file) => file.filePath),
    [
      "apps/web/src/source-intelligence/active.test.ts",
      "apps/web/src/source-intelligence/active.ts",
    ],
  );
  assert.deepEqual(
    extraction.chunks.filter((chunk) => chunk.kind === "test").map((chunk) => chunk.name),
    ["describe:source extraction policy", "test:uses manifest"],
  );
});

test("TypeScript extraction fixtures are committed test fixtures", () => {
  assert.equal(
    fixturePath("source-extraction", "module-fixture.ts").endsWith(
      path.join("source-extraction", "module-fixture.ts"),
    ),
    true,
  );
  assert.equal(
    fixturePath("source-extraction", "component-fixture.tsx").endsWith(
      path.join("source-extraction", "component-fixture.tsx"),
    ),
    true,
  );
});

function summarizeSymbols(symbols) {
  return symbols.map((symbol) => [symbol.name, symbol.kind, symbol.visibility]);
}

function chunkIdentity(chunk) {
  return {
    chunkId: chunk.chunkId,
    name: chunk.name,
    kind: chunk.kind,
    range: chunk.range,
    contentHash: chunk.contentHash,
  };
}

function positionForOffset(content, offset) {
  assert.ok(offset >= 0, "Expected offset to exist in fixture content.");
  const prefix = content.slice(0, offset);
  const lines = prefix.split("\n");
  return {
    line: lines.length - 1,
    character: lines.at(-1).length,
  };
}

function createTempRepo(t, filesByPath) {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-ts-source-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));

  for (const [repoPath, content] of Object.entries(filesByPath)) {
    const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, content, "utf8");
  }

  return repoRoot;
}
