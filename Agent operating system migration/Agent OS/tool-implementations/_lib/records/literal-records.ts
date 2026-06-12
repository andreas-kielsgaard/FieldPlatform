import type { FileRecord } from "../types.ts";
import { isTextFile } from "../repo-files.ts";
import { matchAll, trimLine } from "../text-utils.ts";

export function buildLiteralRecords(files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  for (const file of files) {
    if (!isTextFile(file.path)) {
      continue;
    }
    file.lines.forEach((line, lineIndex) => {
      for (const match of matchAll(line, /["'`]([^"'`]{2,120})["'`]/g)) {
        const value = match[1];
        records.push({
          value,
          file: file.path,
          line: lineIndex + 1,
          category: classifyLiteral(value),
          nearby: trimLine(line),
        });
      }
      for (const match of matchAll(line, /\b([A-Z][A-Z0-9_]{2,})\b/g)) {
        records.push({
          value: match[1],
          file: file.path,
          line: lineIndex + 1,
          category: "token-like",
          nearby: trimLine(line),
        });
      }
    });
  }

  return records;
}

function classifyLiteral(value: string): string {
  if (/^(admin|owner|member|viewer|editor|guest|public|private|read|write|delete|manage)$/i.test(value)) {
    return "policy-like";
  }
  if (/^(active|inactive|draft|published|archived|pending|complete|failed|success|error|warning)$/i.test(value)) {
    return "status-like";
  }
  if (/^#?[0-9A-Fa-f]{3,8}$|^\d+(px|rem|em|vh|vw|%)$/.test(value)) {
    return "token-like";
  }
  return "string";
}
