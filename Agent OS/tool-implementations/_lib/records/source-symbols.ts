import type { FileRecord } from "../types.ts";
import { isCodeLike } from "../repo-files.ts";
import { matchAll, trimLine, uniqueRecords } from "../text-utils.ts";

export function buildSymbolRecords(files: FileRecord[]): Record<string, unknown>[] {
  const records: Record<string, unknown>[] = [];

  for (const file of files) {
    if (!isCodeLike(file.path)) {
      continue;
    }

    file.lines.forEach((line, lineIndex) => {
      const lineNumber = lineIndex + 1;
      for (const match of matchAll(line, /\bexport\s+(?:default\s+)?(?:async\s+)?(function|class|interface|type|const|let|var|enum)\s+([A-Za-z_$][\w$]*)/g)) {
        records.push(symbolRecord(file.path, lineNumber, match[2], match[1], "export", line));
      }
      for (const match of matchAll(line, /\b(function|class|interface|type|const|let|var|enum)\s+([A-Za-z_$][\w$]*)/g)) {
        records.push(symbolRecord(file.path, lineNumber, match[2], match[1], "definition", line));
      }
      for (const match of matchAll(line, /\bimport\s+(?:type\s+)?(?:\{([^}]+)\}|([A-Za-z_$][\w$]*))\s+from\s+["']([^"']+)["']/g)) {
        const imported = (match[1] || match[2] || "")
          .split(",")
          .map((part) => part.trim().split(/\s+as\s+/i)[0].trim())
          .filter(Boolean);
        for (const name of imported) {
          records.push(symbolRecord(file.path, lineNumber, name, "import", "import", line, match[3]));
        }
      }
      for (const match of matchAll(line, /\bexport\s+\{([^}]+)\}\s+from\s+["']([^"']+)["']/g)) {
        const exported = match[1]
          .split(",")
          .map((part) => part.trim().split(/\s+as\s+/i)[0].trim())
          .filter(Boolean);
        for (const name of exported) {
          records.push(symbolRecord(file.path, lineNumber, name, "re-export", "export", line, match[2]));
        }
      }
    });
  }

  return uniqueRecords(records, ["file", "line", "name", "role", "module"]);
}

function symbolRecord(file: string, line: number, name: string, kind: string, role: string, text: string, module?: string): Record<string, unknown> {
  return { file, line, name, kind, role, module, text: trimLine(text) };
}
