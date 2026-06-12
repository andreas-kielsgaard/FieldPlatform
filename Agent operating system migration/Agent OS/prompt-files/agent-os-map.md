# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated data or tool output as semantic authority.

## Bootloader

- `../migration_agents.md`: proposed migrated `AGENTS.md` bootloader during migration. It is not renamed during migration.
- `task-modes/task-mode-usage.instructions.md`: starts runtime execution after the bootloader maps are available.

## Core Routing Surfaces

- `task-modes/task-mode-map.md`: selects primary and secondary task modes.
- `structural-maintenance/behavior-map.md`: selects structural-maintenance behaviors when durable structural decisions appear.
- `structural-maintenance/lens-map.md`: inventories reusable reasoning lenses.
- `skills/skill-map.md`: inventories Stratum 3 aggregator skills and Stratum 4 reasoning workflow skills.
- `tools/index-map.md`: inventories Stratum 1 generated or maintained indexes.
- `tools/tool-map.md`: inventories Stratum 2 deterministic query handles.
- `project-control-files/technology-architecture-map.md`: project-specific technology and architecture setup.

## Usage Surfaces

- `skills/skill-usage.instructions.md`: how to activate skills without turning them into mandatory ceremony.
- `tools/tool-usage.instructions.md`: how to activate deterministic tools and avoid semantic delegation.
- `structural-maintenance/structural-maintenance-usage.instructions.md`: how to enter structural maintenance and select behavior files.

## Memory Surfaces

- `domain-glossary.md`: manual authority for domain language.
- `design-system-map.md`: manual authority for design-system guidance.
- `known-debt.md`: intentional debt and removal triggers.
- `experiments.md`: provisional work and promotion or retirement criteria.

## Generated Data Surfaces

- `tool-maintained-files/indexes/*.json`: Stratum 1 generated evidence artifacts produced by builders under `tool-implementations/indexes/`.
- `tool-maintained-files/`: tool-owned outputs such as generated indexes. Prompt files should access these through selected skills, deterministic tools, or narrow slices rather than broad ingestion.

Tool-maintained files provide navigation and evidence. They do not replace source files, manual authority maps, task-mode instructions, structural-maintenance behaviors, skills, or human-initiated Agent OS maintenance decisions.
