# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated data or tool output as semantic authority.

## Bootloader

- `agent-os-bootloader.md`: active Agent OS bootloader.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: starts runtime attention-system selection after the bootloader maps are available.

## Core Routing Surfaces

- `prompt-files/agent-attention-system/maps/task-mode-map.md`: selects primary and secondary task modes.
- `prompt-files/agent-attention-system/maps/behavior-map.md`: selects structural-maintenance behaviors when durable structural decisions appear.
- `prompt-files/agent-attention-system/maps/lens-map.md`: inventories reusable reasoning lenses.
- `prompt-files/agent-attention-system/maps/skill-map.md`: inventories Stratum 3 aggregator skills and Stratum 4 reasoning workflow skills.
- `project-control-files/project-setup-map.md`: Field Platform project setup router for stack, product, domain, data-model, testing, deployment, and generated-evidence rails.
- `project-control-files/technology-architecture-map.md`: project-specific technology and architecture setup.
- `project-control-files/field-platform-product-rails.md`: Field Platform product identity, MVP proof, and product-gravity guardrails.
- `project-control-files/field-platform-domain-rails.md`: Field Platform identity, stewardship, visibility, review, relation-claim, ways-in, and representation-spine guardrails.
- `project-control-files/pre-development-readiness.md`: semantic readiness cues and deterministic check cues before architecture choices or product development.

## Usage Surfaces

- `prompt-files/skills/skill-usage.instructions.md`: how to activate skills without turning them into mandatory ceremony.
- `prompt-files/agent-attention-system/maps/tool-map.md`: active replacement development-tool surface plus legacy generated index/query catalogue.
- `prompt-files/agent-attention-system/tool-usage.instructions.md`: legacy reference for retired generated index/query tools.
- `prompt-files/tools/checks/agent-os-contract-check.md`: how to run the Agent OS contract alignment check after map, tool, index, or semantic-layer changes.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: how to select task modes, behaviors, and lenses.

## Memory Surfaces

- `prompt-files/domain-glossary.md`: manual authority for domain language.
- `prompt-files/design-system-map.md`: manual authority for design-system guidance.
- `prompt-files/known-debt.md`: intentional debt and removal triggers.
- `prompt-files/experiments.md`: provisional work and promotion or retirement criteria.

## Legacy Generated Data Surfaces

The broad generated index/query system is retired from ordinary development. These surfaces are retained only as legacy artifacts or for explicit legacy Agent OS index maintenance:

- `tool-maintained-files/indexes/*.json`
- `tool-maintained-files/project-indexes/*.json`
- `tool-maintained-files/semantic/semantic-chunk-index.json`

Tool-maintained files are not replacements for source files, manual authority maps, task-mode instructions, structural-maintenance behaviors, skills, or human-initiated Agent OS maintenance decisions.
