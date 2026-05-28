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

ParticipationEdge is the high-resolution person-to-community belonging model.

It is not replaced by FieldRelation. FieldRelation handles broader relations between objects and contexts; ParticipationEdge handles the detailed shape of a person's relationship to a community.

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
- shared exposure through overlapping communities, event tags, venue use, or participation history

## Used By

- My Orientation
- relationship-to-groups views
- community personal relationship panels
- event and group recommendations
- steward aggregate health signals
- generated field evidence
- dev model inspection
- FieldRelation evidence and pathway logic where person-to-community belonging matters

## Invariants And Risks

- Keep access, attendance, identity, trust, commitment, and visibility separate.
- Visibility should be facet-specific and scoped.
- Do not make dormant relationships shameful or automatically targeted for reactivation.

## Access Layer

Current methods include `edge.user()`, `edge.community()`, `edge.strength()`, `edge.makeDormant()`, `edge.reactivate()`, and `edge.update(patch)`.
