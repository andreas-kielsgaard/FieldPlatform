import { resolveContextAdapter } from "../adapters/default-adapter.mjs";
import { contextFoundationLimitations, contextFoundationWarnings } from "../core/capabilities.mjs";
import { createCommandEnvelope } from "../core/command-envelope.mjs";
import { getContextSchemaRegistry } from "../core/schema-registry.mjs";

export function buildSchemasEnvelope({
  generatedAt = new Date().toISOString(),
  adapterConfig,
  adapterConfigSource,
} = {}) {
  const contextAdapter = resolveContextAdapter({
    adapterConfig,
    configSource: adapterConfigSource,
  });
  const registry = getContextSchemaRegistry();
  const resolvedAdapterConfig = contextAdapter.adapterConfig;
  const data = {
    ...registry,
    schemaCount: registry.schemas.length,
    adapter: {
      adapterId: resolvedAdapterConfig.adapterId,
      repoId: resolvedAdapterConfig.repoId,
      configSource: contextAdapter.configSource,
      sourceGroupCount: resolvedAdapterConfig.sourceGroups.length,
    },
    generatedArtifacts: [],
  };

  return createCommandEnvelope({
    name: "schemas",
    generatedAt,
    adapterId: resolvedAdapterConfig.adapterId,
    status: "ok",
    data,
    warnings: contextFoundationWarnings,
    limitations: contextFoundationLimitations,
  });
}

export function printSchemasSummary(envelope, stdout) {
  stdout.write("agent-os context schemas\n");
  stdout.write(`Status: ${envelope.status}\n`);
  stdout.write(`Adapter: ${envelope.command.adapterId}\n`);
  stdout.write(`Schemas: ${envelope.data.schemaCount}\n\n`);
  for (const schema of envelope.data.schemas) {
    stdout.write(`- ${schema.id}@${schema.version} (${schema.filePath})\n`);
  }
  stdout.write("\nUse --json for the machine-readable command envelope.\n");
}
