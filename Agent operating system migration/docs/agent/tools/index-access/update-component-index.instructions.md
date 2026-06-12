# Tool: Update Component Index

Tool ID: `update-component-index`

Script: `tools/agent/index-access/update-component-index.ts`

## Purpose

Refresh generated `docs/agent/generated-indexes/component-registry.md` data for components, shared UI surfaces, consumers, examples, stories, and tests, or report that refresh is unavailable.

## Expected Invocation

```powershell
npx tsx tools/agent/index-access/update-component-index.ts
```

Optional parameters:

- `--check`: report whether the generated index appears stale without writing.
- `--scope "<surface-or-directory>"`: refresh or check a bounded scope when supported.
- `--json`: emit machine-readable output.

## Output

Expected output includes whether the index was refreshed, the generated artifact path, changed or stale sections, unavailable refresh reasons, and follow-up evidence needed from source files or manual authority surfaces.

## Does Not

This tool does not curate manual guidance, authorize generated-index semantics, or update task-mode or behavior instructions automatically.
