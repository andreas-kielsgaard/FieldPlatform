import { readdirSync } from "node:fs";
import path from "node:path";

import { fieldPlatformContextAdapterConfig } from "../adapters/field-platform-adapter-config.mjs";
import { CONTEXT_CONTRACT_VERSION, CONTEXT_PATH_FORMAT } from "../schemas/shared.mjs";

const PRUNED_DIRECTORIES = new Set([".git", "node_modules", ".pnpm-store"]);

export function buildFileManifest({
  adapterConfig = fieldPlatformContextAdapterConfig,
  repoRoot = process.cwd(),
  generatedAt = new Date().toISOString(),
} = {}) {
  const resolvedRepoRoot = path.resolve(repoRoot, adapterConfig.repoRoot ?? ".");
  const files = discoverRepoFiles(resolvedRepoRoot)
    .map((repoPath) => buildFileEntry(repoPath, adapterConfig))
    .filter(Boolean)
    .sort((left, right) => left.path.localeCompare(right.path));

  return {
    adapterId: adapterConfig.adapterId,
    schemaVersion: CONTEXT_CONTRACT_VERSION,
    generatedAt,
    files,
    limitations: [
      "Discovery is bounded to Field Platform adapter source groups.",
      "Excluded files are reported only when they exist locally and match adapter exclusion globs.",
      "No file contents, chunks, symbols, dependency edges, embeddings, or manifest artifacts are generated.",
    ],
  };
}

function buildFileEntry(repoPath, adapterConfig) {
  const match = selectPolicyMatch(repoPath, adapterConfig.sourceGroups);
  if (!match) {
    return null;
  }

  const flags = {
    generated: isGeneratedPath(repoPath) || match.group.id === "generated-output",
    archive: isArchivePath(repoPath) || match.group.id === "archive",
  };

  return {
    adapterId: adapterConfig.adapterId,
    repoId: adapterConfig.repoId,
    path: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
    documentKind: classifyDocumentKind(repoPath, match.group, flags),
    sourceGroup: match.group.id,
    language: classifyLanguage(repoPath),
    inclusionStatus: match.inclusionStatus,
    exclusionReason:
      match.inclusionStatus === "excluded"
        ? `matched ${match.group.id} exclude: ${match.excludePattern}`
        : null,
    flags,
  };
}

function selectPolicyMatch(repoPath, sourceGroups) {
  const matches = [];

  for (const group of sourceGroups) {
    const groupRoot = normalizeRepoPath(group.root);
    if (!pathIsUnderRoot(repoPath, groupRoot)) {
      continue;
    }

    const pathForPatterns = groupRoot === "." ? repoPath : repoPath.slice(groupRoot.length + 1);
    const includePattern = firstMatchingGlob(group.include ?? [], pathForPatterns);
    const excludePattern = firstMatchingGlob(group.exclude ?? [], pathForPatterns);

    if (includePattern || excludePattern) {
      matches.push({
        group,
        includePattern,
        excludePattern,
        inclusionStatus: includePattern && !excludePattern ? "included" : "excluded",
      });
    }
  }

  const includedMatch = matches.find((match) => match.inclusionStatus === "included");
  if (includedMatch) {
    return includedMatch;
  }

  return (
    matches.find((match) => ["generated-output", "archive"].includes(match.group.id)) ??
    matches[0] ??
    null
  );
}

function discoverRepoFiles(repoRoot) {
  const files = [];
  walkDirectory(repoRoot, repoRoot, files);
  return files;
}

function walkDirectory(directory, repoRoot, files) {
  const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (PRUNED_DIRECTORIES.has(entry.name)) {
        continue;
      }
      walkDirectory(path.join(directory, entry.name), repoRoot, files);
      continue;
    }

    if (entry.isFile()) {
      files.push(toPosixPath(path.relative(repoRoot, path.join(directory, entry.name))));
    }
  }
}

function pathIsUnderRoot(repoPath, root) {
  if (root === ".") {
    return true;
  }
  return repoPath === root || repoPath.startsWith(`${root}/`);
}

