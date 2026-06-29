import { defineContextSchema, freshnessStateValues } from "./shared.mjs";

export const freshnessStateSchema = defineContextSchema(
  {
    $id: "agent-os.context.freshness-state",
    title: "Agent OS Context Freshness State",
    description:
      "Freshness state for a file, chunk, or evidence result relative to working tree and context-tool versions.",
    type: "object",
    additionalProperties: false,
    required: ["state"],
    properties: {
      state: {
        enum: freshnessStateValues,
      },
      observedAt: {
        type: "string",
        format: "date-time",
      },
      schemaVersion: {
        type: "string",
      },
      chunkerVersion: {
        type: "string",
      },
      reason: {
        type: "string",
      },
    },
  },
  "tools/agent-tools/src/context/schemas/freshness-state.schema.mjs",
);
