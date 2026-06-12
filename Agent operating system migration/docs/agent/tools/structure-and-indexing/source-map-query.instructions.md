# Tool: Source Map Query

Tool ID: `source-map-query`

Script: `tools/agent/structure-and-indexing/source-map-query.ts`

## Purpose

Return child directory names and file names for a requested directory scope from `docs/agent/structural-indexes/source-directory-map.json`.

## Expected Invocation

```powershell
npx tsx tools/agent/structure-and-indexing/source-map-query.ts "<directory-scope>"
```

Optional parameters:

- `--depth <n>`: limit returned directory depth.
- `--include-files`: include file names when omitted by default policy.
- `--json`: emit machine-readable output.

## Output

Expected output includes the requested directory scope, child directories, file names allowed for that scope, freshness notes, and uncertainty when the map is stale or missing.

## Does Not

This tool does not return file contents, replace targeted file reads, or require agents to ingest the entire source tree.
