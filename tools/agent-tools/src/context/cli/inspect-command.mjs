import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextEvidenceLimitations, contextEvidenceWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildContextEvidenceSnapshot } from "../core/context-evidence-snapshot.mjs";
import { isRepoRelativePosixPath, toRepoRelativePosixPath } from "../core/repo-paths.mjs";

export function buildInspectEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  requestedPath,
  withFreshness = false,
  manifest,
  dependencyEvidence,
  adapterConfig,
} = {}) {
  const contextAdapter = resolveContextAdapter({ adapterConfig });
  const pathResult = normalizeRequestedPath(requestedPath, repoRoot);

  if (!pathResult.ok) {
    return createInspectEnvelope({
      generatedAt,
      status: "error",
      data: buildEmptyInspectData({
        generatedAt,
        requestedPath: requestedPath ?? null,
        adapterConfig: contextAdapter.adapterConfig,
      }),
      warnings: [pathResult.message],
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
  const data = buildInspectData({
    snapshot,
    requestedPath: pathResult.path,
  });
  const warnings = [...contextEvidenceWarnings({ withFreshness })];

  if (!data.manifestFile) {
    warnings.push("No manifest entry matched the requested path.");
  } else if (data.manifestFile.inclusionStatus === "excluded") {
    warnings.push("Requested path is excluded by manifest source policy.");
  }

  return createInspectEnvelope({
    generatedAt,
    status: determineInspectStatus({ snapshot, data }),
    data,
    warnings,
    withFreshness,
    adapterConfig: contextAdapter.adapterConfig,
  });
}

export function printInspectSummary(envelope, stdout) {
  const summary = envelope.data.summary;

  stdout.write("agent-os context inspect\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Requested path: ${envelope.data.requestedPath}\n`);
  stdout.write(`Manifest known: ${summary.manifestKnown}\n`);
  stdout.write(`Included source: ${summary.includedSource}\n`);
  stdout.write(`Symbols: ${summary.symbols}\n`);
  stdout.write(`Chunks: ${summary.chunks}\n`);
  stdout.write(`Outgoing dependency edges: ${summary.outgoingDependencyEdges}\n`);
  stdout.write(`Incoming dependency edges: ${summary.incomingDependencyEdges}\n`);
  stdout.write(`Skipped dependency edges: ${summary.skippedDependencyEdges}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}

function normalizeRequestedPath(requestedPath, repoRoot) {
  if (typeof requestedPath !== "string" || requestedPath.length === 0) {
    return {
      ok: false,
      message: "Missing required --path=<repo-relative-posix-path>.",
    };
  }

  if (!isRepoRelativePosixPath(requestedPath)) {
    return {
      ok: false,
      message:
        "Path must be repository-relative POSIX without drive, root, backslash, or traversal.",
    };
  }

  try {
    const normalizedPath = toRepoRelativePosixPath(requestedPath, { repoRoot });
    if (normalizedPath !== requestedPath) {
      return {
        ok: false,
        message: "Path must be normalized repository-relative POSIX syntax.",
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

function buildInspectData({ snapshot, requestedPath }) {
  const manifestFile = snapshot.files.find((file) => file.path === requestedPath) ?? null;
  const symbols = snapshot.symbols.filter(
    (symbol) => symbol.definingLocation?.path === requestedPath,
  );
  const chunks = snapshot.chunks.filter((chunk) => chunk.filePath === requestedPath);
  const outgoingDependencyEdges = snapshot.dependencyEdges.filter(
    (edge) => edge.source?.path === requestedPath,
  );
  const incomingDependencyEdges = snapshot.dependencyEdges.filter(
    (edge) => edge.target?.path === requestedPath,
  );
  const skippedDependencyEdges = snapshot.skippedDependencyEdges.filter((edge) =>
    skippedEdgeMentionsPath(edge, requestedPath),
  );
  const freshnessEvidence = manifestFile?.freshnessEvidence ?? null;

  return {
    adapterId: snapshot.adapterId,
    schemaVersion: snapshot.schemaVersion,
    generatedAt: snapshot.generatedAt,
    requestedPath,
    manifestFile,
    freshnessEvidence,
    symbols,
    chunks,
    dependencyEdges: {
      outgoing: outgoingDependencyEdges,
      incoming: incomingDependencyEdges,
    },
    skippedDependencyEdges,
    summary: buildInspectSummary({
      manifestFile,
      freshnessEvidence,
      symbols,
      chunks,
      outgoingDependencyEdges,
      incomingDependencyEdges,
      skippedDependencyEdges,
    }),
    producers: snapshot.producers,
  };
}

function buildEmptyInspectData({ generatedAt, requestedPath, adapterConfig }) {
  return {
    adapterId: adapterConfig.adapterId,
    schemaVersion: null,
    generatedAt,
    requestedPath,
    manifestFile: null,
    freshnessEvidence: null,
    symbols: [],
    chunks: [],
    dependencyEdges: {
      outgoing: [],
      incoming: [],
    },
    skippedDependencyEdges: [],
    summary: buildInspectSummary({
      manifestFile: null,
      freshnessEvidence: null,
      symbols: [],
      chunks: [],
      outgoingDependencyEdges: [],
      incomingDependencyEdges: [],
      skippedDependencyEdges: [],
    }),
    producers: null,
  };
}

function buildInspectSummary({
  manifestFile,
  freshnessEvidence,
  symbols,
  chunks,
  outgoingDependencyEdges,
  incomingDependencyEdges,
  skippedDependencyEdges,
}) {
  const flags = manifestFile?.flags ?? {};

  return {
    manifestKnown: Boolean(manifestFile),
    includedSource:
      manifestFile?.inclusionStatus === "included" &&
      flags.generated !== true &&
      flags.archive !== true,
    excluded: manifestFile?.inclusionStatus === "excluded",
    generated: flags.generated === true,
    archive: flags.archive === true,
    freshnessEvidence: freshnessEvidence ? 1 : 0,
    symbols: symbols.length,
    chunks: chunks.length,
    outgoingDependencyEdges: outgoingDependencyEdges.length,
    incomingDependencyEdges: incomingDependencyEdges.length,
    skippedDependencyEdges: skippedDependencyEdges.length,
  };
}

function skippedEdgeMentionsPath(edge, requestedPath) {
  return (
    edge.source === requestedPath ||
    edge.target === requestedPath ||
    edge.moduleSpecifier === requestedPath
  );
}

function determineInspectStatus({ snapshot, data }) {
  if (!data.manifestFile) {
    return "error";
  }
  if (snapshot.producers.dependencyCruiser.exitCode !== 0) {
    return "warning";
  }
  if (data.manifestFile.inclusionStatus === "excluded") {
    return "warning";
  }
  return "ok";
}

function createInspectEnvelope({
  generatedAt,
  status,
  data,
  warnings,
  withFreshness,
  adapterConfig,
}) {
  return createCommandEnvelope({
    name: "inspect",
    generatedAt,
    adapterId: adapterConfig.adapterId,
    status,
    data,
    warnings,
    limitations: contextEvidenceLimitations({ withFreshness }),
  });
}
