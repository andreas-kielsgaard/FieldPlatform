import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { emit, parseArgs, resolveRoot } from "./cli.ts";
import { collectFiles, isGeneratedToolMaintainedPath, isTextFile } from "./repo-files.ts";
import { gitSha } from "./git.ts";
import { buildIndexMaintenanceMetadata } from "./index-metadata.ts";
import { readJsonIfExists, stableStringify } from "./json.ts";
import { normalizePath } from "./text-utils.ts";
import type { IndexArtifact, IndexBuilderSpec, IndexDefinition } from "./types.ts";

export function runIndexBuilder(spec: IndexBuilderSpec): void {
  const args = parseArgs(process.argv.slice(2));
  const root = resolveRoot(args);
  const artifact = buildIndex(spec, root, args);
  const outPath = path.resolve(root, String(args.flags.out || spec.definition.artifactPath));
  const checkOnly = Boolean(args.flags.check);
  const existing = readJsonIfExists(outPath);
  const stale = !existing || stableStringify(existing) !== stableStringify(artifact);

  if (!checkOnly) {
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
  }

  emit(
    {
      builder: spec.definition.producer,
      indexId: spec.definition.id,
      artifactPath: normalizePath(path.relative(root, outPath)),
      check: checkOnly,
      stale,
      wrote: !checkOnly,
      recordCount: artifact.recordCount,
      generatedAt: artifact.generatedAt,
      warnings: artifact.knownBlindSpots,
    },
    args,
  );
}

function buildIndex(spec: IndexBuilderSpec, root: string, args: ReturnType<typeof parseArgs>): IndexArtifact {
  const files = collectFiles(root);
  const contentFiles = files.filter((file) => isTextFile(file.path) && !isGeneratedToolMaintainedPath(file.path));
  const records = spec.buildRecords({ root, files, contentFiles, args });
  const def: IndexDefinition = spec.definition;
  const maintenance = buildIndexMaintenanceMetadata(def, records);

  return {
    artifactId: def.id,
    indexId: def.id,
    stratum: 1,
    generated: true,
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    sourceRoot: ".",
    pathReference: "Paths in this artifact are relative to the Agent OS root. Run tools from that root or pass --root to relocate safely.",
    sourceState: sourceStateFor(args),
    sourceRevision: sourceRevisionFor(root, args),
    producer: def.producer,
    artifactPath: def.artifactPath,
    sourceInputs: def.sourceInputs,
    freshnessPolicy: "Refresh before relying on absence, broad impact, or generated/manual maintenance-path evidence.",
    coverage: def.coverage,
    knownBlindSpots: def.knownBlindSpots,
    recordCount: records.length,
    maintenance,
    records,
  };
}

function sourceStateFor(args: ReturnType<typeof parseArgs>): string {
  if (typeof args.flags["source-state"] === "string") {
    return args.flags["source-state"];
  }
  if (args.flags.committed || args.flags["commit-view"]) {
    return "committed-baseline";
  }
  if (typeof args.flags.mode === "string") {
    return args.flags.mode;
  }
  return "working-tree";
}

function sourceRevisionFor(root: string, args: ReturnType<typeof parseArgs>): string | null {
  if (typeof args.flags["source-revision"] === "string") {
    return args.flags["source-revision"];
  }
  return gitSha(root);
}
