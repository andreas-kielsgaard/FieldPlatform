
# Operator: route-query

Stratum: 2 deterministic query handle.

## Capability

Query route paths, pages, layouts, params, route families, and route-like files.

## Use When

Use when route-aware placement or impact evidence is needed.

## Substrate

route-index

## Handles

route, file, params, family, handler

## Execution

```powershell
npx --yes tsx tool-implementations/operators/route-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
