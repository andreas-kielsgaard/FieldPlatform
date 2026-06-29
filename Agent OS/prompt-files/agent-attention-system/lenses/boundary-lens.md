# Boundary Lens

## Purpose

Protect dependency direction and interface clarity between layers, tools, platform components, and source areas.

## Activates When

- A change crosses directories, layers, packages, technology areas, or platform components.
- A Maintained Element imports or consumes behavior from another area.
- A direct dependency may bypass an approved interface.
- A new interface boundary may be needed.

## Core Distinction

Can access is not the same as should know about.

## Questions

- Which layer or component should know this?
- Which layer or component should not know this?
- Is this crossing a boundary through an approved interface?
- Does the dependency direction match the technology architecture intent?
- Is this creating hidden coupling or leaking policy, schema, mock, or tool knowledge?

## Evidence To Consider

- Technology architecture map.
- Dependency graph or import paths.
- Existing accessor, API, service, policy, or interface maps.
- Current consumers across the boundary.
- Similar accepted or rejected dependency patterns.

## Decision Outputs

- Allowed direct dependency.
- Dependency is expected to go through accessor or interface.
- Dependency direction violation.
- Boundary missing; define interface.
- Temporary exception; report scoped compromise.

## Stop Or Escalate When

- Implementation requires importing across a disallowed layer boundary.
- UI, surface, or runtime artifacts need raw policy, schema, persistence, or tool internals.
- A project tool becomes a runtime dependency for product artifacts.
- A direct dependency would make future replacement or migration harder.

## Cheap Pass

The change remains within one established boundary and does not add imports, consumers, public interfaces, or cross-layer knowledge.

## Memory Implication

Consider memory updates when a boundary is added, changed, clarified, violated intentionally, or when an interface becomes the expected consumption path.
