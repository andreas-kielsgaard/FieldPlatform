import {
  CONTEXT_PATH_FORMAT,
  contentHashSchema,
  defineContextSchema,
  freshnessStateValues,
  provenanceSchema,
  repoRelativePosixPathSchema,
} from "./shared.mjs";

const contentIdentitySchema = Object.freeze({
  type: ["object", "null"],
  additionalProperties: false,
  required: ["kind", "source", "algorithm", "digest"],
  properties: {
    kind: {
      enum: ["git-blob", "filesystem-content"],
    },
    source: {
      type: "string",
      minLength: 1,
    },
    algorithm: {
      type: "string",
      minLength: 1,
    },
    digest: {
      type: "string",
      minLength: 1,
    },
  },
});

const nullableContentHashSchema = Object.freeze({
  anyOf: [contentHashSchema, { type: "null" }],
});

const manifestFreshnessEvidenceSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: [
    "state",
    "observedAt",
    "reason",
    "identity",
    "contentHash",
    "trackedIdentity",
    "git",
    "provenance",
  ],
  properties: {
    state: {
      enum: freshnessStateValues,
    },
    observedAt: {
      type: "string",
      format: "date-time",
    },
    reason: {
      type: "string",
      minLength: 1,
    },
    identity: contentIdentitySchema,
    contentHash: nullableContentHashSchema,
    trackedIdentity: contentIdentitySchema,
    git: {
      type: "object",
      additionalProperties: false,
      required: ["available", "tracked", "status", "objectFormat"],
      properties: {
        available: {
          type: "boolean",
        },
        tracked: {
          type: ["boolean", "null"],
        },
        status: {
          enum: ["clean", "dirty", "untracked", "deleted", "unknown"],
        },
        statusCodes: {
          type: "array",
          items: {
            type: "string",
          },
        },
        objectFormat: {
          type: ["string", "null"],
        },
      },
    },
    provenance: provenanceSchema,
  },
});

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
      freshnessEvidence: manifestFreshnessEvidenceSchema,
    },
  },
  "tools/agent-tools/src/context/schemas/source-file-metadata.schema.mjs",
);
