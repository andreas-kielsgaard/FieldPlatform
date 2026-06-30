import path from "node:path";

import { CONTEXT_CONTRACT_VERSION } from "../schemas/shared.mjs";
import { buildDependencyEdgeEvidenceFromDependencyCruiser } from "./dependency-edge-evidence.mjs";
import { buildFileManifest } from "./file-manifest.mjs";
import { extractTypeScriptSource } from "./typescript-source-extraction.mjs";

export function buildContextEvidenceSnapshot({
  adapterConfig,
  repoRoot = process.cwd(),
  generatedAt = new Date().toISOString(),
  withFreshness = false,
  manifest,
  dependencyEvidence,
} = {}) {
  const resolvedAdapterConfig = requireAdapterConfig(adapterConfig);
  const resolvedRepoRoot = path.resolve(repoRoot);
  const fileManifest =
    manifest ??
    buildFileManifest({
      adapterConfig: resolvedAdapterConfig,
      repoRoot: resolvedRepoRoot,
      generatedAt,
      withFreshness,
    });
  const typeScriptEvidence = extractTypeScriptSource({
    adapterConfig: resolvedAdapterConfig,
    repoRoot: resolvedRepoRoot,
    generatedAt,
    manifest: fileManifest,
  });
  const dependencyEdgeEvidence =
    dependencyEvidence ??
    buildDependencyEdgeEvidenceFromDependencyCruiser({
      repoRoot: resolvedRepoRoot,
      configPath: resolvedAdapterConfig.dependencyCruiser.configPath,
      cruisePaths: resolvedAdapterConfig.dependencyCruiser.roots,
      observedAt: generatedAt,
    });

  return {
    adapterId: resolvedAdapterConfig.adapterId,
    schemaVersion: CONTEXT_CONTRACT_VERSION,
    generatedAt,
    summary: buildEvidenceSummary({
      files: fileManifest.files,
      withFreshness,
      typeScriptEvidence,
      dependencyEdgeEvidence,
    }),
    producers: {
      manifest: {
        adapterId: fileManifest.adapterId,
        withFreshness,
      },
      typescript: {
        chunkerVersion: typeScriptEvidence.chunkerVersion,
      },
      dependencyCruiser: summarizeDependencyCruiserRun(dependencyEdgeEvidence),
    },
    files: fileManifest.files,
    symbols: typeScriptEvidence.symbols,
    chunks: typeScriptEvidence.chunks,
    dependencyEdges: dependencyEdgeEvidence.edges,
    skippedDependencyEdges: dependencyEdgeEvidence.skippedEdges,
  };
}

function requireAdapterConfig(adapterConfig) {
  if (!adapterConfig) {
    throw new Error("buildContextEvidenceSnapshot requires an adapterConfig.");
  }

  return adapterConfig;
}

function buildEvidenceSummary({
  files,
  withFreshness,
  typeScriptEvidence,
  dependencyEdgeEvidence,
}) {
  const includedFiles = files.filter((file) => file.inclusionStatus === "included").length;
  const excludedFiles = files.filter((file) => file.inclusionStatus === "excluded").length;

  return {
    manifestFiles: files.length,
    includedFiles,
    excludedFiles,
    freshnessEntriesByState: withFreshness ? countFreshnessStates(files) : null,
    typescriptFiles: typeScriptEvidence.files.length,
    typescriptSymbols: typeScriptEvidence.symbols.length,
    typescriptChunks: typeScriptEvidence.chunks.length,
    dependencyEdges: dependencyEdgeEvidence.edges.length,
    skippedDependencyEdges: dependencyEdgeEvidence.skippedEdges.length,
  };
}

function countFreshnessStates(files) {
  const counts = {};

  for (const file of files) {
    const state = file.freshnessEvidence?.state;
    if (!state) {
      continue;
    }
    counts[state] = (counts[state] ?? 0) + 1;
  }

  return Object.fromEntries(
    Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)),
  );
}

function summarizeDependencyCruiserRun(dependencyEdgeEvidence) {
  const dependencyCruiser = dependencyEdgeEvidence.dependencyCruiser;

  return {
    sourceTool: dependencyEdgeEvidence.sourceTool,
    configPath: dependencyEdgeEvidence.configPath,
    roots: dependencyEdgeEvidence.cruisePaths,
    moduleCount:
      dependencyCruiser?.moduleCount ?? dependencyEdgeEvidence.summary?.moduleCount ?? null,
    violationCount:
      dependencyCruiser?.violationCount ?? dependencyEdgeEvidence.summary?.violationCount ?? null,
    exitCode: dependencyCruiser?.exitCode ?? null,
  };
}
