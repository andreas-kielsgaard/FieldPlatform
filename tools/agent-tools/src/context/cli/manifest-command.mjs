import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextManifestLimitations, contextManifestWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { buildFileManifest } from "../core/file-manifest.mjs";

export function buildManifestEnvelope({
  generatedAt = new Date().toISOString(),
  repoRoot = process.cwd(),
  withFreshness = false,
  adapterConfig,
} = {}) {
  const contextAdapter = resolveContextAdapter({ adapterConfig });
  const manifest = buildFileManifest({
    adapterConfig: contextAdapter.adapterConfig,
    generatedAt,
    repoRoot,
    withFreshness,
  });

  return createCommandEnvelope({
    name: "manifest",
    generatedAt,
    adapterId: contextAdapter.adapterConfig.adapterId,
    status: "ok",
    data: manifest,
    warnings: contextManifestWarnings({ withFreshness }),
    limitations: contextManifestLimitations({ withFreshness }),
  });
}

export function printManifestSummary(envelope, stdout) {
  const included = envelope.data.files.filter((file) => file.inclusionStatus === "included");
  const excluded = envelope.data.files.filter((file) => file.inclusionStatus === "excluded");

  stdout.write("agent-os context manifest\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Files: ${envelope.data.files.length}\n`);
  stdout.write(`Included: ${included.length}\n`);
  stdout.write(`Excluded: ${excluded.length}\n\n`);
  stdout.write("Use --json for the machine-readable command envelope.\n");
}
