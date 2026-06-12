# Tool: Test Surface Selection

Tool ID: `test-surface-selection`

Script: `tools/agent/validation-and-drift/test-surface-selection.ts`

## Purpose

Given a changed target or change summary, suggest relevant test surfaces, likely commands or categories, coverage gaps, and residual uncertainty.

## Expected Invocation

```powershell
npx tsx tools/agent/validation-and-drift/test-surface-selection.ts "<target-or-change-summary>"
```

Optional parameters:

- `--profile "<exploratory|default|refactor|release>"`: include profile-sensitive execution guidance.
- `--changed`: use current git changes as input.
- `--json`: emit machine-readable output.

## Output

Expected output includes relevant unit, contract, integration, fixture, scenario, story, visual, smoke, or e2e surfaces; likely commands or categories; weak coverage; deferred checks; and uncertainty.

## Does Not

This tool does not prove test sufficiency, decide product behavior, weaken tests, or update tests automatically.
