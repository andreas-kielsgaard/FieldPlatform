# Structural Maintenance Behavior: Demote Overgeneralized Abstraction

## Purpose

Decide whether a shared abstraction is too broad, premature, misleading, or better owned locally/narrowly.

This behavior protects against framework sludge and false shared ownership.

## Lens Prompts

- Ownership: a shared abstraction should own one coherent responsibility; multiple reasons to change are demotion pressure.
- Near-Match: similar consumers may still need separate owners when their meanings, lifecycles, or boundaries differ.
- Duplication: local duplication can be more honest than false sharing when semantics are not actually shared.
- Lifecycle: classify the abstraction as stable, candidate, overgeneralized, deprecated, split, or demoted.
- Blast Radius: preview affected consumers before narrowing or retiring a shared abstraction.
- Memory: update durable guidance for status changes, ownership changes, or intentional demotion.

## Procedure

1. State the abstraction, its current purpose, and the pressure causing concern.
2. Identify variants, options, consumers, and reasons to change.
3. Decide whether shared semantics still exist or whether local/narrow ownership would be clearer.
4. Choose keep shared, split, demote, deprecate, or report a scoped compromise.
5. Add secondary splitting, lifecycle, or near-match behavior when demotion reveals a separate decision.

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

Report partial demotion or remaining compromise in the final response.

Update relevant durable memory when a shared abstraction is intentionally narrowed, split, or demoted.

## Completion Output

```text
Abstraction:
Problem:
Decision: keep/split/demote/deprecate
New owners:
Consumers affected:
Memory updated:
Remaining compromise:
```
