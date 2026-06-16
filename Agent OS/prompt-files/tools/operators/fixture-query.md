
# Operator: fixture-query

Stratum: 2 deterministic query handle.

## Capability

Query fixture, mock, seed, scenario, demo, and example artifacts and represented concepts.

## Use When

Use when fixture or scenario consumers and concept usage need bounded evidence.

## Substrate

fixture-scenario-index

## Handles

scenario usage, fixture consumers, concept usage, changed fixture impact

## Execution

```powershell
npx --yes tsx tool-implementations/operators/fixture-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
