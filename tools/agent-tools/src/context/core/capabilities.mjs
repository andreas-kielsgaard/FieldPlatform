export const implementedContextCapabilities = Object.freeze([
  Object.freeze({
    id: "context-cli-help",
    status: "implemented",
  }),
  Object.freeze({
    id: "schema-registry-inspection",
    status: "implemented",
  }),
  Object.freeze({
    id: "command-envelope-contract",
    status: "implemented",
  }),
  Object.freeze({
    id: "adapter-config-contract",
    status: "implemented",
  }),
  Object.freeze({
    id: "manifest-generation",
    status: "implemented",
  }),
  Object.freeze({
    id: "dependency-evidence",
    status: "implemented",
  }),
]);

export const unimplementedContextCapabilities = Object.freeze([
  Object.freeze({
    id: "source-indexing",
    status: "unimplemented",
  }),
  Object.freeze({
    id: "symbol-extraction",
    status: "unimplemented",
  }),
  Object.freeze({
    id: "lexical-search",
    status: "unimplemented",
  }),
  Object.freeze({
    id: "embeddings-or-vector-search",
    status: "unimplemented",
  }),
  Object.freeze({
    id: "agent-os-prompt-weaving",
    status: "unimplemented",
  }),
]);

export const contextFoundationWarnings = Object.freeze([
  "Schemas output is contract metadata only.",
]);

export const contextFoundationLimitations = Object.freeze([
  "Schema output is read-only.",
  "No files are written.",
]);

const defaultContextManifestWarnings = Object.freeze([
  "Manifest entries are local filesystem evidence only.",
]);

const freshnessContextManifestWarnings = Object.freeze([
  "Manifest entries include local Git status and filesystem hash evidence when available.",
]);

const defaultContextManifestLimitations = Object.freeze([
  "Discovery is bounded to adapter source groups.",
  "Excluded entries appear only for matching files present locally.",
  "No files are written.",
]);

const freshnessContextManifestLimitations = Object.freeze([
  "Discovery is bounded to adapter source groups.",
  "Missing files appear only when local Git reports a tracked path.",
  "No files are written.",
]);

export function contextManifestWarnings(options = {}) {
  return options.withFreshness ? freshnessContextManifestWarnings : defaultContextManifestWarnings;
}

export function contextManifestLimitations(options = {}) {
  return options.withFreshness
    ? freshnessContextManifestLimitations
    : defaultContextManifestLimitations;
}
