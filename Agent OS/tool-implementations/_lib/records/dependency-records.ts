import path from "node:path";
import type { FileRecord } from "../types.ts";
import { isCodeLike } from "../repo-files.ts";
import { areaOf, matchAll, normalizePath, trimLine } from "../text-utils.ts";

export function buildDependencyRecords(files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];
  const patterns = [
    /\bimport\s+(?:type\s+)?(?:[^"']+\s+from\s+)?["']([^"']+)["']/g,
    /\bexport\s+[^"']+\s+from\s+["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];

  for (const file of files) {
    if (!isCodeLike(file.path)) {
      continue;
    }
    file.lines.forEach((line, lineIndex) => {
      for (const pattern of patterns) {
        for (const match of matchAll(line, pattern)) {
          records.push({
            importer: file.path,
            imported: match[1],
            resolved: resolveImport(file.path, match[1]),
            line: lineIndex + 1,
            kind: match[0].trim().startsWith("require") ? "require" : "import",
            crossArea: areaOf(file.path) !== areaOf(resolveImport(file.path, match[1])),
            text: trimLine(line),
          });
        }
      }
    });
  }

  return records;
}

function resolveImport(importer: string, specifier: string): string {
  if (!specifier.startsWith(".")) {
    return specifier;
  }
  return normalizePath(path.posix.normalize(path.posix.join(path.posix.dirname(importer), specifier)));
}
