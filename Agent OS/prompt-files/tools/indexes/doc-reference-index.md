
# Index: doc-reference-index

Stratum: 1 generated or maintained substrate.

## Capability

Markdown links, headings, inline path references, inline IDs, and local existence hints.

## Use When

Use when documentation references, authority mentions, or stale docs evidence is needed.

## Responsible Object

- Builder: `build-doc-reference-index`
- Script: `tool-implementations/indexes/build-doc-reference-index.ts`
- Artifact: `tool-maintained-files/indexes/doc-reference-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-doc-reference-index.ts --json
npx --yes tsx tool-implementations/indexes/build-doc-reference-index.ts --check --json
```

## Output Boundary

External URLs and generated anchors may need manual review. The index is evidence, not semantic authority.
