# Tool: Query Data Model Index

Tool ID: `query-data-model-index`

Script: `tools/agent/index-access/query-data-model-index.ts`

## Purpose

Return a bounded slice of `docs/agent/generated-indexes/data-model-map.md` for requested domain entities, value objects, relationships, lifecycle states, and model consumers.

## Expected Invocation

```powershell
npx tsx tools/agent/index-access/query-data-model-index.ts "<query-or-target>"
```

Optional parameters:

- `--scope "<surface-or-directory>"`: narrow the query scope.
- `--freshness`: include known freshness or staleness evidence.
- `--limit <n>`: cap returned entries.
- `--json`: emit machine-readable output.

## Output

Expected output includes matching index entries, source or producer hints, bounded related surfaces, freshness notes, and uncertainty notes when the index may be stale or incomplete.

## Does Not

This tool does not make the generated index semantic authority, ingest the full index by default, or decide what repository change should be made.
