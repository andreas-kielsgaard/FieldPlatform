import { defineContextSchema } from "./shared.mjs";

export const fileManifestSchema = defineContextSchema(
  {
    $id: "agent-os.context.file-manifest",
    title: "Agent OS Context File Manifest",
    description:
      "Manifest contract for on-demand file metadata snapshots. This output is generated only when requested and is not a committed artifact.",
    type: "object",
    additionalProperties: false,
    required: ["adapterId", "schemaVersion", "generatedAt", "files"],
    properties: {
      adapterId: {
        type: "string",
        minLength: 1,
      },
      schemaVersion: {
        const: "0.1.0",
      },
      generatedAt: {
        type: "string",
        format: "date-time",
      },
      files: {
        type: "array",
        items: {
          $ref: "agent-os.context.source-file-metadata",
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
  "tools/agent-tools/src/context/schemas/file-manifest.schema.mjs",
);
