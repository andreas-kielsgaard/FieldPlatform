# Blast-Radius Lens

## Purpose

Preview consequences beyond directly touched files so source decisions stay bounded and verifiable.

## Activates When

- A change touches shared owners, public interfaces, routes, schema, accessors, policies, state, fixtures, generated indexes, or reusable components.
- A rename, move, extraction, centralization, split, deprecation, or trim may affect consumers.
- The affected surfaces are uncertain.

## Core Distinction

Touched files are not the same as affected surfaces.

## Questions

- Who consumes this?
- What routes expose it?
- What tests encode it?
- What mocks or fixtures represent it?
- What docs, maps, ledgers, or indexes mention it?
- Would generated or structural indexes need refresh later?

## Evidence To Consider

- Symbol references.
- Component usage.
- Accessor usage.
- Dependency graph.
- Route map.
- Rename-impact output.
- Affected-surface summaries.
- Tests, mocks, fixtures, docs, and structural indexes.

## Decision Outputs

- Blast radius: local.
- Blast radius: known direct consumers.
- Blast radius: cross-route.
- Blast radius: cross-layer.
- Blast radius: architecture-shaping.
- Blast radius: uncertain.

## Stop Or Escalate When

- Blast radius is uncertain and the change touches a shared or stable owner.
- Consumers cross technology areas, platform components, or layer boundaries.
- Public API, schema, route, policy, or generated artifacts are affected.
- Verification cannot be scoped from available evidence.

## Cheap Pass

The change touches one local source element, has no exports or shared consumers, does not alter data or names, and can be verified locally.

## Memory Implication

Update memory when blast radius reveals durable consumers, new affected surfaces, architecture-shaping impact, stale maps, verification gaps, or explicit uncertainty that future work must remember.
