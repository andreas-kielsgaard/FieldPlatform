
# Index: fixture-scenario-index

Stratum: 1 generated or maintained substrate.

## Capability

Fixture, mock, seed, scenario, demo-data, and example artifacts with represented term hints.

## Use When

Use when mock-data, scenario, fixture, or demo-data impact evidence is needed.

## Responsible Object

- Builder: `build-fixture-scenario-index`
- Script: `tool-implementations/indexes/build-fixture-scenario-index.ts`
- Artifact: `tool-maintained-files/indexes/fixture-scenario-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-fixture-scenario-index.ts --json
npx --yes tsx tool-implementations/indexes/build-fixture-scenario-index.ts --check --json
```

## Output Boundary

Project-specific fixture registries may require custom parsing later. The index is evidence, not semantic authority.
