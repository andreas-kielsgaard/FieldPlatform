
# Index: change-index

Stratum: 1 generated or maintained substrate.

## Capability

Current git status, changed files, artifact kind hints, and changed surface hints.

## Use When

Use as the diff-aware entrypoint for affected-surface mapping and change reports.

## Responsible Object

- Builder: `build-change-index`
- Script: `tool-implementations/indexes/build-change-index.ts`
- Artifact: `tool-maintained-files/indexes/change-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-change-index.ts --json
npx --yes tsx tool-implementations/indexes/build-change-index.ts --check --json
```

## Output Boundary

It reflects only the current working tree and available git metadata. The index is evidence, not semantic authority.
