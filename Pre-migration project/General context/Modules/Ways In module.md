---
title: Ways In Module
layer: frontend
status: generated/unreviewed
maturity: buildable spec
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Ways In module
related:
  - ../Ontology/Pathway ways in.md
  - ../Access layer/Access methods and calculations.md
depends_on:
  - ../Data layer/FieldRelation.md
  - ../Data layer/ParticipationEdge.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Community Overview View.md
  - ../Views/Generated Field View.md
implemented_by:
---

# Ways In Module

The [Ways In](../Ontology/Pathway%20ways%20in.md) [module](../Frontend/Modules%20overview.md) shows appropriate next steps grouped by the object each action acts on.

## Parent Views

- [Public Event View](../Views/Public%20Event%20View.md)
- [Community Overview View](../Views/Community%20Overview%20View.md)
- [Generated Field View](../Views/Generated%20Field%20View.md)
- [My Orientation View](../Views/My%20Orientation%20View.md)
- future [venue](../Data%20layer/Venue%20entity.md)/[person](../Data%20layer/Person%20entity.md)/recommendation surfaces

## Displayed Data

- current object identity
- related target objects
- relation status and visibility, translated into plain language
- available movements from access-layer movement options
- held or unavailable movements with target-anchored explanations
- prerequisite or alternate entry paths

## Actions

Examples:

- attend this [event](../Data%20layer/Event%20offering%20entity.md)
- mark interested
- ask facilitator
- follow [community](../Data%20layer/Community%20entity.md)
- see beginner [events](../Data%20layer/Event%20offering%20entity.md)
- request access
- ask a steward
- see other [events](../Data%20layer/Event%20offering%20entity.md) here
- volunteer
- reactivate a dormant relation
- suggest related [community](../Data%20layer/Community%20entity.md)

## Rules

- [Group](../Data%20layer/Community%20entity.md) actions by target object.
- Name the target or place actions visibly under the target.
- Do not mix direct [event](../Data%20layer/Event%20offering%20entity.md), [community](../Data%20layer/Community%20entity.md), [venue](../Data%20layer/Venue%20entity.md), and human ask actions in one flat list.
- Respect access, consent, visibility, capacity, boundary, and steward review.
- Empty states should be concrete, such as "No first step is shown yet" or "A [community](../Data%20layer/Community%20entity.md) steward may need to review this connection first."

## Access Dependencies

Current likely dependencies include `relation.movementOptions()`, [ParticipationEdge](../Data%20layer/ParticipationEdge.md) state, [event](../Data%20layer/Event%20offering%20entity.md) access, [community](../Data%20layer/Community%20entity.md) entry guidance, membership request state, and review status.

Known gap: movement values may need explicit target metadata for complex cases.
