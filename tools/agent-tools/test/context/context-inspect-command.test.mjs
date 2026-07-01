import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { runContextCli } from "../../src/context/cli/context-cli.mjs";
import { buildInspectEnvelope } from "../../src/context/cli/inspect-command.mjs";
import { mapDependencyCruiserJsonToDependencyEdgeEvidence } from "../../src/context/evidence-producers/dependency-cruiser/dependency-edge-evidence.mjs";
import {
  assertValidCommandEnvelope,
  assertValidInspectResult,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const fixedGeneratedAt = "2026-06-29T00:00:00.000Z";
const rootPath = "apps/web/app/root.tsx";
const depPath = "apps/web/app/dep.ts";
const consumerPath = "apps/web/src/feature/consumer.ts";
const generatedPath = "apps/web/.react-router/types/+types/root.ts";
const archivePath = "Archive/legacy/old-module.ts";

test("inspect command envelope validates for an included source path", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: rootPath,
  });

  assertValidCommandEnvelope(envelope, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.data.requestedPath, rootPath);
  assert.equal(envelope.data.manifestFile.path, rootPath);
  assert.equal(envelope.data.summary.manifestKnown, true);
  assert.equal(envelope.data.summary.includedSource, true);
});

test("CLI returns valid JSON for agent-os context inspect --json", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "inspect",
    "--path=apps/web/app/root.tsx",
    "--json",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);

  const parsed = JSON.parse(run.stdout);
  assertValidCommandEnvelope(parsed, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(parsed.data.requestedPath, "apps/web/app/root.tsx");
  assert.equal(parsed.data.manifestFile.path, "apps/web/app/root.tsx");
  assert.equal(parsed.data.summary.manifestKnown, true);
});

test("inspect --with-freshness includes freshness evidence for the requested file", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: rootPath,
    withFreshness: true,
  });

  assert.equal(envelope.status, "ok");
  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.freshnessEvidence.state, "unknown");
  assert.equal(envelope.data.manifestFile.freshnessEvidence.state, "unknown");
  assert.equal(envelope.data.summary.freshnessEvidence, 1);
});

test("inspect scopes symbols and chunks to the requested file", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: rootPath,
  });
  const symbolNames = new Set(envelope.data.symbols.map((symbol) => symbol.name));

  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.symbols.length > 0, true);
  assert.equal(envelope.data.chunks.length > 0, true);
  assert.equal(symbolNames.has("Layout"), true);
  assert.equal(symbolNames.has("DepThing"), false);
  assert.equal(
    envelope.data.symbols.every((symbol) => symbol.definingLocation.path === rootPath),
    true,
  );
  assert.equal(
    envelope.data.chunks.every((chunk) => chunk.filePath === rootPath),
    true,
  );
  assert.equal(envelope.data.summary.symbols, envelope.data.symbols.length);
  assert.equal(envelope.data.summary.chunks, envelope.data.chunks.length);
});

test("inspect scopes incoming and outgoing dependency edges to the requested file", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: rootPath,
  });
  const { outgoing, incoming } = envelope.data.dependencyEdges;

  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(outgoing.length, 1);
  assert.equal(outgoing[0].source.path, rootPath);
  assert.equal(outgoing[0].target.path, depPath);
  assert.equal(incoming.length, 3);
  assert.equal(
    incoming.every((edge) => edge.target.path === rootPath),
    true,
  );
  assert.equal(
    incoming.some((edge) => edge.source.path === consumerPath),
    true,
  );
  assert.equal(envelope.data.summary.outgoingDependencyEdges, outgoing.length);
  assert.equal(envelope.data.summary.incomingDependencyEdges, incoming.length);
});

test("inspect includes skipped dependency edges relevant to the requested file", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: rootPath,
  });
  const skippedReasons = new Set(envelope.data.skippedDependencyEdges.map((edge) => edge.reason));

  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.data.skippedDependencyEdges.length, 2);
  assert.equal(
    envelope.data.skippedDependencyEdges.every((edge) => edge.source === rootPath),
    true,
  );
  assert.equal(skippedReasons.has("external-dependency-target"), true);
  assert.equal(skippedReasons.has("unresolved-dependency-target"), true);
});

