# Structural Maintenance Behavior: Move Between Boundaries

## Purpose

Decide whether an existing maintained element belongs in another layer, technology area, tool, platform component, package, or ownership boundary.

This behavior protects against maintained elements living where they create misleading ownership or dependency direction.

## Lens Prompts

- Boundary: move a maintained element when its current location creates misleading dependency direction, source/generated confusion, or cross-component coupling.
- Ownership: the destination should own the element's reason to change.
- Blast Radius: identify consumers, imports, tests, docs, and maps before movement.
- Lifecycle: classify whether the move promotes, demotes, stabilizes, or retires the Maintained Element.
- Memory: update architecture or area memory only when canonical paths, owners, or boundary expectations change.

## Procedure

1. State the element, current location, and suspected rightful boundary.
2. Identify the destination owner and reason to change.
3. Check imports, exports, consumers, tests, public APIs, and source/generated expectations.
4. Use `artifact-query` when source/generated, derived, indexed, or tool-maintained status may affect the move.
5. Decide move, split first, define boundary first, defer, or record debt.
6. Keep behavior changes separate from structural movement unless explicitly intended.
7. Add secondary split or interface-boundary behavior when movement reveals one.

## Move When

- The destination has the rightful reason to change.
- Movement restores dependency direction.
- The current location misleads future agents.
- Consumers can use the moved element through an appropriate interface.
- The move clarifies ownership without changing behavior.

## Defer Move When

- The destination boundary is not defined.
- The element mixes multiple responsibilities and needs splitting first.
- Public API migration is unclear.
- Movement would break consumers without a migration path.

## Stop Or Escalate When

- Movement requires changing public APIs.
- Consumers span platform components or technology areas.
- The move reveals missing interface boundaries.
- Behavior changes are being mixed into a structural move.

## Memory Updates

Update `project-control-files/technology-architecture-map.md` when ownership or boundaries change.

Update area maps when canonical paths or owners change.

Update relevant durable memory when movement establishes a structural convention.

Update `known-debt.md` if movement is partial.

## Completion Output

```text
Moved element:
From:
To:
Reason:
Behavior changed? intended/no
Boundary impact:
Consumers affected:
Memory updated:
Remaining debt:
```

