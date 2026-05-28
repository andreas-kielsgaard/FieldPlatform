---
title: Data Layer Overview
layer: data
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - data layer
related:
  - Access layer overview.md
  - ../Data layer/FieldRelation.md
  - ../Data layer/ParticipationEdge.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - Access layer overview.md
  - ../Frontend/Views overview.md
implemented_by:
  - ../../Platform data layer/source/database-definition/schema.md
  - ../../Platform data layer/source/database-definition/seed.js
  - ../../Platform data layer/source/access-layer/types.ts
---

# Data Layer Overview

The data layer owns persistent represented objects, relationships between entities, lifecycle/status fields, privacy and visibility concerns, and persistence-oriented invariants.

It should explain not only what fields exist, but what each entity means in the platform, what it must not represent, and what consistency risks exist.

Current implementation lives in `Platform data layer/`. It is a JSON snapshot store with memory and browser `localStorage` adapters. That is intentional because the model is expected to change. The data layer should prioritize separation of concern, resettable seed data, and stable access points over final schema perfection.

## Current Core Entities

- [Person entity](../Data%20layer/Person%20entity.md): a participant first, possibly also creator, steward, host, facilitator, volunteer, or bridge person in context.
- [Community entity](../Data%20layer/Community%20entity.md): a named social container with stewards, norms, rhythm, access rules, and entry guidance.
- [Event/offering entity](../Data%20layer/Event%20offering%20entity.md): a hosted activity or offering with time, place, access, audience, expectations, and relation to contexts.
- [Venue entity](../Data%20layer/Venue%20entity.md): a physical place that anchors events, communities, and overlap.
- [ParticipationEdge](../Data%20layer/ParticipationEdge.md): the high-resolution person-to-community belonging model.
- [FieldRelation](../Data%20layer/FieldRelation.md): the broader relation between objects or contexts.
- [GeneratedField](../Data%20layer/GeneratedField.md): a computed pattern, not a managed community.

## Materialization Rule

Do not literalize every product noun into a collection.

A concept may become:

- stored record
- field on a record
- derived view/query
- lifecycle/status filter
- visibility/access behavior
- calculation logic
- seed data
- dev-tool inspection
- UI copy only
- future exploration

Stable data primitives are appropriate when multiple surfaces need shared behavior. Query/view behavior is often better when the question is what should be active, visible, carried-forward, resting, or hidden. Mockup-local state is acceptable when the concept is still being felt out.

## Visibility Principle

Internal app/storage visibility, logistical participation requirements, and social visibility must stay separate. The raw fact that the platform stores or can calculate something does not mean a user-facing surface may reveal it.

Indirect exposure matters. Counts, explanations, overlap hints, and "people like you" language can leak private participation by implication.
