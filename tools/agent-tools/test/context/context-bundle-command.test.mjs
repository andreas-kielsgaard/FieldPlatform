import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { buildBundleEnvelope } from "../../src/context/cli/bundle-command.mjs";
import { runContextCli } from "../../src/context/cli/context-cli.mjs";
import { mapDependencyCruiserJsonToDependencyEdgeEvidence } from "../../src/context/evidence-producers/dependency-cruiser/dependency-edge-evidence.mjs";
import {
  assertValidBundleResult,
  assertValidCommandEnvelope,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const fixedGeneratedAt = "2026-06-29T00:00:00.000Z";
const rootPath = "apps/web/app/root.tsx";
const depPath = "apps/web/app/dep.ts";
const consumerPath = "apps/web/src/feature/consumer.ts";
const policyPath = "apps/web/src/shared/policy/visibility.ts";
const testPath = "apps/web/src/shared/policy/visibility.test.ts";
const generatedPath = "apps/web/.react-router/types/+types/root.ts";
const archivePath = "Archive/legacy/visibility.ts";

test("bundle command envelope validates for a path selector", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: rootPath,
  });

  assertValidCommandEnvelope(envelope, {
    name: "bundle",
    adapterId: "field-platform",
  });
  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.deepEqual(envelope.data.requestedSelectors.paths, [rootPath]);
});

test("CLI returns valid JSON for agent-os context bundle --path --json", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "bundle",
    "--path=apps/web/app/root.tsx",
    "--json",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "bundle",
    adapterId: "field-platform",
  });
  assertValidBundleResult(parsed.data, {
    adapterId: "field-platform",
  });
  assert.deepEqual(parsed.data.requestedSelectors.paths, ["apps/web/app/root.tsx"]);
});

test("path selector includes manifest entry, file symbols and chunks, and direct dependency edges", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: rootPath,
  });
  const paths = new Set(envelope.data.files.map((file) => file.path));
  const rootSymbols = envelope.data.symbols.filter(
    (symbol) => symbol.definingLocation.path === rootPath,
  );

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(paths.has(rootPath), true);
  assert.equal(
    rootSymbols.some((symbol) => symbol.name === "Layout"),
    true,
  );
  assert.equal(
    envelope.data.chunks.some((chunk) => chunk.filePath === rootPath),
    true,
  );
  assert.equal(envelope.data.dependencyEdges.length, 2);
  assert.equal(
    envelope.data.dependencyEdges.some(
      (edge) => edge.source.path === rootPath && edge.target.path === depPath,
    ),
    true,
  );
  assert.equal(
    envelope.data.dependencyEdges.some(
      (edge) => edge.source.path === consumerPath && edge.target.path === rootPath,
    ),
    true,
  );
});

