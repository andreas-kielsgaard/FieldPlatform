
# Index: component-index

Stratum: 1 generated or maintained substrate.

## Capability

PascalCase component definitions, consumers, stories, tests, and props hints.

## Use When

Use when UI reuse, component placement, or component impact evidence is needed.

## Responsible Object

- Builder: `build-component-index`
- Script: `tool-implementations/indexes/build-component-index.ts`
- Artifact: `tool-maintained-files/indexes/component-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-component-index.ts --json
npx --yes tsx tool-implementations/indexes/build-component-index.ts --check --json
```

## Output Boundary

It may include non-component PascalCase symbols and does not judge abstraction quality. The index is evidence, not semantic authority.
