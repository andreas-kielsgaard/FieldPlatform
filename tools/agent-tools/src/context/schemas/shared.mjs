export const CONTEXT_CONTRACT_VERSION = "0.1.0";
export const CONTEXT_PATH_FORMAT = "repo-relative-posix";
export const CONTEXT_RANGE_LINE_BASE = 0;
export const CONTEXT_RANGE_ENCODING = "utf-16";

export const repoRelativePosixPathSchema = Object.freeze({
  type: "string",
  minLength: 1,
  pattern: "^(?![A-Za-z]:)(?!/)(?!.*\\\\).+",
  description: "Repository-relative POSIX path. Absolute paths and backslashes are not valid.",
});

export const sourcePositionSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: ["line", "character"],
  properties: {
    line: {
      type: "integer",
      minimum: 0,
    },
    character: {
      type: "integer",
      minimum: 0,
      description: "Zero-based UTF-16 code-unit offset, matching LSP Position.character.",
    },
  },
});

export const sourceRangeSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: ["lineBase", "encoding", "start", "end"],
  properties: {
    lineBase: {
      const: CONTEXT_RANGE_LINE_BASE,
      description: "All line values are zero-based.",
    },
    encoding: {
      const: CONTEXT_RANGE_ENCODING,
      description: "Character offsets are UTF-16 code units, matching LSP ranges.",
    },
    start: sourcePositionSchema,
    end: sourcePositionSchema,
  },
});

export const sourceLocationSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: ["path", "pathFormat", "range"],
  properties: {
    path: repoRelativePosixPathSchema,
    pathFormat: {
      const: CONTEXT_PATH_FORMAT,
    },
    range: sourceRangeSchema,
  },
});

export const contentHashSchema = Object.freeze({
  type: "object",
  additionalProperties: false,
  required: ["algorithm", "digest"],
  properties: {
    algorithm: {
      enum: ["sha256"],
    },
    digest: {
      type: "string",
      minLength: 1,
    },
  },
});

export const provenanceSchema = Object.freeze({
  type: "object",
  additionalProperties: true,
  required: ["sourceTool", "observedAt"],
  properties: {
    sourceTool: {
      type: "string",
      minLength: 1,
    },
    observedAt: {
      type: "string",
      format: "date-time",
    },
    version: {
      type: "string",
    },
    notes: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
});

export const freshnessStateValues = Object.freeze([
  "current-clean",
  "current-dirty",
  "untracked",
  "deleted",
  "stale-schema",
  "stale-chunker",
  "unknown",
]);

export function defineContextSchema(schema, filePath) {
  return Object.freeze({
    $schema: "https://json-schema.org/draft/2020-12/schema",
    xSchemaVersion: CONTEXT_CONTRACT_VERSION,
    xSchemaFilePath: filePath,
    ...schema,
  });
}
