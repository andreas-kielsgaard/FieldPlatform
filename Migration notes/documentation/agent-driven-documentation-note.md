# Agent-Driven Documentation Note

## Purpose

This note is maintained by agents during the migration. It records documentation requirements discovered while executing prompts.

Agents should update this note only from context already encountered during the current prompt. Do not read extra files solely to update this note.

## Current Documentation Requirements

### README Boundary

README files should be treated as human-facing documentation. Agent-critical behavior must be represented in the corresponding agent instruction surface before agents rely on it.

### Task-Mode Documentation

The task-mode README content was moved into migration documentation as human-facing material. Agent-facing task-mode behavior should remain in `task-mode-map.md` and the individual task-mode `.instructions.md` files.

### Task-Mode Usage Instructions

The migrated instruction draft should stay small and route agents into task-mode usage rather than carrying every task-mode procedure inline. The task-mode layer now has a dedicated `task-mode-usage.instructions.md` file for agent-facing mode entry, context-loading, mode declaration, and completion behavior.

During migration, the proposed future `AGENTS.md` content is stored as `Agent operating system migration/migration_agents.md` so it is not automatically ingested as active instructions.

### Task-Mode Selection Layering

The intended chain is `AGENTS.md` for global context, `task-mode-usage.instructions.md` for consuming the task-mode layer, `task-mode-map.md` for selecting primary and secondary modes, and individual mode files for mode-specific requirements. Human documentation should explain this chain without requiring readers to front-load every mode file.

### Tool Placeholder Documentation

Tool instruction docs refer directly to `tools/agent/*.ts` placeholders when a check or lookup is script-backed. Human-facing documentation should clarify that tool files may exist before implementation and that the tooling map plus tool instruction files define the expected capability contract.

### Tooling Map And Tool Instructions

The agent OS now separates tool discovery from tool execution. Mode files refer to logical tool IDs. `docs/agent/tooling-map.md` maps those IDs to tool instruction files. Tool instruction files own the 1:1 relation to script files, expected invocation, parameters, outputs, and limitations.

This makes tool support a maintained OS surface: adding a new mode tool requirement should be treated as a human-owned maintenance action that verifies the map entry, instruction file, script placeholder, and expected capability.

### Redundancy In Task-Mode Guidance

The task-mode usage file should avoid duplicating tool requirements already owned by individual mode files. Cross-mode guidance should point agents to the tooling map rather than duplicating tool mappings.

The `Use This Mode When` and `Do Not Use This Mode When` sections were removed from individual mode files. `task-mode-map.md` owns selection; selected mode files own requirements.

### Prompt-End Reflection

Root migration instructions now require agents to reflect on agent-OS documentation needs at the end of each prompt and revise this note only where the current prompt changed or clarified those needs.

## Open Documentation Questions

- What final human-facing README structure should explain the agent operating system?
- Which target files should be considered authoritative for agent behavior versus explanatory for human maintainers?
- How should tool-generated or tool-maintained docs be described without making generated output look like semantic authority?
- How should human documentation describe the split between global routing in `AGENTS.md` and procedural detail in task-mode instruction files?
- How should human documentation describe the chain from logical tool ID to tooling map to tool instruction file to script?
