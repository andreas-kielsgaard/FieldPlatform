# Generated Index Access Review

## Status

Deferred follow-up after initial tool-access wiring.

## Current Decision

Generated index files under `Agent operating system migration/docs/agent/generated-indexes/` are treated as generated lookup artifacts, not default orientation files or semantic authority. Task modes now route agents to bounded query tools and matching update tools rather than asking agents to load or edit whole generated-index Markdown files directly.

Each current generated index has a placeholder query/update API pair:

- `query-accessor-index` / `update-accessor-index`
- `query-component-index` / `update-component-index`
- `query-data-model-index` / `update-data-model-index`
- `query-naming-index` / `update-naming-index`
- `query-permissions-visibility-index` / `update-permissions-visibility-index`
- `query-routing-index` / `update-routing-index`
- `query-schema-index` / `update-schema-index`
- `query-state-management-index` / `update-state-management-index`

Query tools should return bounded slices with freshness and uncertainty notes. Update tools should refresh generated artifacts or report that refresh is unavailable.

## Deferred Structural-Behavior References

This pass de-referenced generated indexes in task modes only. Several structural-maintenance behavior files still directly mention generated-index Markdown files in memory-update guidance and should be reviewed later:

- `behavior/placement-and-boundaries/interface-boundary-definition.instructions.md`
- `behavior/extraction-and-centralization/centralize-duplicated-semantics.instructions.md`
- `behavior/naming-and-concepts/align-adjacent-naming.instructions.md`
- `behavior/naming-and-concepts/name-new-maintained-element.instructions.md`
- `behavior/naming-and-concepts/rename-maintained-concept.instructions.md`

Future work should decide whether those behavior references should become update-tool references, remain direct references because the behavior is discussing memory ownership rather than runtime orientation, or move into generated-index maintenance behavior.

## Open Design Questions

- Which generated indexes should remain generated Markdown, which should become JSON or another structured format, and which should be replaced by direct tool queries?
- Should any generated index become hybrid, with generated data plus a small curated human-maintained memory snippet?
- If curated snippets are used, which surface owns their authority and how should tools avoid overwriting them?
- Should every generated index require explicit update and query APIs before a task mode can rely on it?
- What freshness metadata should generated indexes expose so agents can report uncertainty consistently?
