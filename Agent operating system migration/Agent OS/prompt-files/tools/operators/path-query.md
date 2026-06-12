
# Operator: path-query

Stratum: 2 deterministic query handle.

## Capability

Query paths by path text, area, artifact kind, generated/manual hint, or changed-file context.

## Use When

Use when a bounded path or artifact lookup is cheaper than loading directory trees.

## Substrate

path-index

## Handles

path, area, artifact type, generated/manual hints, changed files

## Execution

```powershell
npx --yes tsx tool-implementations/operators/path-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
