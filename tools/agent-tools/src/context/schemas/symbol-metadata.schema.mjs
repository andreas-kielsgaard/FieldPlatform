import { defineContextSchema, sourceLocationSchema } from "./shared.mjs";

export const symbolMetadataSchema = defineContextSchema(
  {
    $id: "agent-os.context.symbol-metadata",
    title: "Agent OS Context Symbol Metadata",
    description:
      "Symbol metadata contract for future extraction. This slice defines location and visibility semantics only.",
    type: "object",
    additionalProperties: false,
    required: ["name", "kind", "visibility", "definingLocation"],
    properties: {
      name: {
        type: "string",
        minLength: 1,
      },
      kind: {
        enum: [
          "class",
          "function",
          "method",
          "constant",
          "variable",
          "type",
          "interface",
          "component",
          "module",
          "unknown",
        ],
      },
      visibility: {
        enum: ["exported", "local"],
      },
      definingLocation: sourceLocationSchema,
      container: {
        type: ["string", "null"],
      },
    },
  },
  "tools/agent-tools/src/context/schemas/symbol-metadata.schema.mjs",
);
