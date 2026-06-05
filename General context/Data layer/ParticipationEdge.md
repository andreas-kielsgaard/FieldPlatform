---
title: ParticipationEdge
layer: data
status: implemented
maturity: implemented but needs review
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - ParticipationEdge
related:
  - Person entity.md
  - Community entity.md
  - FieldRelation.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - ../Views/My Orientation View.md
  - ../Views/Community Overview View.md
  - ../Access layer/Access methods and calculations.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/participationEdge.ts
  - ../../Platform data layer/source/access-layer/services/participationService.ts
  - ../../Platform data layer/source/calculation-layer/shared.js
---

# ParticipationEdge

A [person](Person%20entity.md) follows a [community](Community%20entity.md), attends a few [events](Event%20offering%20entity.md), later asks for access, and eventually helps host. The platform should treat that as one evolving relationship, not as separate unrelated facts.

ParticipationEdge stores that person-to-community relationship.

[FieldRelation](FieldRelation.md) handles broader relations between objects and contexts. ParticipationEdge handles the detailed state of one [person](Person%20entity.md)'s relationship to one [community](Community%20entity.md).

## Purpose

Represent belonging without flattening it into member/non-member. It should support light, deep, formal, informal, temporary, dormant, and reactivating relationships.

## Dimensions

Binary or categorical layers:

- following/observing
- explicit membership or granted access
- explicit commitment such as recurring participation, stewarding, hosting, volunteering, facilitating, or organizing
- dormant/muted relationship
- visibility of the relationship signal
- distinction between logistical visibility, social visibility, and platform-internal use

Gradient layers:

- engagement strength
- recency
- frequency
- contribution level
- trust level
- social embeddedness
- norm familiarity
- identity salience
- shared exposure through overlapping [communities](Community%20entity.md), [event](Event%20offering%20entity.md) tags, [venue](Venue%20entity.md) use, or participation history

These gradient layers are internal orientation and calculation signals. They should not become public labels, individual scores, steward dashboards, or pressure to participate more. When they inform [community](Community%20entity.md) health or recommendations, expose the smallest useful aggregate or explanation.

## Used By

- [My Orientation](../Views/My%20Orientation%20View.md)
- relationship-to-groups [views](../Frontend/Views%20overview.md)
- [community](Community%20entity.md) personal relationship panels
- [event](Event%20offering%20entity.md) and [group](Community%20entity.md) recommendations
- steward aggregate health signals
- [generated field](GeneratedField.md) evidence
- dev model inspection
- [FieldRelation](FieldRelation.md) evidence and [pathway](../Ontology/Pathway%20ways%20in.md) logic where person-to-community belonging matters

## Invariants And Risks

- Keep access, attendance, identity, trust, commitment, and visibility separate.
- Visibility should be facet-specific and scoped.
- Do not make dormant relationships shameful or automatically targeted for reactivation.

## Access Layer

Current methods include `edge.user()`, `edge.community()`, `edge.strength()`, `edge.makeDormant()`, `edge.reactivate()`, and `edge.update(patch)`.
