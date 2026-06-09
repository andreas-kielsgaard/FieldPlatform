# Tool: Rename Impact

Tool ID: `rename-impact`

Script: `tools/agent/rename-impact.ts`

## Purpose

Identify likely impacted files and control surfaces for a concept, identifier, route label, fixture key, accessor, or UI term rename.

## Expected Invocation

```powershell
npx tsx tools/agent/rename-impact.ts "<term-or-identifier>"
```

Optional parameters:

- `--from "<old-name>" --to "<new-name>"`: compare explicit rename.
- `--json`: emit machine-readable output.

## Output

Expected output includes identifiers, UI literals, route labels, fixtures, tests, accessors, docs, and structural indexes likely affected.

## Does Not

This tool does not perform the rename unless explicitly extended to do so.
