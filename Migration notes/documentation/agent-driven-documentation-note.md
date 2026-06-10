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

### Test Selection And Test Indexing

Human-facing documentation should explain that the Agent OS is intended to support targeted verification, not a default habit of running every available test for every task.

The testing layer should describe how unit tests, integration tests, visual checks, smoke checks, and other verification surfaces map back to the code, routes, components, schemas, accessors, fixtures, and flows they exercise. Agents should use that map to choose a minimal credible verification set based on changed surfaces, risk, and task mode, while still escalating to broader suites when shared infrastructure, cross-cutting behavior, or uncertainty justifies it.

Documentation should also clarify when updating tests is appropriate: tests may change when intended behavior changes, when coverage is missing for a bug or new behavior, when fixtures or contracts are renamed, or when tests encode obsolete implementation details. Tests should not be weakened merely to make a change pass; behavioral changes should be surfaced in the completion report.

### Technology Architecture And Source Maintenance Documentation

Human-facing documentation should explain that `technology-architecture-map.md` is the high-level map for platform components, technology areas, directory ownership, source/generated boundaries, and interface expectations between independently maintained parts of the project.

Documentation should separately explain the source-maintenance layer as the agent-facing operational layer for structural decisions during codebase changes. Task modes classify work; source maintenance guides source evolution decisions such as placement, reuse, extension, extraction, centralization, movement, naming, promotion, demotion, deprecation, and trimming.

Human documentation should note that behavior files may initially exist as title-only scaffolds while decision routing is explored through `source-maintenance-decision-map.md`.

Human documentation should explain source-maintenance lenses as portable reasoning frames, not task modes, checklists, tools, or maps. Lenses narrow attention around distinctions such as intent, ownership, boundary, reuse, near-match similarity, duplication, naming, data/state/effects, blast radius, lifecycle, and memory.

Lens documentation should emphasize that each lens has decision outputs, stop or escalation rules, cheap-pass rules, evidence expectations, and memory implications. This keeps lenses procedural rather than decorative.

The lens map should be documented as an inventory and maintenance surface, not a separate decision map. Source-maintenance behavior files are expected to activate relevant lenses directly once behavior-to-lens wiring is reviewed.

Human documentation should reflect the source-maintenance folder shape: usage and decision-map files at the source-maintenance root, behavior modes under `behavior/`, lens definitions under `lenses/`, and the lens inventory at `lens-map.md`.

The source-maintenance layer should be documented as progressive constraints rather than an exhaustive decision tree. Agents should classify the change, activate only relevant decision lenses, use tool/index evidence, preview blast radius before broad edits, and update memory only when durable structure, naming, boundaries, or exceptions change.

Human documentation should also distinguish query, preview, and apply expectations for future tools. Even when tool implementation is deferred, maintainers should understand that source-maintenance decisions are intended to lean on bounded tool outputs rather than full-context prompt reasoning.

### Redundancy In Task-Mode Guidance

The task-mode usage file should avoid duplicating tool requirements already owned by individual mode files. Cross-mode guidance should point agents to the tooling map rather than duplicating tool mappings.

The `Use This Mode When` and `Do Not Use This Mode When` sections were removed from individual mode files. `task-mode-map.md` owns selection; selected mode files own requirements.

### Prompt-End Reflection

Root migration instructions now require agents to reflect on agent-OS documentation needs at the end of each prompt and revise this note only where the current prompt changed or clarified those needs.

### Git Maintenance Automation

Daily git maintenance that commits and pushes work needs an explicit agent-facing routine, not only human-facing README guidance. The routine should cover branch verification, user-owned file protection, coherent commit slicing, no direct commits to `main`, relevant lightweight checks, push behavior, and completion reporting.

During migration, this automation guidance can live under `Migration notes/` as root coordination material. A later migration decision should decide whether recurring git maintenance belongs in the target agent operating system as a formal maintenance-and-governance task mode, a checklist, or a local automation-only instruction.

## Open Documentation Questions

- What final human-facing README structure should explain the agent operating system?
- Which target files should be considered authoritative for agent behavior versus explanatory for human maintainers?
- How should tool-generated or tool-maintained docs be described without making generated output look like semantic authority?
- How should human documentation describe the split between global routing in `AGENTS.md` and procedural detail in task-mode instruction files?
- How should human documentation describe the chain from logical tool ID to tooling map to tool instruction file to script?
- How should human documentation introduce the difference between the technology architecture map and the source-maintenance decision layer?
- How should human documentation explain progressive source-maintenance constraints without encouraging agents to run every structural check for every small task?
- How should human documentation explain source-maintenance lenses without making them sound like mandatory checklists for every change?
- How should human documentation explain behavior-to-lens activation once behaviors begin referring to lenses directly?
- How should the testing map represent relationships between changed code and the smallest credible test set, while still identifying when broad regression suites are warranted?
- Should recurring git maintenance become part of the target agent operating system, or remain a local project automation outside the scaffold?
