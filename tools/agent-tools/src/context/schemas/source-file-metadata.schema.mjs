import {
  CONTEXT_PATH_FORMAT,
  defineContextSchema,
  repoRelativePosixPathSchema,
} from "./shared.mjs";

export const sourceFileMetadataSchema = defineContextSchema(
  {
    $id: "agent-os.context.source-file-metadata",
    title: "Agent OS Context Source File Metadata",
    description:
      "Metadata for a repository file considered by future context tooling. This contract does not imply that any index has been generated.",
    type: "object",
    additionalProperties: false,
    required: [
      "adapterId",
      "path",
      "pathFormat",
      "documentKind",
      "sourceGroup",
      "language",
      "inclusionStatus",
      "flags",
    ],
    properties: {
      adapterId: {
        type: "string",
        minLength: 1,
      },
      repoId: {
        type: "string",
      },
      path: repoRelativePosixPathSchema,
      pathFormat: {
        const: CONTEXT_PATH_FORMAT,
      },
      documentKind: {
        enum: [
          "source",
          "test",
          "config",
          "schema",
          "documentation",
          "generated",
          "archive",
          "unknown",
        ],
      },
      sourceGroup: {
        type: "string",
        minLength: 1,
      },
      language: {
        type: "string",
        minLength: 1,
      },
      inclusionStatus: {
        enum: ["included", "excluded"],
      },
      exclusionReason: {
        type: ["string", "null"],
      },
      flags: {
        type: "object",
        additionalProperties: false,
        required: ["generated", "archive"],
        properties: {
          generated: {
            type: "boolean",
          },
          archive: {
            type: "boolean",
          },
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/source-file-metadata.schema.mjs",
);
