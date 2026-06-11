# Tool: Find Term

Tool ID: `find-term`

Script: `tools/agent/discovery-and-usage/find-term.ts`

## Purpose

Search canonical terms, aliases, avoided names, UI literals, route labels, fixture keys, identifiers, and nearby language.

## Expected Invocation

```powershell
npx tsx tools/agent/discovery-and-usage/find-term.ts "<term-or-phrase>"
```

Optional parameters:

- `--fuzzy`: include approximate matches.
- `--json`: emit machine-readable output.

## Output

Expected output includes canonical matches, aliases, literal occurrences, identifier matches, likely concept owners, and unresolved language entries.

## Does Not

This tool does not choose the correct term. It provides evidence for naming decisions.
