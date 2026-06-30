import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runContextCli } from "../../src/context/cli/context-cli.mjs";
import { buildSymbolsEnvelope } from "../../src/context/cli/symbols-command.mjs";
import {
  assertValidCommandEnvelope,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const fixedGeneratedAt = "2026-06-29T00:00:00.000Z";
const rootPath = "apps/web/app/root.tsx";
const depPath = "apps/web/app/dep.ts";
const localPath = "apps/web/src/feature/local-layout.tsx";
const generatedPath = "apps/web/.react-router/types/+types/root.ts";
const archivePath = "Archive/legacy/old-module.ts";

test("symbols command envelope validates for an exported symbol", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
  });

  assertValidCommandEnvelope(envelope, {
    name: "symbols",
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.data.requestedName, "Layout");
  assert.equal(envelope.data.summary.exactNameMatch, true);
  assert.equal(envelope.data.symbols.length, 3);
  assert.equal(
    envelope.data.definingFiles.every((file) => file.inclusionStatus === "included"),
    true,
  );
  assert.equal(envelope.data.summary.matchedSymbols, envelope.data.symbols.length);
  assert.equal(envelope.data.summary.definingFiles, envelope.data.definingFiles.length);
});

test("CLI returns valid JSON for agent-os context symbols --json", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "symbols",
    "--name=Layout",
    "--json",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "symbols",
    adapterId: "field-platform",
  });
  assert.equal(parsed.data.requestedName, "Layout");
  assert.equal(parsed.data.summary.exactNameMatch, true);
  assert.equal(parsed.data.symbols.length > 0, true);
});

test("symbols lookup uses exact name matching and does not return partial matches", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
  });
  const names = new Set(envelope.data.symbols.map((symbol) => symbol.name));

  assert.equal(names.has("Layout"), true);
  assert.equal(names.has("LayoutVariant"), false);
  assert.equal(
    envelope.data.chunks.some((chunk) => chunk.name === "LayoutVariant"),
    false,
  );
});

test("symbols --path scopes results to one file", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    path: rootPath,
  });

  assert.equal(envelope.status, "ok");
  assert.deepEqual(envelope.data.appliedFilters, {
    path: rootPath,
    kind: null,
    visibility: null,
  });
  assert.equal(envelope.data.symbols.length, 1);
  assert.equal(envelope.data.symbols[0].definingLocation.path, rootPath);
  assert.deepEqual(
    envelope.data.definingFiles.map((file) => file.path),
    [rootPath],
  );
  assert.equal(
    envelope.data.chunks.every((chunk) => chunk.filePath === rootPath),
    true,
  );
});

test("symbols --kind and --visibility filters work", () => {
  const componentEnvelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    kind: "component",
  });
  const functionEnvelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    kind: "function",
  });
  const exportedEnvelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    visibility: "exported",
  });
  const localEnvelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    visibility: "local",
  });

  assert.equal(
    componentEnvelope.data.symbols.every((symbol) => symbol.kind === "component"),
    true,
  );
  assert.deepEqual(
    functionEnvelope.data.symbols.map((symbol) => symbol.definingLocation.path),
    [depPath],
  );
  assert.equal(
    exportedEnvelope.data.symbols.every((symbol) => symbol.visibility === "exported"),
    true,
  );
  assert.deepEqual(
    localEnvelope.data.symbols.map((symbol) => symbol.definingLocation.path),
    [localPath],
  );
});

test("symbols --with-freshness includes freshness evidence for defining files only", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "Layout",
    withFreshness: true,
  });
  const definingPaths = new Set(envelope.data.definingFiles.map((file) => file.path));

  assert.equal(envelope.status, "ok");
  assert.equal(envelope.data.freshnessEvidence.length, envelope.data.definingFiles.length);
  assert.equal(
    envelope.data.freshnessEvidence.every((entry) => definingPaths.has(entry.path)),
    true,
  );
  assert.equal(
    envelope.data.freshnessEvidence.some((entry) => entry.path === generatedPath),
    false,
  );
  assert.equal(
    envelope.data.definingFiles.every((file) => file.freshnessEvidence),
    true,
  );
  assert.equal(envelope.data.summary.freshnessEvidence, envelope.data.definingFiles.length);
});

