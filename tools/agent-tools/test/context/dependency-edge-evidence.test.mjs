import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { validateDependencyEdgeMetadata } from "../../src/context/core/contract-validation.mjs";
import {
  buildDependencyEdgeEvidenceFromDependencyCruiser,
  DEPENDENCY_CRUISER_SOURCE_TOOL,
  mapDependencyCruiserJsonToDependencyEdgeEvidence,
} from "../../src/context/core/dependency-edge-evidence.mjs";
import { loadJsonFixture, stableJson, workspaceRoot } from "./context-test-helpers.mjs";

const fixedObservedAt = "2026-06-29T00:00:00.000Z";
const dependencyCruiserRoots = ["apps/web/app", "apps/web/src", "tools/agent-tools/src"];

test("fixture dependency-cruiser JSON maps to deterministic edge metadata", () => {
  const result = mapFixtureDependencyCruiserJson();

  assert.equal(stableJson(result.edges), stableJson(expectedFixtureEdges()));
  assert.deepEqual(result.summary, {
    moduleCount: 3,
    dependencyCount: 8,
    edgeCount: 5,
    skippedEdgeCount: 3,
    violationCount: 0,
  });
  assertValidDependencyEdges(result.edges);
});

test("generated and archive paths remain graph evidence, not source-policy truth", () => {
  const result = mapFixtureDependencyCruiserJson();
  const generatedEdge = result.edges.find((edge) =>
    edge.source.path.startsWith("apps/web/.react-router/"),
  );
  const archiveEdge = result.edges.find((edge) => edge.source.path.startsWith("Archive/"));

  assert.ok(generatedEdge, "expected generated fixture source edge");
  assert.ok(archiveEdge, "expected archive fixture source edge");
  assert.deepEqual(Object.keys(generatedEdge.source).sort(), ["path", "pathFormat"]);
  assert.deepEqual(Object.keys(archiveEdge.source).sort(), ["path", "pathFormat"]);
  assert.equal("documentKind" in generatedEdge.source, false);
  assert.equal("sourceGroup" in generatedEdge.source, false);
  assert.equal("inclusionStatus" in archiveEdge.source, false);
  assert.equal("flags" in archiveEdge.source, false);
});

test("unresolved, core, and external dependencies are skipped with structural reasons", () => {
  const result = mapFixtureDependencyCruiserJson();
  const skippedReasonByTarget = new Map(
    result.skippedEdges.map((skippedEdge) => [skippedEdge.target, skippedEdge.reason]),
  );

  assert.deepEqual(result.skippedEdges.map((skippedEdge) => skippedEdge.reason).sort(), [
    "core-module-target",
    "external-dependency-target",
    "unresolved-dependency-target",
  ]);
  assert.equal(skippedReasonByTarget.get("fs"), "core-module-target");
  assert.equal(skippedReasonByTarget.get("missing-package"), "unresolved-dependency-target");
  assert.equal(
    skippedReasonByTarget.get("node_modules/.pnpm/react@19.2.7/node_modules/react/index.js"),
    "external-dependency-target",
  );
});

test("current repo dependency-cruiser smoke produces schema-valid edge evidence", () => {
  const result = buildDependencyEdgeEvidenceFromDependencyCruiser({
    repoRoot: workspaceRoot,
    cruisePaths: ["tools/agent-tools/src/context/core"],
    observedAt: fixedObservedAt,
  });

  assert.equal(result.dependencyCruiser.exitCode, 0, result.dependencyCruiser.stderr);
  assert.ok(result.edges.length > 0);
  assert.equal(result.summary.edgeCount, result.edges.length);
  assert.equal(result.sourceTool, DEPENDENCY_CRUISER_SOURCE_TOOL);
  assertValidDependencyEdges(result.edges);
  assert.ok(
    result.edges.some(
      (edge) =>
        edge.source.path === "tools/agent-tools/src/context/core/content-hash.mjs" &&
        edge.target.path === "tools/agent-tools/src/context/core/repo-paths.mjs",
    ),
    "expected a known context core repo-internal import edge",
  );
});

