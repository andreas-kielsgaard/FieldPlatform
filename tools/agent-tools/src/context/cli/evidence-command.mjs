import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextEvidenceLimitations, contextEvidenceWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildContextEvidenceSnapshot } from "../core/context-evidence-snapshot.mjs";

export function buildEvidenceEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  withFreshness = false,
  adapterConfig,
} = {}) {
  const contextAdapter = resolveContextAdapter({ adapterConfig });
  const snapshot = buildContextEvidenceSnapshot({
    adapterConfig: contextAdapter.adapterConfig,
    generatedAt,
    repoRoot,
    withFreshness,
  });

  return createCommandEnvelope({
    name: "evidence",
    generatedAt,
    adapterId: contextAdapter.adapterConfig.adapterId,
    status: snapshot.producers.dependencyCruiser.exitCode === 0 ? "ok" : "warning",
    data: snapshot,
    warnings: contextEvidenceWarnings({ withFreshness }),
    limitations: contextEvidenceLimitations({ withFreshness }),
  });
}

export function printEvidenceSummary(envelope, stdout) {
  const summary = envelope.data.summary;

  stdout.write("agent-os context evidence\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Manifest files: ${summary.manifestFiles}\n`);
  stdout.write(`Included files: ${summary.includedFiles}\n`);
  stdout.write(`Excluded files: ${summary.excludedFiles}\n`);
  if (summary.freshnessEntriesByState) {
    stdout.write(`Freshness states: ${JSON.stringify(summary.freshnessEntriesByState)}\n`);
  }
  stdout.write(`TypeScript files: ${summary.typescriptFiles}\n`);
  stdout.write(`Symbols: ${summary.typescriptSymbols}\n`);
  stdout.write(`Chunks: ${summary.typescriptChunks}\n`);
  stdout.write(`Dependency edges: ${summary.dependencyEdges}\n`);
  stdout.write(`Skipped dependency edges: ${summary.skippedDependencyEdges}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}
