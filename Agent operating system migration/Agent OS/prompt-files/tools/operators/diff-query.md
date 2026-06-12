
# Operator: diff-query

Stratum: 2 deterministic query handle.

## Capability

Query changed files, status codes, artifact kinds, and changed area hints.

## Use When

Use as the deterministic entrypoint for review, affected surfaces, and report assembly.

## Substrate

change-index

## Handles

changed files, changed symbols by follow-up query, changed docs, generated artifacts

## Execution

```powershell
npx --yes tsx tool-implementations/operators/diff-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
