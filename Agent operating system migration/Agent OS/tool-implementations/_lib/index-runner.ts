import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { emit, parseArgs, resolveRoot } from "./cli.ts";
import { collectFiles, isGeneratedIndexPath, isTextFile } from "./repo-files.ts";
import { gitSha } from "./git.ts";
import { readJsonIfExists, stableStringify } from "./json.ts";
import { normalizePath } from "./text-utils.ts";
import type { IndexArtifact, IndexBuilderSpec, IndexDefinition } from "./types.ts";

export function runIndexBuilder(spec: IndexBuilderSpec): void {
  const args = parseArgs(process.argv.slice(2));
  const root = resolveRoot(args);
  const artifact = buildIndex(spec, root);
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

function buildIndex(spec: IndexBuilderSpec, root: string): IndexArtifact {
  const files = collectFiles(root);
  const contentFiles = files.filter((file) => isTextFile(file.path) && !isGeneratedIndexPath(file.path));
  const records = spec.buildRecords({ root, files, contentFiles });
  const def: IndexDefinition = spec.definition;

  return {
    artifactId: def.id,
    indexId: def.id,
    stratum: 1,
    generated: true,
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sourceRoot: normalizePath(root),
    sourceRevision: gitSha(root),
    producer: def.producer,
    artifactPath: def.artifactPath,
    sourceInputs: def.sourceInputs,
    freshnessPolicy: "Refresh before relying on absence, broad impact, or generated/manual maintenance-path evidence.",
    coverage: def.coverage,
    knownBlindSpots: def.knownBlindSpots,
    recordCount: records.length,
    records,
  };
}
