import { existsSync, readFileSync } from "node:fs";

export function readJsonIfExists(filePath: string): unknown | null {
  if (!existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return null;
  }
}

export function stableStringify(value: unknown): string {
  return JSON.stringify(stripVolatile(value));
}

function stripVolatile(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripVolatile);
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (["generatedAt", "sourceRoot", "sourceRevision", "size", "absolutePath"].includes(key)) {
        continue;
      }
      result[key] = stripVolatile(entry);
    }
    return result;
  }
  return value;
}
