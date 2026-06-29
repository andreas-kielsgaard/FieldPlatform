import path from "node:path";

import { CONTEXT_PATH_FORMAT } from "../schemas/shared.mjs";

export { CONTEXT_PATH_FORMAT };

export function toRepoRelativePosixPath(filePath, options = {}) {
  const repoRoot = path.resolve(options.repoRoot ?? process.cwd());
  const rawPath = String(filePath ?? "");

  if (rawPath.trim().length === 0) {
    throw new Error("Expected a repository-relative path.");
  }

  const withPosixSeparators = rawPath.replaceAll("\\", "/");
  const relativePath = isAbsolutePath(rawPath)
    ? path.relative(repoRoot, path.resolve(rawPath))
    : withPosixSeparators.replace(/^[.]\//, "");

  const repoPath = normalizeRepoPath(relativePath);
  if (!isRepoRelativePosixPath(repoPath)) {
    throw new Error(`Path must stay inside the repository and use POSIX separators: ${rawPath}`);
  }

  return repoPath;
}

export function resolveRepoRelativePath(repoRoot, repoRelativePath) {
  const repoPath = toRepoRelativePosixPath(repoRelativePath, { repoRoot });
  return path.resolve(repoRoot, ...repoPath.split("/"));
}

export function isRepoRelativePosixPath(value) {
  if (typeof value !== "string" || value.length === 0) {
    return false;
  }

  if (value.includes("\\") || value.startsWith("/") || /^[A-Za-z]:/.test(value)) {
    return false;
  }

  return value !== ".." && !value.startsWith("../");
}

function normalizeRepoPath(value) {
  const normalized = path.posix.normalize(String(value ?? "").replaceAll("\\", "/"));
  return normalized === "." ? "" : normalized.replace(/^[.]\//, "");
}

function isAbsolutePath(value) {
  return path.isAbsolute(value) || path.win32.isAbsolute(value) || path.posix.isAbsolute(value);
}
