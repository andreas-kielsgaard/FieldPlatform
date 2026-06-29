import {
  CONTEXT_PATH_FORMAT,
  defineContextSchema,
  provenanceSchema,
  repoRelativePosixPathSchema,
} from "./shared.mjs";

const endpointSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: ["path", "pathFormat"],
  properties: {
    path: repoRelativePosixPathSchema,
    pathFormat: {
      const: CONTEXT_PATH_FORMAT,
    },
    chunkId: {
      type: ["string", "null"],
    },
  },
});

export const dependencyEdgeMetadataSchema = defineContextSchema(
  {
    $id: "agent-os.context.dependency-edge-metadata",
    title: "Agent OS Context Dependency Edge Metadata",
    description:
      "Dependency edge metadata contract for future evidence. This slice defines provenance and confidence only.",
    type: "object",
    additionalProperties: false,
    required: ["source", "target", "edgeType", "sourceTool", "confidence", "provenance"],
    properties: {
      source: endpointSchema,
      target: endpointSchema,
      edgeType: {
        enum: ["import", "export", "dynamic-import", "reference", "test-relation", "unknown"],
      },
      sourceTool: {
        type: "string",
        minLength: 1,
      },
      confidence: {
        type: "number",
        minimum: 0,
        maximum: 1,
      },
      provenance: provenanceSchema,
    },
  },
  "tools/agent-tools/src/context/schemas/dependency-edge-metadata.schema.mjs",
);
