import {
  CONTEXT_CONTRACT_VERSION,
  CONTEXT_PATH_FORMAT,
  defineContextSchema,
  repoRelativePosixPathSchema,
} from "./shared.mjs";

export const adapterConfigSchema = defineContextSchema(
  {
    $id: "agent-os.context.adapter-config",
    title: "Agent OS Context Adapter Config",
    description:
      "Project adapter contract for context tooling. This config identifies source groups and capability state without generating manifests or indexes.",
    type: "object",
    additionalProperties: false,
    required: [
      "schemaVersion",
      "adapterId",
      "repoId",
      "displayName",
      "pathFormat",
      "sourceGroups",
      "capabilities",
    ],
    properties: {
      schemaVersion: {
        const: CONTEXT_CONTRACT_VERSION,
      },
      adapterId: {
        type: "string",
        minLength: 1,
      },
      repoId: {
        type: "string",
        minLength: 1,
      },
      displayName: {
        type: "string",
        minLength: 1,
      },
      repoRoot: {
        type: "string",
        default: ".",
      },
      pathFormat: {
        const: CONTEXT_PATH_FORMAT,
      },
      sourceGroups: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["id", "root", "include", "exclude"],
          properties: {
            id: {
              type: "string",
              minLength: 1,
            },
            root: repoRelativePosixPathSchema,
            include: {
              type: "array",
              items: {
                type: "string",
              },
            },
            exclude: {
              type: "array",
              items: {
                type: "string",
              },
            },
            documentKinds: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
      },
      capabilities: {
        type: "object",
        additionalProperties: false,
        required: ["implemented", "unimplemented"],
        properties: {
          implemented: {
            type: "array",
            items: {
              type: "string",
            },
          },
          unimplemented: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
  "tools/agent-tools/src/context/schemas/adapter-config.schema.mjs",
);
