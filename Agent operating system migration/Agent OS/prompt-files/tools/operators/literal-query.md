
# Operator: literal-query

Stratum: 2 deterministic query handle.

## Capability

Query string literals, policy-like values, status values, token-like values, and arbitrary style-like values.

## Use When

Use when literal drift or repeated hardcoded value evidence is needed.

## Substrate

literal-index

## Handles

string, role/capability, status, token-like, arbitrary value

## Execution

```powershell
npx --yes tsx tool-implementations/operators/literal-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
