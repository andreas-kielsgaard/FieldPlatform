import { existsSync } from "node:fs";
import path from "node:path";
import type { FileRecord } from "../types.ts";
import { matchAll, slug, trimLine } from "../text-utils.ts";

export function buildDocReferenceRecords(root: string, files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  for (const file of files.filter((candidate) => candidate.ext === ".md" || candidate.ext === ".mdx")) {
    file.lines.forEach((line, lineIndex) => {
      for (const match of matchAll(line, /\[([^\]]+)\]\(([^)]+)\)/g)) {
        records.push(docReferenceRecord(root, file.path, lineIndex + 1, "markdown-link", match[1], match[2], line));
      }
      for (const match of matchAll(line, /`([^`]+\.(?:md|json|ts|tsx|js|jsx|instructions\.md))`/g)) {
        records.push(docReferenceRecord(root, file.path, lineIndex + 1, "inline-path", match[1], match[1], line));
      }
      for (const match of matchAll(line, /^#{1,6}\s+(.+)$/g)) {
        records.push({ file: file.path, line: lineIndex + 1, kind: "heading", text: match[1].trim(), anchor: slug(match[1]) });
      }
      for (const match of matchAll(line, /`([a-z][a-z0-9-]*(?:-[a-z0-9]+)+)`/g)) {
        records.push({ file: file.path, line: lineIndex + 1, kind: "inline-id", target: match[1], text: trimLine(line) });
      }
    });
  }

  return records;
}

function docReferenceRecord(root: string, file: string, line: number, kind: string, text: string, target: string, sourceLine: string): Record<string, unknown> {
  const cleanTarget = target.split("#")[0];
  const isExternal = /^[a-z]+:\/\//i.test(cleanTarget) || cleanTarget.startsWith("mailto:");
  const local = Boolean(cleanTarget) && !isExternal;
  const resolvedPath = local ? (cleanTarget.startsWith("/") ? path.resolve(root, cleanTarget.slice(1)) : path.resolve(root, path.dirname(file), cleanTarget)) : "";
  return { file, line, kind, text, target, local, resolvedExists: local ? existsSync(resolvedPath) : undefined, nearby: trimLine(sourceLine) };
}
