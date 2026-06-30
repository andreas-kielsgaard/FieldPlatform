import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { resolveDefaultContextAdapterConfig } from "../../src/context/adapters/default-adapter.mjs";
import { fieldPlatformContextAdapterConfig } from "../../src/context/adapters/field-platform-adapter-config.mjs";
import { contextCommandNames, contextUsageExamples } from "../../src/context/cli/context-cli.mjs";
import { buildManifestEnvelope } from "../../src/context/cli/manifest-command.mjs";
import { buildSchemasEnvelope } from "../../src/context/cli/schemas-command.mjs";
import {
  implementedContextCapabilities,
  implementedContextCapabilityIds,
  unimplementedContextCapabilities,
  unimplementedContextCapabilityIds,
} from "../../src/context/core/capabilities.mjs";
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

const fieldPlatformAdapterConfig = resolveDefaultContextAdapterConfig();

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
  assert.equal(
    envelope.data.files.some((file) => "freshnessEvidence" in file),
    false,
  );
});

test("command envelope validates for the manifest JSON output with freshness", () => {
  const envelope = buildManifestEnvelope({
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot: workspaceRoot,
    withFreshness: true,
  });

  assertValidCommandEnvelope(envelope, {
    name: "manifest",
    adapterId: "field-platform",
  });
  assertValidFileManifest(envelope.data);
  assert.equal(
    envelope.data.files.every((file) => file.freshnessEvidence),
    true,
  );
});

