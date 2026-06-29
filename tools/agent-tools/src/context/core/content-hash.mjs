import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

import { CONTEXT_PATH_FORMAT } from "../schemas/shared.mjs";
import { resolveRepoRelativePath, toRepoRelativePosixPath } from "./repo-paths.mjs";

export const CONTENT_HASH_ALGORITHM = "sha256";

export function hashContentSha256(content) {
  return {
    algorithm: CONTENT_HASH_ALGORITHM,
    digest: createHash(CONTENT_HASH_ALGORITHM).update(content).digest("hex"),
  };
}

export function hashFileContentSha256(options = {}) {
  const repoRoot = options.repoRoot ?? process.cwd();
  const repoPath = toRepoRelativePosixPath(options.path, { repoRoot });
  const absolutePath = resolveRepoRelativePath(repoRoot, repoPath);

  return {
    path: repoPath,
    pathFormat: CONTEXT_PATH_FORMAT,
    contentHash: hashContentSha256(readFileSync(absolutePath)),
  };
}

export function buildFilesystemContentIdentity(contentHash, source = "working-tree") {
  return {
    kind: "filesystem-content",
    source,
    algorithm: contentHash.algorithm,
    digest: contentHash.digest,
  };
}
