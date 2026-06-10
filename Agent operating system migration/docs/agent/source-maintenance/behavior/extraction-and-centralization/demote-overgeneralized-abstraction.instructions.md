# Source Maintenance Behavior: Demote Overgeneralized Abstraction

## Purpose

Decide whether a shared abstraction is too broad, premature, misleading, or better owned locally/narrowly.

This behavior protects against framework sludge and false shared ownership.

## Activated Lenses

- Ownership
- Near-Match
- Duplication
- Lifecycle
- Blast Radius
- Memory

## Evidence To Consider

- Current abstraction name, purpose, variants, options, and consumers.
- Whether consumers share the same reason to change.
- Whether options correspond to unrelated responsibilities.
- Existing component/accessor/area maps.
- Whether local duplication would be clearer.
- Tool evidence category: `component-usage`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `map-deps`.
- Tool evidence category: `map-affected-surfaces`.

## Procedure

1. Use the Ownership Lens to check whether the abstraction owns all behavior it contains.
2. Use the Near-Match Lens to identify cases that are similar but not truly shared.
3. Use the Duplication Lens to decide whether local duplication would be more honest than false sharing.
4. Use the Lifecycle Lens to classify the abstraction as stable, candidate, overgeneralized, deprecated, or demoted.
5. Use the Blast-Radius Lens before changing shared consumers.
6. Use the Memory Lens if abstraction status or ownership changes.

## Demote When

- The abstraction has multiple independent reasons to change.
- The name has become vague.
- Consumers require unrelated options.
- Domain distinctions are hidden by generic shape.
- Local/narrow owners would be clearer.

## Split Instead When

- The abstraction contains separable stable responsibilities.
- Some shared core remains legitimate.
- Different consumers need different rightful owners.

## Keep Shared When

- Consumers genuinely share semantics.
- Variants belong to the same responsibility.
- The abstraction name remains precise.
- Demotion would only create scattered drift.

## Stop Or Escalate When

- Demotion affects many consumers.
- Public APIs or stable components would break.
- A replacement owner is not clear.
- The abstraction is used as architecture in maps or docs.

## Memory Updates

Update component/accessor/area maps when shared status changes.

Update `known-debt.md` if demotion is partial.

Update `decision-log.md` when a shared abstraction is intentionally narrowed, split, or demoted.

## Completion Output

```text
Abstraction:
Problem:
Decision: keep/split/demote/deprecate
New owners:
Consumers affected:
Memory updated:
Remaining debt:
```
