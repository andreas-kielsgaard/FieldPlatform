import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { buildSchemasEnvelope } from "../../src/context/cli/schemas-command.mjs";
import { validateAdapterConfig } from "../../src/context/core/contract-validation.mjs";
import {
  expectedContextSchemaIds,
  getContextSchemaRegistry,
} from "../../src/context/core/schema-registry.mjs";
import {
  assertDeterministicJsonEqual,
  assertSchemasEnvelopeLooseFields,
  assertValidCommandEnvelope,
  fixturePath,
  loadJsonFixture,
  normalizeSchemasEnvelopeForGolden,
  runWorkspaceCommand,
  toRepoRelativePath,
  workspaceRoot,
} from "./context-test-helpers.mjs";

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
  assertValidCommandEnvelope(envelope, {
    name: "schemas",
    adapterId: "field-platform",
    requireSchemaRegistryData: true,
  });
});

test("adapter/config fixture validates", () => {
  const config = loadJsonFixture("field-platform-adapter.config.json");
  const result = validateAdapterConfig(config);

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});

test("shared context fixture corpus includes source policy and intelligence cases", () => {
  const fixtureFiles = [
    "synthetic-context-repo/apps/web/src/source-intelligence/source-policy.ts",
    "synthetic-context-repo/apps/web/src/source-intelligence/source-policy.test.ts",
    "synthetic-context-repo/config/source-intelligence.config.json",
    "synthetic-context-repo/generated/source-intelligence.generated.json",
    "synthetic-context-repo/Archive/legacy-source-policy.md",
    "synthetic-context-repo/docs/source-intelligence.md",
  ];
  const repoRelativePaths = fixtureFiles.map((file) =>
    toRepoRelativePath(fixturePath(...file.split("/"))),
  );

  assert.deepEqual(repoRelativePaths, [
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/apps/web/src/source-intelligence/source-policy.ts",
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/apps/web/src/source-intelligence/source-policy.test.ts",
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/config/source-intelligence.config.json",
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/generated/source-intelligence.generated.json",
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/Archive/legacy-source-policy.md",
    "tools/agent-tools/test/context/fixtures/synthetic-context-repo/docs/source-intelligence.md",
  ]);

  for (const repoRelativePath of repoRelativePaths) {
    assert.equal(existsSync(path.join(workspaceRoot, repoRelativePath)), true);
  }
});

test("CLI schemas JSON envelope matches the golden shape without pinning generatedAt", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "schemas", "--json"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "schemas",
    adapterId: "field-platform",
    requireSchemaRegistryData: true,
  });
  assertSchemasEnvelopeLooseFields(parsed);
  assertDeterministicJsonEqual(
    normalizeSchemasEnvelopeForGolden(parsed),
    loadJsonFixture("goldens", "schemas-envelope.golden.json"),
  );
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
