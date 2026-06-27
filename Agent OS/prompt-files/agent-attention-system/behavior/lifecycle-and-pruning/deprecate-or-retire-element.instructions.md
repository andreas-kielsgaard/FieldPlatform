# Structural Maintenance Behavior: Deprecate Or Retire Element

## Purpose

Decide whether a Maintained Element remains temporarily available, should be marked no longer preferred, has been replaced, or should be removed from architectural authority.

This behavior protects against unsafe deletion and prevents obsolete maintained elements from remaining as precedent.

## Lens Prompts

- Lifecycle: distinguish active, provisional, deprecated, retired, replacement-ready, and removal-ready elements.
- Contract: identify compatibility, consumer expectations, tests, and replacement promises before changing or removing supported behavior.
- Blast Radius: identify consumers and migration risk before removing authority or compatibility.
- Boundary: public interfaces, access paths, schema, routes, generated artifacts, and tools need explicit compatibility treatment.
- Memory: record deprecation, replacement, migration path, retirement, and removal triggers when future agents should avoid the old precedent.

## Procedure

1. State the element and current lifecycle.
2. Identify replacement, migration path, consumers, and public boundary implications.
3. Use `consumer-impact-preview` and `test-relation-scan` when deprecation or retirement changes supported behavior or compatibility.
4. Use `artifact-query` when generated, indexed, or tool-maintained status affects the retirement path.
5. Decide keep, deprecate, retire, or defer.
6. Define removal trigger when deprecation remains active.
7. Add secondary trim-unused-element behavior only when removal evidence is strong enough.

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

Update relevant durable memory when retirement or deprecation changes durable architecture.

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

