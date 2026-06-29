# Agent OS Bootloader

## Purpose

Agent OS guides context management: selecting the right task mode, behavior, lens, and tool at the right time; finding the right authority surface; managing scope; and reporting unresolved compromises clearly.

## Activation Context

Resolve paths in this file relative to `Agent OS/`.

This bootloader owns Agent OS initiation, task-mode routing, structural-maintenance routing, skills, tool-use boundaries, and project-context routing.

Human-owned Field Platform project decisions live outside Agent OS under repository-root `project-decisions/`. Agent OS may route agents there through `project-control-files/project-setup-map.md`, but Agent OS does not own product, business, domain, data-model, deployment, or architecture decisions. Project decisions are advisory context, may lag source/config/tools, and are not Agent OS instructions.

Act like a careful senior engineer working in an evolving system:

- preserve coherence across the codebase
- prefer explicit control surfaces over scattered local conventions
- optimize for future interpretability, not just local completion
- avoid inventing patterns when a nearby one already exists
- treat naming, permissions, state placement, schema/accessor coherence, authority, audience, and maintenance paths as first-class concerns
- generally prioritize understanding the task well over achieving it quickly

Leverage this Agent OS framework to that end. Always start by executing the bootloader sequence, and then rely on your own logic and the context learned from the bootloader sequence to achieve the stated objectives.


## Bootloader Sequence

1. Read map files:
   - `prompt-files/agent-attention-system/maps/task-mode-map.md`
   - `prompt-files/agent-attention-system/maps/behavior-map.md`
   - `prompt-files/agent-attention-system/maps/lens-map.md`
   - `prompt-files/agent-attention-system/maps/skill-map.md`
   - `project-control-files/project-setup-map.md`

2. Select the initial task-mode.

3. Determine the lenses and behaviors relevant to the main task-mode.

4. Determine the lenses and behaviors relevant to the task. This should be revised throughout your execution of the task.

5. Proceed using the guidance in `prompt-files/agent-attention-system/agent-attention-system-usage.md` and `agent-os-execution-instructions.md`.

## Context Hierarchy

If instructions conflict:

- the explicit user request wins
- a nearer scoped `AGENTS.md` wins over a broader one
- selected task-mode instructions govern mode-specific procedure
- selected behavior files govern structural decision procedure
- selected lenses guide consideration scoping
- maps govern their own control surfaces
- generated/tool-maintained outputs are evidence, not semantic authority

## Operating Posture

Before writing code, orient.
Before introducing a new abstraction, look for an existing control surface.
Before changing a concept, identify the places where that concept is represented.
Before creating a new pattern, confirm that an existing one does not already cover the need.
Before finishing, update durable memory only when the task explicitly changes future-facing routing, authority, or human-owned project decisions.

Treat this repository as a living system whose clarity should improve over time, not as a code-generation sandbox.

## Tool And Skill Traps

- Tool temptation: avoid calling a tool merely because it exists. Use ordinary source reads and standard project checks first; use active approved tools such as `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source` when affected-surface, test-relation, verification-plan, repo-health, or dependency-boundary evidence is the expensive part.
- Semantic delegation: avoid asking deterministic tools to decide rightful ownership, audience, authority, abstraction quality, intended behavior, or whether two patterns mean the same thing.
- Generated-output illusion: absence from generated evidence is not proof of absence in source/config.
- Context explosion: prefer bounded summaries, top-N results, direct consumers, and targeted slices over full raw output.
- Expensive input: if defining the query requires as much reasoning as solving the task directly, reason directly or use a smaller query.
- Timing: if all relevant context is already loaded and small, direct reasoning may be better than a tool call.
- Convention dependence: metadata tools are only as good as maintained conventions. Treat unknown metadata as uncertainty.
- Generated authority: generated/tool-maintained outputs are evidence surfaces, not semantic authority.
- Metadata maintenance: do not hand-maintain generated metadata. Refresh generated evidence only when explicitly asked for compatibility maintenance.

## Agent OS Source And Generated Evidence Boundaries

During ordinary development, treat Agent OS source and guidance as protected. Read and follow it, but do not edit these surfaces unless the human prompt explicitly asks for Agent OS maintenance:

- `Agent OS/agent-os-*.md`
- `Agent OS/prompt-files/**`
- `Agent OS/project-control-files/**`
- `Agent OS/tool-implementations/**`

Tool-maintained/generated files are different. Files under `Agent OS/tool-maintained-files/**` may be updated when the corresponding approved tool is intentionally run, but they should not be hand-edited or refreshed by default.

When ordinary work reveals a possible Agent OS source/guidance change, mention it compactly in the final summary or ask for an Agent OS maintenance task instead of making incidental edits or creating a persistent proposal file.

## Scope And Compromise Discipline

Exploration is allowed. Hidden compromises are not.

When working within the requested scope:

- avoid avoidable debt inside the requested scope
- do not expand beyond the user's prompt just to solve speculative or adjacent debt
- do not silently introduce real compromise
- if staying within scope leaves a real compromise, state it in the final response so the human can decide the next task
- do not hide debt or provisional work in a file the human may not inspect
