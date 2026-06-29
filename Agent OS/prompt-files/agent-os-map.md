# Agent OS Map

This map is a lightweight orientation router for the Agent OS scaffold. It helps agents decide which operating-system surfaces to load without treating generated output, tool output, or project decisions as Agent OS authority.

## Bootloader

- `agent-os-bootloader.md`: active Agent OS bootloader.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: runtime attention-system usage guidance.

## Core Routing Surfaces

- `prompt-files/agent-attention-system/maps/task-mode-map.md`: selects primary and secondary task modes.
- `prompt-files/agent-attention-system/maps/behavior-map.md`: selects structural-maintenance behaviors when durable structural decisions appear.
- `prompt-files/agent-attention-system/maps/lens-map.md`: inventories reusable reasoning lenses.
- `prompt-files/agent-attention-system/maps/skill-map.md`: inventories reasoning skills.
- `prompt-files/agent-attention-system/maps/tool-map.md`: lists active replacement tools and common evidence sources.
- `project-control-files/project-setup-map.md`: routes into source/config/tooling and human-owned project decisions.
- repository-root `project-decisions/project-decision-map.md`: routes mature Field Platform project decisions. Load only when project decisions are directly relevant.
- `project-control-files/pre-development-readiness.md`: readiness cues before architecture choices or product development.

## Usage Surfaces

- `prompt-files/skills/skill-usage.instructions.md`: how to activate skills without turning them into mandatory ceremony.
- `prompt-files/agent-attention-system/agent-attention-system-usage.md`: how to select task modes, behaviors, and lenses.

## Project Decision Boundary

Human-owned Field Platform project decisions live outside Agent OS under repository-root `project-decisions/`.

Agent OS may point there, but it should not embed product, business, domain, data-model, deployment, or architecture decisions as operating instructions. When source/config/tools answer a question directly, use them before prose decision notes.

Tool-maintained/generated outputs are evidence only and are not ordinary orientation surfaces.
