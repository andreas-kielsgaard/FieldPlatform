import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { buildSchemasEnvelope } from "../../src/context/cli/schemas-command.mjs";
import {
  validateAdapterConfig,
  validateCommandEnvelope,
} from "../../src/context/core/contract-validation.mjs";
import {
  expectedContextSchemaIds,
  getContextSchemaRegistry,
} from "../../src/context/core/schema-registry.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(testDirectory, "../../../..");

test("schema registry contains every expected schema ID", () => {
  const registry = getContextSchemaRegistry();
  const actualIds = registry.schemas.map((schema) => schema.id);

  assert.deepEqual(actualIds, expectedContextSchemaIds);
});

test("schema IDs and versions are deterministic", () => {
  const registry = getContextSchemaRegistry();
  const identities = registry.schemas.map((schema) => `${schema.id}@${schema.version}`);

  assert.deepEqual(identities, [
    "agent-os.context.adapter-config@0.1.0",
    "agent-os.context.command-envelope@0.1.0",
    "agent-os.context.source-file-metadata@0.1.0",
    "agent-os.context.file-manifest@0.1.0",
    "agent-os.context.freshness-state@0.1.0",
    "agent-os.context.chunk-metadata@0.1.0",
    "agent-os.context.symbol-metadata@0.1.0",
    "agent-os.context.dependency-edge-metadata@0.1.0",
    "agent-os.context.evidence-result@0.1.0",
    "agent-os.context.schema-registry@0.1.0",
  ]);
});

test("command envelope validates for the schemas JSON output", () => {
  const envelope = buildSchemasEnvelope({
    generatedAt: "2026-06-29T00:00:00.000Z",
  });
  const result = validateCommandEnvelope(envelope, {
    name: "schemas",
    adapterId: "field-platform",
    requireSchemaRegistryData: true,
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});

test("adapter/config fixture validates", () => {
  const fixturePath = path.join(testDirectory, "fixtures", "field-platform-adapter.config.json");
  const config = JSON.parse(readFileSync(fixturePath, "utf8"));
  const result = validateAdapterConfig(config);

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});

test("CLI returns valid JSON for agent-os context schemas --json", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "schemas", "--json"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  const result = validateCommandEnvelope(parsed, {
    name: "schemas",
    adapterId: "field-platform",
    requireSchemaRegistryData: true,
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});

test("CLI context help exits successfully", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "--help"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.match(run.stdout, /agent-os context/);
  assert.match(run.stdout, /schemas/);
});

test("schema inspection does not create generated Agent OS artifacts", () => {
  const envelope = buildSchemasEnvelope({
    generatedAt: "2026-06-29T00:00:00.000Z",
  });

  assert.deepEqual(envelope.data.generatedArtifacts, []);
  assert.equal(existsSync(path.join(workspaceRoot, "Agent OS", "tool-implementations")), false);
  assert.equal(existsSync(path.join(workspaceRoot, "Agent OS", "tool-maintained-files")), false);
});

function runWorkspaceCommand(corepackArgs) {
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
