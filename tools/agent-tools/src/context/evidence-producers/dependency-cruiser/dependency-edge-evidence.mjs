import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { CONTEXT_PATH_FORMAT, toRepoRelativePosixPath } from "../../core/repo-paths.mjs";

export const DEPENDENCY_CRUISER_SOURCE_TOOL = "dependency-cruiser";
export const DEPENDENCY_CRUISER_CONFIG_PATH = "dependency-cruiser.config.cjs";
export const DEFAULT_DEPENDENCY_CRUISER_ROOTS = Object.freeze([
  "apps/web/app",
  "apps/web/src",
  "tools/agent-tools/src",
]);

const SKIPPED_TARGET_REASONS = Object.freeze({
  CORE: "core-module-target",
  EXTERNAL: "external-dependency-target",
  MISSING_RESOLVED: "missing-resolved-target",
  NON_REPOSITORY: "non-repository-target",
  UNRESOLVED: "unresolved-dependency-target",
});

export function buildDependencyEdgeEvidenceFromDependencyCruiser({
  repoRoot = process.cwd(),
  configPath = DEPENDENCY_CRUISER_CONFIG_PATH,
  cruisePaths = DEFAULT_DEPENDENCY_CRUISER_ROOTS,
  observedAt = new Date().toISOString(),
} = {}) {
  const resolvedRepoRoot = path.resolve(repoRoot);
  const normalizedConfigPath = toRepoRelativePosixPath(configPath, {
    repoRoot: resolvedRepoRoot,
  });
  const normalizedCruisePaths = cruisePaths.map((cruisePath) =>
    toRepoRelativePosixPath(cruisePath, { repoRoot: resolvedRepoRoot }),
  );
  const dependencyCruiserRun = runDependencyCruiserJson({
    repoRoot: resolvedRepoRoot,
    configPath: normalizedConfigPath,
    cruisePaths: normalizedCruisePaths,
  });
  const evidence = mapDependencyCruiserJsonToDependencyEdgeEvidence(dependencyCruiserRun.json, {
    repoRoot: resolvedRepoRoot,
    configPath: normalizedConfigPath,
    cruisePaths: normalizedCruisePaths,
    observedAt,
  });

  return {
    ...evidence,
    dependencyCruiser: {
      command: dependencyCruiserRun.command,
      exitCode: dependencyCruiserRun.exitCode,
      stderr: trim(dependencyCruiserRun.stderr),
      configPath: normalizedConfigPath,
      roots: normalizedCruisePaths,
      moduleCount: countModules(dependencyCruiserRun.json),
      violationCount: countViolations(dependencyCruiserRun.json),
    },
  };
}

export function mapDependencyCruiserJsonToDependencyEdgeEvidence(cruiseResult, options = {}) {
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  const observedAt = options.observedAt ?? new Date().toISOString();
  const configPath =
    options.configPath === undefined
      ? DEPENDENCY_CRUISER_CONFIG_PATH
      : toRepoRelativePosixPath(options.configPath, { repoRoot });
  const cruisePaths = (options.cruisePaths ?? []).map((cruisePath) =>
    toRepoRelativePosixPath(cruisePath, { repoRoot }),
  );
  const modules = getCruiseModules(cruiseResult);
  const edges = [];
  const skippedEdges = [];

  for (const moduleRecord of modules) {
    const source = normalizeModuleSource(moduleRecord, repoRoot);
    const dependencies = Array.isArray(moduleRecord.dependencies) ? moduleRecord.dependencies : [];

    for (const dependency of dependencies) {
      const dependencyTypes = asStringArray(dependency?.dependencyTypes);
      const skippedBase = {
        source: source.path ?? stringOrNull(moduleRecord?.source),
        target: stringOrNull(dependency?.resolved ?? dependency?.module),
        moduleSpecifier: stringOrNull(dependency?.module),
        dependencyTypes,
      };

      if (!source.ok) {
        skippedEdges.push({
          ...skippedBase,
          reason: source.reason,
        });
        continue;
      }

      const target = normalizeDependencyTarget(dependency, repoRoot);
      if (!target.ok) {
        skippedEdges.push({
          ...skippedBase,
          reason: target.reason,
        });
        continue;
      }

      edges.push({
        source: buildEndpoint(source.path),
        target: buildEndpoint(target.path),
        edgeType: mapDependencyEdgeType(dependency),
        sourceTool: DEPENDENCY_CRUISER_SOURCE_TOOL,
        confidence: target.confidence,
        provenance: buildDependencyProvenance({
          observedAt,
          configPath,
          dependency,
        }),
      });
    }
  }

  const sortedEdges = edges.sort(compareDependencyEdges);
  const sortedSkippedEdges = skippedEdges.sort(compareSkippedEdges);

  return {
    sourceTool: DEPENDENCY_CRUISER_SOURCE_TOOL,
    observedAt,
    configPath,
    cruisePaths,
    edges: sortedEdges,
    skippedEdges: sortedSkippedEdges,
    summary: {
      moduleCount: modules.length,
      dependencyCount: sortedEdges.length + sortedSkippedEdges.length,
      edgeCount: sortedEdges.length,
      skippedEdgeCount: sortedSkippedEdges.length,
      violationCount: countViolations(cruiseResult),
    },
    limitations: [
      "Dependency-cruiser output is graph evidence only; source inclusion policy stays outside dependency edge generation.",
      "Core, external, unresolved, and non-repository targets are skipped because dependency-edge metadata requires repository file endpoints.",
    ],
  };
}

