# Index Maintenance: build-all-indexes

## Capability

Deterministic maintenance command for refreshing or checking the active Stratum 1 index set and `index-manifest`.

## Use When

- More than one index may be stale.
- Manifest rows report missing or legacy maintenance metadata.
- Shard hashes, record counts, generated timestamps, or semantic-support metadata need regeneration.
- A task needs a single bounded freshness check for the active index layer.

## Execution

Script: `tool-implementations/indexes/build-all-indexes.ts`

The script runs builders from the explicit active index catalog, with `build-index-manifest` last. It supports:

- `--root`
- `--check`
- `--json`

## Boundaries

This command is an index-maintenance helper, not a semantic authority and not a query operator.

It may write generated index artifacts unless `--check` is used. It should not include future semantic chunk, embedding, or vector-store builders unless those builders are explicitly promoted into the active index catalog.
