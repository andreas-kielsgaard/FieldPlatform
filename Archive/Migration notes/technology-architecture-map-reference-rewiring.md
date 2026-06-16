# Technology Architecture Map Reference Rewiring

## Status

Current source-map ambiguity closed for the migrated scaffold.

## Note

`docs/agent/source-map.md` was renamed conceptually to `docs/agent/technology-architecture-map.md`, then moved into `docs/agent/project-setup/technology-architecture-map.md` as project-specific setup material.

Most task-mode scaffold references to the old source-map concept have been rewired to either `project-setup/technology-architecture-map.md` or `structural-maintenance/structural-maintenance-usage.instructions.md`.

The remaining ambiguity was closed by splitting the concepts:

- `docs/agent/agent-os-map.md` is the lightweight Agent OS orientation router.
- `docs/agent/structural-indexes/source-directory-map.json` is generated source-tree directory data.
- `source-map-indexer` refreshes the generated source-directory map.
- `source-map-query` returns bounded directory/file-name slices for a requested directory scope.
- `build-source-map` was removed from the active scaffold.

Historical migration notes may still mention `source-map` when describing the old ambiguity. Active scaffold references should not point to `docs/agent/source-map.md`.
