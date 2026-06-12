import { matchAll } from "./text-utils.ts";
import { containsRegex } from "./repo-files.ts";

export const COMMON_WORDS = new Set([
  "about", "after", "agent", "agents", "also", "and", "are", "because", "before", "but", "can", "change", "code", "does", "file", "for", "from", "has", "have", "into", "its", "map", "must", "not", "only", "output", "path", "project", "repo", "should", "surface", "task", "that", "the", "this", "tool", "use", "when", "with",
]);

export function extractImports(lines: string[]): string[] {
  const imports: string[] = [];
  for (const line of lines) {
    for (const match of matchAll(line, /\b(?:import|require)\b[^"']*["']([^"']+)["']/g)) {
      imports.push(match[1]);
    }
  }
  return Array.from(new Set(imports)).sort();
}

export function extractLikelySubjects(lines: string[]): string[] {
  const subjects: string[] = [];
  for (const line of lines) {
    for (const match of matchAll(line, /\b(describe|it|test)\s*\(\s*["'`]([^"'`]+)["'`]/g)) {
      subjects.push(match[2]);
    }
  }
  return Array.from(new Set(subjects)).sort();
}

export function extractTerms(lines: string[]): { raw: string; normalized: string }[] {
  const terms: { raw: string; normalized: string }[] = [];
  for (const line of lines) {
    for (const match of matchAll(line, /[A-Za-z][A-Za-z0-9_-]{2,}/g)) {
      const normalized = match[0].toLowerCase();
      if (!COMMON_WORDS.has(normalized)) {
        terms.push({ raw: match[0], normalized });
      }
    }
  }
  return terms;
}

export function nearbyFieldHints(lines: string[], lineIndex: number): string[] {
  return lines
    .slice(lineIndex + 1, Math.min(lines.length, lineIndex + 12))
    .map((line) => line.match(/^\s*([A-Za-z_$][\w$]*)\??\s*[:=]/)?.[1])
    .filter(Boolean) as string[];
}

export function inferReadWriteHint(name: string, lines: string[]): string {
  if (/^(get|list|find|read|fetch|query)/i.test(name)) {
    return "read";
  }
  if (/^(create|update|delete|remove|save|mutate|set)/i.test(name)) {
    return "write";
  }
  if (containsRegex(lines, /\bPOST|PUT|PATCH|DELETE|mutation\b/i)) {
    return "write";
  }
  return "unknown";
}
