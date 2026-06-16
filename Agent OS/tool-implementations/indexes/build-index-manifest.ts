import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gitSha } from "../_lib/git.ts";
import { ACTIVE_INDEX_CATALOG } from "../_lib/index-catalog.ts";
import { runIndexBuilder } from "../_lib/index-runner.ts";
import type { IndexDefinition } from "../_lib/types.ts";

const definition: IndexDefinition = {
  id: "index-manifest",
  producer: "build-index-manifest",
  artifactPath: "tool-maintained-files/indexes/index-manifest.json",
  sourceInputs: ["active Stratum 1 index artifacts, index tier policy, and query guidance"],
  coverage: "Compact boot-aware metadata for active evidence indexes, including tier, freshness, size, hash, and first-query guidance.",
  knownBlindSpots: [
    "The manifest summarizes index artifacts; it does not include raw index records.",
    "The manifest excludes its own artifact hash to avoid self-referential freshness churn.",
    "Artifact sourceRevision is provenance metadata and is not used as a freshness failure.",
  ],
};

runIndexBuilder({ definition, buildRecords: ({ root }) => buildManifestRecords(root) });

function buildManifestRecords(root: string): Record<string, unknown>[] {
  const currentRevision = gitSha(root);
  return ACTIVE_INDEX_CATALOG.map((entry) => {
    if (entry.indexId === "index-manifest") {
      return {
        ...entry,
        stratum: 1,
        bootloaderRole: "mandatory boot context",
        loadPolicy: "Read this compact artifact during Agent OS initiation; do not load raw generated index record arrays at boot.",
        exists: true,
        byteSize: null,
        sha256: null,
        schemaVersion: 2,
        recordCount: ACTIVE_INDEX_CATALOG.length,
        generatedAt: null,
        sourceRoot: ".",
        pathReference: "Paths are relative to the Agent OS root; run tools from that root or pass --root.",
        sourceState: "manifest-self-row",
        sourceRevision: currentRevision,
        producer: entry.builder,
        freshnessPolicy: "Refresh when active index tiers, capabilities, artifacts, builders, or first-query guidance changes.",
        coverage: entry.capability,
        metadataVersion: 1,
        metadataMaintainedBy: "build-index-manifest",
        manualMaintenance: false,
        refreshCommand: "npx --yes tsx tool-implementations/indexes/build-index-manifest.ts --json",
        checkCommand: "npx --yes tsx tool-implementations/indexes/build-index-manifest.ts --check --json",
        sharding: {
          strategy: "top-level-artifact-maintenance",
          targetRecordsPerShard: 500,
          shardCount: null,
          shards: [],
        },
        semanticSupport: semanticSupportSummary(null),
        knownBlindSpots: [
          "The manifest omits its own byte size and content hash to avoid self-referential freshness churn.",
          "The manifest summarizes index artifacts; it does not include raw index records.",
        ],
        freshnessWarnings: ["Self hash intentionally omitted; validate this artifact with build-index-manifest --check --json."],
      };
    }

    const artifactPath = String(entry.artifactPath);
    const absolutePath = path.resolve(root, artifactPath);
    const exists = existsSync(absolutePath);
    const artifact = exists ? readArtifact(absolutePath) : null;
    const freshnessWarnings = freshnessWarningsFor(artifact, exists);
    const maintenance = artifact && typeof artifact.maintenance === "object" ? (artifact.maintenance as Record<string, unknown>) : null;

    return {
      ...entry,
      stratum: 1,
      bootloaderRole: entry.tier === "boot-core" ? "boot-aware strong cue" : "selective cue",
      loadPolicy: "Read manifest row at boot; query raw records only through selected tools or bounded slices.",
      exists,
      byteSize: exists ? statSync(absolutePath).size : null,
      sha256: exists ? sha256(absolutePath) : null,
      schemaVersion: artifact?.schemaVersion ?? null,
      recordCount: artifact?.recordCount ?? null,
      generatedAt: artifact?.generatedAt ?? null,
      sourceRoot: artifact?.sourceRoot ?? ".",
      pathReference: artifact?.pathReference ?? "Paths are relative to the Agent OS root.",
      sourceState: artifact?.sourceState ?? "unknown",
      sourceRevision: artifact?.sourceRevision ?? null,
      producer: artifact?.producer ?? entry.builder,
      freshnessPolicy: artifact?.freshnessPolicy ?? "Missing artifact.",
      coverage: artifact?.coverage ?? entry.capability,
      metadataVersion: maintenance?.metadataVersion ?? null,
      metadataMaintainedBy: maintenance?.maintainedBy ?? entry.builder,
      manualMaintenance: maintenance?.manualMaintenance ?? null,
      refreshCommand: maintenance?.refreshCommand ?? `npx --yes tsx tool-implementations/indexes/${entry.builder}.ts --json`,
      checkCommand: maintenance?.checkCommand ?? `npx --yes tsx tool-implementations/indexes/${entry.builder}.ts --check --json`,
      sharding: shardingSummary(maintenance),
      semanticSupport: semanticSupportSummary(maintenance),
      knownBlindSpots: artifact?.knownBlindSpots ?? [],
      freshnessWarnings,
    };
  });
}

