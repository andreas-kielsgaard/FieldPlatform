
# Index: artifact-metadata-index

Stratum: 1 generated or maintained substrate.

## Capability

Artifact kind, generated/manual/hybrid hints, direct-edit policy hints, producer hints, audience, and authority-role hints.

## Use When

Use when maintenance path, generated artifact handling, or direct-edit safety evidence is needed.

## Responsible Object

- Builder: `build-artifact-metadata-index`
- Script: `tool-implementations/indexes/build-artifact-metadata-index.ts`
- Artifact: `tool-maintained-files/indexes/artifact-metadata-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-artifact-metadata-index.ts --json
npx --yes tsx tool-implementations/indexes/build-artifact-metadata-index.ts --check --json
```

## Output Boundary

Missing metadata is uncertainty, not evidence of manual authority. The index is evidence, not semantic authority.
