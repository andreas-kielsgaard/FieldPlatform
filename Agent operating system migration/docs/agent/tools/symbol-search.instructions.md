# Tool: Symbol Search

Tool ID: `symbol-search`

Script: `tools/agent/symbol-search.ts`

## Purpose

Search exported and imported symbols, types, functions, constants, classes, and module boundaries.

## Expected Invocation

```powershell
npx tsx tools/agent/symbol-search.ts "<symbol-or-pattern>"
```

Optional parameters:

- `--kind "<type|function|class|constant|export|import>"`: narrow symbol type.
- `--json`: emit machine-readable output.

## Output

Expected output includes definitions, imports, exports, re-exports, and likely dependent files.

## Does Not

This tool does not perform code edits or guarantee semantic equivalence after changes.
