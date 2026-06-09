# Tool: Map Dependencies

Tool ID: `map-deps`

Script: `tools/agent/map-deps.ts`

## Purpose

Generate or inspect dependency graph data, import direction, cycles, orphaned modules, and cross-layer coupling.

## Expected Invocation

```powershell
npx tsx tools/agent/map-deps.ts
```

Optional parameters:

- `--scope "<path>"`: restrict graph scope.
- `--json`: emit machine-readable output.

## Output

Expected output includes dependency edges, cycles, high-risk imports, and structural-index updates.

## Does Not

This tool does not determine whether a dependency exception is acceptable.
