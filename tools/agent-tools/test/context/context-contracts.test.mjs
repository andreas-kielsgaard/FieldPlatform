import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildManifestEnvelope } from "../../src/context/cli/manifest-command.mjs";
import { buildSchemasEnvelope } from "../../src/context/cli/schemas-command.mjs";
import {
  validateAdapterConfig,
  validateFileManifest,
} from "../../src/context/core/contract-validation.mjs";
import { buildFileManifest } from "../../src/context/core/file-manifest.mjs";
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

test("command envelope validates for the manifest JSON output", () => {
  const envelope = buildManifestEnvelope({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
  });

  assertValidCommandEnvelope(envelope, {
    name: "manifest",
    adapterId: "field-platform",
  });
  assertValidFileManifest(envelope.data);
});

test("manifest includes active app source and agent-tools source", () => {
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
  });

  assertManifestEntry(manifest, "apps/web/app/root.tsx", {
    sourceGroup: "active-web-source",
    documentKind: "source",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "apps/web/src/shared/policy/visibility.ts", {
    sourceGroup: "active-web-source",
    documentKind: "source",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "tools/agent-tools/src/agent-os.mjs", {
    sourceGroup: "agent-tools-source",
    documentKind: "source",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "tools/agent-tools/test/context/context-contracts.test.mjs", {
    sourceGroup: "agent-tools-source",
    documentKind: "test",
    inclusionStatus: "included",
  });
});

test("manifest includes project config and guidance as non-runtime source groups", () => {
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
  });

  assertManifestEntry(manifest, "package.json", {
    sourceGroup: "project-config",
    documentKind: "config",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "AGENTS.md", {
    sourceGroup: "project-guidance",
    documentKind: "documentation",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "Agent OS/agent-os-bootloader.md", {
    sourceGroup: "project-guidance",
    documentKind: "documentation",
    inclusionStatus: "included",
  });
});

test("manifest excludes generated output and archive paths by policy", (t) => {
  const repoRoot = createTempRepo(t, [
    "apps/web/app/root.tsx",
    "apps/web/build/server/index.js",
    "apps/web/.react-router/types/+types/root.ts",
    "coverage/lcov.info",
    "Archive/old-context.md",
  ]);
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot,
  });

  assertManifestEntry(manifest, "apps/web/app/root.tsx", {
    sourceGroup: "active-web-source",
    inclusionStatus: "included",
  });
  assertManifestEntry(manifest, "apps/web/build/server/index.js", {
    sourceGroup: "generated-output",
    documentKind: "generated",
    inclusionStatus: "excluded",
    generated: true,
  });
  assertManifestEntry(manifest, "apps/web/.react-router/types/+types/root.ts", {
    sourceGroup: "generated-output",
    documentKind: "generated",
    inclusionStatus: "excluded",
    generated: true,
  });
  assertManifestEntry(manifest, "coverage/lcov.info", {
    sourceGroup: "generated-output",
    documentKind: "generated",
    inclusionStatus: "excluded",
    generated: true,
  });
  assertManifestEntry(manifest, "Archive/old-context.md", {
    sourceGroup: "archive",
    documentKind: "archive",
    inclusionStatus: "excluded",
    archive: true,
  });
});

test("manifest excludes repository Archive paths by default", () => {
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
  });
  const archiveEntries = manifest.files.filter((file) => file.path.startsWith("Archive/"));

  assert.ok(archiveEntries.length > 0);
  assert.equal(
    archiveEntries.every(
      (file) =>
        file.sourceGroup === "archive" &&
        file.documentKind === "archive" &&
        file.inclusionStatus === "excluded" &&
        file.flags.archive === true &&
        file.exclusionReason?.includes("Archive/**/*"),
    ),
    true,
  );
});

test("manifest paths are repo-relative POSIX paths", () => {
  const manifest = buildFileManifest({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
  });

  for (const file of manifest.files) {
    assert.equal(file.path.includes("\\"), false, file.path);
    assert.equal(file.path.startsWith("/"), false, file.path);
    assert.equal(/^[A-Za-z]:/.test(file.path), false, file.path);
    assert.equal(file.pathFormat, "repo-relative-posix");
  }
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

test("CLI returns valid JSON for agent-os context manifest --json", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "manifest", "--json"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "manifest",
    adapterId: "field-platform",
  });
  assertValidFileManifest(parsed.data);
});

test("manifest command does not create a committed manifest artifact", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "manifest", "--json"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(existsSync(path.join(workspaceRoot, "agent-os-context-manifest.json")), false);
  assert.equal(existsSync(path.join(workspaceRoot, "context-manifest.json")), false);
  assert.equal(
    existsSync(path.join(workspaceRoot, "tools", "agent-tools", "context-manifest.json")),
    false,
  );
  assert.equal(
    existsSync(
      path.join(workspaceRoot, "Agent OS", "tool-maintained-files", "context-manifest.json"),
    ),
    false,
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

function assertValidFileManifest(manifest) {
  const result = validateFileManifest(manifest, {
    adapterId: "field-platform",
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
}

function assertManifestEntry(manifest, filePath, expected) {
  const entry = manifest.files.find((file) => file.path === filePath);
  assert.ok(entry, `${filePath} should be present in the manifest`);

  for (const [key, value] of Object.entries(expected)) {
    if (key === "generated" || key === "archive") {
      assert.equal(entry.flags[key], value, `${filePath} flags.${key}`);
    } else {
      assert.equal(entry[key], value, `${filePath} ${key}`);
    }
  }

  if (entry.inclusionStatus === "excluded") {
    assert.equal(typeof entry.exclusionReason, "string", `${filePath} exclusionReason`);
  }
}

function createTempRepo(t, repoPaths) {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-manifest-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));

  for (const repoPath of repoPaths) {
    const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, "", "utf8");
  }

  return repoRoot;
}
