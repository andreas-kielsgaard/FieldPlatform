# Technology Architecture Map Reference Rewiring

## Status

Deferred.

## Note

`docs/agent/source-map.md` has been renamed conceptually to `docs/agent/technology-architecture-map.md`.

Existing scaffold references to the old source-map concept were intentionally not rewired in this pass. They should be reviewed after the source-maintenance layer is structurally settled.

Known reference areas to revisit:

- `Agent operating system migration/migration_agents.md`
- task-mode usage and task-mode instruction files that still orient through `docs/agent/source-map.md`
- task-mode map language that refers to source-map mode or source-map ownership changes
- source-map-related tooling names, including `build-source-map`
- migration documentation notes that still describe source-map documentation

The follow-up should decide whether old source-map references point to `technology-architecture-map.md`, source-maintenance usage, or a more specific map or behavior file.
