export const fieldPlatformContextAdapterConfig = Object.freeze({
  schemaVersion: "0.1.0",
  adapterId: "field-platform",
  repoId: "field-platform",
  displayName: "Field Platform",
  repoRoot: ".",
  pathFormat: "repo-relative-posix",
  sourceGroups: Object.freeze([
    Object.freeze({
      id: "active-web-source",
      root: "apps/web",
      include: Object.freeze(["app/**/*", "src/**/*"]),
      exclude: Object.freeze([".react-router/**/*", "build/**/*"]),
      documentKinds: Object.freeze(["source", "test", "config", "schema"]),
    }),
    Object.freeze({
      id: "agent-tools-source",
      root: "tools/agent-tools",
      include: Object.freeze(["src/**/*", "test/**/*"]),
      exclude: Object.freeze([]),
      documentKinds: Object.freeze(["source", "test", "schema"]),
    }),
  ]),
  capabilities: Object.freeze({
    implemented: Object.freeze([
      "context-cli-help",
      "schema-registry-inspection",
      "command-envelope-contract",
      "adapter-config-contract",
    ]),
    unimplemented: Object.freeze([
      "source-indexing",
      "symbol-extraction",
      "lexical-search",
      "dependency-evidence",
      "embeddings-or-vector-search",
      "manifest-generation",
      "agent-os-prompt-weaving",
    ]),
  }),
});
