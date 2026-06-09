# Tool: Check Boundaries

Tool ID: `check-boundaries`

Script: `tools/agent/check-boundaries.ts`

## Purpose

Detect architecture boundary issues, dependency direction violations, layer leaks, and direct imports that bypass approved control surfaces.

## Expected Invocation

```powershell
npx tsx tools/agent/check-boundaries.ts
```

Optional parameters:

- `--scope "<path>"`: restrict checks to a subtree.
- `--json`: emit machine-readable output.

## Output

Expected output includes boundary violations, involved files, dependency direction notes, and suggested owning maps.

## Does Not

This tool does not refactor code or decide whether an exception is acceptable. Log accepted exceptions explicitly.
