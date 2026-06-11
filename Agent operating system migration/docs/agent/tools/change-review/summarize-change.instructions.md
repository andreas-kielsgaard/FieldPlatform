# Tool: Summarize Change

Tool ID: `summarize-change`

Script: `tools/agent/change-review/summarize-change.ts`

## Purpose

Generate a structured summary of changed files, affected surfaces, checks, docs updates, debt, experiments, and open risks.

## Expected Invocation

```powershell
npx tsx tools/agent/change-review/summarize-change.ts
```

Optional parameters:

- `--from "<ref>"`: compare against a git ref.
- `--json`: emit machine-readable output.

## Output

Expected output includes a draft post-change report aligned with review-before-commit expectations.

## Does Not

This tool does not replace agent review or user-facing judgment.
