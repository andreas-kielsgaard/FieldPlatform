import { existsSync } from "node:fs";
import path from "node:path";
import type { FileRecord, ParsedArgs } from "../types.ts";
import { inferArtifactKind } from "../artifacts.ts";
import { gitLines } from "../git.ts";
import { areaOf, normalizePath } from "../text-utils.ts";

export function buildChangeRecords(root: string, files: FileRecord[], args?: ParsedArgs): Record<string, unknown>[] {
  if (isCommittedBaselineMode(args)) {
    return [];
  }

  const statusLines = gitLines(root, ["status", "--short", "--untracked-files=all"]);
  const changedFiles = new Set<string>();
  const records: Record<string, unknown>[] = [];

  for (const line of statusLines) {
    const status = line.slice(0, 2).trim() || "modified";
    const filePath = normalizeGitPath(root, line.slice(3).trim().replace(/^"|"$/g, ""));
    if (!filePath || !inWorkingTree(root, filePath)) {
      continue;
    }
    changedFiles.add(filePath);
    records.push({ file: filePath, status, source: "git-status", area: areaOf(filePath), artifactKind: inferArtifactKind(filePath) });
  }

  for (const filePath of gitLines(root, ["diff", "--name-only"])) {
    const normalized = normalizeGitPath(root, filePath);
    if (normalized && inWorkingTree(root, normalized)) {
      changedFiles.add(normalized);
    }
  }

  for (const filePath of changedFiles) {
    if (!records.some((record) => record.file === filePath)) {
      records.push({ file: filePath, status: "diff", source: "git-diff", area: areaOf(filePath), artifactKind: inferArtifactKind(filePath) });
    }
  }

  const knownFiles = new Set(files.map((file) => file.path));
  return records.map((record) => ({ ...record, existsInWorkingTree: knownFiles.has(String(record.file)) }));
}

function normalizeGitPath(root: string, value: string): string {
  const normalized = normalizePath(value);
  const rootName = path.basename(root);
  const prefixed = `${rootName}/`;
  if (normalized.startsWith(prefixed)) {
    return normalized.slice(prefixed.length);
  }
  return normalized;
}

function inWorkingTree(root: string, relativePath: string): boolean {
  if (!relativePath || relativePath.startsWith("../") || path.isAbsolute(relativePath)) {
    return false;
  }
  return existsSync(path.resolve(root, relativePath));
}

function isCommittedBaselineMode(args?: ParsedArgs): boolean {
  if (!args) {
    return false;
  }
  return args.flags.committed === true || args.flags["commit-view"] === true || args.flags.mode === "committed";
}
