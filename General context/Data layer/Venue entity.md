---
title: Venue Entity
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
  - Venue
related:
  - Community entity.md
  - Event offering entity.md
  - FieldRelation.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Generated Field View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/venue.ts
  - ../../Platform data layer/source/access-layer/repositories/venueRepository.ts
---

# Venue Entity

A venue is a physical place that can anchor [events](Event%20offering%20entity.md), [communities](Community%20entity.md), and overlap between fields.

## Purpose

Represent practical place context without pretending the place is the whole support. A venue can be a stable object, while actual support may be relational, situational, human, temporal, or practice-based.

## Possible Properties

- name
- location or area
- practical description
- [communities](Community%20entity.md) that use it
- [events](Event%20offering%20entity.md) that happen there
- tags or affordances when useful

## Relationships

- Venue hosts or anchors [events](Event%20offering%20entity.md).
- Venue may be used by [communities](Community%20entity.md).
- Venue overlap may contribute to generated fields.
- Venue may be source or target of FieldRelations such as hosted_at, shares_venue, or common venue.

## Invariants And Risks

- A venue should not become a resource catalogue entry merely because it can.
- Venue pages should foreground practical place context before relation panels.
- "Other things here" can be a useful [way in](../Ontology/Pathway%20ways%20in.md), but it should not reveal private participation.

## Access Layer

Current methods include `platform.venues.get(id)`, `platform.venues.list()`, `venue.communities()`, and `venue.events()`.
