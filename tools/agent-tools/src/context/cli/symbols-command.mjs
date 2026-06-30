import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextEvidenceLimitations, contextEvidenceWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildContextEvidenceSnapshot } from "../core/context-evidence-snapshot.mjs";
import { isRepoRelativePosixPath, toRepoRelativePosixPath } from "../core/repo-paths.mjs";

const allowedKinds = new Set([
  "class",
  "function",
  "interface",
  "type",
  "component",
  "constant",
  "variable",
]);

const allowedVisibilities = new Set(["exported", "local"]);

export function buildSymbolsEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  requestedName,
  path,
  kind,
  visibility,
  withFreshness = false,
  manifest,
  dependencyEvidence,
  adapterConfig,
} = {}) {
  const contextAdapter = resolveContextAdapter({ adapterConfig });
  const validation = validateSymbolsRequest({
    requestedName,
    path,
    kind,
    visibility,
    repoRoot,
  });

  if (!validation.ok) {
    return createSymbolsEnvelope({
      generatedAt,
      status: "error",
      data: buildEmptySymbolsData({
        generatedAt,
        requestedName: requestedName ?? null,
        appliedFilters: validation.appliedFilters,
        adapterConfig: contextAdapter.adapterConfig,
      }),
      warnings: validation.warnings,
      withFreshness,
      adapterConfig: contextAdapter.adapterConfig,
    });
  }

  const snapshot = buildContextEvidenceSnapshot({
    adapterConfig: contextAdapter.adapterConfig,
    generatedAt,
    repoRoot,
    withFreshness,
    manifest,
    dependencyEvidence,
  });
  const data = buildSymbolsData({
    snapshot,
    requestedName: validation.requestedName,
    appliedFilters: validation.appliedFilters,
    withFreshness,
  });
  const warnings = [...contextEvidenceWarnings({ withFreshness })];

  if (data.symbols.length === 0) {
    warnings.push("No symbols matched the requested exact name and filters.");
  }

  return createSymbolsEnvelope({
    generatedAt,
    status: determineSymbolsStatus({ snapshot, data }),
    data,
    warnings,
    withFreshness,
    adapterConfig: contextAdapter.adapterConfig,
  });
}

