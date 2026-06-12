# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated data as semantic authority.

## Core Routing Surfaces

- `task-modes/task-mode-usage.instructions.md`: how to select and apply task modes.
- `task-modes/task-mode-map.md`: which task mode owns a class of work.
- `structural-maintenance/structural-maintenance-usage.instructions.md`: when work reveals a structural decision about placement, ownership, boundaries, lifecycle, naming, reuse, duplication, contracts, audience, maintenance path, or authority.
- `project-setup/technology-architecture-map.md`: project-specific technology and architecture setup.

## Tool Surfaces

- `tools/tooling-map.md`: logical tool inventory and instruction-file routing.
- `tools/index-access/`: generated-index query and update tool contracts.
- `tools/structure-and-indexing/source-map-indexer.instructions.md`: generated source-directory map refresh contract.
- `tools/structure-and-indexing/source-map-query.instructions.md`: bounded source-directory map query contract.

## Memory Surfaces

- `domain-glossary.md`: manual authority for domain language.
- `design-system-map.md`: manual authority for design-system guidance.
- `known-debt.md`: intentional debt and removal triggers.
- `experiments.md`: provisional work and promotion or retirement criteria.

## Generated Data Surfaces

- `generated-indexes/`: generated semantic lookup artifacts. Task modes should access these through matching query/update tools rather than directly loading whole index files by default.
- `structural-indexes/source-directory-map.json`: generated source-tree directory data for bounded source navigation. It is updated by `source-map-indexer` and queried by `source-map-query`.
- Other `structural-indexes/*.json`: generated structural data used by tools and checks.

Generated indexes and structural indexes provide navigation and evidence. They do not replace source files, manual authority maps, task-mode instructions, or human-initiated Agent OS maintenance decisions.
