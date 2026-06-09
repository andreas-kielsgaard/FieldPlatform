# Tool: Map Components

Tool ID: `map-components`

Script: `tools/agent/map-components.ts`

## Purpose

Generate or refresh component structural index data for shared components, consumers, examples, and tests.

## Expected Invocation

```powershell
npx tsx tools/agent/map-components.ts
```

Optional parameters:

- `--check`: report stale output without writing.
- `--json`: emit machine-readable output.

## Output

Expected output includes component index data and notes about missing or stale registry entries.

## Does Not

This tool does not decide component ownership or API quality.
