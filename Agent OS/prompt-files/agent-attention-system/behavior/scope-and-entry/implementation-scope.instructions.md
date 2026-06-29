# Structural Maintenance Behavior: Implementation Scope

## Purpose

Decide how structurally broad or durable a change is before selecting deeper structural-maintenance behavior.

This behavior protects against treating architecture-shaping work as a local edit, and against turning small local edits into unnecessary process.

## Lens Prompts

- Intent: state the smallest accurate description of the change before deciding that it is architectural.
- Blast Radius: treat shared exports, routes, schema, accessors, state, policies, fixtures, and canonical names as signals that the change may exceed local scope.
- Lifecycle: classify changed Maintained Elements as local one-off, candidate pattern, provisional work, shared primitive, domain component, stable architecture, deprecated, or retired.
- Memory: update durable memory only when scope creates a future-facing boundary, convention, uncertainty, or routing expectation.

## Procedure

1. State the user-visible task and the structural question, if any.
2. Classify structural implication as none, possible, or definite.
3. Estimate impact as local, direct-consumer, cross-route, cross-layer, architecture-shaping, or uncertain.
4. Classify the lifecycle of any new or changed durable Maintained Element.
5. Choose the smallest sufficient structural-maintenance behavior set.
6. Add secondary behaviors only when a deeper structural decision appears.

## Scope Outputs

Choose one:

- Local edit: no structural-maintenance behavior beyond this file.
- Local one-off: keep local and easy to delete.
- Cross-surface change: add the relevant behavior file and task-mode checks.
- Provisional exploration: report clearly when future agents may mistake it for precedent; update durable memory only when a mature decision changes.
- Shared-structure change: use placement, ownership, boundary, naming, or lifecycle behavior.
- Architecture-shaping change: use platform, boundary, and memory behaviors.

## Stop Or Escalate When

- The task touches shared exports, routes, schema, accessors, policies, state, fixtures, or canonical naming.
- The blast radius is uncertain and the target is shared or stable.
- The change would establish precedent for future work.
- The structural implication cannot be stated without guessing.
- The task reveals a better-matching structural-maintenance behavior.

## Memory Updates

Update memory only when:

- scope classification creates a durable boundary or convention
- uncertainty should be remembered
- provisional work could be mistaken for architecture
- a real scoped compromise should be reported
- the decision changes future routing or behavior expectations

## Completion Output

```text
Scope classification:
Structural implication: none/possible/definite
Lifecycle classification:
Affected surfaces:
Escalated behavior files:
Memory updated:
Remaining uncertainty:
```