test("symbols no-match case returns a clear warning envelope", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "MissingSymbol",
  });

  assertValidCommandEnvelope(envelope, {
    name: "symbols",
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.equal(envelope.data.symbols.length, 0);
  assert.equal(envelope.data.summary.matchedSymbols, 0);
  assert.equal(
    envelope.warnings.some((warning) => warning.includes("No symbols matched")),
    true,
  );
});

test("symbols requires --name", () => {
  let stdout = "";
  let stderr = "";
  const status = runContextCli(["symbols", "--json"], {
    stdout: { write: (value) => (stdout += value) },
    stderr: { write: (value) => (stderr += value) },
    now: () => new Date(fixedGeneratedAt),
  });

  assert.equal(status, 1, stderr || stdout);

  const parsed = JSON.parse(stdout);
  assertValidCommandEnvelope(parsed, {
    name: "symbols",
    adapterId: "field-platform",
  });
  assert.equal(parsed.status, "error");
  assert.equal(
    parsed.warnings.some((warning) => warning.includes("Missing required --name")),
    true,
  );
});

test("symbols lookup keeps generated, archive, and excluded paths out of source results", () => {
  const envelope = buildSymbolsEnvelopeForFixture({
    requestedName: "GeneratedOnlyLayout",
  });

  assert.equal(envelope.status, "warning");
  assert.equal(envelope.data.symbols.length, 0);
  assert.equal(
    envelope.data.definingFiles.some(
      (file) => file.path === generatedPath || file.path === archivePath,
    ),
    false,
  );
});

test("symbols command does not create evidence, symbol, or index artifacts", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "symbols",
    "--name=Layout",
    "--json",
  ]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "symbols",
    "--name=Layout",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);

  for (const artifactPath of [
    "agent-os-context-evidence.json",
    "agent-os-context-symbols.json",
    "context-evidence.json",
    "context-index.json",
    "context-symbols.json",
    "evidence-snapshot.json",
    "symbol-evidence.json",
    "symbol-index.json",
    "symbols-result.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "tools/agent-tools/context-symbols.json",
    "Agent OS/tool-maintained-files/context-evidence.json",
    "Agent OS/tool-maintained-files/context-index.json",
    "Agent OS/tool-maintained-files/context-symbols.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function buildSymbolsEnvelopeForFixture(options) {
  const repoRoot = createSymbolsTempRepo();
  const envelope = buildSymbolsEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot,
    dependencyEvidence: buildEmptyDependencyEvidence(),
    ...options,
  });

  rmSync(repoRoot, { recursive: true, force: true });

  return envelope;
}

function createSymbolsTempRepo() {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-symbols-"));
  writeFixtureFile(
    repoRoot,
    rootPath,
    [
      'import { depValue } from "./dep";',
      "",
      "export const rootValue = depValue;",
      "",
      "export function Layout() {",
      "  return <main>{rootValue}</main>;",
      "}",
      "",
      "export function LayoutVariant() {",
      "  return <section>{rootValue}</section>;",
      "}",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    depPath,
    [
      'export const depValue = "dep";',
      "",
      "export function Layout() {",
      "  return depValue;",
      "}",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    localPath,
    [
      "function Layout() {",
      "  return <aside>Local</aside>;",
      "}",
      "",
      "export const localLayoutName = Layout.name;",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    generatedPath,
    "export function GeneratedOnlyLayout() { return null; }\n",
  );
  writeFixtureFile(
    repoRoot,
    archivePath,
    "export function GeneratedOnlyLayout() { return null; }\n",
  );
  return repoRoot;
}

function writeFixtureFile(repoRoot, repoPath, content) {
  const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content, "utf8");
}

function buildEmptyDependencyEvidence() {
  return {
    sourceTool: "dependency-cruiser",
    configPath: "dependency-cruiser.config.cjs",
    cruisePaths: [],
    summary: {
      moduleCount: 0,
      violationCount: 0,
    },
    dependencyCruiser: {
      command: [],
      exitCode: 0,
      stderr: "",
      configPath: "dependency-cruiser.config.cjs",
      roots: [],
      moduleCount: 0,
      violationCount: 0,
    },
    edges: [],
    skippedEdges: [],
  };
}
