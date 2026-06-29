import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validateCommandEnvelope } from "../../src/context/core/contract-validation.mjs";

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

export function normalizeCommandEnvelopeForGolden(envelope) {
  assert.match(envelope.command.generatedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);

  return {
    ...envelope,
    command: {
      ...envelope.command,
      generatedAt: "<ISO_DATE_TIME>",
    },
  };
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
