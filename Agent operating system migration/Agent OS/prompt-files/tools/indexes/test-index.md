
# Index: test-index

Stratum: 1 generated or maintained substrate.

## Capability

Test and story files, imports, likely subjects, fixture references, and route/component hints.

## Use When

Use when selecting regression surfaces or previewing test relation evidence.

## Responsible Object

- Builder: `build-test-index`
- Script: `tool-implementations/indexes/build-test-index.ts`
- Artifact: `tool-maintained-files/indexes/test-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-test-index.ts --json
npx --yes tsx tool-implementations/indexes/build-test-index.ts --check --json
```

## Output Boundary

It does not run tests or prove semantic coverage. The index is evidence, not semantic authority.
