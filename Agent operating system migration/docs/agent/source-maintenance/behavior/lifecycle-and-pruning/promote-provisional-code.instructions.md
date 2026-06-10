# Source Maintenance Behavior: Promote Provisional Code

## Purpose

Decide whether exploratory, mockup, local helper, candidate, or provisional source behavior should become durable architecture or shared precedent.

This behavior protects prototypes from silently fossilizing.

## Activated Lenses

- Lifecycle
- Ownership
- Boundary
- Naming/Ontology
- Blast Radius
- Memory

## Evidence To Consider

- `experiments.md`.
- `known-debt.md`.
- Current and likely future consumers.
- Ownership and boundary expectations.
- Naming and domain concept status.
- Tests, examples, or fixtures relying on the code.
- Tool evidence category: `map-affected-surfaces`.
- Tool evidence category: `symbol-search`.
- Tool evidence category: `map-deps`.
- Tool evidence category: `check-boundaries`.

## Procedure

1. Use the Lifecycle Lens to classify the current and target status.
2. Use the Ownership Lens to identify the rightful durable owner.
3. Use the Boundary Lens to ensure promoted code obeys architecture boundaries.
4. Use the Naming/Ontology Lens if names or concepts become canonical.
5. Use the Blast-Radius Lens to identify current and likely future consumers.
6. Use the Memory Lens to record promotion, ownership, boundary, debt, or experiment status.

## Promote When

- The behavior is no longer a local one-off.
- Multiple consumers should rely on it.
- The owner and boundary are clear.
- Naming and semantics are stable enough to become precedent.
- Tests or examples should treat it as supported behavior.

## Avoid Promotion When

- The behavior is still exploratory.
- Ownership or boundary is unclear.
- The implementation is a temporary workaround.
- Promotion would spread debt or freeze unstable language.
- Consumers can remain local without creating drift.

## Promotion Outputs

Choose and record the target lifecycle:

- Candidate shared pattern.
- Provisional shared implementation.
- Stable shared implementation.
- Public interface or contract.
- Deferred promotion with explicit debt.

## Stop Or Escalate When

- Promotion affects public APIs, schema, generated artifacts, routes, or tools.
- The implementation depends on mock data or temporary scaffolding.
- Promotion requires naming or domain decisions not yet settled.
- The promoted owner would cross technology or platform boundaries.

## Memory Updates

Update `experiments.md` when experimental status changes.

Update `known-debt.md` when debt is resolved, accepted, or deferred.

Update `technology-architecture-map.md`, area maps, or `decision-log.md` when promotion establishes durable ownership or structure.

## Completion Output

```text
Provisional element:
Previous lifecycle:
New lifecycle:
Promotion decision:
Owner:
Boundary impact:
Consumers:
Debt resolved/accepted:
Memory updated:
```