test("manifest includes active app source and agent-tools source", () => {
  const manifest = buildFileManifest({
    adapterConfig: fieldPlatformAdapterConfig,
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
  assertManifestEntry(manifest, "apps/web/src/shared/db/schema/communities.ts", {
    sourceGroup: "active-web-source",
    documentKind: "schema",
    inclusionStatus: "included",
  });
});

test("manifest includes project config and guidance as non-runtime source groups", () => {
  const manifest = buildFileManifest({
    adapterConfig: fieldPlatformAdapterConfig,
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
    "apps/web/storybook-static/index.html",
    "apps/web/playwright-report/index.html",
    "apps/web/test-results/results.json",
    "coverage/lcov.info",
    "Archive/old-context.md",
  ]);
  const manifest = buildFileManifest({
    adapterConfig: fieldPlatformAdapterConfig,
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
  for (const generatedPath of [
    "apps/web/storybook-static/index.html",
    "apps/web/playwright-report/index.html",
    "apps/web/test-results/results.json",
  ]) {
    assertManifestEntry(manifest, generatedPath, {
      sourceGroup: "generated-output",
      documentKind: "generated",
      inclusionStatus: "excluded",
      generated: true,
    });
  }
  assertManifestEntry(manifest, "Archive/old-context.md", {
    sourceGroup: "archive",
    documentKind: "archive",
    inclusionStatus: "excluded",
    archive: true,
  });
});

test("manifest core does not treat Field Platform generated paths as special", (t) => {
  const repoRoot = createTempRepo(t, ["apps/web/build/server/index.js", "src/index.ts"]);
  const manifest = buildFileManifest({
    adapterConfig: createSyntheticAdapterConfig(),
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot,
  });

  assertManifestEntry(manifest, "apps/web/build/server/index.js", {
    sourceGroup: "synthetic-source",
    documentKind: "source",
    inclusionStatus: "included",
    generated: false,
    archive: false,
  });
});

test("source files outside the adapter boundary do not import the Field Platform adapter directly", () => {
  const sourceRoot = path.join(workspaceRoot, "tools", "agent-tools", "src");
  const allowedAdapterRoot = path.join(
    workspaceRoot,
    "tools",
    "agent-tools",
    "src",
    "context",
    "adapters",
  );
  const offenders = collectMjsFiles(sourceRoot)
    .filter((filePath) => !isPathInside(filePath, allowedAdapterRoot))
    .filter((filePath) =>
      readFileSync(filePath, "utf8").includes("field-platform-adapter-config.mjs"),
    )
    .map((filePath) => toRepoRelativePath(filePath))
    .sort();

  assert.deepEqual(offenders, []);
});

test("manifest excludes repository Archive paths by default", () => {
  const manifest = buildFileManifest({
    adapterConfig: fieldPlatformAdapterConfig,
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
    adapterConfig: fieldPlatformAdapterConfig,
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

test("manifest freshness evidence covers clean, dirty, untracked, excluded, and deleted entries", (t) => {
  const repoRoot = createFreshnessFixtureRepo(t);
  const manifest = buildFileManifest({
    adapterConfig: fieldPlatformAdapterConfig,
    generatedAt: "2026-06-29T00:00:00.000Z",
    repoRoot,
    withFreshness: true,
  });

  assertValidFileManifest(manifest);

  const clean = assertManifestEntry(manifest, "apps/web/app/root.tsx", {
    inclusionStatus: "included",
  });
  assert.equal(clean.freshnessEvidence.state, "current-clean");
  assert.equal(clean.freshnessEvidence.identity.kind, "git-blob");
  assert.equal(clean.freshnessEvidence.contentHash, null);

  const dirty = assertManifestEntry(manifest, "tools/agent-tools/src/dirty.mjs", {
    inclusionStatus: "included",
  });
  assert.equal(dirty.freshnessEvidence.state, "current-dirty");
  assert.equal(dirty.freshnessEvidence.identity.kind, "filesystem-content");
  assert.equal(dirty.freshnessEvidence.identity.algorithm, "sha256");
  assert.equal(dirty.freshnessEvidence.contentHash.algorithm, "sha256");
  assert.equal(dirty.freshnessEvidence.trackedIdentity.kind, "git-blob");

  const untracked = assertManifestEntry(
    manifest,
    "tools/agent-tools/test/context/untracked.test.mjs",
    {
      inclusionStatus: "included",
    },
  );
  assert.equal(untracked.freshnessEvidence.state, "untracked");
  assert.equal(untracked.freshnessEvidence.identity.kind, "filesystem-content");
  assert.equal(untracked.freshnessEvidence.contentHash.algorithm, "sha256");
  assert.equal(untracked.freshnessEvidence.trackedIdentity, null);

  const excluded = assertManifestEntry(manifest, "apps/web/build/server/index.js", {
    sourceGroup: "generated-output",
    documentKind: "generated",
    inclusionStatus: "excluded",
    generated: true,
  });
  assert.equal(excluded.freshnessEvidence.state, "untracked");
  assert.equal(excluded.freshnessEvidence.identity.kind, "filesystem-content");

  const deleted = assertManifestEntry(manifest, "apps/web/src/deleted.ts", {
    inclusionStatus: "included",
  });
  assert.equal(deleted.freshnessEvidence.state, "deleted");
  assert.equal(deleted.freshnessEvidence.identity, null);
  assert.equal(deleted.freshnessEvidence.contentHash, null);
  assert.equal(deleted.freshnessEvidence.trackedIdentity.kind, "git-blob");
});

test("adapter/config fixture validates", () => {
  const config = loadJsonFixture("field-platform-adapter.config.json");
  const result = validateAdapterConfig(config);

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
});

test("adapter capability metadata is sourced from exported capabilities", () => {
  const fixtureConfig = loadJsonFixture("field-platform-adapter.config.json");
  const registry = getContextSchemaRegistry();

  assert.deepEqual(fieldPlatformContextAdapterConfig.capabilities.implemented, [
    ...implementedContextCapabilityIds,
  ]);
  assert.deepEqual(fieldPlatformContextAdapterConfig.capabilities.unimplemented, [
    ...unimplementedContextCapabilityIds,
  ]);
  assert.deepEqual(fixtureConfig.capabilities, {
    implemented: [...implementedContextCapabilityIds],
    unimplemented: [...unimplementedContextCapabilityIds],
  });
  assert.deepEqual(
    registry.implementedCapabilities.map((capability) => capability.id),
    implementedContextCapabilities.map((capability) => capability.id),
  );
  assert.deepEqual(
    registry.unimplementedCapabilities.map((capability) => capability.id),
    unimplementedContextCapabilities.map((capability) => capability.id),
  );
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
  assert.equal(
    parsed.data.files.some((file) => "freshnessEvidence" in file),
    false,
  );
});

test("CLI returns valid JSON for agent-os context manifest --json --with-freshness", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "manifest",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "manifest",
    adapterId: "field-platform",
  });
  assertValidFileManifest(parsed.data);
  assert.equal(
    parsed.data.files.every((file) => file.freshnessEvidence),
    true,
  );
});

test("manifest command does not create a committed manifest artifact", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "manifest", "--json"]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "manifest",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);
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
  for (const commandName of contextCommandNames) {
    assert.match(run.stdout, new RegExp(`^  ${commandName}\\s`, "m"));
  }
});

test("top-level agent-os help lists every context usage example", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "--help"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  for (const usageExample of contextUsageExamples) {
    assert.match(run.stdout, new RegExp(escapeRegExp(usageExample)));
  }
});

test("registered context commands are dispatched for command help", () => {
  for (const commandName of contextCommandNames) {
    const run = runWorkspaceCommand(["pnpm", "agent-os", "context", commandName, "--help"]);

    assert.equal(run.status, 0, run.stderr || run.stdout);
    assert.match(run.stdout, new RegExp(`agent-os context ${commandName}`));
  }
});

test("schema inspection does not create generated Agent OS artifacts", () => {
  const envelope = buildSchemasEnvelope({
    generatedAt: "2026-06-29T00:00:00.000Z",
  });

  assert.deepEqual(envelope.data.generatedArtifacts, []);
  assert.equal(existsSync(path.join(workspaceRoot, "Agent OS", "tool-implementations")), false);
  assert.equal(existsSync(path.join(workspaceRoot, "Agent OS", "tool-maintained-files")), false);
});

test("context usage guide exists without retired generated artifact locations", () => {
  const guidePath = path.join(workspaceRoot, "tools", "agent-tools", "docs", "context-usage.md");
  const guide = readFileSync(guidePath, "utf8");

  assert.equal(guide.length > 0, true);
  for (const retiredLocation of [
    "Agent OS/tool-maintained-files",
    "tools/agent-tools/context-bundle.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "tools/agent-tools/context-manifest.json",
  ]) {
    assert.equal(guide.includes(retiredLocation), false, retiredLocation);
  }
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

  return entry;
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

function createSyntheticAdapterConfig() {
  return {
    schemaVersion: "0.1.0",
    adapterId: "synthetic-context",
    repoId: "synthetic-context",
    displayName: "Synthetic Context",
    repoRoot: ".",
    pathFormat: "repo-relative-posix",
    sourceGroups: [
      {
        id: "synthetic-source",
        root: ".",
        include: ["**/*"],
        exclude: [],
        documentKinds: ["source", "test", "config", "schema", "documentation"],
      },
    ],
    capabilities: {
      implemented: [],
      unimplemented: [],
    },
  };
}

function collectMjsFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectMjsFiles(entryPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".mjs")) {
      files.push(entryPath);
    }
  }

  return files;
}

