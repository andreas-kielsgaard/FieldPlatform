export const implementedContextCapabilities = Object.freeze([
  Object.freeze({
    id: "context-cli-help",
    status: "implemented",
    description: "Print help for the initial `agent-os context` CLI namespace.",
  }),
  Object.freeze({
    id: "schema-registry-inspection",
    status: "implemented",
    description: "Emit the context schema registry through `agent-os context schemas --json`.",
  }),
  Object.freeze({
    id: "command-envelope-contract",
    status: "implemented",
    description: "Wrap JSON context CLI output in the shared command envelope.",
  }),
  Object.freeze({
    id: "adapter-config-contract",
    status: "implemented",
    description: "Define and validate the Field Platform adapter/config contract shape.",
  }),
]);

export const unimplementedContextCapabilities = Object.freeze([
  Object.freeze({
    id: "source-indexing",
    status: "unimplemented",
    reason: "Out of scope for the contract-foundation slice.",
  }),
  Object.freeze({
    id: "symbol-extraction",
    status: "unimplemented",
    reason: "Out of scope for the contract-foundation slice.",
  }),
  Object.freeze({
    id: "lexical-search",
    status: "unimplemented",
    reason: "Out of scope for the contract-foundation slice.",
  }),
  Object.freeze({
    id: "dependency-evidence",
    status: "unimplemented",
    reason: "Out of scope for the contract-foundation slice.",
  }),
  Object.freeze({
    id: "embeddings-or-vector-search",
    status: "unimplemented",
    reason: "No embeddings, vectors, databases, or external stores are introduced in this slice.",
  }),
  Object.freeze({
    id: "manifest-generation",
    status: "unimplemented",
    reason: "Only contracts and adapter fixtures are defined; no manifest artifact is generated.",
  }),
  Object.freeze({
    id: "agent-os-prompt-weaving",
    status: "unimplemented",
    reason: "Prompt-side weaving and catalogues are explicitly outside this slice.",
  }),
]);

export const contextFoundationWarnings = Object.freeze([
  "This command reports contracts only; it does not read, index, chunk, search, or embed source files.",
]);

export const contextFoundationLimitations = Object.freeze([
  "Schema validation is intentionally lightweight and local to the agent-tools package.",
  "No generated manifests, Agent OS tool implementations, tool-maintained files, databases, vectors, or prompt weaving are created.",
  "Capability lists describe current implementation state; unimplemented entries are contractual placeholders for future slices.",
]);