test("dependency edge evidence generation does not write generated artifacts", () => {
  buildDependencyEdgeEvidenceFromDependencyCruiser({
    repoRoot: workspaceRoot,
    cruisePaths: ["tools/agent-tools/src/context/core"],
    observedAt: fixedObservedAt,
  });

  for (const artifactPath of [
    "agent-os-dependency-edges.json",
    "dependency-edge-evidence.json",
    "dependency-cruiser.json",
    "tools/agent-tools/dependency-edge-evidence.json",
    "Agent OS/tool-maintained-files/dependency-edge-evidence.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
});

function mapFixtureDependencyCruiserJson() {
  return mapDependencyCruiserJsonToDependencyEdgeEvidence(
    loadJsonFixture("dependency-cruiser-sample.json"),
    {
      repoRoot: workspaceRoot,
      configPath: "dependency-cruiser.config.cjs",
      cruisePaths: dependencyCruiserRoots,
      observedAt: fixedObservedAt,
    },
  );
}

function assertValidDependencyEdges(edges) {
  for (const [index, edge] of edges.entries()) {
    const result = validateDependencyEdgeMetadata(edge, {
      sourceTool: DEPENDENCY_CRUISER_SOURCE_TOOL,
    });

    assert.deepEqual(result.errors, [], `edge ${index}`);
    assert.equal(result.valid, true, `edge ${index}`);
  }
}

function expectedFixtureEdges() {
  return [
    {
      source: {
        path: "apps/web/.react-router/types/+types/root.ts",
        pathFormat: "repo-relative-posix",
      },
      target: {
        path: "apps/web/app/root.tsx",
        pathFormat: "repo-relative-posix",
      },
      edgeType: "import",
      sourceTool: "dependency-cruiser",
      confidence: 1,
      provenance: {
        sourceTool: "dependency-cruiser",
        observedAt: fixedObservedAt,
        configPath: "dependency-cruiser.config.cjs",
        importSpecifier: "../../app/root",
        resolved: "apps/web/app/root.tsx",
        dependencyTypes: ["local", "import"],
        moduleSystem: "es6",
        dynamic: false,
        valid: true,
      },
    },
    {
      source: {
        path: "apps/web/src/modules/communities/index.ts",
        pathFormat: "repo-relative-posix",
      },
      target: {
        path: "apps/web/src/modules/communities/application/get-community.ts",
        pathFormat: "repo-relative-posix",
      },
      edgeType: "import",
      sourceTool: "dependency-cruiser",
      confidence: 1,
      provenance: {
        sourceTool: "dependency-cruiser",
        observedAt: fixedObservedAt,
        configPath: "dependency-cruiser.config.cjs",
        importSpecifier: "./application/get-community",
        resolved: "apps/web/src/modules/communities/application/get-community.ts",
        dependencyTypes: ["local", "import"],
        moduleSystem: "es6",
        dynamic: false,
        valid: true,
      },
    },
    {
      source: {
        path: "apps/web/src/modules/communities/index.ts",
        pathFormat: "repo-relative-posix",
      },
      target: {
        path: "apps/web/src/modules/communities/contracts/community-contract.ts",
        pathFormat: "repo-relative-posix",
      },
      edgeType: "export",
      sourceTool: "dependency-cruiser",
      confidence: 1,
      provenance: {
        sourceTool: "dependency-cruiser",
        observedAt: fixedObservedAt,
        configPath: "dependency-cruiser.config.cjs",
        importSpecifier: "./contracts/community-contract",
        resolved: "apps/web/src/modules/communities/contracts/community-contract.ts",
        dependencyTypes: ["local", "export"],
        moduleSystem: "es6",
        dynamic: false,
        valid: true,
      },
    },
    {
      source: {
        path: "apps/web/src/modules/communities/index.ts",
        pathFormat: "repo-relative-posix",
      },
      target: {
        path: "apps/web/src/modules/communities/ui/community-card.tsx",
        pathFormat: "repo-relative-posix",
      },
      edgeType: "dynamic-import",
      sourceTool: "dependency-cruiser",
      confidence: 1,
      provenance: {
        sourceTool: "dependency-cruiser",
        observedAt: fixedObservedAt,
        configPath: "dependency-cruiser.config.cjs",
        importSpecifier: "./ui/community-card",
        resolved: "apps/web/src/modules/communities/ui/community-card.tsx",
        dependencyTypes: ["local", "dynamic-import"],
        moduleSystem: "es6",
        dynamic: true,
        valid: true,
      },
    },
    {
      source: {
        path: "Archive/legacy/old-module.ts",
        pathFormat: "repo-relative-posix",
      },
      target: {
        path: "apps/web/src/modules/communities/index.ts",
        pathFormat: "repo-relative-posix",
      },
      edgeType: "import",
      sourceTool: "dependency-cruiser",
      confidence: 1,
      provenance: {
        sourceTool: "dependency-cruiser",
        observedAt: fixedObservedAt,
        configPath: "dependency-cruiser.config.cjs",
        importSpecifier: "../../apps/web/src/modules/communities/index",
        resolved: "apps/web/src/modules/communities/index.ts",
        dependencyTypes: ["local", "import"],
        moduleSystem: "es6",
        dynamic: false,
        valid: true,
      },
    },
  ];
}
