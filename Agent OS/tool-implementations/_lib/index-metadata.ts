import { createHash } from "node:crypto";
import { stableStringify } from "./json.ts";
import type { IndexDefinition, IndexMaintenanceMetadata, IndexShardMetadata } from "./types.ts";

const DEFAULT_RECORDS_PER_SHARD = 500;

export function buildIndexMaintenanceMetadata(definition: IndexDefinition, records: Record<string, unknown>[]): IndexMaintenanceMetadata {
  const targetRecordsPerShard = DEFAULT_RECORDS_PER_SHARD;
  const shards = buildRecordShards(records, targetRecordsPerShard);
  const implementationArea = definition.artifactPath.startsWith("tool-maintained-files/semantic/")
    ? "tool-implementations/semantic"
    : "tool-implementations/indexes";

  return {
    metadataVersion: 1,
    maintainedBy: definition.producer,
    manualMaintenance: false,
    refreshCommand: `npx --yes tsx ${implementationArea}/${definition.producer}.ts --json`,
    checkCommand: `npx --yes tsx ${implementationArea}/${definition.producer}.ts --check --json`,
    sharding: {
      strategy: "record-count",
      targetRecordsPerShard,
      shardCount: shards.length,
      shards,
    },
    semanticSupport: {
      status: "metadata-ready",
      embeddingsGenerated: false,
      vectorStoreGenerated: false,
      deterministicPath:
        "Legacy semantic chunks, embeddings, and vector stores should be produced by a deterministic builder only during explicit legacy maintenance; do not maintain them by hand.",
      bootPolicy: "Legacy semantic availability metadata is not ordinary boot context; embedding vectors and semantic chunks remain inactive.",
      suggestedActivation: [
        "Do not use semantic retrieval during ordinary development.",
        "Use only when an explicit legacy Agent OS semantic/index maintenance task calls for it.",
      ],
    },
  };
}

function buildRecordShards(records: Record<string, unknown>[], targetRecordsPerShard: number): IndexShardMetadata[] {
  if (records.length === 0) {
    return [];
  }

  const shards: IndexShardMetadata[] = [];
  for (let startRecord = 0; startRecord < records.length; startRecord += targetRecordsPerShard) {
    const shardRecords = records.slice(startRecord, startRecord + targetRecordsPerShard);
    const endRecordExclusive = startRecord + shardRecords.length;
    const shardNumber = shards.length + 1;
    shards.push({
      shardId: `records-${String(shardNumber).padStart(4, "0")}`,
      startRecord,
      endRecordExclusive,
      recordCount: shardRecords.length,
      sha256: hashJson(shardRecords),
    });
  }

  return shards;
}

function hashJson(value: unknown): string {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}
