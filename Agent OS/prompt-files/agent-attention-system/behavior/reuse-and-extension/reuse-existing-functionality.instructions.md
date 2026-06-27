# Structural Maintenance Behavior: Reuse Existing Functionality

## Purpose

Decide whether existing functionality should be reused, composed, extended, wrapped, extracted, branched from, or avoided.

This behavior protects against both unnecessary duplication and corrupting an existing owner for convenience.

## Lens Prompts

- Reuse: reuse only when the existing behavior preserves meaning for the new use, not merely because it saves effort.
- Ownership: avoid making an existing owner responsible for behavior with a different reason to change.
- Contract: reuse or adaptation should preserve promised behavior for existing consumers, or include a migration and test plan for changed expectations.
- Boundary: avoid reuse that crosses or bypasses an intended interface boundary.
- Lifecycle: treat stable/shared, provisional, local, and deprecated elements differently as precedents.
- Blast Radius: if reuse requires modifying shared behavior, identify likely consumers first.

## Procedure

1. State the existing functionality and the new need.
2. Decide whether meaning, ownership, lifecycle, dependencies, and consumers match.
3. Check boundary direction and approved consumption path.
4. Use `consumer-impact-preview` when reuse or adaptation could alter promised behavior for existing consumers.
5. Choose reuse unchanged, compose/wrap, extend, branch, create local one-off, or avoid.
6. Add secondary behavior when mismatch points to extension, near-match branching, extraction, movement, or deprecation.

## Reuse Unchanged When

- The existing element already owns the behavior.
- The new use matches its public purpose.
- No API, naming, lifecycle, or dependency drift is introduced.

## Compose Or Wrap When

- The existing behavior is useful but should not absorb the new responsibility.
- The new use needs adaptation without changing the existing owner.
- Shared identity would be misleading.

## Extend Existing Owner When

- The existing owner has the same reason to change.
- New behavior matches lifecycle, dependencies, and consumers.
- The owner name remains precise.

## Branch Or Create Local One-Off When

- Reuse would require unrelated options or flags.
- Existing consumers would not share the new assumptions.
- The existing element is provisional, deprecated, or not approved as precedent.
- Similarity is local or unstable.

## Stop Or Escalate When

- Reuse modifies a shared/stable Maintained Element.
- The existing element almost fits but mismatch is semantic, lifecycle, boundary, or data-related.
- Reuse would make the existing name less precise.
- Blast radius is uncertain.

## Memory Updates

Update memory only when reuse establishes a durable convention, promotes a candidate pattern, changes ownership expectations, or records intentional divergence from a near match.

## Completion Output

```text
Existing functionality considered:
Reuse decision:
Reason:
Ownership impact:
Boundary impact:
Lifecycle classification:
Memory updated:
```

