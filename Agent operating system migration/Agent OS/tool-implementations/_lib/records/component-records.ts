import type { FileRecord } from "../types.ts";
import { containsWord, isStoryFile, isTestFile } from "../repo-files.ts";
import { buildSymbolRecords } from "./source-symbols.ts";

export function buildComponentRecords(files: FileRecord[]): Record<string, unknown>[] {
  const symbols = buildSymbolRecords(files);
  const definitions = symbols.filter((record) => {
    const name = String(record.name || "");
    return /^[A-Z][A-Za-z0-9]*$/.test(name) && ["definition", "export"].includes(String(record.role));
  });
  const imports = symbols.filter((record) => record.role === "import");

  return definitions.map((record) => {
    const name = String(record.name);
    const file = String(record.file);
    const consumers = imports.filter((item) => item.name === name && item.file !== file).map((item) => item.file);
    return {
      component: name,
      file,
      line: record.line,
      exportRole: record.role,
      consumers: Array.from(new Set(consumers)).sort(),
      stories: files.filter((candidate) => isStoryFile(candidate.path) && containsWord(candidate.lines, name)).map((candidate) => candidate.path),
      tests: files.filter((candidate) => isTestFile(candidate.path) && containsWord(candidate.lines, name)).map((candidate) => candidate.path),
      propsHints: findPropsHints(files, name),
    };
  });
}

function findPropsHints(files: FileRecord[], componentName: string): string[] {
  const pattern = new RegExp(`\\b(?:interface|type)\\s+${escapeRegexLocal(componentName)}Props\\b`);
  return files.filter((file) => file.lines.some((line) => pattern.test(line))).map((file) => file.path);
}

function escapeRegexLocal(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
