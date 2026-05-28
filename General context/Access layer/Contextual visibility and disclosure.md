---
title: Contextual Visibility And Disclosure
layer: access
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - contextual disclosure
  - visibility model
related:
  - Access methods and calculations.md
  - ../Architecture/Data layer overview.md
  - ../Modules/Contextual Disclosure module.md
  - ../Frontend/Language and copy rules.md
depends_on:
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Community Overview View.md
implemented_by:
---

# Contextual Visibility And Disclosure

Gradual contextual disclosure is a cross-object principle: real interaction can surface optional ways for a person to become more visible, but participation should not automatically expose identity, contact details, history, opinions, attendance, or relationship graph.

## Three Visibility Layers

- Internal app/storage visibility: what the platform stores or processes internally for private orientation, calculations, permissions, explanations, safety checks, steward review, and aggregate patterns.
- Participation requirements: what a facilitator, host, venue, steward, or community requires before participation can be accepted.
- Post-participation sharing: what the person chooses to reveal after a real interaction.

Logistical visibility must not imply social visibility. If a facilitator needs a participant's name or contact information, the request should say who receives it and why. That information should not automatically make the person's profile, attendance, contact route, community relationship, or future activity visible elsewhere.

## Candidate Data Objects

These are target data-layer concepts, not automatically required collections:

- DataShareRequest: a record of one entity or context asking for, offering, or being able to receive selected data facets from another entity.
- VisibilityGrant: the current durable visibility relation created or updated when a request is accepted or a standing preference is set.

Possible fields include visibility scope, purpose, recipient type, requirement level, request status, source object, subject object, context object, expiry, revocation state, material-change behavior, and output-cleaning rules.

Do not add all fields merely because they are named. Add stable schema when multiple shared surfaces need the behavior.

## Output Cleaning

Recommendations, aggregate signals, overlap hints, community-origin summaries, and "people like you" explanations can reveal private participation by implication. Future access-layer work should treat output cleaning as part of visibility behavior, not as a frontend afterthought.
