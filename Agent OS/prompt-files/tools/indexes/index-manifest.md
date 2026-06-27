# Index: index-manifest

Legacy inactive: retained for the retired Agent OS generated index/query pipeline. Do not use for ordinary development; use only when an explicit legacy Agent OS index/tool maintenance task calls for it.


## Capability

Legacy compact manifest for the retired Stratum 1 evidence indexes.

## Use When

- An explicit legacy Agent OS index-maintenance task needs index awareness without loading raw generated records.
- A legacy maintenance task needs freshness, size, hash, record-count, tier, or historical first-query guidance for an index.
- Legacy index trust or context-budget review depends on knowing which indexes were boot-core, strong cues, or specialized cues.

## Output Shape

The generated artifact is `tool-maintained-files/indexes/index-manifest.json`.

Each record summarizes one active evidence index with:

- tier
- artifact path
- semantic file
- builder
- suggested first operator
- record count
- byte size
- content hash
- shard count and per-shard record hashes
- deterministic maintenance commands
- semantic retrieval support status
- generated timestamp
- source revision
- freshness warnings

## Boundaries

This manifest is no longer mandatory boot context. Raw generated index records remain inactive unless an explicit legacy Agent OS index-maintenance task calls for them.

Shard metadata, semantic-readiness metadata, and maintenance commands are produced by index builders. Do not maintain them by hand.

Embedding chunks, embedding vectors, and vector-store payloads are not boot context. The manifest may expose whether support exists and which deterministic path should maintain it.

The manifest does not prove semantic authority, ownership, completeness, or absence. It only summarizes index substrates and their freshness evidence.
