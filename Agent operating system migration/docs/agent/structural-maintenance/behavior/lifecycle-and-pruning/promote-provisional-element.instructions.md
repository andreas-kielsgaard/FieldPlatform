# Structural Maintenance Behavior: Promote Provisional Element

## Purpose

Decide whether exploratory, mockup, local helper, candidate, or provisional maintained behavior should become durable architecture or shared precedent.

This behavior protects prototypes from silently fossilizing.

## Lens Prompts

- Lifecycle: promotion means a local, exploratory, mockup, candidate, or provisional element becomes precedent.
- Ownership: promoted elements need a rightful durable owner, not just a current location.
- Boundary: promoted elements must obey architecture boundaries before others depend on them.
- Contract: promotion makes promised behavior more stable; review I/O expectations, side effects, and tests before treating it as supported.
- Naming/Ontology: promotion can make names or concepts canonical; unstable language should remain provisional.
- Blast Radius: identify current and likely future consumers before making the element shared.
- Memory: record promotion, ownership, boundary, debt, or experiment status when future agents need it.

## Procedure

1. State the provisional element and why it is being considered for promotion.
2. Classify current and target lifecycle.
3. Identify durable owner, boundary expectations, naming status, and consumers.
4. Use `contract-impact` and `contract-test-coverage` when promotion makes behavior supported for current or future consumers.
5. Decide promote, keep provisional, defer, or route to placement/boundary/naming behavior first.
6. Record resolved or accepted debt only when promotion changes future expectations.

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

Update `project-setup/technology-architecture-map.md`, area maps, or the deferred logging strategy when promotion establishes durable ownership or structure.

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
