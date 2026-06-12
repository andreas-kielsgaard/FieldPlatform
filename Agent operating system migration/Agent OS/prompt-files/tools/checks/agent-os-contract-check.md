# agent-os-contract-check

Reusable Agent OS contract check.

Use this after changing Agent OS maps, index rows, tool rows, semantic-layer rows, semantic files, scripts, generated artifact locations, or maintenance commands.

Run:

```powershell
npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json
```

Checks include:

- active index catalog alignment with `index-map.md` and `index-manifest.json`
- semantic file, builder, and artifact coverage for active indexes
- Stratum 2 tool-map rows with matching semantic files and operator scripts
- Phase 3 semantic map rows with matching active semantic files, scripts, and artifacts
- Phase 4 semantic chunk artifact shape, including schema v2, record count, builder-owned maintenance, and no-embedding/no-vector status
- reserved embedding/vector surfaces staying reserved unless deliberately implemented

Boundaries:

- This check verifies structural contract alignment only.
- It does not prove semantic correctness of the prompt guidance or generated records.
