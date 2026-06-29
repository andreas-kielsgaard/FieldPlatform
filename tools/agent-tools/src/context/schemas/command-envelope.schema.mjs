import { defineContextSchema } from "./shared.mjs";

export const commandEnvelopeSchema = defineContextSchema(
  {
    $id: "agent-os.context.command-envelope",
    title: "Agent OS Context Command Envelope",
    description:
      "Shared JSON envelope for Agent OS context CLI outputs. Command payloads may vary, but the envelope fields remain stable.",
    type: "object",
    additionalProperties: false,
    required: ["schemaVersion", "command", "status", "data", "warnings", "limitations"],
    properties: {
      schemaVersion: {
        const: "agent-os.context.command-envelope@0.1.0",
      },
      command: {
        type: "object",
        additionalProperties: false,
        required: ["namespace", "name", "generatedAt"],
        properties: {
          namespace: {
            const: "agent-os context",
          },
          name: {
            type: "string",
            minLength: 1,
          },
          generatedAt: {
            type: "string",
            format: "date-time",
          },
          adapterId: {
            type: "string",
            minLength: 1,
          },
        },
      },
      status: {
        enum: ["ok", "warning", "error"],
      },
      data: {
        type: "object",
      },
      warnings: {
        type: "array",
        items: {
          type: "string",
        },
      },
      limitations: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/command-envelope.schema.mjs",
);
