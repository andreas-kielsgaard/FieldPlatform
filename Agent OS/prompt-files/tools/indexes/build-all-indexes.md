# Index Maintenance: build-all-indexes

Legacy inactive: retained for the retired Agent OS generated index/query pipeline. Do not use for ordinary development; use only when an explicit legacy Agent OS index/tool maintenance task calls for it.


## Capability

Legacy maintenance command for refreshing or checking the retired Stratum 1 index set and `index-manifest`.

## Use When

- An explicit legacy Agent OS index-maintenance task needs more than one retired index refreshed or checked.
- Manifest rows report missing or legacy maintenance metadata during legacy maintenance.
- Shard hashes, record counts, generated timestamps, or semantic-support metadata need regeneration for a legacy artifact.
- A legacy maintenance task needs a single bounded freshness check for the retired index layer.

## Execution

Script: `tool-implementations/indexes/build-all-indexes.ts`

The script runs builders from the explicit legacy index catalog, with `build-index-manifest` last. It supports:

- `--root`
- `--check`
- `--json`
- `--commit-view`, which passes committed-baseline mode through to `change-index` only

## Boundaries

This command is an index-maintenance helper, not a semantic authority and not a query operator.

It may write generated index artifacts unless `--check` is used. It should not include future semantic chunk, embedding, or vector-store builders unless a future replacement design explicitly reintroduces them.

Do not run this command for ordinary local work or normal commit preparation. Use `--commit-view` only during explicit legacy index maintenance when `change-index.json` should describe the committed baseline instead of local dirtiness. Other legacy indexes should be committed only when the task explicitly includes them.
