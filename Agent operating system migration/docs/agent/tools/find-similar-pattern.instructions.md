# Tool: Find Similar Pattern

Tool ID: `find-similar-pattern`

Script: `tools/agent/find-similar-pattern.ts`

## Purpose

Find repeated markup, class combinations, helper patterns, component compositions, or implementation shapes that may be extraction candidates.

## Expected Invocation

```powershell
npx tsx tools/agent/find-similar-pattern.ts "<pattern-or-description>"
```

Optional parameters:

- `--scope "<path>"`: restrict search scope.
- `--json`: emit machine-readable output.

## Output

Expected output includes similar locations, rough similarity rationale, repeated structures, and possible extraction boundaries.

## Does Not

This tool does not prove an abstraction should exist. It identifies candidates for review.
