# Tool: State Consumer Search

Tool ID: `state-consumer-search`

Script: `tools/agent/state-consumer-search.ts`

## Purpose

Find state owners, consumers, update paths, derived values, duplicated state, URL state, cache state, and shared-store usage.

## Expected Invocation

```powershell
npx tsx tools/agent/state-consumer-search.ts "<state-name-or-concept>"
```

Optional parameters:

- `--scope "<path>"`: restrict search scope.
- `--json`: emit machine-readable output.

## Output

Expected output includes state definitions, consumers, setters/update paths, route/search-param usage, and suspected duplicated derived state.

## Does Not

This tool does not choose the correct state layer. Use state-management instructions for that decision.
