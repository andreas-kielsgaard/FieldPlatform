# Tool: Map Affected Surfaces

Tool ID: `map-affected-surfaces`

Script: `tools/agent/map-affected-surfaces.ts`

## Purpose

Summarize components, routes, concepts, schemas, accessors, policies, mocks, tests, docs, and ledgers affected by a change.

## Expected Invocation

```powershell
npx tsx tools/agent/map-affected-surfaces.ts
```

Optional parameters:

- `--changed`: use git changes as input.
- `--from "<ref>"`: compare against a git ref.
- `--json`: emit machine-readable output.

## Output

Expected output includes affected-surface groups and likely docs/maps that need review.

## Does Not

This tool does not replace human/agent judgment about meaning or completeness.
