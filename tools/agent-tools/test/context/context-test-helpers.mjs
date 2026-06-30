import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateBundleResult,
  validateCommandEnvelope,
  validateContextEvidenceSnapshot,
  validateInspectResult,
  validateSearchResult,
  validateSymbolsResult,
} from "../../src/context/core/contract-validation.mjs";

export const contextTestDirectory = path.dirname(fileURLToPath(import.meta.url));
export const agentToolsRoot = path.resolve(contextTestDirectory, "../..");
export const workspaceRoot = path.resolve(agentToolsRoot, "../..");
export const contextFixturesRoot = path.join(contextTestDirectory, "fixtures");

export function fixturePath(...segments) {
  return path.join(contextFixturesRoot, ...segments);
}

export function loadTextFixture(...segments) {
  return readFileSync(fixturePath(...segments), "utf8");
}

export function loadJsonFixture(...segments) {
  return JSON.parse(loadTextFixture(...segments));
}

export function toRepoRelativePath(filePath, root = workspaceRoot) {
  const relativePath = path.relative(root, filePath);

  if (relativePath === "") {
    return ".";
  }
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Path is outside the repo root: ${filePath}`);
  }

  return relativePath.split(path.sep).join("/");
}

export function assertValidCommandEnvelope(envelope, options = {}) {
  const result = validateCommandEnvelope(envelope, options);

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
}

export function assertValidEvidenceSnapshot(snapshot, options = {}) {
  const result = validateContextEvidenceSnapshot(snapshot, options);

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
}

export function assertValidInspectResult(result, options = {}) {
  const validation = validateInspectResult(result, options);

  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
}

export function assertValidSymbolsResult(result, options = {}) {
  const validation = validateSymbolsResult(result, options);

  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
}

export function assertValidSearchResult(result, options = {}) {
  const validation = validateSearchResult(result, options);

  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
}

export function assertValidBundleResult(result, options = {}) {
  const validation = validateBundleResult(result, options);

  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true);
}

export function normalizeSchemasEnvelopeForGolden(envelope) {
  assert.match(envelope.command.generatedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

  return {
    schemaVersion: envelope.schemaVersion,
    command: {
      namespace: envelope.command.namespace,
      name: envelope.command.name,
      generatedAt: "<ISO_DATE_TIME>",
      adapterId: envelope.command.adapterId,
    },
    status: envelope.status,
    data: {
      registryId: envelope.data.registryId,
      registryVersion: envelope.data.registryVersion,
      schemas: envelope.data.schemas.map((schema) => ({
        id: schema.id,
        version: schema.version,
        filePath: schema.filePath,
        title: schema.title,
      })),
      schemaCount: envelope.data.schemaCount,
      adapter: {
        adapterId: envelope.data.adapter.adapterId,
        repoId: envelope.data.adapter.repoId,
        configSource: envelope.data.adapter.configSource,
        sourceGroupCount: envelope.data.adapter.sourceGroupCount,
      },
      generatedArtifacts: envelope.data.generatedArtifacts,
    },
  };
}

export function assertSchemasEnvelopeLooseFields(envelope) {
  assertStringArray(envelope.warnings, "warnings");
  assertStringArray(envelope.limitations, "limitations");
  assertCapabilityArray(envelope.data.implementedCapabilities, "data.implementedCapabilities");
  assertCapabilityArray(envelope.data.unimplementedCapabilities, "data.unimplementedCapabilities");
}

export function assertDeterministicJsonEqual(actual, expected) {
  assert.equal(stableJson(actual), stableJson(expected));
}

export function stableJson(value) {
  return `${JSON.stringify(sortJsonValue(value), null, 2)}\n`;
}

export function runWorkspaceCommand(corepackArgs) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/d", "/s", "/c", "corepack", ...corepackArgs], {
      cwd: workspaceRoot,
      encoding: "utf8",
      shell: false,
      maxBuffer: 1024 * 1024 * 10,
    });
  }

  return spawnSync("corepack", corepackArgs, {
    cwd: workspaceRoot,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 10,
  });
}

function sortJsonValue(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortJsonValue(item));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((key) => [key, sortJsonValue(value[key])]),
    );
  }

  return value;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertStringArray(value, field) {
  assert.equal(Array.isArray(value), true, `${field} must be an array.`);
  assert.equal(
    value.every((item) => typeof item === "string"),
    true,
    `${field} must contain only strings.`,
  );
}

function assertCapabilityArray(value, field) {
  assert.equal(Array.isArray(value), true, `${field} must be an array.`);

  for (const [index, capability] of value.entries()) {
    assert.equal(isPlainObject(capability), true, `${field}[${index}] must be an object.`);
    assert.equal(typeof capability.id, "string", `${field}[${index}].id must be a string.`);
    assert.equal(typeof capability.status, "string", `${field}[${index}].status must be a string.`);
    if ("description" in capability) {
      assert.equal(
        typeof capability.description,
        "string",
        `${field}[${index}].description must be a string.`,
      );
    }
    if ("reason" in capability) {
      assert.equal(
        typeof capability.reason,
        "string",
        `${field}[${index}].reason must be a string.`,
      );
    }
  }
}
