# Tool: Validate Fixtures

Tool ID: `validate-fixtures`

Script: `tools/agent/validation-and-drift/validate-fixtures.ts`

## Purpose

Validate fixtures, seeds, scenarios, and mock responses against expected schemas, validators, or documented shape.

## Expected Invocation

```powershell
npx tsx tools/agent/validation-and-drift/validate-fixtures.ts
```

Optional parameters:

- `--scenario "<scenario-name>"`: validate a specific scenario.
- `--json`: emit machine-readable output.

## Output

Expected output includes validation failures, missing fields, stale enum/status values, and fixture/schema drift notes.

## Does Not

This tool does not decide whether a mock scenario is product-appropriate.
