
# Index: schema-shape-index

Stratum: 1 generated or maintained substrate.

## Capability

Schema-like declarations, validators, fields, relations, and generated type hints.

## Use When

Use when schema, persistence, data-model, or fixture-shape drift evidence is needed.

## Responsible Object

- Builder: `build-schema-shape-index`
- Script: `tool-implementations/indexes/build-schema-shape-index.ts`
- Artifact: `tool-maintained-files/indexes/schema-shape-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-schema-shape-index.ts --json
npx --yes tsx tool-implementations/indexes/build-schema-shape-index.ts --check --json
```

## Output Boundary

It does not replace database, ORM, validator, or migration-specific introspection. The index is evidence, not semantic authority.
