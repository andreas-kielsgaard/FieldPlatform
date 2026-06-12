
# Operator: test-query

Stratum: 2 deterministic query handle.

## Capability

Query tests and stories by source, symbol, route, fixture, or likely tested subject.

## Use When

Use when selecting relevant tests or previewing regression surfaces.

## Substrate

test-index

## Handles

tests by source, tests by symbol, stories by component, e2e by route

## Execution

```powershell
npx --yes tsx tool-implementations/operators/test-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
