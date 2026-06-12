import path from "node:path";

export function matchAll(value: string, pattern: RegExp): RegExpMatchArray[] {
  return Array.from(value.matchAll(pattern));
}

export function uniqueRecords(records: Record<string, unknown>[], keys: string[]): Record<string, unknown>[] {
  const seen = new Set<string>();
  const result: Record<string, unknown>[] = [];
  for (const record of records) {
    const identity = keys.map((key) => String(record[key] || "")).join("\u0000");
    if (!seen.has(identity)) {
      seen.add(identity);
      result.push(record);
    }
  }
  return result;
}

export function areaOf(filePath: string): string {
  return filePath.split("/")[0] || ".";
}

export function recordText(record: Record<string, unknown>): string {
  return Object.values(record)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value) => ["string", "number", "boolean"].includes(typeof value))
    .join(" ");
}

export function trimLine(line: string): string {
  return line.trim().replace(/\s+/g, " ").slice(0, 240);
}

export function normalizePath(value: string): string {
  return value.split(path.sep).join("/");
}

export function slug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
