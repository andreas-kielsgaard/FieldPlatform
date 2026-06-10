# Source Maintenance Behavior: New Source Element Placement

## Purpose

Decide where a new source element belongs and what ownership claim its placement makes.

This behavior protects against creating files, folders, modules, components, services, accessors, schema objects, utilities, routes, or tools in convenient but semantically wrong locations.

## Lens Prompts

- Intent: state what the new source element must make possible.
- Ownership: place the element with the narrowest owner that has the same reason to change.
- Boundary: keep dependency direction and interface expectations clear; convenient location is not sufficient.
- Naming/Ontology: if the name carries domain meaning, align it with existing vocabulary or mark uncertainty.
- Lifecycle: decide whether the element is local one-off, candidate pattern, provisional experiment, shared primitive, domain component, or stable architecture.
- Memory: update maps only when placement creates durable ownership, naming, boundary, or convention.

## Procedure

1. Name the source element and the responsibility it owns.
2. Identify plausible existing owners before creating a new one.
3. Check dependency direction, layer expectations, and consumer path.
4. Classify lifecycle and naming impact.
5. Choose local placement, existing owner placement, or new shared owner.
6. Add a secondary behavior if placement reveals platform, boundary, naming, or lifecycle decisions.

## Prefer Local Placement When

- The behavior is specific to one surface.
- The pattern is not yet stable.
- Reuse is speculative.
- The element should remain easy to delete or rewrite.

## Prefer Existing Owner Placement When

- The new element shares reason to change, lifecycle, dependencies, consumers, and abstraction level with an existing owner.
- The owner name remains precise after addition.
- No boundary leakage is introduced.

## Prefer New Shared Owner When

- The element represents a stable responsibility.
- Multiple consumers already need or clearly will need it.
- A central control surface reduces future drift.
- The name can be narrow and meaningful.

## Stop Or Escalate When

- Placement requires violating dependency direction.
- The element needs a vague name to fit.
- The new source element introduces a new platform component.
- The element is concept-bearing and no naming/ontology decision has been made.
- The element will be consumed across layers or routes and blast radius is uncertain.

## Memory Updates

Update area-specific maps when the new element becomes durable or shared.

Update `technology-architecture-map.md` when placement creates or changes an architectural boundary.

Update `decision-log.md` when placement establishes a convention future agents should follow.

Update `experiments.md` when the new element is explicitly provisional and likely to be mistaken for precedent.

## Completion Output

```text
New source element:
Placement decision:
Owner:
Lifecycle classification:
Boundary impact:
Naming impact:
Memory updated:
Remaining uncertainty:
```
