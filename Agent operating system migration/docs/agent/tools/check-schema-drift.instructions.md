# Tool: Check Schema Drift

Tool ID: `check-schema-drift`

Script: `tools/agent/check-schema-drift.ts`

## Purpose

Compare schema, validators, generated types, accessors, fixtures, seeds, and mocks for likely drift after data or persistence changes.

## Expected Invocation

```powershell
npx tsx tools/agent/check-schema-drift.ts
```

Optional parameters:

- `--entity "<entity-name>"`: focus on one entity or relation.
- `--json`: emit machine-readable output.

## Output

Expected output includes mismatched fields, stale validators or mocks, missing generated artifacts, and affected accessors.

## Does Not

This tool does not decide conceptual model changes. Pair it with data-model review.
