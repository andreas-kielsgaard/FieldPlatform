
# Index: accessor-index

Stratum: 1 generated or maintained substrate.

## Capability

Accessor/API-like definitions, imports, read/write hints, cache hints, and boundary names.

## Use When

Use when API/accessor consumers, boundary shape, or data access impact evidence is needed.

## Responsible Object

- Builder: `build-accessor-index`
- Script: `tool-implementations/indexes/build-accessor-index.ts`
- Artifact: `tool-maintained-files/indexes/accessor-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-accessor-index.ts --json
npx --yes tsx tool-implementations/indexes/build-accessor-index.ts --check --json
```

## Output Boundary

It cannot prove runtime behavior, permissions, caching semantics, or compatibility promises. The index is evidence, not semantic authority.