export function printSymbolsSummary(envelope, stdout) {
  const summary = envelope.data.summary;

  stdout.write("agent-os context symbols\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Requested name: ${envelope.data.requestedName}\n`);
  stdout.write(`Matched symbols: ${summary.matchedSymbols}\n`);
  stdout.write(`Defining files: ${summary.definingFiles}\n`);
  stdout.write(`Chunks: ${summary.chunks}\n`);
  stdout.write(`Freshness evidence: ${summary.freshnessEvidence}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}

function validateSymbolsRequest({ requestedName, path, kind, visibility, repoRoot }) {
  const warnings = [];
  const appliedFilters = {
    path: null,
    kind: null,
    visibility: null,
  };

  if (typeof requestedName !== "string" || requestedName.length === 0) {
    warnings.push("Missing required --name=<symbol-name>.");
  }

  if (path !== undefined) {
    const pathResult = normalizeRequestedPath(path, repoRoot);
    if (!pathResult.ok) {
      warnings.push(pathResult.message);
    } else {
      appliedFilters.path = pathResult.path;
    }
  }

  if (kind !== undefined) {
    if (!allowedKinds.has(kind)) {
      warnings.push(`Invalid --kind=${kind}. Expected one of: ${[...allowedKinds].join("|")}.`);
    } else {
      appliedFilters.kind = kind;
    }
  }

  if (visibility !== undefined) {
    if (!allowedVisibilities.has(visibility)) {
      warnings.push("Invalid --visibility. Expected one of: exported|local.");
    } else {
      appliedFilters.visibility = visibility;
    }
  }

  return {
    ok: warnings.length === 0,
    requestedName: requestedName ?? null,
    appliedFilters,
    warnings,
  };
}

function normalizeRequestedPath(requestedPath, repoRoot) {
  if (typeof requestedPath !== "string" || requestedPath.length === 0) {
    return {
      ok: false,
      message: "Path filter must use --path=<repo-relative-posix-path>.",
    };
  }

  if (!isRepoRelativePosixPath(requestedPath)) {
    return {
      ok: false,
      message:
        "Path filter must be repository-relative POSIX without drive, root, backslash, or traversal.",
    };
  }

  try {
    const normalizedPath = toRepoRelativePosixPath(requestedPath, { repoRoot });
    if (normalizedPath !== requestedPath) {
      return {
        ok: false,
        message: "Path filter must use normalized repository-relative POSIX syntax.",
      };
    }

    return {
      ok: true,
      path: normalizedPath,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}

function buildSymbolsData({ snapshot, requestedName, appliedFilters, withFreshness }) {
  const symbols = snapshot.symbols.filter((symbol) =>
    symbolMatchesRequest(symbol, requestedName, appliedFilters),
  );
  const definingFilePaths = uniqueSortedStrings(
    symbols.map((symbol) => symbol.definingLocation?.path),
  );
  const definingFilePathSet = new Set(definingFilePaths);
  const symbolNameSet = new Set(symbols.map((symbol) => symbol.name));
  const definingFiles = snapshot.files.filter((file) => definingFilePathSet.has(file.path));
  const chunks = snapshot.chunks.filter(
    (chunk) =>
      definingFilePathSet.has(chunk.filePath) && chunkMentionsMatchedSymbol(chunk, symbolNameSet),
  );
  const freshnessEvidence = withFreshness
    ? definingFiles.map((file) => ({
        path: file.path,
        freshnessEvidence: file.freshnessEvidence ?? null,
      }))
    : null;
  const pathFilterManifestFile = appliedFilters.path
    ? (snapshot.files.find((file) => file.path === appliedFilters.path) ?? null)
    : null;

  return {
    adapterId: snapshot.adapterId,
    schemaVersion: snapshot.schemaVersion,
    generatedAt: snapshot.generatedAt,
    requestedName,
    appliedFilters,
    symbols,
    definingFiles,
    freshnessEvidence,
    chunks,
    summary: buildSymbolsSummary({
      requestedName,
      appliedFilters,
      symbols,
      definingFiles,
      freshnessEvidence,
      chunks,
      pathFilterManifestFile,
    }),
    producers: snapshot.producers,
  };
}

function buildEmptySymbolsData({ generatedAt, requestedName, appliedFilters, adapterConfig }) {
  return {
    adapterId: adapterConfig.adapterId,
    schemaVersion: null,
    generatedAt,
    requestedName,
    appliedFilters,
    symbols: [],
    definingFiles: [],
    freshnessEvidence: null,
    chunks: [],
    summary: buildSymbolsSummary({
      requestedName,
      appliedFilters,
      symbols: [],
      definingFiles: [],
      freshnessEvidence: null,
      chunks: [],
      pathFilterManifestFile: null,
    }),
    producers: null,
  };
}

function symbolMatchesRequest(symbol, requestedName, appliedFilters) {
  return (
    symbol.name === requestedName &&
    (appliedFilters.path === null || symbol.definingLocation?.path === appliedFilters.path) &&
    (appliedFilters.kind === null || symbol.kind === appliedFilters.kind) &&
    (appliedFilters.visibility === null || symbol.visibility === appliedFilters.visibility)
  );
}

function chunkMentionsMatchedSymbol(chunk, symbolNameSet) {
  if (symbolNameSet.has(chunk.name)) {
    return true;
  }

  return [...(chunk.symbols ?? []), ...(chunk.exports ?? [])].some((name) =>
    symbolNameSet.has(name),
  );
}

function buildSymbolsSummary({
  requestedName,
  appliedFilters,
  symbols,
  definingFiles,
  freshnessEvidence,
  chunks,
  pathFilterManifestFile,
}) {
  const pathFilterFlags = pathFilterManifestFile?.flags ?? {};

  return {
    requestedName,
    exactNameMatch: true,
    filtersApplied: Object.values(appliedFilters).filter((value) => value !== null).length,
    matchedSymbols: symbols.length,
    definingFiles: definingFiles.length,
    freshnessEvidence: freshnessEvidence?.length ?? 0,
    chunks: chunks.length,
    pathFilterManifestKnown: appliedFilters.path ? Boolean(pathFilterManifestFile) : null,
    pathFilterIncludedSource: appliedFilters.path
      ? pathFilterManifestFile?.inclusionStatus === "included" &&
        pathFilterFlags.generated !== true &&
        pathFilterFlags.archive !== true
      : null,
    pathFilterExcluded: appliedFilters.path
      ? pathFilterManifestFile?.inclusionStatus === "excluded"
      : null,
  };
}

function determineSymbolsStatus({ snapshot, data }) {
  if (data.symbols.length === 0) {
    return "warning";
  }
  if (snapshot.producers.dependencyCruiser.exitCode !== 0) {
    return "warning";
  }
  return "ok";
}

function createSymbolsEnvelope({
  generatedAt,
  status,
  data,
  warnings,
  withFreshness,
  adapterConfig,
}) {
  return createCommandEnvelope({
    name: "symbols",
    generatedAt,
    adapterId: adapterConfig.adapterId,
    status,
    data,
    warnings,
    limitations: contextEvidenceLimitations({ withFreshness }),
  });
}

function uniqueSortedStrings(values) {
  return [...new Set(values.filter((value) => typeof value === "string" && value.length > 0))].sort(
    (left, right) => left.localeCompare(right),
  );
}
