# Tool: Build Source Map

Tool ID: `build-source-map`

Script: `tools/agent/build-source-map.ts`

## Purpose

Refresh source-map data and structural-index awareness after top-level structure, generated indexes, task-mode structure, or major ownership boundaries change.

## Expected Invocation

```powershell
npx tsx tools/agent/build-source-map.ts
```

Optional parameters:

- `--check`: report stale or missing entries without writing.
- `--json`: emit machine-readable output.

## Output

Expected output includes refreshed source-map metadata, changed structural index references, and any missing canonical directory entries.

## Does Not

This tool does not determine product meaning or approve source-of-truth changes.
