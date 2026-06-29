# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated data, tool output, or project decisions as Agent OS authority.

## Bootloader

- `agent-os-bootloader.md`: active Agent OS bootloader.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: starts runtime attention-system selection after the bootloader maps are available.

## Core Routing Surfaces

- `prompt-files/agent-attention-system/maps/task-mode-map.md`: selects primary and secondary task modes.
- `prompt-files/agent-attention-system/maps/behavior-map.md`: selects structural-maintenance behaviors when durable structural decisions appear.
- `prompt-files/agent-attention-system/maps/lens-map.md`: inventories reusable reasoning lenses.
- `prompt-files/agent-attention-system/maps/skill-map.md`: inventories Stratum 3 aggregator skills and Stratum 4 reasoning workflow skills.
- `project-control-files/project-setup-map.md`: Agent OS router into source/config/tooling and human-owned project decisions.
- repository-root `project-decisions/project-decision-map.md`: root-level map for mature Field Platform project decisions. Load only when project decisions are relevant.
- `project-control-files/pre-development-readiness.md`: semantic readiness cues and deterministic check cues before architecture choices or product development.

## Usage Surfaces

- `prompt-files/skills/skill-usage.instructions.md`: how to activate skills without turning them into mandatory ceremony.
- `prompt-files/agent-attention-system/maps/tool-map.md`: active replacement development-tool surface plus legacy generated index/query catalogue.
- `prompt-files/agent-attention-system/tool-usage.instructions.md`: legacy reference for retired generated index/query tools.
- `prompt-files/tools/checks/agent-os-contract-check.md`: how to run the Agent OS contract alignment check after map, tool, index, or semantic-layer changes.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: how to select task modes, behaviors, and lenses.

## Project Decision Boundary

Human-owned Field Platform project decisions live outside Agent OS under repository-root `project-decisions/`.

Agent OS may point there, but it should not embed product, business, domain, data-model, deployment, or architecture decisions as operating instructions.

When source/config/tools answer a question directly, use them before prose decision notes.

## Legacy Generated Data Surfaces

The broad generated index/query system is retired from ordinary development. These surfaces are retained only as legacy artifacts or for explicit legacy Agent OS index maintenance:

- `tool-maintained-files/indexes/*.json`
- `tool-maintained-files/project-indexes/*.json`
- `tool-maintained-files/semantic/semantic-chunk-index.json`

Tool-maintained files are not replacements for source files, project decisions, task-mode instructions, structural-maintenance behaviors, skills, or human-initiated Agent OS maintenance decisions.