function firstMatchingGlob(patterns, repoPath) {
  return patterns.find((pattern) => matchesGlob(pattern, repoPath)) ?? null;
}

function matchesGlob(pattern, repoPath) {
  return matchGlobSegments(splitGlobPath(pattern), splitGlobPath(repoPath));
}

function matchGlobSegments(patternSegments, pathSegments) {
  if (patternSegments.length === 0) {
    return pathSegments.length === 0;
  }

  const [head, ...tail] = patternSegments;
  if (head === "**") {
    if (matchGlobSegments(tail, pathSegments)) {
      return true;
    }
    return pathSegments.length > 0 && matchGlobSegments(patternSegments, pathSegments.slice(1));
  }

  if (pathSegments.length === 0) {
    return false;
  }

  return segmentMatches(head, pathSegments[0]) && matchGlobSegments(tail, pathSegments.slice(1));
}

function segmentMatches(pattern, value) {
  const regex = new RegExp(`^${escapeRegExp(pattern).replaceAll("*", "[^/]*")}$`);
  return regex.test(value);
}

function splitGlobPath(value) {
  return normalizeRepoPath(value).split("/").filter(Boolean);
}

function classifyDocumentKind(repoPath, group, flags) {
  if (flags.archive) {
    return "archive";
  }
  if (flags.generated) {
    return "generated";
  }
  if (group.id === "project-guidance" || isDocumentationPath(repoPath)) {
    return "documentation";
  }
  if (group.id === "project-config" || isConfigPath(repoPath)) {
    return "config";
  }
  if (isTestPath(repoPath)) {
    return "test";
  }
  if (isSchemaPath(repoPath)) {
    return "schema";
  }
  return "source";
}

function classifyLanguage(repoPath) {
  const name = path.posix.basename(repoPath);
  const extension = path.posix.extname(repoPath);

  if (name === ".gitignore") {
    return "gitignore";
  }

  switch (extension) {
    case ".ts":
      return "typescript";
    case ".tsx":
      return "tsx";
    case ".js":
    case ".mjs":
    case ".cjs":
      return "javascript";
    case ".json":
      return "json";
    case ".md":
      return "markdown";
    case ".css":
      return "css";
    case ".sql":
      return "sql";
    case ".yaml":
    case ".yml":
      return "yaml";
    case ".toml":
      return "toml";
    default:
      return "text";
  }
}

function isArchivePath(repoPath) {
  return repoPath === "Archive" || repoPath.startsWith("Archive/");
}

function isGeneratedPath(repoPath) {
  return [
    "apps/web/.react-router/",
    "apps/web/build/",
    "apps/web/storybook-static/",
    "apps/web/playwright-report/",
    "apps/web/test-results/",
    "coverage/",
  ].some((prefix) => repoPath.startsWith(prefix));
}

function isTestPath(repoPath) {
  return (
    /(^|\/)(test|tests|e2e)\//.test(repoPath) || /[.](test|spec)[.][cm]?[jt]sx?$/.test(repoPath)
  );
}

function isSchemaPath(repoPath) {
  return (
    repoPath.includes("/schema/") ||
    repoPath.endsWith(".schema.mjs") ||
    repoPath.startsWith("apps/web/src/shared/db/schema/")
  );
}

function isConfigPath(repoPath) {
  const name = path.posix.basename(repoPath);
  return (
    name === "package.json" ||
    name === "pnpm-workspace.yaml" ||
    name === "pnpm-lock.yaml" ||
    name === "biome.json" ||
    name.startsWith("tsconfig") ||
    name.includes(".config.") ||
    name === "dependency-cruiser.config.cjs"
  );
}

function isDocumentationPath(repoPath) {
  return repoPath.endsWith(".md");
}

function normalizeRepoPath(value) {
  return toPosixPath(String(value ?? "")).replace(/^[.]\//, "");
}

function toPosixPath(value) {
  return value.replaceAll("\\", "/");
}

function escapeRegExp(value) {
  return value.replaceAll(/[\\^$+?.()|[\]{}]/g, "\\$&");
}
