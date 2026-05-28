---
title: Surface Grammar
layer: frontend
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - object surface grammar
  - connection UX
related:
  - Views overview.md
  - Language and copy rules.md
  - ../Views/Public Event View.md
depends_on:
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Views/Community Overview View.md
  - ../Views/Public Event View.md
implemented_by:
  - ../../Mockups/Mockup 5.1 - Object-First Event Surfaces
---

# Surface Grammar

Surface grammar defines how an object should be shown in a particular context.

Object type defines default affordances. User role, entry point, surrounding context, and surface type determine priority.

## Viewer Stance

Every surface should make the viewer stance legible:

- curious participant
- host/facilitator managing an event
- steward reviewing on behalf of a community
- public page
- management page
- review page

Do not mix participant actions, facilitator management, and steward review unless the mode or permissions are clear.

## Object Defaults

Event pages usually need what, when, where, who holds it, can I attend, what should I expect, what experience or access is needed.

Community pages usually need what the community is, who it is for, rhythm, norms, access, entry guidance, and beginner-friendly options.

Venue pages usually need where it is, what happens there, which communities or events use it, and practical expectations.

Person/facilitator pages need public role, offerings, appropriate access, and strong privacy boundaries.

Generated field pages need evidence and named communities, not management posture.

## Surface Contexts

- Full object page: preserve native orientation first.
- Embedded card: foreground why the object appears here while keeping compact identity.
- Steward/management surface: foreground review consequences, unresolved suggestions, and governance actions.
- Recommendation surface: foreground why this appears and what next step is available.
- Creator-fit surface: foreground fit evidence and possible destination contexts without feeling like ad targeting.
- Connection/relation surface: foreground the connection, while preserving enough source/target identity.
- Threshold surface: foreground current need, impulse, ask, offer, care, or digestion without requiring a stable object too early.

## Relation UI Rules

- FieldRelation can hold complex meaning in the domain layer, but UI must separate connection type, review state, visibility, evidence, and action target.
- Steward review is role-gated and contained.
- Suggested connections are contextual clarification, not ownership, marketing, publication, or social pressure.
- Public pages should not leak steward-only context.
- Relation propagation requires explicit rules; acceptance in one context does not automatically endorse another.
