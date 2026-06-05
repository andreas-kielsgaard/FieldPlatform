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

This [module](../Frontend/Modules%20overview.md) lets stewards review sensed, suggested, or calculated relations involving a context they are responsible for.

## Parent Views

- [Steward Suggested Connections View](../Views/Steward%20Suggested%20Connections%20View.md)
- future [community](../Data%20layer/Community%20entity.md) management surfaces
- future [event](../Data%20layer/Event%20offering%20entity.md) management surfaces where the [user](../Data%20layer/Person%20entity.md) has responsibility

## Displayed Data

- source and target object identity
- relation kind in product language
- [review state](../Architecture/Review%20and%20approval%20model.md)
- visibility
- provenance/source
- evidence such as shared tags, [venue](../Data%20layer/Venue%20entity.md), participation, host/[community](../Data%20layer/Community%20entity.md) relation, suggester/[community](../Data%20layer/Community%20entity.md) relation where privacy allows
- [hold](../Ontology/Hold%20unclear%20point.md) types translated into target-anchored uncertainty
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