function isPathInside(filePath, directoryPath) {
  const relativePath = path.relative(directoryPath, filePath);
  return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

function createFreshnessFixtureRepo(t) {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-manifest-git-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));

  runGit(repoRoot, ["-c", "init.defaultBranch=main", "init"]);
  runGit(repoRoot, ["config", "core.autocrlf", "false"]);
  writeRepoFile(repoRoot, "apps/web/app/root.tsx", "export function Root() {}\n");
  writeRepoFile(repoRoot, "apps/web/src/deleted.ts", "export const deleted = true;\n");
  writeRepoFile(repoRoot, "tools/agent-tools/src/dirty.mjs", "export const dirty = false;\n");
  runGit(repoRoot, ["add", "."]);
  runGit(repoRoot, [
    "-c",
    "user.name=Agent Tools Test",
    "-c",
    "user.email=agent-tools@example.test",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-m",
    "Add manifest freshness fixtures",
  ]);

  writeRepoFile(repoRoot, "tools/agent-tools/src/dirty.mjs", "export const dirty = true;\n");
  rmSync(path.join(repoRoot, "apps", "web", "src", "deleted.ts"));
  writeRepoFile(
    repoRoot,
    "tools/agent-tools/test/context/untracked.test.mjs",
    "export const untracked = true;\n",
  );
  writeRepoFile(repoRoot, "apps/web/build/server/index.js", "export const generated = true;\n");

  return repoRoot;
}

function writeRepoFile(repoRoot, repoPath, content) {
  const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content, "utf8");
}

function runGit(cwd, gitArgs) {
  const run = spawnSync("git", gitArgs, {
    cwd,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 10,
  });

  assert.equal(run.status, 0, run.stderr || run.stdout);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
