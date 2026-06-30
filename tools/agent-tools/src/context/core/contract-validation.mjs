import { CONTEXT_CONTRACT_VERSION, freshnessStateValues } from "../schemas/shared.mjs";
import { COMMAND_ENVELOPE_SCHEMA_VERSION, CONTEXT_COMMAND_NAMESPACE } from "./command-envelope.mjs";
import { CONTEXT_PATH_FORMAT, isRepoRelativePosixPath } from "./repo-paths.mjs";
import { expectedContextSchemaIds } from "./schema-registry.mjs";

const documentKindValues = new Set([
  "source",
  "test",
  "config",
  "schema",
  "documentation",
  "generated",
  "archive",
  "unknown",
]);

const dependencyEdgeTypeValues = new Set([
  "import",
  "export",
  "dynamic-import",
  "reference",
  "test-relation",
  "unknown",
]);

const dependencyEdgeKeys = new Set([
  "source",
  "target",
  "edgeType",
  "sourceTool",
  "confidence",
  "provenance",
]);

const endpointKeys = new Set(["path", "pathFormat", "chunkId"]);
const symbolKindValues = new Set([
  "class",
  "function",
  "method",
  "constant",
  "variable",
  "type",
  "interface",
  "component",
  "module",
  "unknown",
]);
const symbolVisibilityValues = new Set(["exported", "local"]);
const chunkKindValues = new Set([
  "file",
  "module",
  "class",
  "function",
  "interface",
  "type",
  "component",
  "section",
  "test",
  "config",
  "unknown",
]);
const freshnessStateValueSet = new Set(freshnessStateValues);
const freshnessGitStatusValues = new Set(["clean", "dirty", "untracked", "deleted", "unknown"]);
const freshnessIdentityKindValues = new Set(["git-blob", "filesystem-content"]);

