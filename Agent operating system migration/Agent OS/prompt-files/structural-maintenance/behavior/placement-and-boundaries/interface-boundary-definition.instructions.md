# Structural Maintenance Behavior: Interface Boundary Definition

## Purpose

Define or clarify the controlled way one maintained area consumes another.

This behavior protects against direct imports and hidden coupling where an explicit interface, accessor, service, adapter, policy predicate, or generated contract should exist.

## Lens Prompts

- Boundary: state what each side may know and what coupling is disallowed.
- Ownership: identify which side owns the interface and which side consumes it.
- Contract: preserve promised inputs, outputs, behavior, side effects, compatibility, and tests for existing consumers, or plan their migration.
- Data/State/Effect: protect data ownership, derived values, side effects, caching, invalidation, policy, and schema contracts from leaking across the boundary.
- Blast Radius: identify current and likely consumers before changing a shared consumption path.
- Memory: record only durable interfaces, accepted exceptions, and boundary conventions.

## Procedure

1. Name the producer, consumer, and boundary being crossed.
2. Decide whether direct dependency, existing interface, expanded interface, new interface, inversion, or temporary exception is appropriate.
3. Check whether the boundary carries data, state, effects, policy, schema, tools, or generated contracts.
4. Identify consumers affected by the boundary choice.
5. Use `consumer-impact-preview` and `test-relation-scan` when the boundary carries consumer-visible promises or compatibility risk.
6. Define allowed and disallowed coupling and whether consumer-facing expectations are preserved or intentionally changed.
7. Add secondary movement or placement behavior if the element lives on the wrong side.

## Interface Options

Choose one:

- Direct dependency is acceptable.
- Existing interface should be used.
- New accessor/interface should be defined.
- Existing interface should be expanded.
- Dependency direction is wrong; move or invert dependency.
- Temporary exception is accepted and logged.

## Stop Or Escalate When

- UI, route, or product-runtime artifacts need raw schema, persistence, policy, or tool internals.
- Product runtime artifacts depend on Agent OS tooling.
- A consumer needs implementation details to use another area.
- Boundary change affects public APIs or generated contracts.
- The exception would become precedent.

## Memory Updates

Update `project-control-files/technology-architecture-map.md` when interface expectations between components change.

Refresh or query accessor, schema, dependency, state, and policy-literal evidence when those boundaries are involved.

Update the deferred logging strategy when an interface convention is established.

Update `known-debt.md` for intentional temporary violations.

## Completion Output

```text
Boundary:
Producer:
Consumer:
Allowed interface:
Disallowed coupling:
Decision:
Temporary exceptions:
Memory updated:
```

