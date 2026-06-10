# Memory Lens

## Purpose

Decide whether durable project memory should change as part of a source-maintenance decision.

## Activates When

- A change establishes or changes a convention.
- A boundary, ownership, naming, schema, API, lifecycle, migration, or exception decision is made.
- Debt, experiment status, or source-maintenance guidance changes.
- A correction reveals missing standing guidance.

## Core Distinction

A code change is not automatically a memory change. A durable structural decision should not remain only in code.

## Questions

- Did this establish a convention?
- Did this introduce a canonical or intentionally provisional term?
- Did this change ownership?
- Did this accept, remove, or contain debt?
- Did this promote, demote, retire, or create an experiment?
- Did this alter boundary expectations?
- Did this reveal guidance that future agents need?

## Evidence To Consider

- Technology architecture map.
- Area-specific maps and registries.
- Domain glossary and naming index.
- Decision log.
- Known debt.
- Experiments.
- Task-mode and source-maintenance guidance.
- Tool or index output showing durable structural change.

## Decision Outputs

- No memory update.
- Update map.
- Update registry.
- Update glossary.
- Update naming index.
- Update decision log.
- Update known debt.
- Update experiments.
- Update task or source-maintenance guidance.

## Stop Or Escalate When

- A durable structural decision has no memory home.
- The change affects future routing, ownership, boundaries, or naming.
- The agent would need to rely on unstated convention to justify the change.
- Updating memory would be broad, ambiguous, or product-authoritative without explicit instruction.

## Cheap Pass

No memory update is needed when the change is local, does not establish precedent, does not alter durable terms or boundaries, and leaves no intentional debt or experiment status change.

## Memory Implication

This lens owns the final memory decision. Update only the narrowest relevant memory surface, and avoid turning every code edit into documentation churn.
