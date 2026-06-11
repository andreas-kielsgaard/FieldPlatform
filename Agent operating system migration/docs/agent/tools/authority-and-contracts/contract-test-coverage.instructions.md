# Tool: Contract Test Coverage

Tool ID: `contract-test-coverage`

Script: `tools/agent/authority-and-contracts/contract-test-coverage.ts`

## Purpose

Check whether existing tests cover changed internal processing and consumer-visible contract dimensions for a maintained element.

## Expected Invocation

```powershell
npx tsx tools/agent/authority-and-contracts/contract-test-coverage.ts "<target>"
```

Optional parameters:

- `--change "<summary>"`: describe the intended change.
- `--dimension "<inputs|outputs|errors|effects|ordering|timing|compatibility|public-behavior>"`: narrow contract dimensions.
- `--json`: emit machine-readable output.

## Output

Expected output includes relevant unit tests, contract tests, integration tests, fixtures, scenarios, snapshots, covered contract dimensions, weak or missing coverage, and candidate test surfaces to update or add.

## Does Not

This tool does not prove test sufficiency, weaken tests, update tests automatically, or infer intended behavior when requirements are ambiguous.
