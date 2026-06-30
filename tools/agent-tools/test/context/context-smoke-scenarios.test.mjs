import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { validateFileManifest } from "../../src/context/core/contract-validation.mjs";
import {
  assertValidBundleResult,
  assertValidCommandEnvelope,
  assertValidInspectResult,
  assertValidSearchResult,
  assertValidSymbolsResult,
  runWorkspaceCommand,
  workspaceRoot,
} from "./context-test-helpers.mjs";

const rootPath = "apps/web/app/root.tsx";
const layoutSymbol = "Layout";
const visibilityQuery = "visibility";

test("context command smoke workflow links manifest, inspect, symbols, search, and bundles", () => {
  const manifest = runContextJson(["manifest", "--json"]);
  assertValidCommandEnvelope(manifest, {
    name: "manifest",
    adapterId: "field-platform",
  });
  assertValidFileManifest(manifest.data);

  const manifestRootFile = findFile(manifest.data.files, rootPath);
  assert.equal(manifestRootFile.inclusionStatus, "included");
  assert.equal(manifestRootFile.documentKind, "source");
  assert.equal(manifestRootFile.flags.generated, false);
  assert.equal(manifestRootFile.flags.archive, false);
  assert.equal("freshnessEvidence" in manifestRootFile, false);

  const inspect = runContextJson(["inspect", `--path=${rootPath}`, "--json"]);
  assertValidCommandEnvelope(inspect, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(inspect.data, {
    adapterId: "field-platform",
  });
  assert.equal(inspect.data.manifestFile.path, manifestRootFile.path);
  assert.equal(inspect.data.summary.manifestKnown, true);
  assert.equal(inspect.data.summary.includedSource, true);
  assert.equal(inspect.data.symbols.length > 0, true);
  assert.equal(inspect.data.chunks.length > 0, true);
  assert.equal(
    inspect.data.symbols.some((symbol) => symbol.name === layoutSymbol),
    true,
  );
  assert.equal(
    inspect.data.symbols.every((symbol) => symbol.definingLocation.path === rootPath),
    true,
  );
  assert.equal(
    inspect.data.chunks.every((chunk) => chunk.filePath === rootPath),
    true,
  );
  assert.equal(inspect.data.freshnessEvidence, null);
  assert.equal("freshnessEvidence" in inspect.data.manifestFile, false);

  const symbols = runContextJson(["symbols", `--name=${layoutSymbol}`, "--json"]);
  assertValidCommandEnvelope(symbols, {
    name: "symbols",
    adapterId: "field-platform",
  });
  assertValidSymbolsResult(symbols.data, {
    adapterId: "field-platform",
  });
  assert.equal(symbols.data.summary.exactNameMatch, true);
  assert.equal(symbols.data.symbols.length > 0, true);
  assert.equal(symbols.data.definingFiles.length > 0, true);
  assert.equal(
    symbols.data.definingFiles.some((file) => file.path === rootPath),
    true,
  );

  const layoutBundle = runContextJson(["bundle", `--symbol=${layoutSymbol}`, "--json"]);
  assertValidCommandEnvelope(layoutBundle, {
    name: "bundle",
    adapterId: "field-platform",
  });
  assertValidBundleResult(layoutBundle.data, {
    adapterId: "field-platform",
  });
  assert.deepEqual(layoutBundle.data.requestedSelectors.symbols, [layoutSymbol]);
  assert.equal(
    layoutBundle.data.symbols.some(
      (symbol) => symbol.name === layoutSymbol && symbol.definingLocation.path === rootPath,
    ),
    true,
  );
  assert.equal(
    layoutBundle.data.files.some((file) => file.path === rootPath),
    true,
  );
  assert.equal(
    layoutBundle.data.chunks.some(
      (chunk) => chunk.filePath === rootPath && chunk.symbols.includes(layoutSymbol),
    ),
    true,
  );

  const search = runContextJson(["search", `--query=${visibilityQuery}`, "--json", "--limit=10"]);
  assertValidCommandEnvelope(search, {
    name: "search",
    adapterId: "field-platform",
  });
  assertValidSearchResult(search.data, {
    adapterId: "field-platform",
  });
  assert.equal(search.data.summary.literal, true);
  assert.equal(search.data.summary.returnedMatches > 0, true);
  assert.equal(search.data.matches.length <= 10, true);
  assert.equal(
    search.data.matches.every((match) => match.snippet.toLowerCase().includes(visibilityQuery)),
    true,
  );

  const searchBundle = runContextJson([
    "bundle",
    `--query=${visibilityQuery}`,
    "--json",
    "--max-files=80",
    "--max-search-matches=10",
  ]);
  assertValidCommandEnvelope(searchBundle, {
    name: "bundle",
    adapterId: "field-platform",
  });
  assertValidBundleResult(searchBundle.data, {
    adapterId: "field-platform",
  });
  assert.deepEqual(searchBundle.data.requestedSelectors.queries, [visibilityQuery]);
  assert.equal(searchBundle.data.searchMatches.length > 0, true);
  assert.equal(searchBundle.data.searchMatches.length <= 10, true);
  assert.equal(
    searchBundle.data.searchMatches.every((match) =>
      match.snippet.toLowerCase().includes(visibilityQuery),
    ),
    true,
  );
  const bundledFilePaths = new Set(searchBundle.data.files.map((file) => file.path));
  assert.equal(
    searchBundle.data.searchMatches.every((match) => bundledFilePaths.has(match.path)),
    true,
  );

  const inspectWithFreshness = runContextJson([
    "inspect",
    `--path=${rootPath}`,
    "--json",
    "--with-freshness",
  ]);
  assertValidCommandEnvelope(inspectWithFreshness, {
    name: "inspect",
    adapterId: "field-platform",
  });
  assertValidInspectResult(inspectWithFreshness.data, {
    adapterId: "field-platform",
  });
  assert.equal(inspectWithFreshness.data.requestedPath, rootPath);
  assert.equal(inspectWithFreshness.data.manifestFile.path, rootPath);
  assert.equal(typeof inspectWithFreshness.data.freshnessEvidence.state, "string");
  assert.equal(
    inspectWithFreshness.data.freshnessEvidence.provenance.sourceTool,
    "agent-os.context.local-file-freshness",
  );
  assert.deepEqual(
    inspectWithFreshness.data.manifestFile.freshnessEvidence,
    inspectWithFreshness.data.freshnessEvidence,
  );
  assert.equal(inspectWithFreshness.data.summary.freshnessEvidence, 1);
  assert.equal(
    inspectWithFreshness.data.symbols.some((symbol) => "freshnessEvidence" in symbol),
    false,
  );
  assert.equal(
    inspectWithFreshness.data.chunks.some((chunk) => "freshnessEvidence" in chunk),
    false,
  );

  assertNoContextArtifacts();
});

function runContextJson(contextArgs) {
  const run = runWorkspaceCommand(["pnpm", "agent-os", "context", ...contextArgs]);

  assert.equal(run.status, 0, run.stderr || run.stdout);
  return JSON.parse(run.stdout);
}

function assertValidFileManifest(manifest) {
  const result = validateFileManifest(manifest, {
    adapterId: "field-platform",
  });

  assert.deepEqual(result.errors, []);
  assert.equal(result.valid, true);
}

function findFile(files, filePath) {
  const file = files.find((candidate) => candidate.path === filePath);
  assert.ok(file, `${filePath} should be present in the manifest`);
  return file;
}

function assertNoContextArtifacts() {
  for (const artifactPath of [
    "agent-os-context-bundle.json",
    "agent-os-context-evidence.json",
    "agent-os-context-inspect.json",
    "agent-os-context-manifest.json",
    "agent-os-context-search.json",
    "agent-os-context-symbols.json",
    "context-bundle.json",
    "context-evidence.json",
    "context-index.json",
    "context-inspect.json",
    "context-manifest.json",
    "context-search.json",
    "context-symbols.json",
    "evidence-bundle.json",
    "evidence-snapshot.json",
    "inspect-evidence.json",
    "inspect-result.json",
    "search-evidence.json",
    "search-result.json",
    "symbol-evidence.json",
    "symbol-index.json",
    "symbols-result.json",
    "tools/agent-tools/context-bundle.json",
    "tools/agent-tools/context-evidence.json",
    "tools/agent-tools/context-index.json",
    "tools/agent-tools/context-inspect.json",
    "tools/agent-tools/context-manifest.json",
    "tools/agent-tools/context-search.json",
    "tools/agent-tools/context-symbols.json",
    "Agent OS/tool-maintained-files/context-bundle.json",
    "Agent OS/tool-maintained-files/context-evidence.json",
    "Agent OS/tool-maintained-files/context-index.json",
    "Agent OS/tool-maintained-files/context-inspect.json",
    "Agent OS/tool-maintained-files/context-manifest.json",
    "Agent OS/tool-maintained-files/context-search.json",
    "Agent OS/tool-maintained-files/context-symbols.json",
  ]) {
    assert.equal(existsSync(path.join(workspaceRoot, artifactPath)), false, artifactPath);
  }
}
