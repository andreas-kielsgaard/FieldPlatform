# Tool: Update Data Model Index

Tool ID: `update-data-model-index`

Script: `tools/agent/index-access/update-data-model-index.ts`

## Purpose

Refresh generated `docs/agent/generated-indexes/data-model-map.md` data for domain entities, value objects, relationships, lifecycle states, and model consumers, or report that refresh is unavailable.

## Expected Invocation

```powershell
npx tsx tools/agent/index-access/update-data-model-index.ts
```

Optional parameters:

- `--check`: report whether the generated index appears stale without writing.
- `--scope "<surface-or-directory>"`: refresh or check a bounded scope when supported.
- `--json`: emit machine-readable output.

## Output

Expected output includes whether the index was refreshed, the generated artifact path, changed or stale sections, unavailable refresh reasons, and follow-up evidence needed from source files or manual authority surfaces.

## Does Not

This tool does not curate manual guidance, authorize generated-index semantics, or update task-mode or behavior instructions automatically.
