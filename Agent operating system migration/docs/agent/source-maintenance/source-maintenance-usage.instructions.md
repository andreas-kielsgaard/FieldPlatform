# Source Maintenance Usage Instructions

## Purpose

Use this layer when a task may change how the codebase is structured, not merely what product behavior it delivers.

Task modes classify the work. Source maintenance guides structural decisions inside that work.

## Entry Rule

Enter source maintenance before adding, moving, expanding, splitting, centralizing, renaming, promoting, demoting, deprecating, or trimming durable source elements.

For small local edits, use only the decision-map row that matches the structural question. Do not load unrelated behavior files.

## Operating Chain

1. Select task modes through `docs/agent/task-modes/task-mode-usage.instructions.md`.
2. If the task changes codebase structure, read `source-maintenance-decision-map.md`.
3. Use the decision map to identify relevant source-maintenance behavior files.
4. Read only the selected behavior files when they contain guidance.
5. Use logical tool IDs through `docs/agent/tooling-map.md`.
6. Update maps, ledgers, or structural indexes only when the decision map or selected behavior requires it.

## Decision Declaration

For non-trivial codebase changes, include:

```text
Source-maintenance decision:
Relevant behavior files:
Tool or index support:
Memory surfaces affected:
```

## Boundary

This layer does not replace task modes, product authority, or technology architecture guidance.

It exists to keep source evolution deliberate while allowing the codebase to grow organically.
