import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { CONTEXT_PATH_FORMAT, freshnessStateValues } from "../schemas/shared.mjs";
import { buildFilesystemContentIdentity, hashFileContentSha256 } from "./content-hash.mjs";
import { resolveRepoRelativePath, toRepoRelativePosixPath } from "./repo-paths.mjs";

export const LOCAL_FILE_FRESHNESS_SOURCE = "agent-os.context.local-file-freshness";

export function classifyFileFreshness(options = {}) {
  const requestedRoot = path.resolve(options.repoRoot ?? process.cwd());
  const observedAt = options.observedAt ?? new Date().toISOString();
  const gitRepository = readGitRepository(requestedRoot);
  const repoRoot = gitRepository.available ? gitRepository.root : requestedRoot;
  const repoPath = toRepoRelativePosixPath(options.path, { repoRoot });
  const absolutePath = resolveRepoRelativePath(repoRoot, repoPath);
  const fileExists = existsSync(absolutePath);
  const filesystemHash = fileExists ? tryHashFile(repoRoot, repoPath) : null;

  if (!gitRepository.available) {
    return buildFreshnessResult({
      path: repoPath,
      observedAt,
      state: fileExists ? "unknown" : "deleted",
      reason: fileExists
        ? "File content is readable, but Git repository state is unavailable."
        : "File is missing and Git repository state is unavailable.",
      identity: filesystemHash?.identity ?? null,
      contentHash: filesystemHash?.contentHash ?? null,
      trackedIdentity: null,
      git: {
        available: false,
        tracked: null,
        status: "unknown",
        objectFormat: null,
      },
    });
  }

  const gitState = readGitPathState(gitRepository, repoPath);
  const trackedIdentity = gitState.indexIdentity ?? gitState.headIdentity ?? null;
  const state = classifyState({ gitState, fileExists });

  if (state === "current-clean") {
    return buildFreshnessResult({
      path: repoPath,
      observedAt,
      state,
      reason: "Tracked file matches the Git index and working tree.",
      identity: trackedIdentity,
      contentHash: null,
      trackedIdentity,
      git: buildGitResult(gitRepository, gitState, "clean"),
    });
  }

  if (state === "current-dirty") {
    return buildFreshnessResult({
      path: repoPath,
      observedAt,
      state,
      reason: "Tracked file has working tree or index changes.",
      identity: filesystemHash?.identity ?? null,
      contentHash: filesystemHash?.contentHash ?? null,
      trackedIdentity,
      git: buildGitResult(gitRepository, gitState, "dirty"),
    });
  }

  if (state === "untracked") {
    return buildFreshnessResult({
      path: repoPath,
      observedAt,
      state,
      reason: "File exists in the working tree but is not tracked by Git.",
      identity: filesystemHash?.identity ?? null,
      contentHash: filesystemHash?.contentHash ?? null,
      trackedIdentity: null,
      git: buildGitResult(gitRepository, gitState, "untracked"),
    });
  }

  if (state === "deleted") {
    return buildFreshnessResult({
      path: repoPath,
      observedAt,
      state,
      reason: "File is missing from the working tree.",
      identity: null,
      contentHash: null,
      trackedIdentity,
      git: buildGitResult(gitRepository, gitState, "deleted"),
    });
  }

  return buildFreshnessResult({
    path: repoPath,
    observedAt,
    state: "unknown",
    reason: "File exists, but Git did not report it as tracked or untracked.",
    identity: filesystemHash?.identity ?? null,
    contentHash: filesystemHash?.contentHash ?? null,
    trackedIdentity,
    git: buildGitResult(gitRepository, gitState, "unknown"),
  });
}

export function isContextFreshnessState(value) {
  return freshnessStateValues.includes(value);
}

function classifyState({ gitState, fileExists }) {
  if (gitState.untracked && fileExists) {
    return "untracked";
  }

  if (gitState.deleted || (!fileExists && gitState.tracked)) {
    return "deleted";
  }

  if (!fileExists) {
    return "deleted";
  }

  if (gitState.tracked && gitState.statusCodes.length === 0) {
    return "current-clean";
  }

  if (gitState.tracked) {
    return "current-dirty";
  }

  return "unknown";
}

