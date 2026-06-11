# Tool: Audience Surface Check

Tool ID: `audience-surface-check`

Script: `tools/agent/authority-and-contracts/audience-surface-check.ts`

## Purpose

Check whether maintained content belongs in agent-facing instructions, human-facing documentation, product copy, developer notes, tests, examples, generated output, tool output, or migration-only notes.

## Expected Invocation

```powershell
npx tsx tools/agent/authority-and-contracts/audience-surface-check.ts "<path>"
```

Optional parameters:

- `--range "<start:end>"`: inspect a line range.
- `--intended "<agent|human|product|developer|tool|test|migration>"`: state the expected audience.
- `--json`: emit machine-readable output.

## Output

Expected output includes likely audience classification, misplaced agent-critical guidance, human-only explanation in runtime prompt surfaces, mixed-audience warnings, and suggested target surface type.

## Does Not

This tool does not rewrite content, decide product copy, or override the active instruction hierarchy.
