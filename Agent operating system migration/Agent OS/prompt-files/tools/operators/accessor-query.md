
# Operator: accessor-query

Stratum: 2 deterministic query handle.

## Capability

Query accessor/API-like definitions, callers, read/write hints, imports, and cache hints.

## Use When

Use when API/accessor boundary evidence or data access consumers are needed.

## Substrate

accessor-index

## Handles

callers, input/output hints, read/write, cache/invalidation notes

## Execution

```powershell
npx --yes tsx tool-implementations/operators/accessor-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
