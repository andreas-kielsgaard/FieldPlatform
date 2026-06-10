# Source Maintenance Behavior: Move Between Boundaries

## Purpose

Decide whether existing code belongs in another layer, technology area, tool, platform component, package, or ownership boundary.

This behavior protects against code living where it creates misleading ownership or dependency direction.

## Activated Lenses

- Boundary
- Ownership
- Blast Radius
- Lifecycle
- Memory

## Evidence To Consider

- `technology-architecture-map.md`.
- Existing source/generated boundaries.
- Imports, exports, and consumers.
- Public API expectations.
- Current tests/examples depending on location.
- Tool evidence category: `map-deps`.
- Tool evidence category: `map-affected-surfaces`.
- Tool evidence category: `check-boundaries`.
- Tool evidence category: `symbol-search`.

## Procedure

1. Use the Boundary Lens to identify which boundary is currently wrong.
2. Use the Ownership Lens to find the rightful destination owner.
3. Use the Blast-Radius Lens to identify consumers, imports, tests, docs, and maps affected by movement.
4. Use the Lifecycle Lens to classify whether movement promotes, demotes, or stabilizes the source element.
5. Use the Memory Lens if boundary or ownership expectations change.

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

Update `technology-architecture-map.md` when ownership or boundaries change.

Update area maps when canonical paths or owners change.

Update `decision-log.md` when movement establishes a structural convention.

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
