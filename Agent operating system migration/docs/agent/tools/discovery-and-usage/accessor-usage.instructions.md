# Tool: Accessor Usage

Tool ID: `accessor-usage`

Script: `tools/agent/discovery-and-usage/accessor-usage.ts`

## Purpose

Find callers, consumers, imports, and related access patterns for an accessor, API boundary, query, mutation, or service method.

## Expected Invocation

```powershell
npx tsx tools/agent/discovery-and-usage/accessor-usage.ts "<accessor-or-api-name>"
```

Optional parameters:

- `--json`: emit machine-readable output.
- `--paths "<glob-or-path>"`: restrict search scope.

## Output

Expected output includes matching files, callsites, import paths, likely owners, and related tests or examples.

## Does Not

This tool does not decide whether an accessor design is correct. Use its output as evidence for impact review.
