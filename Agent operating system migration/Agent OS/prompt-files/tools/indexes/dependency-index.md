
# Index: dependency-index

Stratum: 1 generated or maintained substrate.

## Capability

Import, export-from, dynamic import, and require edges with rough cross-area hints.

## Use When

Use when boundary, movement, dependency direction, or blast-radius evidence is needed.

## Responsible Object

- Builder: `build-dependency-index`
- Script: `tool-implementations/indexes/build-dependency-index.ts`
- Artifact: `tool-maintained-files/indexes/dependency-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-dependency-index.ts --json
npx --yes tsx tool-implementations/indexes/build-dependency-index.ts --check --json
```

## Output Boundary

It does not resolve every package export, path alias, or runtime dependency. The index is evidence, not semantic authority.
