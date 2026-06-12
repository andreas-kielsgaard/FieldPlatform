# Structural Maintenance Behavior: Composition, Inheritance, Or Adaptation Strategy

## Purpose

Decide how a new or changed Maintained Element should relate to existing behavior: compose, wrap, parameterize, extend, inherit, adapt, or define from scratch.

This behavior protects against using inheritance or direct extension when composition, wrapping, or a local definition would preserve clearer ownership.

## Lens Prompts

- Reuse: identify the behavior worth reusing without assuming shared identity.
- Ownership: composition or wrapping is preferred when the existing owner should not absorb the new responsibility.
- Contract: wrappers, adapters, inheritance, and extension should make consumer-visible promises explicit and testable.
- Boundary: the relationship form should not leak implementation details or reverse dependency direction.
- Lifecycle: keep local/provisional relationships easy to replace; stabilize only intentional conventions.
- Memory: record relationship strategy only when it becomes a durable convention or shared pattern.

## Procedure

1. State the existing behavior and the desired relationship.
2. Decide whether shared identity is semantically true or merely convenient.
3. Check boundary direction, public API, consumer expectations, and replacement cost.
4. Use `consumer-impact-preview` when the strategy changes consumer-visible promises or adaptation behavior.
5. Choose composition, wrapping/adaptation, extension, inheritance, local definition, or defer.
6. Add secondary boundary, extension, or near-match behavior when strategy choice reveals a separate structural decision.

## Prefer Composition When

- The new behavior uses existing behavior without sharing identity.
- The existing owner should remain closed to the new assumptions.
- The relationship should be easy to change later.
- The local Maintained Element owns orchestration.

## Prefer Wrapping Or Adapting When

- The existing element is useful but has an interface mismatch.
- The adapter can preserve boundary clarity.
- Consumers should not know implementation details.

## Prefer Extension When

- The existing owner truly owns the new behavior.
- Extension keeps the owner name precise.
- Existing consumers share the same assumptions.

## Prefer Inheritance Only When

- The local technology idiom supports it.
- Shared identity is semantically true.
- Substitution expectations are clear.
- It does not create fragile base-class coupling.

## Define From Scratch When

- Existing similarities are superficial.
- The concept is unstable.
- Reuse would create misleading ownership.
- A local one-off is easier to delete.

## Stop Or Escalate When

- Strategy choice creates public API, boundary, or lifecycle consequences.
- Inheritance is chosen mainly to save effort.
- Composition requires reaching into internals.
- Parameterization creates unrelated options.

## Memory Updates

Update the deferred logging strategy when an adaptation strategy becomes a reusable convention.

Update area maps when relationship expectations become part of a shared component/service/accessor/tool pattern.

## Completion Output

```text
Existing behavior considered:
Strategy chosen:
Reason:
Ownership impact:
Boundary impact:
Lifecycle classification:
Memory updated:
```

