
# Operator: retrieve-slice

Stratum: 2 deterministic query handle.

## Capability

Retrieve a bounded file slice by line range without loading the whole file.

## Use When

Use when exact local context is needed and the whole file would be unnecessary prompt weight.

## Substrate

files plus indexes

## Handles

file path, start line, end line, limit

## Execution

```powershell
npx --yes tsx tool-implementations/operators/retrieve-slice.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
