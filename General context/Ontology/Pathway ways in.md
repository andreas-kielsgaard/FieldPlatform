---
title: Pathway / Ways In
layer: ontology
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Pathway
  - ways in
related:
  - Product ontology.md
  - Hold unclear point.md
  - ../Modules/Ways In module.md
depends_on:
  - ../Data layer/FieldRelation.md
  - ../Data layer/ParticipationEdge.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Community Overview View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/fieldRelation.ts
  - ../../Platform data layer/source/calculation-layer/fieldRelations.js
---

# Pathway / Ways In

A pathway is the movement made possible when a relation becomes visible, accepted, or clarified.

User-facing UI should usually say "Ways in", "First step", "Available next step", or a concrete action. "Pathway" can remain product/design language.

## Examples

- attend beginner event
- follow lightly
- request access
- ask steward
- ask the field
- ask someone to listen
- bring this to morning orientation
- join a focus pocket
- take a walk
- make a need or offer visible
- carry a nugget into tomorrow
- let something rest
- volunteer
- join recurring practice
- suggest related community
- reactivate dormant edge
- create bridge event
- mark relationship between communities

## Constraints

A relation becoming visible does not mean every action becomes available. Ways in are constrained by:

- relation status
- visibility and consent
- access rules
- capacity and boundary
- steward authority
- participation edge state
- event requirements
- community entry guidance

Suggested relations may only unlock "ask steward" or "follow lightly." Accepted event-to-community relations may unlock community event placement, recommendation explanation, or beginner entry paths.

## UI Rule

Group ways-in actions by target object. Do not mix "Attend event", "Follow community", "Request access", and "See other events here" into a flat list.

Examples:

- For this event: Attend, Mark interested, Ask facilitator.
- For Contact Improvisation Aarhus: Follow community, See beginner events, Ask a steward.
- For this venue: See other events here.

Every action must make clear what it acts on.
