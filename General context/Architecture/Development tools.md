---
title: Development Tools
layer: implementation
status: implemented
maturity: implemented but needs review
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - dev tools
  - Data Model Explorer
related:
  - Access layer overview.md
  - Data layer overview.md
  - Review and approval model.md
depends_on:
  - Access layer overview.md
consumed_by:
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
  - ../../Platform data layer/dev-tool/index.html
  - ../../Platform data layer/dev-tool/js/app.js
  - ../../Platform data layer/dev-tool/field-relation-browser-smoke.html
---

# Development Tools

Development tools help designers and developers inspect assumptions, raw records, calculated outputs, relation states, review states, and formula behavior. They are not participant-facing product features.

## Data Model Explorer

The Data Model Explorer should inspect:

- people
- communities
- events
- venues
- ParticipationEdges
- FieldRelations
- RelationReviews
- generated fields
- suggested event shares and suggested connections
- recommendation outputs
- community health calculations
- hold types and movement options

It may expose technical terms such as FieldRelation, ParticipationEdge, provenance, reviewAuthorityType, holdTypes, and movementUnlocked because it is an internal/design-review surface. It should still include plain-language explanations when useful.

## Design Target

- Raw records and computed outputs should be inspectable side by side.
- Formula assumptions should be easy to find and revise.
- Relation provenance, review state, hold taxonomy, and movement options should be inspectable.
- Dev tools should help the prototype remain discussable and changeable.
- Dev tools should not shape final product navigation unless a capability graduates into an intentional user-facing feature.

If a dev-tool affordance becomes useful for ordinary users, redefine it first in frontend, user-story, language, or access-layer pages.
