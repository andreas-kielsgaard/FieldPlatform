
# Index: route-index

Stratum: 1 generated or maintained substrate.

## Capability

Route-like files, inferred route paths, params, families, pages, layouts, and handlers.

## Use When

Use when route-aware impact or page placement evidence is needed.

## Responsible Object

- Builder: `build-route-index`
- Script: `tool-implementations/indexes/build-route-index.ts`
- Artifact: `tool-maintained-files/indexes/route-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-route-index.ts --json
npx --yes tsx tool-implementations/indexes/build-route-index.ts --check --json
```

## Output Boundary

Framework-specific route behavior may need source inspection. The index is evidence, not semantic authority.
