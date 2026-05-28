---
title: Suggested Connections Review Module
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
  - Suggested Connections Review module
related:
  - ../Views/Steward Suggested Connections View.md
  - ../Data layer/FieldRelation.md
  - ../User stories/Review Suggested Relation flow.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../Views/Steward Suggested Connections View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/services/fieldRelationService.ts
---

# Suggested Connections Review Module

This module lets stewards review sensed, suggested, or calculated relations involving a context they are responsible for.

## Parent Views

- Steward Suggested Connections View
- future community management surfaces
- future event management surfaces where the user has responsibility

## Displayed Data

- source and target object identity
- relation kind in product language
- review state
- visibility
- provenance/source
- evidence such as shared tags, venue, participation, host/community relation, suggester/community relation where privacy allows
- hold types translated into target-anchored uncertainty
- movement that acceptance would unlock
- consequence of each decision

## Actions

- accept
- refine
- redirect
- decline
- keep as pattern only
- leave for later or mark dormant/held when supported

## Rules

- Show this only to users with relevant responsibility.
- Do not place review actions on ordinary public pages.
- Keep evidence compact before asking for a decision.
- Explain consequences before or immediately after each action.
- Do not turn steward review into CRM, individual targeting, or a surveillance dashboard.
- Acceptance confirms only the specific source/target relation.
