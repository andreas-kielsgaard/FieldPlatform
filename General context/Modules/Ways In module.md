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

The Ways In module shows appropriate next steps grouped by the object each action acts on.

## Parent Views

- Public Event View
- Community Overview View
- Generated Field View
- My Orientation View
- future venue/person/recommendation surfaces

## Displayed Data

- current object identity
- related target objects
- relation status and visibility, translated into plain language
- available movements from access-layer movement options
- held or unavailable movements with target-anchored explanations
- prerequisite or alternate entry paths

## Actions

Examples:

- attend this event
- mark interested
- ask facilitator
- follow community
- see beginner events
- request access
- ask a steward
- see other events here
- volunteer
- reactivate a dormant relation
- suggest related community

## Rules

- Group actions by target object.
- Name the target or place actions visibly under the target.
- Do not mix direct event, community, venue, and human ask actions in one flat list.
- Respect access, consent, visibility, capacity, boundary, and steward review.
- Empty states should be concrete, such as "No first step is shown yet" or "A community steward may need to review this connection first."

## Access Dependencies

Current likely dependencies include `relation.movementOptions()`, ParticipationEdge state, event access, community entry guidance, membership request state, and review status.

Known gap: movement values may need explicit target metadata for complex cases.
