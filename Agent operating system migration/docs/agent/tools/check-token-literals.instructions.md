# Tool: Check Token Literals

Tool ID: `check-token-literals`

Script: `tools/agent/check-token-literals.ts`

## Purpose

Find hardcoded colors, spacing, typography, status styles, and other design-token literals outside approved design-system sources.

## Expected Invocation

```powershell
npx tsx tools/agent/check-token-literals.ts
```

Optional parameters:

- `--scope "<path>"`: restrict search scope.
- `--json`: emit machine-readable output.

## Output

Expected output includes literal values, file locations, and suggested token/control-surface owners.

## Does Not

This tool does not judge whether a visual design is good. It detects drift from tokenized styling.
