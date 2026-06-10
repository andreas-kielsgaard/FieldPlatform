# Source Maintenance Usage Instructions

## Purpose

Use this layer when a task may change how the codebase is structured, not merely what product behavior it delivers.

Task modes classify the work. Source maintenance guides structural decisions inside that work.

## Entry Rule

Enter source maintenance before adding, moving, expanding, splitting, centralizing, renaming, promoting, demoting, deprecating, or trimming durable source elements.

For small local edits, use only the behavior-map row that matches the structural question. Do not load unrelated behavior files.

## Lightweight Context Loading

Do not load all behavior files, lens files, maps, ledgers, or tool instructions up front.

Behavior files are the runtime prompt surface for selected structural decisions. Lens files are reference definitions and maintenance surfaces. Tool files are evidence contracts. Maps and ledgers are memory surfaces.

Select one primary source-maintenance behavior for the structural decision being made. Add secondary behaviors only when the selected behavior's procedure, stop/escalation rules, or implementation evidence reveals another structural decision.

Use the compact lens prompts inside selected behavior files for ordinary execution.

Open full lens files only when:

- the compact lens prompt is insufficient
- a stop or escalation rule depends on fuller lens guidance
- lens guidance itself is being edited
- a deeper review explicitly depends on the full lens definition

## Operating Chain

1. Select task modes through `docs/agent/task-modes/task-mode-usage.instructions.md`.
2. If the task changes codebase structure, read `behavior-map.md`.
3. Use the behavior map to select one primary source-maintenance behavior.
4. Add secondary behaviors only when the primary behavior reveals another structural decision.
5. Read only selected behavior files.
6. Use maps, ledgers, tool instructions, and full lens files only when selected behavior files require deeper evidence, memory updates, or clarification.
7. Use logical tool IDs through `docs/agent/tooling-map.md`.
8. Update maps, ledgers, or structural indexes only when the behavior map or selected behavior requires it.

## Decision Declaration

For non-trivial codebase changes, include:

```text
Source-maintenance decision:
Primary behavior file:
Secondary behavior files:
Tool or index support:
Memory surfaces affected:
```

## Boundary

This layer does not replace task modes, product authority, or technology architecture guidance.

It exists to keep source evolution deliberate while allowing the codebase to grow organically.
