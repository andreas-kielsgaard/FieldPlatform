import { existsSync } from "node:fs";
import path from "node:path";
import { emit, parseArgs, resolveRoot, toNumber } from "../cli.ts";
import { safeRead } from "../repo-files.ts";
import { normalizePath } from "../text-utils.ts";
import type { ParsedArgs } from "../types.ts";

export function runRetrieveSliceOperator(): void {
  const args = parseArgs(process.argv.slice(2));
  const root = resolveRoot(args);
  emit(runRetrieveSlice(root, args), args);
}

function runRetrieveSlice(root: string, args: ParsedArgs): Record<string, unknown> {
  const target = String(args.flags.file || args.positional[0] || "");
  const start = Math.max(1, toNumber(args.flags.start, 1));
  const requestedEnd = toNumber(args.flags.end, start + toNumber(args.flags.limit, 80) - 1);
  const absolutePath = path.resolve(root, target);

  if (!target || !existsSync(absolutePath)) {
    return {
      operatorId: "retrieve-slice",
      stratum: 2,
      query: target,
      observedEvidence: [],
      inferredRisk: ["Requested file was not found."],
      suggestedNextChecks: ["Use path-query to locate the file before retrieving a slice."],
      warnings: [],
      limitations: ["Retrieves bounded text only; semantic judgment remains with the agent."],
    };
  }

  const lines = safeRead(absolutePath).split(/\r?\n/);
  const end = Math.min(lines.length, requestedEnd);
  const slice = lines.slice(start - 1, end).map((text, index) => ({ line: start + index, text }));

  return {
    operatorId: "retrieve-slice",
    stratum: 2,
    query: normalizePath(path.relative(root, absolutePath)),
    start,
    end,
    observedEvidence: slice,
    inferredRisk: [],
    suggestedNextChecks: [],
    warnings: ["No repository files were edited."],
    limitations: ["Retrieves bounded text only; semantic judgment remains with the agent."],
  };
}
