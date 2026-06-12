
# Operator: component-query

Stratum: 2 deterministic query handle.

## Capability

Query component definitions, consumers, stories, tests, props hints, and nearby component names.

## Use When

Use when component reuse, extraction, or UI impact evidence is needed.

## Substrate

component-index

## Handles

definition, consumers, stories, tests, props hints

## Execution

```powershell
npx --yes tsx tool-implementations/operators/component-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