function runDependencyCruiserJson({ repoRoot, configPath, cruisePaths }) {
  const dependencyCruiserCli = path.join(
    repoRoot,
    "node_modules",
    "dependency-cruiser",
    "bin",
    "dependency-cruise.mjs",
  );

  if (!existsSync(dependencyCruiserCli)) {
    throw new Error(`dependency-cruiser executable was not found: ${dependencyCruiserCli}`);
  }

  const command = [
    process.execPath,
    toRepoRelativePosixPath(dependencyCruiserCli, { repoRoot }),
    "--config",
    configPath,
    "--output-type",
    "json",
    ...cruisePaths,
  ];
  const run = spawnSync(command[0], command.slice(1), {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 30,
  });

  if (run.error) {
    throw new Error(`dependency-cruiser failed to start: ${run.error.message}`);
  }

  return {
    command,
    exitCode: run.status,
    stderr: run.stderr ?? "",
    json: parseJson(run.stdout, "dependency-cruiser JSON output"),
  };
}

function getCruiseModules(cruiseResult) {
  if (!isObject(cruiseResult) || !Array.isArray(cruiseResult.modules)) {
    throw new Error("Expected dependency-cruiser JSON with a modules array.");
  }

  return cruiseResult.modules;
}

function normalizeModuleSource(moduleRecord, repoRoot) {
  const source = moduleRecord?.source;
  const sourceTypes = asStringArray(moduleRecord?.dependencyTypes);

  if (
    moduleRecord?.coreModule ||
    sourceTypes.includes("core") ||
    sourceTypes.some(isNpmDependencyType) ||
    isNodeModulesPath(source)
  ) {
    return {
      ok: false,
      path: stringOrNull(source),
      reason: "non-repository-source",
    };
  }

  return normalizeRepoFilePath(source, repoRoot, "non-repository-source");
}

function normalizeDependencyTarget(dependency, repoRoot) {
  const dependencyTypes = asStringArray(dependency?.dependencyTypes);
  const resolved = dependency?.resolved;

  if (dependency?.couldNotResolve) {
    return skippedTarget(SKIPPED_TARGET_REASONS.UNRESOLVED);
  }

  if (
    dependency?.coreModule ||
    dependency?.protocol === "node:" ||
    dependencyTypes.includes("core")
  ) {
    return skippedTarget(SKIPPED_TARGET_REASONS.CORE);
  }

  if (
    dependencyTypes.some(isNpmDependencyType) ||
    isNodeModulesPath(resolved) ||
    (resolved === undefined && isBareModuleSpecifier(dependency?.module))
  ) {
    return skippedTarget(SKIPPED_TARGET_REASONS.EXTERNAL);
  }

  if (typeof resolved !== "string" || resolved.length === 0) {
    return skippedTarget(SKIPPED_TARGET_REASONS.MISSING_RESOLVED);
  }

  return normalizeRepoFilePath(resolved, repoRoot, SKIPPED_TARGET_REASONS.NON_REPOSITORY);
}

