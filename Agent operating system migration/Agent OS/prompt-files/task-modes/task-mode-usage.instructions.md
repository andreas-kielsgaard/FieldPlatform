# Task Mode Usage Instructions

## Purpose

Use this file to enter the task-mode layer without loading every mode up front.

`AGENTS.md` routes agents here. `task-mode-map.md` maps task signals to primary and secondary modes. Individual mode files define the actual procedure.

## Operating Chain

Use the task-mode layer in this order:

1. `AGENTS.md` explains what task modes are and when to use them.
2. This file explains how to consume the task-mode layer.
3. `task-mode-map.md` guides mode selection.
4. Selected mode instruction files provide mode-specific requirements.

Structural maintenance is a sibling decision layer, not a task mode. Use it when selected task modes or working evidence reveal a structural decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority.

## Before Meaningful Edits

1. Read the user request.
2. Read `prompt-files/task-modes/task-mode-map.md`.
3. Select one primary mode based on the main source of entropy.
4. Add secondary modes for every cross-surface concern triggered by the request.
5. Declare the selected modes before editing durable project files.
6. Read every selected mode instruction file.
7. Read the maps and ledgers required by those selected mode files, but query generated indexes through skills or tools instead of loading them wholesale.
8. If the work raises a placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decision, read `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md`.

Do not load unrelated mode files just because they exist.

## Required Mode Declaration

Declare:

```text
Primary mode:
Secondary modes:
Reason for mode selection:
Surfaces likely affected:
```

For small read-only tasks, this declaration may be informal. For implementation, refactor, review, or documentation work, make it explicit before editing.

## Using Primary And Secondary Modes

The primary mode governs the main work.

Secondary modes add impact checks, documentation updates, searches, and report fields. They do not override the primary mode unless they reveal that the original classification was wrong.

If a secondary mode becomes the true source of risk, reclassify the task and state the change in the work summary.

The task-mode map owns mode selection. Individual mode files do not own initial selection logic.

## Reviewing Mode Selection During Work

Revisit mode selection when:

- the implementation reveals a different root cause
- a local change starts touching shared components, routes, schema, accessors, permissions, state, mocks, or naming
- a task grows from a narrow edit into cross-surface work
- review-before-commit reveals missing affected surfaces

Also enter structural maintenance when the work reveals a decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority of a durable maintained element.

When selection changes:

1. State the updated primary and secondary modes.
2. Read any newly selected mode instruction files.
3. Run or perform the newly required searches and checks where available.
4. Update the final report with the reason for the mode change.

## Context Loading

Use selected mode files to decide what to read.

Default order:

1. The selected primary mode file.
2. Selected secondary mode files.
3. The maps and ledgers named by those mode files.
4. `project-control-files/technology-architecture-map.md` when platform, directory, technology-area, source/generated, or interface boundaries may matter.
5. `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md` when the task raises a placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decision.
6. Relevant skill outputs, structural indexes, or tool outputs, when available.

Avoid front-loading unrelated maps, ledgers, and mode files.

Tool-maintained indexes under `tool-maintained-files/indexes/` are evidence surfaces. Do not ingest a whole generated index by default; use the relevant skills, logical tools, or a narrow slice tied to the task target.

## Skill, Tool, And Check Selection

Use selected mode files to identify useful skills, tools, and checks.

Resolve skill IDs through `prompt-files/skills/skill-map.md`. Skill files own operational choreography, evidence shaping, what remains agent judgment, and context-budget boundaries.

Resolve deterministic tool IDs through `prompt-files/tools/tool-map.md`. Tool semantic files describe capability and boundaries. Tool scripts under `tool-implementations/` own execution.

Mode files must not name tool scripts directly.

If a mode expands to require a new skill, tool, or index, that is a human-owned Agent OS maintenance responsibility. Do not silently add a new requirement to a mode without verifying that the skill or tool is listed in its map and has the expected semantic file. Stratum 1 and 2 tools must also have a corresponding executable script.

Use skills before tools when the operation requires repeated multi-tool choreography, evidence shaping, context budgeting, or a semantic workflow. Use tools directly when one deterministic query handle is enough.

## Provisionality Classification

Classify new code or artifacts as one of:

| Classification         | Meaning                                                       |
| ---------------------- | ------------------------------------------------------------- |
| Local one-off          | Specific to the current surface and easy to delete.           |
| Candidate pattern      | Repetition is visible but extraction is not yet justified.    |
| Shared primitive       | Stable reusable building block with clear ownership.          |
| Domain component       | Reusable UI or behavior tied to a stable domain concept.      |
| Provisional experiment | Exploratory work that needs promotion or retirement criteria. |
| Stable architecture    | Durable structure that future work should rely on.            |

## Documentation And Memory Updates

Use selected mode files to decide which maps, ledgers, checklists, or structural indexes need updates.

When a change reveals missing or stale mode guidance:

- update the relevant mode file if the issue is mode-specific
- update `task-mode-map.md` if routing or escalation changed
- update `AGENTS.md` only if global routing or authority changed

## Completion

The final report should answer the report fields required by the selected mode files.

If multiple modes were selected, combine their report requirements without repeating the same information unnecessarily.

Always include:

- primary mode
- secondary modes
- affected surfaces
- checks run or skipped with reason
- docs, maps, ledgers, or indexes updated
- remaining risks or assumptions
