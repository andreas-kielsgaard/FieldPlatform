
# Index: term-index

Stratum: 1 generated or maintained substrate.

## Capability

Domain terms, headings, identifiers, UI-looking literals, and nearby language.

## Use When

Use when naming, ontology, copy, or concept drift evidence is needed.

## Responsible Object

- Builder: `build-term-index`
- Script: `tool-implementations/indexes/build-term-index.ts`
- Artifact: `tool-maintained-files/indexes/term-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-term-index.ts --json
npx --yes tsx tool-implementations/indexes/build-term-index.ts --check --json
```

## Output Boundary

Canonical meaning and rename type remain semantic judgments. The index is evidence, not semantic authority.
