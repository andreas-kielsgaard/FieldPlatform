import {
  CONTEXT_CONTRACT_VERSION,
  defineContextSchema,
  repoRelativePosixPathSchema,
} from "./shared.mjs";

export const schemaRegistrySchema = defineContextSchema(
  {
    $id: "agent-os.context.schema-registry",
    title: "Agent OS Context Schema Registry",
    description:
      "Registry contract for the context schema set, implemented and unimplemented capabilities, and read-only inspection metadata.",
    type: "object",
    additionalProperties: false,
    required: [
      "registryId",
      "registryVersion",
      "schemas",
      "implementedCapabilities",
      "unimplementedCapabilities",
    ],
    properties: {
      registryId: {
        const: "agent-os.context.schema-registry",
      },
      registryVersion: {
        const: CONTEXT_CONTRACT_VERSION,
      },
      schemas: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "version", "filePath"],
          properties: {
            id: {
              type: "string",
              minLength: 1,
            },
            version: {
              type: "string",
              minLength: 1,
            },
            filePath: repoRelativePosixPathSchema,
            title: {
              type: "string",
            },
          },
        },
      },
      implementedCapabilities: {
        type: "array",
        items: {
          type: "object",
        },
      },
      unimplementedCapabilities: {
        type: "array",
        items: {
          type: "object",
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/schema-registry.schema.mjs",
);
