# Tool: Scenario Usage

Tool ID: `scenario-usage`

Script: `tools/agent/scenario-usage.ts`

## Purpose

Find where mock scenarios, fixtures, seeds, demo data, examples, stories, and tests are used.

## Expected Invocation

```powershell
npx tsx tools/agent/scenario-usage.ts "<scenario-or-fixture-name>"
```

Optional parameters:

- `--json`: emit machine-readable output.
- `--paths "<glob-or-path>"`: restrict search scope.

## Output

Expected output includes scenario definitions, consumers, covered concepts, tests/examples, and likely mock-data-map updates.

## Does Not

This tool does not validate whether a scenario is realistic. Pair it with fixture validation and map review.
