import {
  CONTEXT_PATH_FORMAT,
  defineContextSchema,
  freshnessStateValues,
  provenanceSchema,
  repoRelativePosixPathSchema,
  sourceRangeSchema,
} from "./shared.mjs";

export const evidenceResultSchema = defineContextSchema(
  {
    $id: "agent-os.context.evidence-result",
    title: "Agent OS Context Evidence Result",
    description:
      "Evidence-result contract for future context retrieval. Retrieval modalities are scored placeholders in this foundation slice.",
    type: "object",
    additionalProperties: false,
    required: [
      "path",
      "pathFormat",
      "range",
      "chunkKind",
      "modalityScores",
      "reasons",
      "freshness",
      "provenance",
      "limitations",
      "suggestedNextReads",
    ],
    properties: {
      path: repoRelativePosixPathSchema,
      pathFormat: {
        const: CONTEXT_PATH_FORMAT,
      },
      range: sourceRangeSchema,
      chunkKind: {
        enum: ["file", "module", "class", "function", "section", "test", "config", "unknown"],
      },
      modalityScores: {
        type: "object",
        additionalProperties: false,
        required: ["lexical", "symbol", "dependency", "semantic"],
        properties: {
          lexical: {
            type: ["number", "null"],
            minimum: 0,
            maximum: 1,
          },
          symbol: {
            type: ["number", "null"],
            minimum: 0,
            maximum: 1,
          },
          dependency: {
            type: ["number", "null"],
            minimum: 0,
            maximum: 1,
          },
          semantic: {
            type: ["number", "null"],
            minimum: 0,
            maximum: 1,
          },
        },
      },
      reasons: {
        type: "array",
        items: {
          type: "string",
        },
      },
      freshness: {
        type: "object",
        additionalProperties: false,
        required: ["state"],
        properties: {
          state: {
            enum: freshnessStateValues,
          },
        },
      },
      provenance: provenanceSchema,
      limitations: {
        type: "array",
        items: {
          type: "string",
        },
      },
      suggestedNextReads: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["path", "pathFormat", "reason"],
          properties: {
            path: repoRelativePosixPathSchema,
            pathFormat: {
              const: CONTEXT_PATH_FORMAT,
            },
            reason: {
              type: "string",
              minLength: 1,
            },
          },
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/evidence-result.schema.mjs",
);
