# Tool: Authority Surface Search

Tool ID: `authority-surface-search`

Script: `tools/agent/authority-and-contracts/authority-surface-search.ts`

## Purpose

Find where a rule, convention, source-of-truth statement, or expectation appears across maintained artifacts and classify likely authority roles.

## Expected Invocation

```powershell
npx tsx tools/agent/authority-and-contracts/authority-surface-search.ts "<term-or-rule>"
```

Optional parameters:

- `--surface "<instructions|maps|docs|tests|schemas|tools|generated|implementation>"`: narrow searched surfaces.
- `--path "<path>"`: restrict search to a folder or file.
- `--json`: emit machine-readable output.

## Output

Expected output includes matching surfaces grouped as likely authoritative, explanatory, implementation, generated or derived, test expectation, provisional, stale, conflicting, or unclear.

## Does Not

This tool does not make the authority decision, resolve conflicting active instructions, or prove ownership when artifacts do not encode it.
