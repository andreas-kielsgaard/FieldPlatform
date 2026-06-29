import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { hashFileContentSha256 } from "../../src/context/core/content-hash.mjs";
import {
  classifyFileFreshness,
  isContextFreshnessState,
} from "../../src/context/core/freshness.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const fixedObservedAt = "2026-06-29T00:00:00.000Z";

test("hashFileContentSha256 returns deterministic SHA-256 for fixture content", () => {
  const result = hashFileContentSha256({
    repoRoot: testDirectory,
    path: "fixtures/hash-fixture.txt",
  });

  assert.deepEqual(result, {
    path: "fixtures/hash-fixture.txt",
    pathFormat: "repo-relative-posix",
    contentHash: {
      algorithm: "sha256",
      digest: "60f53553fec8cee9cb54b7f5ac5792d97fe80baf2c5f735153e08aa88acb8c3e",
    },
  });
});

test("tracked clean files use Git blob identity", (t) => {
  const repoRoot = createFixtureRepo(t);
  const result = classifyFileFreshness({
    repoRoot,
    path: "fixture.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(result.path, "fixture.txt");
  assert.equal(result.pathFormat, "repo-relative-posix");
  assert.equal(result.freshness.state, "current-clean");
  assert.equal(result.git.tracked, true);
  assert.equal(result.git.status, "clean");
  assert.equal(result.identity.kind, "git-blob");
  assert.match(result.identity.algorithm, /^git-(sha1|sha256)$/);
  assert.equal(result.contentHash, null);
  assert.deepEqual(result.trackedIdentity, result.identity);
});

test("tracked dirty files use working-tree SHA-256 identity", (t) => {
  const repoRoot = createFixtureRepo(t);
  const clean = classifyFileFreshness({
    repoRoot,
    path: "fixture.txt",
    observedAt: fixedObservedAt,
  });

  writeFileSync(path.join(repoRoot, "fixture.txt"), "field-platform-context changed\n");

  const dirty = classifyFileFreshness({
    repoRoot,
    path: "fixture.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(dirty.freshness.state, "current-dirty");
  assert.equal(dirty.git.tracked, true);
  assert.equal(dirty.git.status, "dirty");
  assert.equal(dirty.identity.kind, "filesystem-content");
  assert.equal(dirty.identity.algorithm, "sha256");
  assert.notDeepEqual(dirty.identity, clean.identity);
  assert.deepEqual(dirty.trackedIdentity, clean.identity);
});

test("untracked files classify as untracked with filesystem identity", (t) => {
  const repoRoot = createFixtureRepo(t);
  writeFileSync(path.join(repoRoot, "scratch.txt"), "untracked context\n");

  const result = classifyFileFreshness({
    repoRoot,
    path: "scratch.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(result.freshness.state, "untracked");
  assert.equal(result.git.tracked, false);
  assert.equal(result.git.status, "untracked");
  assert.equal(result.identity.kind, "filesystem-content");
  assert.equal(result.contentHash.algorithm, "sha256");
  assert.equal(result.trackedIdentity, null);
});

test("deleted tracked files classify as deleted without current identity", (t) => {
  const repoRoot = createFixtureRepo(t);
  rmSync(path.join(repoRoot, "fixture.txt"));

  const result = classifyFileFreshness({
    repoRoot,
    path: "fixture.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(result.freshness.state, "deleted");
  assert.equal(result.git.tracked, true);
  assert.equal(result.git.status, "deleted");
  assert.equal(result.identity, null);
  assert.equal(result.contentHash, null);
  assert.equal(result.trackedIdentity.kind, "git-blob");
});

test("missing untracked paths classify as deleted predictably", (t) => {
  const repoRoot = createFixtureRepo(t);

  const result = classifyFileFreshness({
    repoRoot,
    path: "missing.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(result.freshness.state, "deleted");
  assert.equal(result.git.tracked, false);
  assert.equal(result.git.status, "deleted");
  assert.equal(result.identity, null);
  assert.equal(result.trackedIdentity, null);
});

test("files outside a Git repository classify freshness as unknown", (t) => {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "agent-context-no-git-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));
  writeFileSync(path.join(repoRoot, "local.txt"), "local-only context\n");

  const result = classifyFileFreshness({
    repoRoot,
    path: "local.txt",
    observedAt: fixedObservedAt,
  });

  assert.equal(result.freshness.state, "unknown");
  assert.equal(result.git.available, false);
  assert.equal(result.git.tracked, null);
  assert.equal(result.identity.kind, "filesystem-content");
});

test("freshness states returned by local scenarios use the contract vocabulary", (t) => {
  const repoRoot = createFixtureRepo(t);
  writeFileSync(path.join(repoRoot, "scratch.txt"), "untracked context\n");
  const scenarios = ["fixture.txt", "scratch.txt", "missing.txt"].map((repoPath) =>
    classifyFileFreshness({
      repoRoot,
      path: repoPath,
      observedAt: fixedObservedAt,
    }),
  );

  for (const scenario of scenarios) {
    assert.equal(isContextFreshnessState(scenario.freshness.state), true);
  }
});

function createFixtureRepo(t) {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "agent-context-git-"));
  t.after(() => rmSync(repoRoot, { recursive: true, force: true }));

  runGit(repoRoot, ["-c", "init.defaultBranch=main", "init"]);
  runGit(repoRoot, ["config", "core.autocrlf", "false"]);
  writeFileSync(path.join(repoRoot, "fixture.txt"), "field-platform-context\n");
  runGit(repoRoot, ["add", "fixture.txt"]);
  runGit(repoRoot, [
    "-c",
    "user.name=Agent Tools Test",
    "-c",
    "user.email=agent-tools@example.test",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "-m",
    "Add fixture",
  ]);

  return repoRoot;
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
