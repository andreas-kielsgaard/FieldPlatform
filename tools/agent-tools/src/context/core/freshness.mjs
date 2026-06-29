import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { CONTEXT_PATH_FORMAT, freshnessStateValues } from "../schemas/shared.mjs";
import { buildFilesystemContentIdentity, hashFileContentSha256 } from "./content-hash.mjs";
import { resolveRepoRelativePath, toRepoRelativePosixPath } from "./repo-paths.mjs";

export const LOCAL_FILE_FRESHNESS_SOURCE = "agent-os.context.local-file-freshness";

export function classifyFileFreshness(options = {}) {
  const [result] = classifyFileFreshnessBatch({
    repoRoot: options.repoRoot,
    paths: [options.path],
    observedAt: options.observedAt,
  });

  return result;
}

export function classifyFileFreshnessBatch(options = {}) {
  const requestedRoot = path.resolve(options.repoRoot ?? process.cwd());
  const observedAt = options.observedAt ?? new Date().toISOString();
  const gitRepository = readGitRepository(requestedRoot);
  const repoRoot = gitRepository.available ? gitRepository.root : requestedRoot;
  const repoPaths = (options.paths ?? [options.path]).map((filePath) =>
    toRepoRelativePosixPath(filePath, { repoRoot }),
  );
  const gitStateByPath = gitRepository.available ? readGitPathStateMap(gitRepository) : null;

  return repoPaths.map((repoPath) =>
    classifyResolvedFileFreshness({
      repoRoot,
      repoPath,
      observedAt,
      gitRepository,
      gitState: gitStateByPath?.get(repoPath) ?? buildEmptyGitPathState(),
    }),
  );
}

function classifyResolvedFileFreshness({
  repoRoot,
  repoPath,
  observedAt,
  gitRepository,
  gitState,
}) {
  const absolutePath = resolveRepoRelativePath(repoRoot, repoPath);
  const fileExists = existsSync(absolutePath);

  if (!gitRepository.available) {
    const filesystemHash = fileExists ? tryHashFile(repoRoot, repoPath) : null;
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
    const filesystemHash = fileExists ? tryHashFile(repoRoot, repoPath) : null;
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
    const filesystemHash = fileExists ? tryHashFile(repoRoot, repoPath) : null;
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

  const filesystemHash = fileExists ? tryHashFile(repoRoot, repoPath) : null;
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

function readGitPathStateMap(gitRepository) {
  const statusCodesByPath = readStatusCodesByPath(gitRepository);
  const indexIdentitiesByPath = readIndexIdentitiesByPath(gitRepository);
  const headIdentitiesByPath = readHeadIdentitiesByPath(gitRepository);
  const repoPaths = new Set([
    ...statusCodesByPath.keys(),
    ...indexIdentitiesByPath.keys(),
    ...headIdentitiesByPath.keys(),
  ]);
  const states = new Map();

  for (const repoPath of repoPaths) {
    states.set(
      repoPath,
      buildGitPathState({
        statusCodes: statusCodesByPath.get(repoPath) ?? [],
        indexIdentity: indexIdentitiesByPath.get(repoPath) ?? null,
        headIdentity: headIdentitiesByPath.get(repoPath) ?? null,
      }),
    );
  }

  return states;
}

function buildEmptyGitPathState() {
  return buildGitPathState({
    statusCodes: [],
    indexIdentity: null,
    headIdentity: null,
  });
}

function buildGitPathState({ statusCodes, indexIdentity, headIdentity }) {
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

function readStatusCodesByPath(gitRepository) {
  const run = runGit(gitRepository.root, ["status", "--porcelain=v1", "--untracked-files=all"]);
  const statusCodesByPath = new Map();
  if (!run.ok) {
    return statusCodesByPath;
  }

  for (const line of run.stdout.split(/\r?\n/).filter(Boolean)) {
    const statusCode = line.slice(0, 2);
    const repoPath = parseStatusRepoPath(line);
    if (!repoPath) {
      continue;
    }
    const statusCodes = statusCodesByPath.get(repoPath) ?? [];
    statusCodes.push(statusCode);
    statusCodesByPath.set(repoPath, statusCodes);
  }

  return statusCodesByPath;
}

function readIndexIdentitiesByPath(gitRepository) {
  const run = runGit(gitRepository.root, ["ls-files", "--stage"]);
  const identitiesByPath = new Map();
  if (!run.ok) {
    return identitiesByPath;
  }

  for (const line of run.stdout.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^\d+\s+([a-f0-9]+)\s+\d+\t(.+)$/);
    if (!match) {
      continue;
    }
    identitiesByPath.set(
      normalizeGitRepoPath(match[2]),
      buildGitBlobIdentity(match[1], gitRepository.objectFormat, "git-index"),
    );
  }

  return identitiesByPath;
}

function readHeadIdentitiesByPath(gitRepository) {
  const run = runGit(gitRepository.root, ["ls-tree", "-r", "HEAD"]);
  const identitiesByPath = new Map();
  if (!run.ok) {
    return identitiesByPath;
  }

  for (const line of run.stdout.split(/\r?\n/).filter(Boolean)) {
    const match = line.match(/^\d+\s+blob\s+([a-f0-9]+)\t(.+)$/);
    if (!match) {
      continue;
    }
    identitiesByPath.set(
      normalizeGitRepoPath(match[2]),
      buildGitBlobIdentity(match[1], gitRepository.objectFormat, "git-head"),
    );
  }

  return identitiesByPath;
}

function parseStatusRepoPath(line) {
  const statusCode = line.slice(0, 2);
  const rawPath = line.slice(3);
  const repoPath =
    ["R", "C"].includes(statusCode[0]) && rawPath.includes(" -> ")
      ? rawPath.slice(rawPath.lastIndexOf(" -> ") + 4)
      : rawPath;

  return repoPath ? normalizeGitRepoPath(repoPath) : null;
}

function normalizeGitRepoPath(repoPath) {
  return repoPath.replaceAll("\\", "/").replace(/^"|"$/g, "");
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
