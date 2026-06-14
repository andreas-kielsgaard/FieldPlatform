
# Index: change-index

Stratum: 1 generated or maintained substrate.

## Capability

Current git status, changed files, artifact kind hints, changed surface hints, and optional committed-baseline mode for commit preparation.

## Use When

Use as the diff-aware entrypoint for affected-surface mapping and change reports.

Use commit view when `change-index.json` is being prepared for a commit and should not preserve unrelated local working-tree dirtiness.

## Responsible Object

- Builder: `build-change-index`
- Script: `tool-implementations/indexes/build-change-index.ts`
- Artifact: `tool-maintained-files/indexes/change-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-change-index.ts --json
npx --yes tsx tool-implementations/indexes/build-change-index.ts --check --json
npx --yes tsx tool-implementations/indexes/build-change-index.ts --commit-view --json
```

## Output Boundary

Default output reflects the current working tree and available git metadata. Commit-view output intentionally represents the committed baseline and may contain no changed-file records.

The index is evidence, not semantic authority. After a commit, refresh default mode again if local uncommitted work should be represented in the local file.
