import path from "node:path";
import type { JsonValue, ParsedArgs } from "./types.ts";

export function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value.startsWith("--")) {
      const withoutPrefix = value.slice(2);
      const eqIndex = withoutPrefix.indexOf("=");
      if (eqIndex >= 0) {
        flags[withoutPrefix.slice(0, eqIndex)] = withoutPrefix.slice(eqIndex + 1);
      } else {
        const next = argv[index + 1];
        if (next && !next.startsWith("--")) {
          flags[withoutPrefix] = next;
          index += 1;
        } else {
          flags[withoutPrefix] = true;
        }
      }
    } else {
      positional.push(value);
    }
  }

  return { positional, flags };
}

export function resolveRoot(args: ParsedArgs): string {
  return path.resolve(String(args.flags.root || process.cwd()));
}

export function emit(result: JsonValue | Record<string, unknown>, args: ParsedArgs): void {
  if (args.flags.json) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }

  if ("builder" in result) {
    process.stdout.write(`${result.builder}: ${result.recordCount} records (${result.check ? "check" : "written"})\n`);
    process.stdout.write(`Artifact: ${result.artifactPath}\n`);
    process.stdout.write(`Stale: ${result.stale}\n`);
    return;
  }

  process.stdout.write(`${result.operatorId}: ${Array.isArray(result.observedEvidence) ? result.observedEvidence.length : 0} findings\n`);
  if (Array.isArray(result.observedEvidence)) {
    for (const finding of result.observedEvidence.slice(0, 20) as Record<string, unknown>[]) {
      const file = finding.file ? `${finding.file}` : "";
      const line = finding.line ? `:${finding.line}` : "";
      const name = finding.name ? ` ${finding.name}` : "";
      const detail = finding.detail ? ` - ${finding.detail}` : "";
      process.stdout.write(`- ${file}${line}${name}${detail}\n`);
    }
  }
  if (Array.isArray(result.warnings) && result.warnings.length > 0) {
    process.stdout.write("Warnings:\n");
    for (const warning of result.warnings as string[]) {
      process.stdout.write(`- ${warning}\n`);
    }
  }
}

export function toNumber(value: string | boolean | undefined, fallback: number): number {
  if (typeof value !== "string") {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
