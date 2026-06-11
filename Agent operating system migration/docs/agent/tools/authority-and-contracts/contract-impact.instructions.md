# Tool: Contract Impact

Tool ID: `contract-impact`

Script: `tools/agent/authority-and-contracts/contract-impact.ts`

## Purpose

Identify likely consumers, docs, maps, fixtures, examples, tests, and instructions affected by a change to a maintained element's promised behavior.

## Expected Invocation

```powershell
npx tsx tools/agent/authority-and-contracts/contract-impact.ts "<target>"
```

Optional parameters:

- `--change "<summary>"`: describe the intended change.
- `--dimension "<inputs|outputs|errors|effects|ordering|timing|compatibility|public-behavior>"`: narrow contract dimensions.
- `--json`: emit machine-readable output.

## Output

Expected output includes direct consumers, likely indirect consumers, contract dimensions that appear affected, stated expectations in docs/maps/instructions, relevant fixtures/examples/tests, and uncertainty gaps.

## Does Not

This tool does not decide whether a contract should change, guarantee complete dynamic usage discovery, or replace judgment about intended behavior.