function buildFreshnessResult({
  path: repoPath,
  observedAt,
  state,
  reason,
  identity,
  contentHash,
  trackedIdentity,
  git,
}) {
  return {
    path: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
    freshness: {
      state,
      observedAt,
      reason,
    },
    identity,
    contentHash,
    trackedIdentity,
    git,
    provenance: {
      sourceTool: LOCAL_FILE_FRESHNESS_SOURCE,
      observedAt,
    },
  };
}

function buildGitResult(gitRepository, gitState, status) {
  return {
    available: true,
    tracked: gitState.tracked,
    status,
    statusCodes: gitState.statusCodes,
    objectFormat: gitRepository.objectFormat,
  };
}

function tryHashFile(repoRoot, repoPath) {
  try {
    const result = hashFileContentSha256({ repoRoot, path: repoPath });
    return {
      contentHash: result.contentHash,
      identity: buildFilesystemContentIdentity(result.contentHash),
    };
  } catch {
    return null;
  }
}

function readGitRepository(startDirectory) {
  const rootRun = runGit(startDirectory, ["rev-parse", "--show-toplevel"]);
  if (!rootRun.ok) {
    return {
      available: false,
      root: startDirectory,
      objectFormat: null,
    };
  }

  const root = path.resolve(rootRun.stdout.trim());
  const objectFormatRun = runGit(root, ["rev-parse", "--show-object-format"]);

  return {
    available: true,
    root,
    objectFormat: objectFormatRun.ok ? objectFormatRun.stdout.trim() : "sha1",
  };
}

function readGitPathState(gitRepository, repoPath) {
  const statusRun = runGit(gitRepository.root, [
    "status",
    "--porcelain=v1",
    "--untracked-files=normal",
    "--",
    repoPath,
  ]);
  const statusCodes = statusRun.ok
    ? statusRun.stdout
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => line.slice(0, 2))
    : [];
  const indexIdentity = readIndexIdentity(gitRepository, repoPath);
  const headIdentity = readHeadIdentity(gitRepository, repoPath);
  const untracked = statusCodes.some((code) => code === "??");
  const deleted = statusCodes.some((code) => code.includes("D"));
  const tracked =
    Boolean(indexIdentity ?? headIdentity) || statusCodes.some((code) => code !== "??");

  return {
    statusCodes,
    tracked,
    untracked,
    deleted,
    indexIdentity,
    headIdentity,
  };
}

function readIndexIdentity(gitRepository, repoPath) {
  const run = runGit(gitRepository.root, ["ls-files", "--stage", "--", repoPath]);
  if (!run.ok) {
    return null;
  }

  const line = run.stdout.split(/\r?\n/).find(Boolean);
  const match = line?.match(/^\d+\s+([a-f0-9]+)\s+\d+\t/);
  if (!match) {
    return null;
  }

  return buildGitBlobIdentity(match[1], gitRepository.objectFormat, "git-index");
}

function readHeadIdentity(gitRepository, repoPath) {
  const run = runGit(gitRepository.root, ["ls-tree", "HEAD", "--", repoPath]);
  if (!run.ok) {
    return null;
  }

  const line = run.stdout.split(/\r?\n/).find(Boolean);
  const match = line?.match(/^\d+\s+blob\s+([a-f0-9]+)\t/);
  if (!match) {
    return null;
  }

  return buildGitBlobIdentity(match[1], gitRepository.objectFormat, "git-head");
}

function buildGitBlobIdentity(digest, objectFormat, source) {
  return {
    kind: "git-blob",
    source,
    algorithm: `git-${objectFormat}`,
    digest,
  };
}

function runGit(cwd, gitArgs) {
  const run = spawnSync("git", gitArgs, {
    cwd,
    encoding: "utf8",
    shell: false,
    maxBuffer: 1024 * 1024 * 10,
  });

  return {
    ok: !run.error && run.status === 0,
    status: run.status,
    stdout: run.stdout ?? "",
    stderr: run.stderr ?? "",
  };
}
