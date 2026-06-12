
# Operator: schema-query

Stratum: 2 deterministic query handle.

## Capability

Query schema-like declarations, field hints, validators, generated type hints, and relation hints.

## Use When

Use when schema, model, persistence, or fixture-shape evidence is needed.

## Substrate

schema-shape-index

## Handles

entity shape, field usage, validator mapping, generated type mapping

## Execution

```powershell
npx --yes tsx tool-implementations/operators/schema-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