test("inspect returns excluded evidence for generated and archive paths", () => {
  const generatedEnvelope = buildInspectEnvelopeForFixture({
    requestedPath: generatedPath,
  });
  const archiveEnvelope = buildInspectEnvelopeForFixture({
    requestedPath: archivePath,
  });

  for (const envelope of [generatedEnvelope, archiveEnvelope]) {
    assertValidInspectResult(envelope.data, {
      adapterId: "field-platform",
    });
    assert.equal(envelope.status, "warning");
    assert.equal(envelope.data.manifestFile.inclusionStatus, "excluded");
    assert.equal(envelope.data.summary.includedSource, false);
    assert.equal(envelope.data.symbols.length, 0);
    assert.equal(envelope.data.chunks.length, 0);
  }

  assert.equal(generatedEnvelope.data.summary.generated, true);
  assert.equal(generatedEnvelope.data.summary.archive, false);
  assert.equal(archiveEnvelope.data.summary.generated, false);
  assert.equal(archiveEnvelope.data.summary.archive, true);
});

test("inspect unknown path returns a clear error envelope", () => {
  const envelope = buildInspectEnvelopeForFixture({
    requestedPath: "apps/web/app/unknown.tsx",
  });

  assertValidCommandEnvelope(envelope, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(envelope.data, {
    adapterId: "field-platform",
  });
  assert.equal(envelope.status, "error");
  assert.equal(envelope.data.manifestFile, null);
  assert.equal(envelope.data.summary.manifestKnown, false);
  assert.equal(
    envelope.warnings.some((warning) => warning.includes("No manifest entry matched")),
    true,
  );
});

test("inspect requires --path", () => {
  let stdout = "";
  let stderr = "";
  const status = runContextCli(["inspect", "--json"], {
    stdout: { write: (value) => (stdout += value) },
    stderr: { write: (value) => (stderr += value) },
    now: () => new Date(fixedGeneratedAt),
  });

  assert.equal(status, 1, stderr || stdout);

  const parsed = JSON.parse(stdout);
  assertValidCommandEnvelope(parsed, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(parsed.data, {
    adapterId: "field-platform",
  });
  assert.equal(parsed.status, "error");
  assert.equal(
    parsed.warnings.some((warning) => warning.includes("Missing required --path")),
    true,
  );
});

test("inspect command does not create evidence, inspect, or index artifacts", () => {
  const run = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "inspect",
    "--path=apps/web/app/root.tsx",
    "--json",
  ]);
  const runWithFreshness = runWorkspaceCommand([
    "pnpm",
    "agent-os",
    "context",
    "inspect",
    "--path=apps/web/app/root.tsx",
    "--json",
    "--with-freshness",
  ]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  assert.equal(runWithFreshness.status, 0, runWithFreshness.stderr || runWithFreshness.stdout);

  for (const artifactPath of [
    "agent-os-context-evidence.json",
    "agent-os-context-inspect.json",
    "context-evidence.json",
    "context-index.json",
    "context-inspect.json",
    "evidence-snapshot.json",
    "inspect-evidence.json",
    "inspect-result.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "tools/agent-tools/context-inspect.json",
    "Agent OS/tool-maintained-files/context-evidence.json",
    "Agent OS/tool-maintained-files/context-index.json",
    "Agent OS/tool-maintained-files/context-inspect.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function buildInspectEnvelopeForFixture(options) {
  const repoRoot = createInspectTempRepo();
  const envelope = buildInspectEnvelope({
    generatedAt: fixedGeneratedAt,
    repoRoot,
    dependencyEvidence: buildFixtureDependencyEvidence(repoRoot),
    ...options,
  });

  rmSync(repoRoot, { recursive: true, force: true });

  return envelope;
}

function createInspectTempRepo() {
  const repoRoot = mkdtempSync(path.join(tmpdir(), "agent-os-inspect-"));
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
  writeFixtureFile(repoRoot, generatedPath, "export type GeneratedRoute = string;\n");
  writeFixtureFile(repoRoot, archivePath, "export const archived = true;\n");
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
            {
              dynamic: false,
              module: "missing-package",
              moduleSystem: "es6",
              dependencyTypes: ["unknown", "import"],
              resolved: "missing-package",
              coreModule: false,
              couldNotResolve: true,
              valid: false,
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
