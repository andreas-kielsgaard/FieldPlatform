# Tool: Check Docs

Tool ID: `check-docs`

Script: `tools/agent/validation-and-drift/check-docs.ts`

## Purpose

Check documentation freshness, broken references, missing map updates, and instruction files that point to retired or missing control surfaces.

## Expected Invocation

```powershell
npx tsx tools/agent/validation-and-drift/check-docs.ts
```

Optional parameters:

- `--changed`: check only changed files and related docs.
- `--json`: emit machine-readable output.

## Output

Expected output includes stale docs, missing map updates, broken links, and documentation surfaces likely affected by changed files.

## Does Not

This tool does not rewrite docs automatically unless explicitly extended to do so.
