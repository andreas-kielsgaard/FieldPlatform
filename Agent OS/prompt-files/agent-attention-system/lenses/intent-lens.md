# Intent Lens

## Purpose

Clarify what the change is actually trying to make true before structural source decisions begin.

## Activates When

- A request could be feature work, bug fix, refactor, rename, schema/API change, visual adjustment, exploratory prototype, or architecture change.
- The requested activity may not match the underlying change type.
- The task may or may not need Structural Maintenance.

## Core Distinction

Requested activity is not the same as underlying change type.

## Questions

- What is the smallest accurate description of this change?
- Is the change local, cross-surface, structural, conceptual, or exploratory?
- Does the request hide a data, state, naming, boundary, or ownership decision?
- What would count as success without expanding scope?
- Does this task require Structural Maintenance at all?

## Evidence To Consider

- User request and recent clarifications.
- Current task-mode selection.
- Existing implementation, examples, maps, or tests directly named by the request.
- Tool output or source/config evidence that indicates affected surfaces.
- Any current uncertainty about scope or structural implication.

## Decision Outputs

- Intent classification: local behavior.
- Intent classification: cross-surface behavior.
- Intent classification: concept change.
- Intent classification: structural change.
- Intent classification: provisional exploration.
- Structural implication: none.
- Structural implication: possible.
- Structural implication: definite.

## Stop Or Escalate When

- The request spans multiple unrelated concerns.
- A local-looking task reveals schema, API, route, policy, naming, or shared component impact.
- The smallest accurate description cannot be stated without guessing.
- The structural implication is definite and no structural-maintenance decision has been selected.

## Cheap Pass

The change is a small local edit that does not alter exports, shared names, data shape, route behavior, public interfaces, or durable repository structure.

## Memory Implication

Update memory only when intent clarification changes task routing, reveals a durable structural decision, records a scope boundary, or exposes a recurring ambiguity future agents should not rediscover.
