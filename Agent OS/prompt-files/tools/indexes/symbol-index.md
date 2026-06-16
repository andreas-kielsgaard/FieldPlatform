
# Index: symbol-index

Stratum: 1 generated or maintained substrate.

## Capability

Exported, imported, and locally declared symbols from lightweight source scanning.

## Use When

Use when symbol recall, definitions, imports, exports, or likely consumers are the expensive part of the task.

## Responsible Object

- Builder: `build-symbol-index`
- Script: `tool-implementations/indexes/build-symbol-index.ts`
- Artifact: `tool-maintained-files/indexes/symbol-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-symbol-index.ts --json
npx --yes tsx tool-implementations/indexes/build-symbol-index.ts --check --json
```

## Output Boundary

Regex scanning is not compiler authority and cannot prove semantic equivalence. The index is evidence, not semantic authority.
