# Tool: Update Naming Index

Tool ID: `update-naming-index`

Script: `tools/agent/index-access/update-naming-index.ts`

## Purpose

Refresh generated `docs/agent/generated-indexes/naming-index.md` data for canonical terms, aliases, avoided names, literals, route labels, and identifiers, or report that refresh is unavailable.

## Expected Invocation

```powershell
npx tsx tools/agent/index-access/update-naming-index.ts
```

Optional parameters:

- `--check`: report whether the generated index appears stale without writing.
- `--scope "<surface-or-directory>"`: refresh or check a bounded scope when supported.
- `--json`: emit machine-readable output.

## Output

Expected output includes whether the index was refreshed, the generated artifact path, changed or stale sections, unavailable refresh reasons, and follow-up evidence needed from source files or manual authority surfaces.

## Does Not

This tool does not curate manual guidance, authorize generated-index semantics, or update task-mode or behavior instructions automatically.
