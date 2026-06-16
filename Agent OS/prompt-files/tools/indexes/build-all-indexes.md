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
- `--commit-view`, which passes committed-baseline mode through to `change-index` only

## Boundaries

This command is an index-maintenance helper, not a semantic authority and not a query operator.

It may write generated index artifacts unless `--check` is used. It should not include future semantic chunk, embedding, or vector-store builders unless those builders are explicitly promoted into the active index catalog.

For ordinary local work, use default working-tree mode so generated indexes remain locally authoritative. For commit preparation, use `--commit-view` when `change-index.json` should describe the committed baseline instead of local dirtiness. Other indexes should be committed only when their generated source shape matches the source files being committed.
