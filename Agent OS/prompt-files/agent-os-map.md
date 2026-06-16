# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated data or tool output as semantic authority.

## Bootloader

- `../agent-os-bootloader.md`: active Agent OS bootloader.
- `task-modes/task-mode-usage.instructions.md`: starts runtime execution after the bootloader maps are available.

## Core Routing Surfaces

- `task-modes/task-mode-map.md`: selects primary and secondary task modes.
- `structural-maintenance/behavior-map.md`: selects structural-maintenance behaviors when durable structural decisions appear.
- `structural-maintenance/lens-map.md`: inventories reusable reasoning lenses.
- `skills/skill-map.md`: inventories Stratum 3 aggregator skills and Stratum 4 reasoning workflow skills.
- `tools/index-map.md`: inventories Stratum 1 generated or maintained indexes.
- `tools/tool-map.md`: inventories Stratum 2 deterministic query handles.
- `tools/semantic-map.md`: inventories Phase 3 query-only semantic substrates and reserved embedding/vector surfaces.
- `tool-maintained-files/indexes/index-manifest.json`: mandatory compact boot context for index tiers, freshness, artifact hashes, shard hashes, sizes, semantic-support status, deterministic maintenance commands, and first-query guidance.
- `project-control-files/project-setup/project-setup-map.md`: Field Platform project setup router for stack, product, domain, data-model, testing, deployment, and generated-evidence rails.
- `project-control-files/technology-architecture-map.md`: project-specific technology and architecture setup.
- `project-control-files/field-platform-product-rails.md`: Field Platform product identity, MVP proof, and product-gravity guardrails.
- `project-control-files/field-platform-domain-rails.md`: Field Platform identity, stewardship, visibility, review, relation-claim, ways-in, and representation-spine guardrails.
- `project-control-files/pre-development-readiness.md`: semantic readiness cues and deterministic check cues before architecture choices or product development.

## Usage Surfaces

- `skills/skill-usage.instructions.md`: how to activate skills without turning them into mandatory ceremony.
- `tools/tool-usage.instructions.md`: how to activate deterministic tools and avoid semantic delegation.
- `tools/checks/agent-os-contract-check.md`: how to run the Agent OS contract alignment check after map, tool, index, or semantic-layer changes.
- `structural-maintenance/structural-maintenance-usage.instructions.md`: how to enter structural maintenance and select behavior files.

## Memory Surfaces

- `domain-glossary.md`: manual authority for domain language.
- `design-system-map.md`: manual authority for design-system guidance.
- `known-debt.md`: intentional debt and removal triggers.
- `experiments.md`: provisional work and promotion or retirement criteria.

## Generated Data Surfaces

- `tool-maintained-files/indexes/index-manifest.json`: boot-safe generated manifest for active index awareness; it is compact context, not a raw-record, embedding, or vector-store substrate.
- `tool-maintained-files/indexes/*.json`: Stratum 1 generated evidence artifacts produced by builders under `tool-implementations/indexes/`.
- `tool-maintained-files/project-indexes/*.json`: project structural evidence for the Field Platform repository root, including routes, modules, schemas, migrations, tests, stories, env/config, and source-directory maps.
- `tool-maintained-files/semantic/semantic-chunk-index.json`: Phase 3 deterministic chunk substrate produced by `tool-implementations/semantic/build-semantic-chunk-index.ts`; query-only, not boot payload.
- `tool-maintained-files/`: tool-owned outputs such as generated indexes. Prompt files should access these through selected skills, deterministic tools, or narrow slices rather than broad ingestion.

Tool-maintained files provide navigation and evidence. They are not replacements for source files, manual authority maps, task-mode instructions, structural-maintenance behaviors, skills, or human-initiated Agent OS maintenance decisions.
