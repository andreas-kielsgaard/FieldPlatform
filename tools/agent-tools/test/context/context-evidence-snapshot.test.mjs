import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { resolveDefaultContextAdapterConfig } from "../../src/context/adapters/default-adapter.mjs";
import { buildEvidenceEnvelope } from "../../src/context/cli/evidence-command.mjs";
import { buildContextEvidenceSnapshot } from "../../src/context/core/context-evidence-snapshot.mjs";
import { mapDependencyCruiserJsonToDependencyEdgeEvidence } from "../../src/context/core/dependency-edge-evidence.mjs";
import { buildFileManifest } from "../../src/context/core/file-manifest.mjs";
import {
  assertValidCommandEnvelope,
  assertValidEvidenceSnapshot,
  loadJsonFixture,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const fixedGeneratedAt = "2026-06-29T00:00:00.000Z";
const fieldPlatformAdapterConfig = resolveDefaultContextAdapterConfig();

test("command envelope validates for the evidence JSON output", () => {
  const envelope = buildEvidenceEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot: workspaceRoot,
  });

  assertValidCommandEnvelope(envelope, {
    name: "evidence",
    adapterId: "field-platform",
  });
  assertValidEvidenceSnapshot(envelope.data, {
    adapterId: "field-platform",
  });
});

test("CLI returns valid JSON for agent-os context evidence --json without freshness", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "evidence", "--json"]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "evidence",
    adapterId: "field-platform",
  });
  assertValidEvidenceSnapshot(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(parsed.data.summary.freshnessEntriesByState, null);
  assert.equal(
    parsed.data.files.some((file) => "freshnessEvidence" in file),
    false,
  );
});

test("CLI returns valid JSON for agent-os context evidence --json --with-freshness", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "evidence",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "evidence",
    adapterId: "field-platform",
  });
  assertValidEvidenceSnapshot(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(typeof parsed.data.summary.freshnessEntriesByState, "object");
  assert.equal(
    parsed.data.files.every((file) => file.freshnessEvidence),
    true,
  );
  assert.equal(
    Object.values(parsed.data.summary.freshnessEntriesByState).reduce(
      (total, count) => total + count,
      0,
    ),
    parsed.data.files.length,
  );
});

test("evidence snapshot includes TypeScript symbols and chunks from included files", () => {
  const envelope = buildEvidenceEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot: workspaceRoot,
  });
  const symbolNames = new Set(envelope.data.symbols.map((symbol) => symbol.name));
  const chunkFiles = new Set(envelope.data.chunks.map((chunk) => chunk.filePath));

  assert.ok(envelope.data.summary.typescriptFiles > 0);
  assert.ok(envelope.data.summary.typescriptSymbols > 0);
  assert.ok(envelope.data.summary.typescriptChunks > 0);
  assert.equal(symbolNames.has("Layout"), true);
  assert.equal(chunkFiles.has("apps/web/app/root.tsx"), true);
});

test("evidence snapshot includes dependency edges and skipped dependency edges", () => {
  const envelope = buildEvidenceEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot: workspaceRoot,
  });

  assert.ok(envelope.data.dependencyEdges.length > 0);
  assert.ok(envelope.data.skippedDependencyEdges.length > 0);
  assert.equal(envelope.data.summary.dependencyEdges, envelope.data.dependencyEdges.length);
  assert.equal(
    envelope.data.summary.skippedDependencyEdges,
    envelope.data.skippedDependencyEdges.length,
  );
});

test("Field Platform evidence snapshot reports adapter dependency-cruiser config", () => {
  const snapshot = buildContextEvidenceSnapshot({
    adapterConfig: fieldPlatformAdapterConfig,
    repoRoot: workspaceRoot,
    generatedAt: fixedGeneratedAt,
  });

  assert.equal(snapshot.producers.dependencyCruiser.sourceTool, "dependency-cruiser");
  assert.equal(snapshot.producers.dependencyCruiser.configPath, "dependency-cruiser.config.cjs");
  assert.deepEqual(snapshot.producers.dependencyCruiser.roots, [
    "apps/web/app",
    "apps/web/src",
    "tools/agent-tools/src",
  ]);
  assert.equal(snapshot.producers.dependencyCruiser.exitCode, 0);
  assert.ok(snapshot.producers.dependencyCruiser.moduleCount > 0);
});