function readArtifact(filePath: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(readFileSync(filePath, "utf8"));
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

function sha256(filePath: string): string {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function freshnessWarningsFor(artifact: Record<string, unknown> | null, exists: boolean): string[] {
  const warnings: string[] = [];
  if (!exists) {
    warnings.push("Index artifact is missing.");
    return warnings;
  }
  if (!artifact) {
    warnings.push("Index artifact could not be parsed.");
    return warnings;
  }
  if (!artifact.generatedAt) {
    warnings.push("Index artifact is missing generatedAt.");
  }
  if (!artifact.sourceRevision) {
    warnings.push("Index artifact is missing sourceRevision.");
  }
  if (!artifact.maintenance) {
    warnings.push("Index artifact is missing deterministic maintenance metadata; regenerate it with its builder.");
  }
  return warnings;
}

function shardingSummary(maintenance: Record<string, unknown> | null): Record<string, unknown> {
  const sharding = maintenance && typeof maintenance.sharding === "object" ? (maintenance.sharding as Record<string, unknown>) : null;
  const shards = Array.isArray(sharding?.shards)
    ? sharding.shards.map((shard) => {
        const entry = shard && typeof shard === "object" ? (shard as Record<string, unknown>) : {};
        return {
          shardId: entry.shardId ?? null,
          startRecord: entry.startRecord ?? null,
          endRecordExclusive: entry.endRecordExclusive ?? null,
          recordCount: entry.recordCount ?? null,
          sha256: entry.sha256 ?? null,
        };
      })
    : [];

  return {
    strategy: sharding?.strategy ?? "missing",
    targetRecordsPerShard: sharding?.targetRecordsPerShard ?? null,
    shardCount: sharding?.shardCount ?? shards.length,
    shards,
  };
}

function semanticSupportSummary(maintenance: Record<string, unknown> | null): Record<string, unknown> {
  const semanticSupport =
    maintenance && typeof maintenance.semanticSupport === "object" ? (maintenance.semanticSupport as Record<string, unknown>) : null;
  return {
    status: semanticSupport?.status ?? "metadata-ready",
    embeddingsGenerated: semanticSupport?.embeddingsGenerated ?? false,
    vectorStoreGenerated: semanticSupport?.vectorStoreGenerated ?? false,
    deterministicPath:
      semanticSupport?.deterministicPath ??
      "Semantic chunks, embeddings, and vector stores should be produced by a deterministic builder before use; do not maintain them by hand.",
    bootPolicy:
      semanticSupport?.bootPolicy ??
      "Boot context may include semantic availability metadata only; embedding vectors and semantic chunks remain query-only.",
    suggestedActivation: Array.isArray(semanticSupport?.suggestedActivation) ? semanticSupport.suggestedActivation : [],
  };
}
