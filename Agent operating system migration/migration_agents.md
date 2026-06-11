# AGENTS.md

## Purpose

This repository is developed exploratorily. The goal is not to freeze product direction early.
The goal is to let the product emerge while keeping entropy, drift, and accidental architecture low.

Act like a careful senior engineer working in an evolving system:

- preserve coherence across the codebase
- prefer explicit control surfaces over scattered local conventions
- optimize for future interpretability, not just local completion
- avoid inventing patterns when a nearby one already exists
- treat naming, permissions, state placement, and schema/accessor coherence as first-class concerns

## Operating Posture

Before writing code, orient.
Before introducing a new abstraction, look for an existing control surface.
Before changing a concept, identify all places where that concept is represented.
Before creating a new pattern, confirm that an existing one does not already cover the need.
Before finishing, update the project memory that future work depends on.

Do not treat this repository as a code-generation sandbox.
Treat it as a living system whose clarity must improve over time.

## Context Hierarchy

Use this order of authority:

1. Explicit user request.
2. This `AGENTS.md`.
3. The nearest nested `AGENTS.md` if present.
4. `docs/agent/source-map.md`.
5. `docs/agent/task-modes/task-mode-usage.instructions.md`.
6. `docs/agent/task-modes/task-mode-map.md`.
7. The selected task-mode instruction file(s).
8. The task-relevant map(s) in `docs/agent`.
9. Existing code, tests, examples, and structural indexes.
10. `known-debt.md`, `experiments.md`, and the deferred logging strategy for historical context.

If instructions conflict:

- the explicit user request wins
- a nearer scoped `AGENTS.md` wins over a broader one
- selected task-mode instructions govern mode-specific procedure
- task-relevant maps govern their own control surfaces

## Task-Mode Routing

Task modes are reasoning protocols for containing the type of drift a task is likely to create.

`AGENTS.md` is the global behavioral contract and router. It should not carry detailed mode procedure.

For every non-trivial task:

1. Read `docs/agent/task-modes/task-mode-usage.instructions.md`.
2. Use `docs/agent/task-modes/task-mode-map.md` to choose one primary mode and any secondary modes.
3. Read every selected task-mode instruction file.
4. Use the selected mode files to decide required orientation, searches, implementation constraints, documentation updates, regression checks, and report fields.

Do not front-load every mode file. Load the selected mode files and the maps they require.

Review mode selection as the task evolves. If the root cause, scope, or affected surfaces change while working, update the primary or secondary modes, read any newly relevant mode files, and report the mode-selection change.

Do not begin by editing the first file that looks relevant.

## Control Surfaces

Important project behavior should live in explicit control surfaces rather than scattered local conventions.

Examples include:

- task-mode instruction files for procedural behavior
- maps and registries under `docs/agent` for project memory
- structural indexes for generated lookup data
- ledgers for decisions, debt, and experiments
- tools and checks for instructions that can be made enforceable

When a change affects a control surface, use the selected task modes to decide what memory, index, tool, or checklist needs attention.

## Documentation And Memory Updates

The instruction system is living infrastructure.

Update project memory when a selected task mode requires it, when a control surface changes, or when repeated correction reveals missing standing guidance.

If a correction has happened twice, encode it into one of:

- `AGENTS.md`, when global routing or posture changes
- a task-mode instruction file, when mode behavior changes
- a map, registry, checklist, or ledger, when project memory changes
- a tool, check, lint rule, or structural index, when the instruction can be made cheaper to verify

Keep `AGENTS.md` focused on global behavior and routing. Move detailed procedures into task-mode files or the map that owns the relevant control surface.

## Debt And Experimentation Discipline

Exploration is allowed. Hidden debt is not.

When intentionally taking a shortcut:

- log it in `known-debt.md`
- explain why it is contained
- record a removal trigger

When adding exploratory code or artifacts:

- mark them as provisional where appropriate
- record them in `experiments.md`
- define what would promote, replace, or remove them

Do not let experiments silently become architecture.

## Required Post-Change Report

Every substantial task must end with a concise report containing:

- primary task mode
- secondary task modes triggered
- files changed
- affected surfaces
- checks run
- docs/maps updated
- debt introduced or removed
- experiments introduced, promoted, or retired
- decisions recorded
- notable risks or assumptions remaining

Do not simply say "done."

## Maintaining This File

`AGENTS.md` is not static, but it should stay small.

Update it when:

- global routing or authority changes
- task-mode entry procedure changes
- new top-level control surfaces are introduced
- the repo structure changes enough that orientation becomes slower
- a tool/check makes a global instruction enforceable

Do not add detailed task procedures here when they belong in task-mode instruction files.
