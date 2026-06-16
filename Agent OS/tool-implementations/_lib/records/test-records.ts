import type { FileRecord } from "../types.ts";
import { isStoryFile, isTestFile } from "../repo-files.ts";
import { extractImports, extractLikelySubjects, extractTerms } from "../source-extractors.ts";

export function buildTestRecords(files: FileRecord[]): Record<string, unknown>[] {
  return files
    .filter((file) => isTestFile(file.path) || isStoryFile(file.path))
    .map((file) => ({
      file: file.path,
      kind: isStoryFile(file.path) ? "story" : "test",
      imports: extractImports(file.lines),
      subjects: extractLikelySubjects(file.lines),
      fixtureRefs: extractTerms(file.lines).filter((term) => /fixture|mock|seed|scenario|demo/i.test(term.raw)).map((term) => term.raw),
    }));
}
