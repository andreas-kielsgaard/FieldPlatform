# Memory Lens

## Purpose

Decide whether durable project memory should change as part of a structural-maintenance decision.

## Activates When

- A change establishes or changes a convention.
- A boundary, ownership, naming, schema, API, lifecycle, migration, or exception decision is made.
- Scoped compromise, provisional status, or structural-maintenance guidance changes.
- A correction reveals missing standing guidance.

## Core Distinction

A repository edit is not automatically a memory change. A durable structural decision should not remain only in the edited artifact.

## Questions

- Did this establish a convention?
- Did this introduce a canonical or intentionally provisional term?
- Did this change ownership?
- Did this leave a real scoped compromise that should be reported?
- Did this promote, demote, retire, or create provisional work?
- Did this alter boundary expectations?
- Did this reveal guidance that future agents need?

## Evidence To Consider

- Source/config/tooling.
- Area-specific maps and registries.
- Project decisions when mature human-owned context exists.
- Naming surfaces in source, tests, or project decisions.
- Task-mode and structural-maintenance guidance.
- Tool or index output showing durable structural change.

## Decision Outputs

- No memory update.
- Update map.
- Update registry.
- Update naming surface.
- Update naming index.
- Update project decision.
- Report scoped compromise in final response.
- Report provisional status in final response.
- Update task or structural-maintenance guidance.

## Stop Or Escalate When

- A durable structural decision has no memory home.
- The change affects future routing, ownership, boundaries, or naming.
- The agent would need to rely on unstated convention to justify the change.
- Updating memory would be broad, ambiguous, or product-authoritative without explicit instruction.

## Cheap Pass

No memory update is needed when the change is local, does not establish precedent, does not alter durable terms or boundaries, and leaves no real scoped compromise or provisional status that future work needs to know about.

## Memory Implication

This lens owns the final memory decision. Update only the narrowest relevant memory surface, and avoid turning every edit into documentation churn.
