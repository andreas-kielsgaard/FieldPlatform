import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runContextCli } from "../../src/context/cli/context-cli.mjs";
import { buildSearchEnvelope } from "../../src/context/cli/search-command.mjs";
import {
  assertValidCommandEnvelope,
  assertValidSearchResult,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const fixedGeneratedAt = "2026-06-29T00:00:00.000Z";
const routePath = "apps/web/app/routes/search-demo.tsx";
const policyPath = "apps/web/src/shared/policy/visibility.ts";
const testPath = "apps/web/src/shared/policy/visibility.test.ts";
const generatedPath = "apps/web/.react-router/types/+types/visibility.ts";
const archivePath = "Archive/legacy/visibility.ts";

test("search command envelope validates for a known literal query", () => {
  const envelope = buildSearchEnvelopeForFixture({
    query: "visibility",
  });

  assertValidCommandEnvelope(envelope, {
    name: "search",
    adapterId: "field-platform",
  });
  assertValidSearchResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.data.query, "visibility");
  assert.equal(envelope.data.summary.literal, true);
  assert.equal(envelope.data.matches.length > 0, true);
  assert.equal(
    envelope.data.matchingFiles.every((file) => file.inclusionStatus === "included"),
    true,
  );
});

test("CLI returns valid JSON for agent-os context search --json", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "search",
    "--query=visibility",
    "--json",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "search",
    adapterId: "field-platform",
  });
  assertValidSearchResult(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(parsed.data.query, "visibility");
  assert.equal(parsed.data.summary.literal, true);
  assert.equal(parsed.data.summary.returnedMatches > 0, true);
});

test("search requires a non-empty --query", () => {
  for (const argv of [
    ["search", "--json"],
    ["search", "--query=", "--json"],
  ]) {
    let stdout = "";
    let stderr = "";
    const status = runContextCli(argv, {
      stdout: { write: (value) => (stdout += value) },
      stderr: { write: (value) => (stderr += value) },
      now: () => new Date(fixedGeneratedAt),
    });

    assert.equal(status, 1, stderr || stdout);

    const parsed = JSON.parse(stdout);
    assertValidCommandEnvelope(parsed, {
      name: "search",
      adapterId: "field-platform",
    });
    assertValidSearchResult(parsed.data, {
      adapterId: "field-platform",
    });
    assert.equal(parsed.status, "error");
    assert.equal(
      parsed.warnings.some((warning) => warning.includes("Missing required --query")),
      true,
    );
  }
});

test("search uses exact literal matching and does not behave like fuzzy search", () => {
  const envelope = buildSearchEnvelopeForFixture({
    query: "visiblity",
  });

  assertValidSearchResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.equal(envelope.data.matches.length, 0);
  assert.equal(envelope.data.summary.totalMatches, 0);
});

test("search default excludes generated, archive, excluded, and test files", () => {
  const generatedEnvelope = buildSearchEnvelopeForFixture({
    query: "generated-only-visibility",
  });
  const testEnvelope = buildSearchEnvelopeForFixture({
    query: "test-only-visibility",
  });

  for (const envelope of [generatedEnvelope, testEnvelope]) {
    assertValidSearchResult(envelope.data, {
      adapterId: "field-platform",
    });
    assert.equal(envelope.status, "warning");
    assert.equal(envelope.data.matches.length, 0);
    assert.equal(
      envelope.data.matchingFiles.some(
        (file) =>
          file.path === generatedPath || file.path === archivePath || file.path === testPath,
      ),
      false,
    );
  }
});

