
# Operator: artifact-query

Stratum: 2 deterministic query handle.

## Capability

Query generated/manual/hybrid hints, producer hints, direct-edit policy hints, audience, and authority role.

## Use When

Use when deciding whether to edit source, regenerate, or flag unknown maintenance path.

## Substrate

artifact-metadata-index

## Handles

maintenance-path, producer, direct-edit policy, audience, authority role

## Execution

```powershell
npx --yes tsx tool-implementations/operators/artifact-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
