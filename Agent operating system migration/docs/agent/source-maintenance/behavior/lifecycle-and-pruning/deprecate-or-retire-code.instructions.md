# Source Maintenance Behavior: Deprecate Or Retire Code

## Purpose

Decide whether a source element remains temporarily available, should be marked no longer preferred, has been replaced, or should be removed from architectural authority.

This behavior protects against unsafe deletion and prevents obsolete code from remaining as precedent.

## Lens Prompts

- Lifecycle: distinguish active, provisional, deprecated, retired, replacement-ready, and removal-ready code.
- Blast Radius: identify consumers and migration risk before removing authority or compatibility.
- Boundary: public interfaces, access paths, schema, routes, generated artifacts, and tools need explicit compatibility treatment.
- Memory: record deprecation, replacement, migration path, retirement, and removal triggers when future agents must avoid the old precedent.

## Procedure

1. State the element and current lifecycle.
2. Identify replacement, migration path, consumers, and public boundary implications.
3. Decide keep, deprecate, retire, or defer.
4. Define removal trigger when deprecation remains active.
5. Add secondary trim-unused-code behavior only when removal evidence is strong enough.

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
