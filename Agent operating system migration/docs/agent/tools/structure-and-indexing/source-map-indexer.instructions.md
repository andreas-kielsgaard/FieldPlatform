# Tool: Source Map Indexer

Tool ID: `source-map-indexer`

Script: `tools/agent/structure-and-indexing/source-map-indexer.ts`

## Purpose

Update generated `docs/agent/structural-indexes/source-directory-map.json` from the current repository directory structure.

## Expected Invocation

```powershell
npx tsx tools/agent/structure-and-indexing/source-map-indexer.ts
```

Optional parameters:

- `--check`: report stale or missing directory-map entries without writing.
- `--root "<path>"`: override the repository root for indexing.
- `--json`: emit machine-readable output.

## Output

Expected output includes `source-directory-map.json` freshness, indexed directory scopes, omitted paths, and changed or stale entries.

## Does Not

This tool does not create semantic source authority, replace project architecture maps, or update Agent OS instructions automatically.
