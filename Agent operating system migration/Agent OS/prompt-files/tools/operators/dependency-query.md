
# Operator: dependency-query

Stratum: 2 deterministic query handle.

## Capability

Query dependencies, dependents, import edges, cross-area edges, and rough boundary evidence.

## Use When

Use when placement, movement, boundary, or blast-radius evidence depends on import structure.

## Substrate

dependency-index

## Handles

dependencies, dependents, cross-area edges, importer, imported

## Execution

```powershell
npx --yes tsx tool-implementations/operators/dependency-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
