# agent-os-contract-check

Reusable Agent OS contract check.

Legacy inactive: retained for the retired generated index/query pipeline. Do not use for ordinary development, orientation, or verification.

Use this only for explicit legacy Agent OS index/tool maintenance after changing legacy maps, index rows, tool rows, semantic-layer rows, semantic files, scripts, generated artifact locations, or maintenance commands.

Run:

```powershell
npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json
```

Checks include:

- legacy index catalog alignment with `prompt-files/agent-attention-system/maps/index-map.md` and `tool-maintained-files/indexes/index-manifest.json`
- semantic file, builder, and artifact coverage for legacy indexes
- Stratum 2 `prompt-files/agent-attention-system/maps/tool-map.md` rows with matching semantic files and operator scripts
- Phase 3 `prompt-files/agent-attention-system/maps/semantic-map.md` rows with matching active semantic files, scripts, and artifacts
- Phase 4 semantic chunk artifact shape, including schema v2, record count, builder-owned maintenance, and no-embedding/no-vector status
- reserved embedding/vector surfaces staying reserved unless deliberately implemented
- generated artifact portability, including no structured machine-specific absolute paths in tool-maintained JSON

Boundaries:

- This check verifies structural contract alignment only.
- It does not prove semantic correctness of the prompt guidance or generated records.
