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

- [people](../Data%20layer/Person%20entity.md)
- [communities](../Data%20layer/Community%20entity.md)
- [events](../Data%20layer/Event%20offering%20entity.md)
- [venues](../Data%20layer/Venue%20entity.md)
- ParticipationEdges
- FieldRelations
- RelationReviews
- generated fields
- suggested [event](../Data%20layer/Event%20offering%20entity.md) shares and suggested connections
- recommendation outputs
- [community](../Data%20layer/Community%20entity.md) health calculations
- [hold](../Ontology/Hold%20unclear%20point.md) types and movement options

It may expose technical terms such as [FieldRelation](../Data%20layer/FieldRelation.md), [ParticipationEdge](../Data%20layer/ParticipationEdge.md), provenance, reviewAuthorityType, holdTypes, and movementUnlocked because it is an internal/design-review surface. It should still include plain-language explanations when useful.

## Design Target

- Raw records and computed outputs should be inspectable side by side.
- Formula assumptions should be easy to find and revise.
- Relation provenance, [review state](Review%20and%20approval%20model.md), [hold](../Ontology/Hold%20unclear%20point.md) taxonomy, and movement options should be inspectable.
- Dev tools should help the prototype remain discussable and changeable.
- Dev tools should not shape final product navigation unless a capability graduates into an intentional user-facing feature.

If a dev-tool affordance becomes useful for ordinary users, redefine it first in frontend, user-story, language, or access-layer pages.