test("symbol selector includes exact symbol evidence and related file and chunk evidence", () => {
  const envelope = buildBundleEnvelopeForFixture({
    symbols: "Layout",
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.equal(
    envelope.data.symbols.every((symbol) => symbol.name === "Layout"),
    true,
  );
  assert.equal(
    envelope.data.files.some((file) => file.path === rootPath),
    true,
  );
  assert.equal(
    envelope.data.chunks.some((chunk) => chunk.name === "Layout"),
    true,
  );
  assert.equal(
    envelope.data.symbols.some((symbol) => symbol.name === "LayoutVariant"),
    false,
  );
});

test("query selector includes literal search matches and matching files", () => {
  const envelope = buildBundleEnvelopeForFixture({
    queries: "visibility",
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.data.searchMatches.length > 0, true);
  assert.equal(
    envelope.data.searchMatches.every((match) =>
      match.snippet.toLowerCase().includes("visibility"),
    ),
    true,
  );
  assert.equal(
    envelope.data.files.some((file) => file.path === policyPath),
    true,
  );
  assert.equal(
    envelope.data.files.some(
      (file) => file.path === testPath || file.path === generatedPath || file.path === archivePath,
    ),
    false,
  );
});

test("combined selectors deduplicate files, chunks, symbols, dependency edges, and search matches", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: [rootPath, rootPath],
    symbols: ["Layout", "Layout"],
    queries: ["visibility", "visibility"],
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assertUnique(envelope.data.files.map((file) => file.path));
  assertUnique(envelope.data.symbols.map(symbolIdentity));
  assertUnique(envelope.data.chunks.map((chunk) => chunk.chunkId));
  assertUnique(envelope.data.dependencyEdges.map(edgeIdentity));
  assertUnique(envelope.data.searchMatches.map(searchMatchIdentity));
  assert.deepEqual(envelope.data.requestedSelectors.paths, [rootPath]);
  assert.deepEqual(envelope.data.requestedSelectors.symbols, ["Layout"]);
  assert.deepEqual(envelope.data.requestedSelectors.queries, ["visibility"]);
});

test("missing selectors return an error envelope", () => {
  let stdout = "";
  let stderr = "";
  const status = runContextCli(["bundle", "--json"], {
    stdout: { write: (value) => (stdout += value) },
    stderr: { write: (value) => (stderr += value) },
    now: () => new Date(fixedGeneratedAt),
  });

  assert.equal(status, 1, stderr || stdout);

  const parsed = JSON.parse(stdout);
  assertValidCommandEnvelope(parsed, {
    name: "bundle",
    adapterId: "field-platform",
  });
  assertValidBundleResult(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(parsed.status, "error");
  assert.equal(
    parsed.warnings.some((warning) => warning.includes("Missing selector")),
    true,
  );
});

test("no-match selectors warn without failing the bundle when another selector matches", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: rootPath,
    symbols: "MissingSymbol",
    queries: "not-present-in-fixture",
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.equal(
    envelope.data.files.some((file) => file.path === rootPath),
    true,
  );
  assert.equal(
    envelope.warnings.some((warning) => warning.includes("MissingSymbol")),
    true,
  );
  assert.equal(
    envelope.warnings.some((warning) => warning.includes("not-present-in-fixture")),
    true,
  );
});

test("generated, archive, and excluded boundaries are preserved", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: [generatedPath, archivePath],
    queries: "generated-only-visibility",
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.deepEqual(
    envelope.data.files.map((file) => [file.path, file.inclusionStatus, file.documentKind]),
    [
      [generatedPath, "excluded", "generated"],
      [archivePath, "excluded", "archive"],
    ].sort(([left], [right]) => left.localeCompare(right)),
  );
  assert.equal(envelope.data.symbols.length, 0);
  assert.equal(envelope.data.chunks.length, 0);
  assert.equal(envelope.data.dependencyEdges.length, 0);
  assert.equal(envelope.data.searchMatches.length, 0);
});

test("result limits and truncation are deterministic", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: [rootPath, depPath, consumerPath, policyPath],
    queries: "visibility",
    limits: {
      files: 2,
      symbols: 1,
      chunks: 2,
      dependencyEdges: 1,
      searchMatches: 2,
    },
  });

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "warning");
  assert.deepEqual(
    envelope.data.files.map((file) => file.path),
    [depPath, rootPath],
  );
  assert.equal(envelope.data.symbols.length, 1);
  assert.equal(envelope.data.chunks.length, 2);
  assert.equal(envelope.data.dependencyEdges.length, 1);
  assert.equal(envelope.data.searchMatches.length, 2);
  assert.equal(envelope.data.summary.truncated.any, true);
  assert.equal(envelope.data.summary.truncated.files, true);
  assert.equal(envelope.data.summary.truncated.searchMatches, true);
});

test("--with-freshness includes freshness evidence only for selected files", () => {
  const envelope = buildBundleEnvelopeForFixture({
    paths: rootPath,
    queries: "visibility",
    withFreshness: true,
  });
  const filePaths = new Set(envelope.data.files.map((file) => file.path));

  assertValidBundleResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.freshnessEvidence.length, envelope.data.files.length);
  assert.equal(
    envelope.data.freshnessEvidence.every((entry) => filePaths.has(entry.path)),
    true,
  );
  assert.equal(
    envelope.data.files.every((file) => file.freshnessEvidence),
    true,
  );
  assert.equal(envelope.data.summary.freshnessEvidence, envelope.data.files.length);
});

test("bundle command does not create bundle, evidence, or index artifacts", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "bundle",
    "--path=apps/web/app/root.tsx",
    "--json",
  ]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "bundle",
    "--symbol=Layout",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);

  for (const artifactPath of [
    "agent-os-context-bundle.json",
    "agent-os-context-evidence.json",
    "context-bundle.json",
    "context-evidence.json",
    "context-index.json",
    "evidence-bundle.json",
    "bundle-result.json",
    "tools/agent-tools/context-bundle.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    ".agent-os/adapter/tool-maintained-files/context-bundle.json",
    ".agent-os/adapter/tool-maintained-files/context-evidence.json",
    ".agent-os/adapter/tool-maintained-files/context-index.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function buildBundleEnvelopeForFixture(options) {
  const repoRoot = createBundleTempRepo();
  const envelope = buildBundleEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot,
    dependencyEvidence: buildFixtureDependencyEvidence(repoRoot),
    ...options,
  });

  rmSync(repoRoot, { recursive: true, force: true });

  return envelope;
}

