# Index: index-manifest

## Capability

Compact boot-aware manifest for active Stratum 1 evidence indexes.

## Use When

- Agent OS is initiated and needs index awareness without loading raw generated records.
- An agent needs freshness, size, hash, record-count, tier, or first-query guidance for an index.
- Index trust or context-budget decisions depend on knowing which indexes are boot-core, strong cues, or specialized cues.

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

This manifest is mandatory boot context. Raw generated index records remain query-only unless selected tools, skills, modes, or behaviors make them useful.

Shard metadata, semantic-readiness metadata, and maintenance commands are produced by index builders. Do not maintain them by hand.

Embedding chunks, embedding vectors, and vector-store payloads are not boot context. The manifest may expose whether support exists and which deterministic path should maintain it.

The manifest does not prove semantic authority, ownership, completeness, or absence. It only summarizes index substrates and their freshness evidence.
