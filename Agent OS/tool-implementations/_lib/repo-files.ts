import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import type { FileRecord } from "./types.ts";
import { normalizePath } from "./text-utils.ts";

const TEXT_EXTENSIONS = new Set([
  ".cjs", ".css", ".html", ".js", ".json", ".jsx", ".md", ".mdx", ".mjs", ".prisma", ".scss", ".sql", ".ts", ".tsx", ".txt", ".yaml", ".yml",
]);

const SKIP_DIRS = new Set([".git", ".next", ".turbo", "build", "coverage", "dist", "node_modules", "out"]);

export function collectFiles(root: string): FileRecord[] {
  const records: FileRecord[] = [];

  function walk(current: string): void {
    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && SKIP_DIRS.has(entry.name)) {
        continue;
      }

      const absolutePath = path.join(current, entry.name);
      const relativePath = normalizePath(path.relative(root, absolutePath));

      if (entry.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (!entry.isFile()) {
        continue;
      }

      const stats = statSync(absolutePath);
      const ext = path.extname(entry.name).toLowerCase();
      const content = isTextFile(relativePath) ? safeRead(absolutePath) : "";
      records.push({
        path: relativePath,
        absolutePath,
        name: entry.name,
        ext,
        size: stats.size,
        lines: content.split(/\r?\n/),
      });
    }
  }

  walk(root);
  return records.sort((a, b) => a.path.localeCompare(b.path));
}

export function isTextFile(filePath: string): boolean {
  return TEXT_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

export function isCodeLike(filePath: string): boolean {
  return /\.(cjs|js|jsx|mjs|ts|tsx)$/.test(filePath);
}

export function isGeneratedIndexPath(filePath: string): boolean {
  return /^tool-maintained-files\/(indexes|project-indexes)\/.+\.json$/.test(filePath);
}

export function isGeneratedToolMaintainedPath(filePath: string): boolean {
  return /^tool-maintained-files\/(indexes|project-indexes|semantic)\/.+\.json$/.test(filePath);
}

export function isTestFile(filePath: string): boolean {
  return /(^|\/)(__tests__|tests?|e2e)(\/|$)|\.(test|spec)\.[jt]sx?$/.test(filePath);
}

export function isStoryFile(filePath: string): boolean {
  return /\.stories\.[jt]sx?$|(^|\/)stories(\/|$)/.test(filePath);
}

export function containsWord(lines: string[], word: string): boolean {
  const pattern = new RegExp(`\\b${escapeRegexLocal(word)}\\b`);
  return lines.some((line) => pattern.test(line));
}

export function containsRegex(lines: string[], pattern: RegExp): boolean {
  return lines.some((line) => pattern.test(line));
}

export function safeRead(filePath: string): string {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function escapeRegexLocal(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
