
# Index: path-index

Stratum: 1 generated or maintained substrate.

## Capability

Files, directories, extensions, areas, inferred artifact types, and generated/manual hints.

## Use When

Use when an agent needs bounded source-tree orientation, artifact kind evidence, or a safer alternative to loading broad directory listings.

## Responsible Object

- Builder: `build-path-index`
- Script: `tool-implementations/indexes/build-path-index.ts`
- Artifact: `tool-maintained-files/indexes/path-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-path-index.ts --json
npx --yes tsx tool-implementations/indexes/build-path-index.ts --check --json
```

## Output Boundary

Path facts are not proof of ownership, audience, or semantic authority. The index is evidence, not semantic authority.
