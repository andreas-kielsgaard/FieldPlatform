import type { FileRecord } from "../types.ts";
import { isTextFile } from "../repo-files.ts";
import { matchAll } from "../text-utils.ts";
import { COMMON_WORDS } from "../source-extractors.ts";

export function buildTermRecords(files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  for (const file of files) {
    if (!isTextFile(file.path)) {
      continue;
    }
    file.lines.forEach((line, lineIndex) => {
      for (const match of matchAll(line, /[A-Za-z][A-Za-z0-9_-]{2,}/g)) {
        const raw = match[0];
        const normalized = raw.toLowerCase();
        if (COMMON_WORDS.has(normalized)) {
          continue;
        }
        records.push({
          term: normalized,
          raw,
          file: file.path,
          line: lineIndex + 1,
          surface: classifyTermSurface(line, raw),
          nearby: line.trim().slice(0, 240),
        });
      }
    });
  }

  return records;
}

function classifyTermSurface(line: string, raw: string): string {
  if (/^#{1,6}\s+/.test(line)) {
    return "heading";
  }
  if (new RegExp(`["'\`]${escapeRegexLocal(raw)}["'\`]`).test(line)) {
    return "ui-or-string-literal";
  }
  if (/[A-Za-z_$][\w$]*\s*[:=({]/.test(line)) {
    return "identifier";
  }
  return "prose";
}

function escapeRegexLocal(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
