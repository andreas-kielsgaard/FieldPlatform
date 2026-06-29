import {
  CONTEXT_PATH_FORMAT,
  contentHashSchema,
  defineContextSchema,
  repoRelativePosixPathSchema,
  sourceRangeSchema,
} from "./shared.mjs";

export const chunkMetadataSchema = defineContextSchema(
  {
    $id: "agent-os.context.chunk-metadata",
    title: "Agent OS Context Chunk Metadata",
    description: "Metadata contract for source chunks extracted from repository files.",
    type: "object",
    additionalProperties: false,
    required: [
      "chunkId",
      "filePath",
      "pathFormat",
      "kind",
      "range",
      "contentHash",
      "chunkerVersion",
    ],
    properties: {
      chunkId: {
        type: "string",
        minLength: 1,
      },
      name: {
        type: "string",
        minLength: 1,
      },
      filePath: repoRelativePosixPathSchema,
      pathFormat: {
        const: CONTEXT_PATH_FORMAT,
      },
      kind: {
        enum: [
          "file",
          "module",
          "class",
          "function",
          "interface",
          "type",
          "component",
          "section",
          "test",
          "config",
          "unknown",
        ],
      },
      visibility: {
        enum: ["exported", "local"],
      },
      range: sourceRangeSchema,
      contentHash: contentHashSchema,
      chunkerVersion: {
        type: "string",
        minLength: 1,
      },
      symbols: {
        type: "array",
        items: {
          type: "string",
        },
      },
      imports: {
        type: "array",
        items: {
          type: "string",
        },
      },
      exports: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/chunk-metadata.schema.mjs",
);
