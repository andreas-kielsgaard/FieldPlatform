# Data/State/Effect Lens

## Purpose

Clarify ownership of data, state, derived values, side effects, ordering, caching, invalidation, and behavior flow.

## Activates When

- A task displays, filters, derives, persists, fetches, caches, mutates, or shares data.
- A change introduces local, URL, shared client, server/cache, accessor, schema, or calculation concerns.
- A local-looking change may alter side effects or lifecycle.
- State or data ownership is unclear.

## Core Distinction

Displaying data is not the same as owning data. Derived state is not the same as source state.

## Questions

- Does this introduce persisted data?
- Does this derive data from existing state?
- Does this create duplicated state?
- Does this change accessors, caching, invalidation, lifecycle, side effects, or ordering?
- Which layer owns the source of truth and which layer only presents or derives from it?

## Evidence To Consider

- Schema, data-model, accessor, state-management, and mock-data maps.
- Existing state owners and consumers.
- Query, mutation, cache, and invalidation paths.
- Calculations or derived signals.
- Tests and fixtures that encode data shape or side effects.

## Decision Outputs

- Local component state.
- URL state.
- Server/cache state.
- Shared client state.
- Accessor or data-layer change.
- Schema or domain-model change.
- Derived calculation owner.

## Stop Or Escalate When

- A UI change requires persisted data or server query behavior.
- Multiple states can represent the same source of truth.
- Side effects, ordering, or invalidation are hidden.
- A component starts owning data that belongs to an accessor, domain, schema, or calculation owner.

## Cheap Pass

The change only reads already-owned data for local presentation and does not add state, persistence, derivation, side effects, caching, invalidation, or shared consumers.

## Memory Implication

Update memory when data ownership, state placement, schema shape, derived calculation ownership, accessor behavior, or side-effect conventions change.
