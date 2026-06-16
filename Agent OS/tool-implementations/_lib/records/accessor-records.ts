import type { FileRecord } from "../types.ts";
import { containsRegex } from "../repo-files.ts";
import { extractImports, inferReadWriteHint } from "../source-extractors.ts";
import { buildSymbolRecords } from "./source-symbols.ts";

export function buildAccessorRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files
    .filter((file) => /api|accessor|service|repository|queries?|mutations?|fetch|client/i.test(file.path) || containsRegex(file.lines, /\b(fetch|query|mutation|accessor|service|repository|client)\b/i))
    .flatMap((file) => {
      const symbols = buildSymbolRecords([file]);
      return symbols
        .filter((record) => ["definition", "export"].includes(String(record.role)))
        .map((record) => ({
          accessor: record.name,
          file: file.path,
          line: record.line,
          readWriteHint: inferReadWriteHint(String(record.name), file.lines),
          imports: extractImports(file.lines),
          cacheHint: containsRegex(file.lines, /\b(cache|invalidate|revalidate|queryKey|staleTime)\b/i),
        }));
    });
}
