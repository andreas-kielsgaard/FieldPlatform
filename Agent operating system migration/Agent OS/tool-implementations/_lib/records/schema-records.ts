import type { FileRecord } from "../types.ts";
import { containsRegex } from "../repo-files.ts";
import { matchAll } from "../text-utils.ts";
import { nearbyFieldHints } from "../source-extractors.ts";

export function buildSchemaRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files
    .filter((file) => /schema|model|validator|migration|prisma|zod|type|interface/i.test(file.path) || containsRegex(file.lines, /\b(schema|model|validator|interface|type|z\.object|enum)\b/))
    .flatMap((file) => {
      const records: Record<string, unknown>[] = [];
      file.lines.forEach((line, lineIndex) => {
        for (const match of matchAll(line, /\b(interface|type|model|enum|class)\s+([A-Za-z_$][\w$]*)/g)) {
          records.push({ file: file.path, line: lineIndex + 1, declarationKind: match[1], name: match[2], fields: nearbyFieldHints(file.lines, lineIndex) });
        }
        for (const match of matchAll(line, /\b([A-Za-z_$][\w$]*)\s*:\s*z\./g)) {
          records.push({ file: file.path, line: lineIndex + 1, declarationKind: "validator-field", name: match[1], fields: [] });
        }
      });
      return records;
    });
}
