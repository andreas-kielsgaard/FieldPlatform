# Source Maintenance Behavior: Deprecate Or Retire Code

## Purpose

Decide whether a source element remains temporarily available, should be marked no longer preferred, has been replaced, or should be removed from architectural authority.

This behavior protects against unsafe deletion and prevents obsolete code from remaining as precedent.

## Activated Lenses

- Lifecycle
- Blast Radius
- Boundary
- Memory

## Evidence To Consider

- Current consumers and public API.
- Replacement owner or migration path.
- Whether the element is local, shared, stable, provisional, deprecated, or retired.
- Maps or registries listing the element.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `component-usage`.
- Tool evidence category: `accessor-usage`.
- Tool evidence category: `map-affected-surfaces`.

## Procedure

1. Use the Lifecycle Lens to classify the current and target status.
2. Use the Blast-Radius Lens to identify consumers and migration risk.
3. Use the Boundary Lens if public interfaces or consumption paths are involved.
4. Use the Memory Lens to record deprecation, replacement, retirement, or removal triggers.

## Deprecate When

- The element should remain available but should not be chosen for new work.
- A replacement exists or is being introduced.
- Consumers need a migration path.
- Future agents need to know that the element is no longer precedent.

## Retire When

- The element is no longer authoritative.
- Consumers have migrated or usage is intentionally blocked.
- The replacement is established.
- Remaining references are legacy-only or removal-ready.

## Defer Deprecation When

- The replacement is not clear.
- Usage cannot be confidently mapped.
- The element is still a valid owner.
- Deprecation would create more ambiguity than it resolves.

## Stop Or Escalate When

- Public API compatibility is affected.
- The element is dynamically referenced.
- Consumers span platform components or technology areas.
- Removing authority requires human product or architecture confirmation.

## Memory Updates

Update `known-debt.md` with replacement, migration path, and removal trigger when deprecation remains active.

Update area maps when canonical owners or preferred paths change.

Update `decision-log.md` when retirement or deprecation changes durable architecture.

## Completion Output

```text
Element:
Decision: deprecate/retire/keep
Replacement:
Consumers:
Migration status:
Removal trigger:
Memory updated:
```
