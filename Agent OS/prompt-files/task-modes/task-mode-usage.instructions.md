# Task Mode Usage Instructions

## Purpose

Use this file to enter the task-mode layer after Agent OS initiation without loading every mode up front.

`AGENTS.md` routes agents here. `task-mode-map.md` maps task signals to primary and secondary modes. Individual mode files define cue sets for context, evidence, checks, and reporting.

## Operating Chain

Use the task-mode layer in this order after Agent OS initiation:

1. `AGENTS.md` explains what task modes are and when to use them.
2. This file explains how to consume the task-mode layer.
3. `task-mode-map.md` guides mode selection.
4. Selected mode instruction files provide mode-specific cues.

Structural maintenance is a sibling decision layer, not a task mode. Use it when selected task modes or working evidence reveal a concrete structural decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority.

## Before Meaningful Edits

1. Read the user request.
2. Read `prompt-files/task-modes/task-mode-map.md`.
3. Select one primary mode based on the main source of entropy.
4. Add secondary modes for every cross-surface concern triggered by the request.
5. Declare the selected modes before editing durable project files.
6. Read every selected mode instruction file.
7. Use the maps and ledgers named by selected mode files as context cues; use `tool-maintained-files/indexes/index-manifest.json` for boot-aware index guidance; use `prompt-files/tools/semantic-map.md` for semantic-layer awareness; query raw generated indexes, semantic chunks, embeddings, or vector payloads through skills or tools instead of loading them wholesale.
8. If the work raises a concrete placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decision, read `prompt-files/structural-maintenance/structural-maintenance-usage.instructions.md`.

Avoid loading unrelated mode files just because they exist.

## Mode Declaration Cue

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

Secondary modes add likely impact checks, documentation updates, searches, and report fields. They complement the primary mode unless they reveal that the original classification was wrong.

If a secondary mode becomes the true source of risk, reclassify the task and state the change in the work summary.

The task-mode map owns mode-selection cues. Individual mode files provide mode-specific evidence and report cues.

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
3. Run or perform newly relevant searches and checks where they reduce uncertainty.
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

Tool-maintained indexes under `tool-maintained-files/indexes/` are evidence surfaces. During initiation, read `index-manifest.json` as compact mandatory boot context and `semantic-map.md` as compact semantic-layer awareness, but do not ingest whole raw generated record arrays, semantic chunks, embedding vectors, or vector-store payloads; after initiation, prefer relevant skills, logical tools, or a narrow slice tied to the task target.

## Skill, Tool, And Check Selection

Use selected mode files to identify useful skills, tools, and checks.

Resolve skill IDs through `prompt-files/skills/skill-map.md`. Skill files own operational choreography, evidence shaping, what remains agent judgment, and context-budget boundaries.

Resolve deterministic tool IDs through `prompt-files/tools/tool-map.md`. Tool semantic files describe capability and boundaries. Tool scripts under `tool-implementations/` own execution.

Resolve semantic candidate retrieval through `prompt-files/tools/semantic-map.md` and `semantic-candidate-query` when exact deterministic queries are too narrow for fuzzy recall. Treat semantic candidates as leads for source reads or exact follow-up checks.

Mode files should name logical tool IDs rather than script paths.

If a mode appears to need a new skill, tool, or index, treat that as a human-owned Agent OS maintenance proposal unless the user explicitly asked for Agent OS maintenance. Avoid silently adding new mode expectations without verifying that the skill or tool is listed in its map and has the expected semantic file. Stratum 1 and 2 tools should also have a corresponding executable script.

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

The final report should consider the report cues from the selected mode files.

If multiple modes were selected, combine their report requirements without repeating the same information unnecessarily.

Usually include:

- primary mode
- secondary modes
- affected surfaces
- checks run or skipped with reason
- docs, maps, ledgers, or indexes updated
- remaining risks or assumptions