export function validateCommandEnvelope(envelope, options = {}) {
  const errors = [];

  if (!isObject(envelope)) {
    return invalid("Envelope must be an object.");
  }

  expectEqual(errors, envelope.schemaVersion, COMMAND_ENVELOPE_SCHEMA_VERSION, "schemaVersion");
  if (!isObject(envelope.command)) {
    errors.push("command must be an object.");
  } else {
    expectEqual(errors, envelope.command.namespace, CONTEXT_COMMAND_NAMESPACE, "command.namespace");
    expectString(errors, envelope.command.name, "command.name");
    expectIsoDateTime(errors, envelope.command.generatedAt, "command.generatedAt");
    if (options.name) {
      expectEqual(errors, envelope.command.name, options.name, "command.name");
    }
    if (options.adapterId) {
      expectEqual(errors, envelope.command.adapterId, options.adapterId, "command.adapterId");
    }
  }

  if (!["ok", "warning", "error"].includes(envelope.status)) {
    errors.push("status must be ok, warning, or error.");
  }
  if (!isObject(envelope.data)) {
    errors.push("data must be an object.");
  }
  expectStringArray(errors, envelope.warnings, "warnings");
  expectStringArray(errors, envelope.limitations, "limitations");

  if (options.requireSchemaRegistryData) {
    validateSchemaRegistryData(errors, envelope.data);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateAdapterConfig(config) {
  const errors = [];

  if (!isObject(config)) {
    return invalid("Adapter config must be an object.");
  }

  expectEqual(errors, config.schemaVersion, "0.1.0", "schemaVersion");
  expectString(errors, config.adapterId, "adapterId");
  expectString(errors, config.repoId, "repoId");
  expectString(errors, config.displayName, "displayName");
  expectEqual(errors, config.pathFormat, "repo-relative-posix", "pathFormat");

  if (!Array.isArray(config.sourceGroups) || config.sourceGroups.length === 0) {
    errors.push("sourceGroups must be a non-empty array.");
  } else {
    for (const [index, group] of config.sourceGroups.entries()) {
      const prefix = `sourceGroups[${index}]`;
      if (!isObject(group)) {
        errors.push(`${prefix} must be an object.`);
        continue;
      }
      expectString(errors, group.id, `${prefix}.id`);
      expectRepoRelativePath(errors, group.root, `${prefix}.root`);
      expectStringArray(errors, group.include, `${prefix}.include`);
      expectStringArray(errors, group.exclude, `${prefix}.exclude`);
    }
  }

  if (!isObject(config.capabilities)) {
    errors.push("capabilities must be an object.");
  } else {
    expectStringArray(errors, config.capabilities.implemented, "capabilities.implemented");
    expectStringArray(errors, config.capabilities.unimplemented, "capabilities.unimplemented");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateFileManifest(manifest, options = {}) {
  const errors = [];

  if (!isObject(manifest)) {
    return invalid("File manifest must be an object.");
  }

  expectString(errors, manifest.adapterId, "adapterId");
  if (options.adapterId) {
    expectEqual(errors, manifest.adapterId, options.adapterId, "adapterId");
  }
  expectEqual(errors, manifest.schemaVersion, CONTEXT_CONTRACT_VERSION, "schemaVersion");
  expectIsoDateTime(errors, manifest.generatedAt, "generatedAt");

  if (!Array.isArray(manifest.files)) {
    errors.push("files must be an array.");
  } else {
    for (const [index, file] of manifest.files.entries()) {
      validateSourceFileMetadataInto(errors, file, `files[${index}]`, options);
    }
  }

  if (manifest.limitations !== undefined) {
    expectStringArray(errors, manifest.limitations, "limitations");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateDependencyEdgeMetadata(edge, options = {}) {
  const errors = [];

  if (!isObject(edge)) {
    return invalid("Dependency edge metadata must be an object.");
  }

  validateDependencyEdgeMetadataInto(errors, edge, "edge", options);

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateContextEvidenceSnapshot(snapshot, options = {}) {
  const errors = [];

  if (!isObject(snapshot)) {
    return invalid("Evidence snapshot must be an object.");
  }

  validateEvidenceBaseFieldsInto(errors, snapshot, "snapshot", {
    adapterId: options.adapterId,
    allowNullSchemaVersion: false,
  });
  validateEvidenceProducersInto(errors, snapshot.producers, "snapshot.producers", {
    allowNull: false,
  });
  validateSourceFileArrayInto(errors, snapshot.files, "snapshot.files", options);
  validateSymbolArrayInto(errors, snapshot.symbols, "snapshot.symbols");
  validateChunkArrayInto(errors, snapshot.chunks, "snapshot.chunks");
  validateDependencyEdgeArrayInto(
    errors,
    snapshot.dependencyEdges,
    "snapshot.dependencyEdges",
    options,
  );
  validateSkippedDependencyEdgeArrayInto(
    errors,
    snapshot.skippedDependencyEdges,
    "snapshot.skippedDependencyEdges",
  );
  validateEvidenceSnapshotSummaryInto(errors, snapshot.summary, "snapshot.summary", snapshot);

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateInspectResult(result, options = {}) {
  const errors = [];

  if (!isObject(result)) {
    return invalid("Inspect result must be an object.");
  }

  validateEvidenceBaseFieldsInto(errors, result, "result", {
    adapterId: options.adapterId,
    allowNullSchemaVersion: true,
  });
  validateNullableRepoPathInto(errors, result.requestedPath, "result.requestedPath");
  validateNullableSourceFileInto(errors, result.manifestFile, "result.manifestFile", options);
  validateNullableFreshnessEvidenceInto(
    errors,
    result.freshnessEvidence,
    "result.freshnessEvidence",
  );
  validateSymbolArrayInto(errors, result.symbols, "result.symbols");
  validateChunkArrayInto(errors, result.chunks, "result.chunks");

  if (!isObject(result.dependencyEdges)) {
    errors.push("result.dependencyEdges must be an object.");
  } else {
    validateDependencyEdgeArrayInto(
      errors,
      result.dependencyEdges.outgoing,
      "result.dependencyEdges.outgoing",
      options,
    );
    validateDependencyEdgeArrayInto(
      errors,
      result.dependencyEdges.incoming,
      "result.dependencyEdges.incoming",
      options,
    );
  }

  validateSkippedDependencyEdgeArrayInto(
    errors,
    result.skippedDependencyEdges,
    "result.skippedDependencyEdges",
  );
  validateInspectSummaryInto(errors, result.summary, "result.summary", result);
  validateEvidenceProducersInto(errors, result.producers, "result.producers", {
    allowNull: true,
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSymbolsResult(result, options = {}) {
  const errors = [];

  if (!isObject(result)) {
    return invalid("Symbols result must be an object.");
  }

  validateEvidenceBaseFieldsInto(errors, result, "result", {
    adapterId: options.adapterId,
    allowNullSchemaVersion: true,
  });
  if (result.requestedName !== null) {
    expectString(errors, result.requestedName, "result.requestedName");
  }
  validateAppliedFiltersInto(errors, result.appliedFilters, "result.appliedFilters");
  validateSymbolArrayInto(errors, result.symbols, "result.symbols");
  validateSourceFileArrayInto(errors, result.definingFiles, "result.definingFiles", options);
  validateSymbolsFreshnessEvidenceInto(
    errors,
    result.freshnessEvidence,
    "result.freshnessEvidence",
  );
  validateChunkArrayInto(errors, result.chunks, "result.chunks");
  validateSymbolsSummaryInto(errors, result.summary, "result.summary", result);
  validateEvidenceProducersInto(errors, result.producers, "result.producers", {
    allowNull: true,
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSourceFileMetadata(file, options = {}) {
  const errors = [];

  if (!isObject(file)) {
    return invalid("Source file metadata must be an object.");
  }

  validateSourceFileMetadataInto(errors, file, "file", options);

  return {
    valid: errors.length === 0,
    errors,
  };
}

function validateSchemaRegistryData(errors, data) {
  if (!isObject(data)) {
    errors.push("data must contain schema registry fields.");
    return;
  }
  expectEqual(errors, data.registryId, "agent-os.context.schema-registry", "data.registryId");
  expectEqual(errors, data.registryVersion, "0.1.0", "data.registryVersion");

  if (!Array.isArray(data.schemas)) {
    errors.push("data.schemas must be an array.");
    return;
  }

  const ids = data.schemas.map((schema) => schema.id);
  for (const expectedId of expectedContextSchemaIds) {
    if (!ids.includes(expectedId)) {
      errors.push(`data.schemas is missing ${expectedId}.`);
    }
  }

  for (const [index, schema] of data.schemas.entries()) {
    const prefix = `data.schemas[${index}]`;
    expectString(errors, schema.id, `${prefix}.id`);
    expectEqual(errors, schema.version, "0.1.0", `${prefix}.version`);
    expectRepoRelativePath(errors, schema.filePath, `${prefix}.filePath`);
  }

  if (!Array.isArray(data.implementedCapabilities)) {
    errors.push("data.implementedCapabilities must be an array.");
  }
  if (!Array.isArray(data.unimplementedCapabilities)) {
    errors.push("data.unimplementedCapabilities must be an array.");
  }
}

function validateSourceFileMetadataInto(errors, file, prefix, options) {
  if (!isObject(file)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectString(errors, file.adapterId, `${prefix}.adapterId`);
  if (options.adapterId) {
    expectEqual(errors, file.adapterId, options.adapterId, `${prefix}.adapterId`);
  }
  if (file.repoId !== undefined) {
    expectString(errors, file.repoId, `${prefix}.repoId`);
  }
  expectRepoRelativePath(errors, file.path, `${prefix}.path`);
  expectEqual(errors, file.pathFormat, CONTEXT_PATH_FORMAT, `${prefix}.pathFormat`);
  if (!documentKindValues.has(file.documentKind)) {
    errors.push(`${prefix}.documentKind must be a known document kind.`);
  }
  expectString(errors, file.sourceGroup, `${prefix}.sourceGroup`);
  expectString(errors, file.language, `${prefix}.language`);
  if (!["included", "excluded"].includes(file.inclusionStatus)) {
    errors.push(`${prefix}.inclusionStatus must be included or excluded.`);
  }
  if (
    file.exclusionReason !== undefined &&
    file.exclusionReason !== null &&
    typeof file.exclusionReason !== "string"
  ) {
    errors.push(`${prefix}.exclusionReason must be a string or null.`);
  }
  if (!isObject(file.flags)) {
    errors.push(`${prefix}.flags must be an object.`);
  } else {
    expectBoolean(errors, file.flags.generated, `${prefix}.flags.generated`);
    expectBoolean(errors, file.flags.archive, `${prefix}.flags.archive`);
  }
  if (file.freshnessEvidence !== undefined) {
    validateFreshnessEvidenceInto(errors, file.freshnessEvidence, `${prefix}.freshnessEvidence`);
  }
}

function validateEvidenceBaseFieldsInto(errors, value, prefix, options = {}) {
  expectString(errors, value.adapterId, `${prefix}.adapterId`);
  if (options.adapterId) {
    expectEqual(errors, value.adapterId, options.adapterId, `${prefix}.adapterId`);
  }
  if (options.allowNullSchemaVersion && value.schemaVersion === null) {
    // Error payloads without evidence snapshots intentionally carry no snapshot schema version.
  } else {
    expectEqual(errors, value.schemaVersion, CONTEXT_CONTRACT_VERSION, `${prefix}.schemaVersion`);
  }
  expectIsoDateTime(errors, value.generatedAt, `${prefix}.generatedAt`);
}

function validateSourceFileArrayInto(errors, files, prefix, options = {}) {
  if (!Array.isArray(files)) {
    errors.push(`${prefix} must be an array.`);
    return;
  }

  for (const [index, file] of files.entries()) {
    validateSourceFileMetadataInto(errors, file, `${prefix}[${index}]`, options);
  }
}

function validateNullableSourceFileInto(errors, file, prefix, options = {}) {
  if (file === null) {
    return;
  }

  validateSourceFileMetadataInto(errors, file, prefix, options);
}

function validateSymbolArrayInto(errors, symbols, prefix) {
  if (!Array.isArray(symbols)) {
    errors.push(`${prefix} must be an array.`);
    return;
  }

  for (const [index, symbol] of symbols.entries()) {
    validateSymbolMetadataInto(errors, symbol, `${prefix}[${index}]`);
  }
}

function validateSymbolMetadataInto(errors, symbol, prefix) {
  if (!isObject(symbol)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectString(errors, symbol.name, `${prefix}.name`);
  if (!symbolKindValues.has(symbol.kind)) {
    errors.push(`${prefix}.kind must be a known symbol kind.`);
  }
  if (!symbolVisibilityValues.has(symbol.visibility)) {
    errors.push(`${prefix}.visibility must be exported or local.`);
  }
  validateSourceLocationInto(errors, symbol.definingLocation, `${prefix}.definingLocation`);
  if (symbol.container !== null && typeof symbol.container !== "string") {
    errors.push(`${prefix}.container must be a string or null.`);
  }
}

function validateChunkArrayInto(errors, chunks, prefix) {
  if (!Array.isArray(chunks)) {
    errors.push(`${prefix} must be an array.`);
    return;
  }

  for (const [index, chunk] of chunks.entries()) {
    validateChunkMetadataInto(errors, chunk, `${prefix}[${index}]`);
  }
}

function validateChunkMetadataInto(errors, chunk, prefix) {
  if (!isObject(chunk)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectString(errors, chunk.chunkId, `${prefix}.chunkId`);
  expectRepoRelativePath(errors, chunk.filePath, `${prefix}.filePath`);
  expectEqual(errors, chunk.pathFormat, CONTEXT_PATH_FORMAT, `${prefix}.pathFormat`);
  if (chunk.name !== undefined) {
    expectString(errors, chunk.name, `${prefix}.name`);
  }
  if (!chunkKindValues.has(chunk.kind)) {
    errors.push(`${prefix}.kind must be a known chunk kind.`);
  }
  if (chunk.visibility !== undefined && !symbolVisibilityValues.has(chunk.visibility)) {
    errors.push(`${prefix}.visibility must be exported or local.`);
  }
  validateSourceRangeInto(errors, chunk.range, `${prefix}.range`);
  validateContentHashInto(errors, chunk.contentHash, `${prefix}.contentHash`);
  expectString(errors, chunk.chunkerVersion, `${prefix}.chunkerVersion`);
  expectStringArray(errors, chunk.symbols, `${prefix}.symbols`);
  expectStringArray(errors, chunk.imports, `${prefix}.imports`);
  expectStringArray(errors, chunk.exports, `${prefix}.exports`);
}

function validateDependencyEdgeArrayInto(errors, edges, prefix, options = {}) {
  if (!Array.isArray(edges)) {
    errors.push(`${prefix} must be an array.`);
    return;
  }

  for (const [index, edge] of edges.entries()) {
    validateDependencyEdgeMetadataInto(errors, edge, `${prefix}[${index}]`, options);
  }
}

function validateDependencyEdgeMetadataInto(errors, edge, prefix, options = {}) {
  if (!isObject(edge)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectOnlyKeys(errors, edge, dependencyEdgeKeys, prefix);
  validateDependencyEndpointInto(errors, edge.source, `${prefix}.source`);
  validateDependencyEndpointInto(errors, edge.target, `${prefix}.target`);
  if (!dependencyEdgeTypeValues.has(edge.edgeType)) {
    errors.push(`${prefix}.edgeType must be a known dependency edge type.`);
  }
  expectString(errors, edge.sourceTool, `${prefix}.sourceTool`);
  expectNumberRange(errors, edge.confidence, `${prefix}.confidence`, 0, 1);
  validateProvenanceInto(errors, edge.provenance, `${prefix}.provenance`);
  if (
    isObject(edge.provenance) &&
    typeof edge.sourceTool === "string" &&
    edge.provenance.sourceTool !== edge.sourceTool
  ) {
    errors.push(`${prefix}.provenance.sourceTool must match ${prefix}.sourceTool.`);
  }
  if (options.sourceTool) {
    expectEqual(errors, edge.sourceTool, options.sourceTool, `${prefix}.sourceTool`);
  }
}

function validateSkippedDependencyEdgeArrayInto(errors, edges, prefix) {
  if (!Array.isArray(edges)) {
    errors.push(`${prefix} must be an array.`);
    return;
  }

  for (const [index, edge] of edges.entries()) {
    validateSkippedDependencyEdgeInto(errors, edge, `${prefix}[${index}]`);
  }
}

function validateSkippedDependencyEdgeInto(errors, edge, prefix) {
  if (!isObject(edge)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  validateNullableString(errors, edge.source, `${prefix}.source`);
  validateNullableString(errors, edge.target, `${prefix}.target`);
  validateNullableString(errors, edge.moduleSpecifier, `${prefix}.moduleSpecifier`);
  expectStringArray(errors, edge.dependencyTypes, `${prefix}.dependencyTypes`);
  expectString(errors, edge.reason, `${prefix}.reason`);
}

function validateEvidenceProducersInto(errors, producers, prefix, options = {}) {
  if (producers === null && options.allowNull) {
    return;
  }
  if (!isObject(producers)) {
    errors.push(`${prefix} must be an object${options.allowNull ? " or null" : ""}.`);
    return;
  }

  if (!isObject(producers.manifest)) {
    errors.push(`${prefix}.manifest must be an object.`);
  } else {
    expectString(errors, producers.manifest.adapterId, `${prefix}.manifest.adapterId`);
    expectBoolean(errors, producers.manifest.withFreshness, `${prefix}.manifest.withFreshness`);
  }

  if (!isObject(producers.typescript)) {
    errors.push(`${prefix}.typescript must be an object.`);
  } else {
    expectString(
      errors,
      producers.typescript.chunkerVersion,
      `${prefix}.typescript.chunkerVersion`,
    );
  }

  if (!isObject(producers.dependencyCruiser)) {
    errors.push(`${prefix}.dependencyCruiser must be an object.`);
  } else {
    expectString(
      errors,
      producers.dependencyCruiser.sourceTool,
      `${prefix}.dependencyCruiser.sourceTool`,
    );
    expectRepoRelativePath(
      errors,
      producers.dependencyCruiser.configPath,
      `${prefix}.dependencyCruiser.configPath`,
    );
    expectStringArray(
      errors,
      producers.dependencyCruiser.roots,
      `${prefix}.dependencyCruiser.roots`,
    );
    validateNullableNumber(
      errors,
      producers.dependencyCruiser.moduleCount,
      `${prefix}.dependencyCruiser.moduleCount`,
    );
    validateNullableNumber(
      errors,
      producers.dependencyCruiser.violationCount,
      `${prefix}.dependencyCruiser.violationCount`,
    );
    validateNullableNumber(
      errors,
      producers.dependencyCruiser.exitCode,
      `${prefix}.dependencyCruiser.exitCode`,
    );
  }
}

function validateEvidenceSnapshotSummaryInto(errors, summary, prefix, snapshot) {
  if (!isObject(summary)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectEqual(errors, summary.manifestFiles, snapshot.files?.length, `${prefix}.manifestFiles`);
  expectEqual(
    errors,
    summary.includedFiles,
    countBy(snapshot.files, (file) => file.inclusionStatus === "included"),
    `${prefix}.includedFiles`,
  );
  expectEqual(
    errors,
    summary.excludedFiles,
    countBy(snapshot.files, (file) => file.inclusionStatus === "excluded"),
    `${prefix}.excludedFiles`,
  );
  validateFreshnessEntriesSummaryInto(
    errors,
    summary.freshnessEntriesByState,
    `${prefix}.freshnessEntriesByState`,
  );
  validateNonNegativeNumber(errors, summary.typescriptFiles, `${prefix}.typescriptFiles`);
  expectEqual(
    errors,
    summary.typescriptSymbols,
    snapshot.symbols?.length,
    `${prefix}.typescriptSymbols`,
  );
  expectEqual(
    errors,
    summary.typescriptChunks,
    snapshot.chunks?.length,
    `${prefix}.typescriptChunks`,
  );
  expectEqual(
    errors,
    summary.dependencyEdges,
    snapshot.dependencyEdges?.length,
    `${prefix}.dependencyEdges`,
  );
  expectEqual(
    errors,
    summary.skippedDependencyEdges,
    snapshot.skippedDependencyEdges?.length,
    `${prefix}.skippedDependencyEdges`,
  );
}

function validateInspectSummaryInto(errors, summary, prefix, result) {
  if (!isObject(summary)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  const flags = result.manifestFile?.flags ?? {};
  expectEqual(
    errors,
    summary.manifestKnown,
    Boolean(result.manifestFile),
    `${prefix}.manifestKnown`,
  );
  expectEqual(
    errors,
    summary.includedSource,
    result.manifestFile?.inclusionStatus === "included" &&
      flags.generated !== true &&
      flags.archive !== true,
    `${prefix}.includedSource`,
  );
  expectEqual(
    errors,
    summary.excluded,
    result.manifestFile?.inclusionStatus === "excluded",
    `${prefix}.excluded`,
  );
  expectEqual(errors, summary.generated, flags.generated === true, `${prefix}.generated`);
  expectEqual(errors, summary.archive, flags.archive === true, `${prefix}.archive`);
  expectEqual(
    errors,
    summary.freshnessEvidence,
    result.freshnessEvidence ? 1 : 0,
    `${prefix}.freshnessEvidence`,
  );
  expectEqual(errors, summary.symbols, result.symbols?.length, `${prefix}.symbols`);
  expectEqual(errors, summary.chunks, result.chunks?.length, `${prefix}.chunks`);
  expectEqual(
    errors,
    summary.outgoingDependencyEdges,
    result.dependencyEdges?.outgoing?.length,
    `${prefix}.outgoingDependencyEdges`,
  );
  expectEqual(
    errors,
    summary.incomingDependencyEdges,
    result.dependencyEdges?.incoming?.length,
    `${prefix}.incomingDependencyEdges`,
  );
  expectEqual(
    errors,
    summary.skippedDependencyEdges,
    result.skippedDependencyEdges?.length,
    `${prefix}.skippedDependencyEdges`,
  );
}

function validateAppliedFiltersInto(errors, filters, prefix) {
  if (!isObject(filters)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  validateNullableRepoPathInto(errors, filters.path, `${prefix}.path`);
  if (filters.kind !== null && !symbolKindValues.has(filters.kind)) {
    errors.push(`${prefix}.kind must be a known symbol kind or null.`);
  }
  if (filters.visibility !== null && !symbolVisibilityValues.has(filters.visibility)) {
    errors.push(`${prefix}.visibility must be exported, local, or null.`);
  }
}

function validateSymbolsFreshnessEvidenceInto(errors, freshnessEvidence, prefix) {
  if (freshnessEvidence === null) {
    return;
  }
  if (!Array.isArray(freshnessEvidence)) {
    errors.push(`${prefix} must be an array or null.`);
    return;
  }

  for (const [index, entry] of freshnessEvidence.entries()) {
    const entryPrefix = `${prefix}[${index}]`;
    if (!isObject(entry)) {
      errors.push(`${entryPrefix} must be an object.`);
      continue;
    }
    expectRepoRelativePath(errors, entry.path, `${entryPrefix}.path`);
    validateNullableFreshnessEvidenceInto(
      errors,
      entry.freshnessEvidence,
      `${entryPrefix}.freshnessEvidence`,
    );
  }
}

function validateSymbolsSummaryInto(errors, summary, prefix, result) {
  if (!isObject(summary)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  const filtersApplied = Object.values(result.appliedFilters ?? {}).filter(
    (value) => value !== null,
  ).length;
  expectEqual(errors, summary.requestedName, result.requestedName, `${prefix}.requestedName`);
  expectBoolean(errors, summary.exactNameMatch, `${prefix}.exactNameMatch`);
  expectEqual(errors, summary.filtersApplied, filtersApplied, `${prefix}.filtersApplied`);
  expectEqual(errors, summary.matchedSymbols, result.symbols?.length, `${prefix}.matchedSymbols`);
  expectEqual(
    errors,
    summary.definingFiles,
    result.definingFiles?.length,
    `${prefix}.definingFiles`,
  );
  expectEqual(
    errors,
    summary.freshnessEvidence,
    result.freshnessEvidence?.length ?? 0,
    `${prefix}.freshnessEvidence`,
  );
  expectEqual(errors, summary.chunks, result.chunks?.length, `${prefix}.chunks`);

  if (result.appliedFilters?.path) {
    expectBoolean(errors, summary.pathFilterManifestKnown, `${prefix}.pathFilterManifestKnown`);
    expectBoolean(errors, summary.pathFilterIncludedSource, `${prefix}.pathFilterIncludedSource`);
    expectBoolean(errors, summary.pathFilterExcluded, `${prefix}.pathFilterExcluded`);
  } else {
    expectEqual(errors, summary.pathFilterManifestKnown, null, `${prefix}.pathFilterManifestKnown`);
    expectEqual(
      errors,
      summary.pathFilterIncludedSource,
      null,
      `${prefix}.pathFilterIncludedSource`,
    );
    expectEqual(errors, summary.pathFilterExcluded, null, `${prefix}.pathFilterExcluded`);
  }
}

function validateFreshnessEntriesSummaryInto(errors, counts, prefix) {
  if (counts === null) {
    return;
  }
  if (!isObject(counts)) {
    errors.push(`${prefix} must be an object or null.`);
    return;
  }

  for (const [state, count] of Object.entries(counts)) {
    if (!freshnessStateValueSet.has(state)) {
      errors.push(`${prefix}.${state} must be a known freshness state.`);
    }
    validateNonNegativeNumber(errors, count, `${prefix}.${state}`);
  }
}

function validateFreshnessEvidenceInto(errors, evidence, prefix) {
  if (!isObject(evidence)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  if (!freshnessStateValueSet.has(evidence.state)) {
    errors.push(`${prefix}.state must be a known freshness state.`);
  }
  expectIsoDateTime(errors, evidence.observedAt, `${prefix}.observedAt`);
  expectString(errors, evidence.reason, `${prefix}.reason`);
  validateFreshnessIdentityInto(errors, evidence.identity, `${prefix}.identity`);
  validateContentHashInto(errors, evidence.contentHash, `${prefix}.contentHash`);
  validateFreshnessIdentityInto(errors, evidence.trackedIdentity, `${prefix}.trackedIdentity`);
  validateFreshnessGitInto(errors, evidence.git, `${prefix}.git`);
  validateProvenanceInto(errors, evidence.provenance, `${prefix}.provenance`);
}

function validateFreshnessIdentityInto(errors, identity, prefix) {
  if (identity === null) {
    return;
  }
  if (!isObject(identity)) {
    errors.push(`${prefix} must be an object or null.`);
    return;
  }

  if (!freshnessIdentityKindValues.has(identity.kind)) {
    errors.push(`${prefix}.kind must be a known identity kind.`);
  }
  expectString(errors, identity.source, `${prefix}.source`);
  expectString(errors, identity.algorithm, `${prefix}.algorithm`);
  expectString(errors, identity.digest, `${prefix}.digest`);
}

function validateContentHashInto(errors, contentHash, prefix) {
  if (contentHash === null) {
    return;
  }
  if (!isObject(contentHash)) {
    errors.push(`${prefix} must be an object or null.`);
    return;
  }

  expectEqual(errors, contentHash.algorithm, "sha256", `${prefix}.algorithm`);
  expectString(errors, contentHash.digest, `${prefix}.digest`);
}

function validateFreshnessGitInto(errors, git, prefix) {
  if (!isObject(git)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectBoolean(errors, git.available, `${prefix}.available`);
  if (git.tracked !== null && typeof git.tracked !== "boolean") {
    errors.push(`${prefix}.tracked must be a boolean or null.`);
  }
  if (!freshnessGitStatusValues.has(git.status)) {
    errors.push(`${prefix}.status must be a known Git freshness status.`);
  }
  if (git.statusCodes !== undefined) {
    expectStringArray(errors, git.statusCodes, `${prefix}.statusCodes`);
  }
  if (git.objectFormat !== null && typeof git.objectFormat !== "string") {
    errors.push(`${prefix}.objectFormat must be a string or null.`);
  }
}

function validateDependencyEndpointInto(errors, endpoint, prefix) {
  if (!isObject(endpoint)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectOnlyKeys(errors, endpoint, endpointKeys, prefix);
  expectRepoRelativePath(errors, endpoint.path, `${prefix}.path`);
  expectEqual(errors, endpoint.pathFormat, CONTEXT_PATH_FORMAT, `${prefix}.pathFormat`);
  if (
    endpoint.chunkId !== undefined &&
    endpoint.chunkId !== null &&
    typeof endpoint.chunkId !== "string"
  ) {
    errors.push(`${prefix}.chunkId must be a string or null.`);
  }
}

function validateSourceLocationInto(errors, location, prefix) {
  if (!isObject(location)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectRepoRelativePath(errors, location.path, `${prefix}.path`);
  expectEqual(errors, location.pathFormat, CONTEXT_PATH_FORMAT, `${prefix}.pathFormat`);
  validateSourceRangeInto(errors, location.range, `${prefix}.range`);
}

function validateSourceRangeInto(errors, range, prefix) {
  if (!isObject(range)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectEqual(errors, range.lineBase, 0, `${prefix}.lineBase`);
  expectEqual(errors, range.encoding, "utf-16", `${prefix}.encoding`);
  validateSourcePositionInto(errors, range.start, `${prefix}.start`);
  validateSourcePositionInto(errors, range.end, `${prefix}.end`);
}

function validateSourcePositionInto(errors, position, prefix) {
  if (!isObject(position)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  validateNonNegativeNumber(errors, position.line, `${prefix}.line`);
  validateNonNegativeNumber(errors, position.character, `${prefix}.character`);
}

function validateNullableFreshnessEvidenceInto(errors, evidence, prefix) {
  if (evidence === null) {
    return;
  }

  validateFreshnessEvidenceInto(errors, evidence, prefix);
}

function validateProvenanceInto(errors, provenance, prefix) {
  if (!isObject(provenance)) {
    errors.push(`${prefix} must be an object.`);
    return;
  }

  expectString(errors, provenance.sourceTool, `${prefix}.sourceTool`);
  expectIsoDateTime(errors, provenance.observedAt, `${prefix}.observedAt`);
  if (provenance.version !== undefined && typeof provenance.version !== "string") {
    errors.push(`${prefix}.version must be a string.`);
  }
  if (provenance.notes !== undefined) {
    expectStringArray(errors, provenance.notes, `${prefix}.notes`);
  }
}

function invalid(message) {
  return {
    valid: false,
    errors: [message],
  };
}

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectEqual(errors, actual, expected, field) {
  if (actual !== expected) {
    errors.push(`${field} must be ${JSON.stringify(expected)}.`);
  }
}

function expectString(errors, value, field) {
  if (typeof value !== "string" || value.length === 0) {
    errors.push(`${field} must be a non-empty string.`);
  }
}

function expectStringArray(errors, value, field) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    errors.push(`${field} must be an array of strings.`);
  }
}

function expectNumberRange(errors, value, field, minimum, maximum) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    errors.push(`${field} must be a number.`);
    return;
  }
  if (value < minimum || value > maximum) {
    errors.push(`${field} must be between ${minimum} and ${maximum}.`);
  }
}

function validateNonNegativeNumber(errors, value, field) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    errors.push(`${field} must be a non-negative number.`);
  }
}

function validateNullableNumber(errors, value, field) {
  if (value === null) {
    return;
  }
  if (typeof value !== "number" || Number.isNaN(value)) {
    errors.push(`${field} must be a number or null.`);
  }
}

function validateNullableString(errors, value, field) {
  if (value === null) {
    return;
  }
  if (typeof value !== "string") {
    errors.push(`${field} must be a string or null.`);
  }
}

function validateNullableRepoPathInto(errors, value, field) {
  if (value === null) {
    return;
  }
  expectRepoRelativePath(errors, value, field);
}

function expectBoolean(errors, value, field) {
  if (typeof value !== "boolean") {
    errors.push(`${field} must be a boolean.`);
  }
}

function expectIsoDateTime(errors, value, field) {
  expectString(errors, value, field);
  if (typeof value === "string" && Number.isNaN(Date.parse(value))) {
    errors.push(`${field} must be an ISO date-time string.`);
  }
}

function expectRepoRelativePath(errors, value, field) {
  expectString(errors, value, field);
  if (typeof value !== "string") {
    return;
  }
  if (!isRepoRelativePosixPath(value)) {
    errors.push(`${field} must be a repo-relative POSIX path.`);
  }
}

function expectOnlyKeys(errors, value, allowedKeys, field) {
  for (const key of Object.keys(value)) {
    if (!allowedKeys.has(key)) {
      errors.push(`${field}.${key} is not allowed.`);
    }
  }
}

function countBy(values, predicate) {
  return Array.isArray(values) ? values.filter(predicate).length : undefined;
}
