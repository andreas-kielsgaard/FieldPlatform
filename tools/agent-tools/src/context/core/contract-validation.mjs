import { COMMAND_ENVELOPE_SCHEMA_VERSION, CONTEXT_COMMAND_NAMESPACE } from "./command-envelope.mjs";
import { expectedContextSchemaIds } from "./schema-registry.mjs";

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
  if (value.includes("\\") || value.startsWith("/") || /^[A-Za-z]:/.test(value)) {
    errors.push(`${field} must be a repo-relative POSIX path.`);
  }
}
