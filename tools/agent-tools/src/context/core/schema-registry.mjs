import { adapterConfigSchema } from "../schemas/adapter-config.schema.mjs";
import { chunkMetadataSchema } from "../schemas/chunk-metadata.schema.mjs";
import { commandEnvelopeSchema } from "../schemas/command-envelope.schema.mjs";
import { dependencyEdgeMetadataSchema } from "../schemas/dependency-edge-metadata.schema.mjs";
import { evidenceResultSchema } from "../schemas/evidence-result.schema.mjs";
import { fileManifestSchema } from "../schemas/file-manifest.schema.mjs";
import { freshnessStateSchema } from "../schemas/freshness-state.schema.mjs";
import { schemaRegistrySchema } from "../schemas/schema-registry.schema.mjs";
import { sourceFileMetadataSchema } from "../schemas/source-file-metadata.schema.mjs";
import { symbolMetadataSchema } from "../schemas/symbol-metadata.schema.mjs";
import {
  implementedContextCapabilities,
  unimplementedContextCapabilities,
} from "./capabilities.mjs";

export const expectedContextSchemaIds = Object.freeze([
  "agent-os.context.adapter-config",
  "agent-os.context.command-envelope",
  "agent-os.context.source-file-metadata",
  "agent-os.context.file-manifest",
  "agent-os.context.freshness-state",
  "agent-os.context.chunk-metadata",
  "agent-os.context.symbol-metadata",
  "agent-os.context.dependency-edge-metadata",
  "agent-os.context.evidence-result",
  "agent-os.context.schema-registry",
]);

export const contextSchemas = Object.freeze([
  adapterConfigSchema,
  commandEnvelopeSchema,
  sourceFileMetadataSchema,
  fileManifestSchema,
  freshnessStateSchema,
  chunkMetadataSchema,
  symbolMetadataSchema,
  dependencyEdgeMetadataSchema,
  evidenceResultSchema,
  schemaRegistrySchema,
]);

export function getContextSchemaRegistry() {
  return {
    registryId: "agent-os.context.schema-registry",
    registryVersion: "0.1.0",
    schemas: contextSchemas.map((schema) => ({
      id: schema.$id,
      version: schema.xSchemaVersion,
      filePath: schema.xSchemaFilePath,
      title: schema.title,
    })),
    implementedCapabilities: implementedContextCapabilities,
    unimplementedCapabilities: unimplementedContextCapabilities,
  };
}
