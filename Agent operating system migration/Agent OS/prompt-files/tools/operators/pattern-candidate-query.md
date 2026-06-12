
# Operator: pattern-candidate-query

Stratum: 2 deterministic query handle.

## Capability

Query repeated component-like names, similar literals, nearby terms, and candidate pattern evidence.

## Use When

Use for candidate discovery before semantic reuse, branch, or extraction decisions.

## Substrate

component-index, literal-index, term-index

## Handles

similar names, repeated literals, nearby terms, candidate patterns

## Execution

```powershell
npx --yes tsx tool-implementations/operators/pattern-candidate-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