function createBundleTempRepo() {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-bundle-"));
  writeFixtureFile(
    repoRoot,
    rootPath,
    [
      'import { depValue } from "./dep";',
      "",
      "export const rootValue = depValue;",
      'export const visibilityRoot = "root visibility";',
      "",
      "export function Layout() {",
      "  return <main>{visibilityRoot}</main>;",
      "}",
      "",
      "export default function App() {",
      "  return <Layout />;",
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
      "export function DepThing() {",
      "  return depValue;",
      "}",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    consumerPath,
    [
      'import { rootValue } from "../../app/root";',
      "",
      "export const consumerValue = rootValue;",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    repoRoot,
    policyPath,
    [
      'export const visibility = "public";',
      'export const visibilityMode = "team";',
      'export const label = "Visibility";',
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

function buildFixtureDependencyEvidence(repoRoot) {
  const evidence = mapDependencyCruiserJsonToDependencyEdgeEvidence(
    {
      modules: [
        {
          source: rootPath,
          dependencies: [
            {
              dynamic: false,
              module: "./dep",
              moduleSystem: "es6",
              dependencyTypes: ["local", "import"],
              resolved: depPath,
              coreModule: false,
              couldNotResolve: false,
              valid: true,
            },
            {
              dynamic: false,
              module: "react",
              moduleSystem: "es6",
              dependencyTypes: ["npm", "import"],
              resolved: "node_modules/.pnpm/react@19.2.7/node_modules/react/index.js",
              coreModule: false,
              couldNotResolve: false,
              valid: true,
            },
          ],
          orphan: false,
          valid: true,
        },
        {
          source: consumerPath,
          dependencies: [
            {
              dynamic: false,
              module: "../../app/root",
              moduleSystem: "es6",
              dependencyTypes: ["local", "import"],
              resolved: rootPath,
              coreModule: false,
              couldNotResolve: false,
              valid: true,
            },
          ],
          orphan: false,
          valid: true,
        },
        {
          source: generatedPath,
          dependencies: [
            {
              dynamic: false,
              module: "../../../app/root",
              moduleSystem: "es6",
              dependencyTypes: ["local", "import"],
              resolved: rootPath,
              coreModule: false,
              couldNotResolve: false,
              valid: true,
            },
          ],
          orphan: false,
          valid: true,
        },
        {
          source: archivePath,
          dependencies: [
            {
              dynamic: false,
              module: "../../apps/web/app/root",
              moduleSystem: "es6",
              dependencyTypes: ["local", "import"],
              resolved: rootPath,
              coreModule: false,
              couldNotResolve: false,
              valid: true,
            },
          ],
          orphan: false,
          valid: true,
        },
      ],
      summary: {
        violations: [],
      },
    },
    {
      repoRoot,
      configPath: "dependency-cruiser.config.cjs",
      cruisePaths: ["apps/web/app", "apps/web/src", "tools/agent-tools/src"],
      observedAt: fixedGeneratedAt,
    },
  );

  return {
    ...evidence,
    dependencyCruiser: {
      command: [],
      exitCode: 0,
      stderr: "",
      configPath: "dependency-cruiser.config.cjs",
      roots: ["apps/web/app", "apps/web/src", "tools/agent-tools/src"],
      moduleCount: 4,
      violationCount: 0,
    },
  };
}

function assertUnique(values) {
  assert.equal(new Set(values).size, values.length);
}

function symbolIdentity(symbol) {
  return [
    symbol.definingLocation.path,
    symbol.definingLocation.range.start.line,
    symbol.definingLocation.range.start.character,
    symbol.name,
    symbol.kind,
  ].join(":");
}

function edgeIdentity(edge) {
  return [edge.source.path, edge.target.path, edge.edgeType, edge.provenance.importSpecifier].join(
    ":",
  );
}

function searchMatchIdentity(match) {
  return [
    match.path,
    match.range.start.line,
    match.range.start.character,
    match.range.end.line,
    match.range.end.character,
  ].join(":");
}