test("synthetic adapter dependency-cruiser config flows through evidence snapshot", () => {
  const syntheticAdapterConfig = {
    ...fieldPlatformAdapterConfig,
    adapterId: "synthetic-context-adapter",
    repoId: "synthetic-context-repo",
    displayName: "Synthetic Context Adapter",
    dependencyCruiser: {
      configPath: "tools/agent-tools/test/context/fixtures/synthetic-dependency-cruiser.config.cjs",
      roots: ["tools/agent-tools/src/context/core"],
    },
    sourceGroups: [
      {
        id: "synthetic-agent-tools-core",
        root: "tools/agent-tools",
        include: ["src/context/core/**/*"],
        exclude: [],
        documentKinds: ["source", "test", "schema"],
      },
    ],
  };
  const snapshot = buildContextEvidenceSnapshot({
    adapterConfig: syntheticAdapterConfig,
    repoRoot: workspaceRoot,
    generatedAt: fixedGeneratedAt,
  });

  assert.equal(snapshot.adapterId, "synthetic-context-adapter");
  assert.equal(
    snapshot.producers.dependencyCruiser.configPath,
    "tools/agent-tools/test/context/fixtures/synthetic-dependency-cruiser.config.cjs",
  );
  assert.deepEqual(snapshot.producers.dependencyCruiser.roots, [
    "tools/agent-tools/src/context/core",
  ]);
  assert.notDeepEqual(snapshot.producers.dependencyCruiser.roots, [
    "apps/web/app",
    "apps/web/src",
    "tools/agent-tools/src",
  ]);
  assert.equal(snapshot.producers.dependencyCruiser.exitCode, 0);
  assert.ok(snapshot.dependencyEdges.length > 0);
  assert.equal(
    snapshot.dependencyEdges.every((edge) =>
      edge.provenance.configPath.endsWith("synthetic-dependency-cruiser.config.cjs"),
    ),
    true,
  );
});

test("dependency evidence does not make generated or archive files included source", (t) => {
  const repoRoot = createTempRepo(t, {
    "apps/web/src/modules/communities/index.ts": "export const activeSource = true;\n",
    "apps/web/.react-router/types/+types/root.ts": "export type GeneratedRoute = string;\n",
    "Archive/legacy/old-module.ts": "export const archived = true;\n",
  });
  const dependencyEvidence = mapDependencyCruiserJsonToDependencyEdgeEvidence(
    loadJsonFixture("dependency-cruiser-sample.json"),
    {
      repoRoot,
      configPath: "dependency-cruiser.config.cjs",
      cruisePaths: ["apps/web/app", "apps/web/src", "tools/agent-tools/src"],
      observedAt: fixedGeneratedAt,
    },
  );
  const snapshot = buildContextEvidenceSnapshot({
    adapterConfig: fieldPlatformAdapterConfig,
    repoRoot,
    generatedAt: fixedGeneratedAt,
    manifest: buildFileManifest({
      adapterConfig: fieldPlatformAdapterConfig,
      repoRoot,
      generatedAt: fixedGeneratedAt,
    }),
    dependencyEvidence,
  });

  const generatedFile = snapshot.files.find((file) =>
    file.path.startsWith("apps/web/.react-router/"),
  );
  const archiveFile = snapshot.files.find((file) => file.path.startsWith("Archive/"));

  assert.equal(generatedFile.inclusionStatus, "excluded");
  assert.equal(generatedFile.flags.generated, true);
  assert.equal(archiveFile.inclusionStatus, "excluded");
  assert.equal(archiveFile.flags.archive, true);
  assert.equal(
    snapshot.symbols.some((symbol) =>
      symbol.definingLocation.path.startsWith("apps/web/.react-router/"),
    ),
    false,
  );
  assert.equal(
    snapshot.chunks.some((chunk) => chunk.filePath.startsWith("Archive/")),
    false,
  );
  assert.equal(
    snapshot.dependencyEdges.some((edge) => edge.source.path.startsWith("Archive/")),
    true,
  );
  assert.equal(
    snapshot.dependencyEdges.some((edge) => edge.source.path.startsWith("apps/web/.react-router/")),
    true,
  );
});

test("evidence command does not create generated evidence or index artifacts", () => {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", "evidence", "--json"]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "evidence",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);

  for (const artifactPath of [
    "agent-os-context-evidence.json",
    "context-evidence.json",
    "context-index.json",
    "evidence-snapshot.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "Agent OS/tool-maintained-files/context-evidence.json",
    "Agent OS/tool-maintained-files/context-index.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function createTempRepo(t, filesByPath) {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-evidence-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));

  for (const [repoPath, content] of Object.entries(filesByPath)) {
    const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
    mkdirSync(path.dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, content, "utf8");
  }

  return repoRoot;
}
