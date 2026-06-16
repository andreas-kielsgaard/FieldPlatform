import type { FileRecord } from "../types.ts";
import { containsRegex } from "../repo-files.ts";
import { extractTerms } from "../source-extractors.ts";
import { buildSymbolRecords } from "./source-symbols.ts";

export function buildFixtureRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files
    .filter((file) => /(^|\/)(fixtures?|mocks?|seeds?|scenarios?|demo-data|examples?)(\/|\.|-|_)/i.test(file.path) || containsRegex(file.lines, /\b(fixture|mock|seed|scenario|demo)\b/i))
    .map((file) => ({
      file: file.path,
      kind: "fixture-or-scenario",
      representedTerms: Array.from(new Set(extractTerms(file.lines).slice(0, 40).map((term) => term.raw))).sort(),
      exports: buildSymbolRecords([file]).filter((record) => ["definition", "export"].includes(String(record.role))).map((record) => record.name),
      consumers: [],
    }));
}