function normalizeRepoFilePath(value, repoRoot, failureReason) {
  if (typeof value !== "string" || value.length === 0 || !looksLikeRepositoryPath(value)) {
    return {
      ok: false,
      path: stringOrNull(value),
      reason: failureReason,
    };
  }

  try {
    const repoPath = toRepoRelativePosixPath(value, { repoRoot });
    if (isNodeModulesPath(repoPath) || !looksLikeRepositoryPath(repoPath)) {
      return {
        ok: false,
        path: repoPath,
        reason: failureReason,
      };
    }

    return {
      ok: true,
      path: repoPath,
      confidence: 1,
    };
  } catch {
    return {
      ok: false,
      path: stringOrNull(value),
      reason: failureReason,
    };
  }
}

function skippedTarget(reason) {
  return {
    ok: false,
    reason,
  };
}

function buildEndpoint(repoPath) {
  return {
    path: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
  };
}

function mapDependencyEdgeType(dependency) {
  const dependencyTypes = new Set(asStringArray(dependency?.dependencyTypes));

  if (dependency?.dynamic || dependencyTypes.has("dynamic-import")) {
    return "dynamic-import";
  }
  if (dependencyTypes.has("export")) {
    return "export";
  }
  if (
    dependencyTypes.has("jsdoc") ||
    dependencyTypes.has("jsdoc-import-tag") ||
    dependencyTypes.has("jsdoc-bracket-import") ||
    dependencyTypes.has("triple-slash-amd-dependency") ||
    dependencyTypes.has("triple-slash-directive") ||
    dependencyTypes.has("triple-slash-file-reference") ||
    dependencyTypes.has("triple-slash-type-reference")
  ) {
    return "reference";
  }
  if (
    dependencyTypes.has("import") ||
    dependencyTypes.has("require") ||
    dependencyTypes.has("import-equals") ||
    dependencyTypes.has("type-import") ||
    dependencyTypes.has("type-only") ||
    dependencyTypes.has("local") ||
    dependencyTypes.has("localmodule")
  ) {
    return "import";
  }

  return "unknown";
}

function buildDependencyProvenance({ observedAt, configPath, dependency }) {
  return compactObject({
    sourceTool: DEPENDENCY_CRUISER_SOURCE_TOOL,
    observedAt,
    configPath,
    importSpecifier: dependency?.module,
    resolved: dependency?.resolved,
    dependencyTypes: asStringArray(dependency?.dependencyTypes),
    moduleSystem: dependency?.moduleSystem,
    dynamic: dependency?.dynamic,
    valid: dependency?.valid,
  });
}

function compareDependencyEdges(left, right) {
  return (
    left.source.path.localeCompare(right.source.path) ||
    left.target.path.localeCompare(right.target.path) ||
    left.edgeType.localeCompare(right.edgeType) ||
    String(left.provenance.importSpecifier ?? "").localeCompare(
      String(right.provenance.importSpecifier ?? ""),
    )
  );
}

function compareSkippedEdges(left, right) {
  return (
    String(left.source ?? "").localeCompare(String(right.source ?? "")) ||
    String(left.target ?? "").localeCompare(String(right.target ?? "")) ||
    left.reason.localeCompare(right.reason) ||
    String(left.moduleSpecifier ?? "").localeCompare(String(right.moduleSpecifier ?? ""))
  );
}

function countModules(cruiseResult) {
  return Array.isArray(cruiseResult?.modules) ? cruiseResult.modules.length : 0;
}

function countViolations(cruiseResult) {
  return Array.isArray(cruiseResult?.summary?.violations)
    ? cruiseResult.summary.violations.length
    : 0;
}

function isNpmDependencyType(value) {
  return typeof value === "string" && value.startsWith("npm");
}

function isNodeModulesPath(value) {
  return normalizePath(value).startsWith("node_modules/");
}

function isBareModuleSpecifier(value) {
  const normalized = normalizePath(value);
  return (
    normalized.length > 0 &&
    !normalized.startsWith(".") &&
    !normalized.startsWith("/") &&
    !normalized.startsWith("node:") &&
    !/^[A-Za-z]:/.test(normalized)
  );
}

function looksLikeRepositoryPath(value) {
  const normalized = normalizePath(value);
  return (
    normalized.includes("/") ||
    normalized.startsWith(".") ||
    path.posix.extname(normalized).length > 0
  );
}

function normalizePath(value) {
  return String(value ?? "")
    .replaceAll("\\", "/")
    .replace(/^[.]\//, "");
}

function parseJson(raw, label) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse ${label}: ${error.message}`);
  }
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asStringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function stringOrNull(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function compactObject(value) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entryValue]) => entryValue !== undefined),
  );
}

function trim(value) {
  return String(value ?? "").trim();
}