test("search path, language, and include-tests filters work", () => {
  const pathEnvelope = buildSearchEnvelopeForFixture({
    query: "visibility",
    path: policyPath,
  });
  const languageEnvelope = buildSearchEnvelopeForFixture({
    query: "visibility",
    language: "tsx",
  });
  const includeTestsEnvelope = buildSearchEnvelopeForFixture({
    query: "test-only-visibility",
    includeTests: true,
  });

  assertValidSearchResult(pathEnvelope.data, {
    adapterId: "field-platform",
  });
  assert.deepEqual(pathEnvelope.data.appliedFilters, {
    path: policyPath,
    language: null,
    caseSensitive: false,
    includeTests: false,
    limit: 100,
  });
  assert.equal(
    pathEnvelope.data.matches.every((match) => match.path === policyPath),
    true,
  );

  assertValidSearchResult(languageEnvelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(
    languageEnvelope.data.matches.every((match) => match.language === "tsx"),
    true,
  );
  assert.equal(
    languageEnvelope.data.matchingFiles.every((file) => file.language === "tsx"),
    true,
  );

  assertValidSearchResult(includeTestsEnvelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(includeTestsEnvelope.status, "ok");
  assert.equal(
    includeTestsEnvelope.data.matches.every((match) => match.path === testPath),
    true,
  );
});

test("search case-sensitive behavior is deterministic", () => {
  const defaultEnvelope = buildSearchEnvelopeForFixture({
    query: "Visibility",
  });
  const caseSensitiveEnvelope = buildSearchEnvelopeForFixture({
    query: "Visibility",
    caseSensitive: true,
  });

  assertValidSearchResult(defaultEnvelope.data, {
    adapterId: "field-platform",
  });
  assertValidSearchResult(caseSensitiveEnvelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(defaultEnvelope.data.summary.caseSensitive, false);
  assert.equal(caseSensitiveEnvelope.data.summary.caseSensitive, true);
  assert.equal(
    defaultEnvelope.data.summary.totalMatches > caseSensitiveEnvelope.data.summary.totalMatches,
    true,
  );
  assert.equal(
    caseSensitiveEnvelope.data.matches.every((match) => match.snippet.includes("Visibility")),
    true,
  );
});

test("search result limiting is deterministic by path and position", () => {
  const envelope = buildSearchEnvelopeForFixture({
    query: "visibility",
    limit: 2,
  });

  assertValidSearchResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.matches.length, 2);
  assert.equal(envelope.data.summary.limit, 2);
  assert.equal(envelope.data.summary.truncated, true);
  assert.deepEqual(
    envelope.data.matches.map((match) => [
      match.path,
      match.range.start.line,
      match.range.start.character,
    ]),
    [
      [routePath, 0, 13],
      [routePath, 2, 13],
    ],
  );
});

test("search --with-freshness includes freshness evidence for matching files only", () => {
  const envelope = buildSearchEnvelopeForFixture({
    query: "visibility",
    withFreshness: true,
  });
  const matchingPaths = new Set(envelope.data.matchingFiles.map((file) => file.path));

  assert.equal(envelope.status, "ok");
  assertValidSearchResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.freshnessEvidence.length, envelope.data.matchingFiles.length);
  assert.equal(
    envelope.data.freshnessEvidence.every((entry) => matchingPaths.has(entry.path)),
    true,
  );
  assert.equal(
    envelope.data.freshnessEvidence.some(
      (entry) =>
        entry.path === generatedPath || entry.path === archivePath || entry.path === testPath,
    ),
    false,
  );
  assert.equal(
    envelope.data.matchingFiles.every((file) => file.freshnessEvidence),
    true,
  );
});

test("search no-match case returns a clear warning envelope", () => {
  const envelope = buildSearchEnvelopeForFixture({
    query: "not-present-in-fixture",
  });

  assertValidCommandEnvelope(envelope, {
    name: "search",
    adapterId: "field-platform",
  });
  assertValidSearchResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.equal(envelope.data.matches.length, 0);
  assert.equal(envelope.data.summary.totalMatches, 0);
  assert.equal(
    envelope.warnings.some((warning) => warning.includes("No manifest-included files matched")),
    true,
  );
});

test("search command does not create evidence, search, or index artifacts", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "search",
    "--query=visibility",
    "--json",
  ]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "search",
    "--query=visibility",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);

  for (const artifactPath of [
    "agent-os-context-evidence.json",
    "agent-os-context-search.json",
    "context-evidence.json",
    "context-index.json",
    "context-search.json",
    "evidence-snapshot.json",
    "search-evidence.json",
    "search-result.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "tools/agent-tools/context-search.json",
    ".agent-os/adapter/tool-maintained-files/context-evidence.json",
    ".agent-os/adapter/tool-maintained-files/context-index.json",
    ".agent-os/adapter/tool-maintained-files/context-search.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function buildSearchEnvelopeForFixture(options) {
  const repoRoot = createSearchTempRepo();
  const envelope = buildSearchEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot,
    ...options,
  });

  rmSync(repoRoot, { recursive: true, force: true });

  return envelope;
}

function createSearchTempRepo() {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-search-"));
  writeFixtureFile(
    repoRoot,
    routePath,
    ["export const visibilityRoute = true;", "", "const view = visibilityRoute;", ""].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    policyPath,
    [
      'export const visibility = "public";',
      'export const visibilityMode = "team";',
      'export const label = "Visibility";',
      "export const visible = true;",
      "",
    ].join("\n"),
  );
  writeFixtureFile(repoRoot, testPath, 'export const marker = "test-only-visibility";\n');
  writeFixtureFile(
    repoRoot,
    generatedPath,
    'export const generated = "generated-only-visibility";\n',
  );
  writeFixtureFile(repoRoot, archivePath, 'export const archived = "generated-only-visibility";\n');
  return repoRoot;
}

function writeFixtureFile(repoRoot, repoPath, content) {
  const absolutePath = path.join(repoRoot, ...repoPath.split("/"));
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content, "utf8");
}
