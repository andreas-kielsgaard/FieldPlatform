---
title: Steward Suggested Connections View
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
  - Steward Suggested Connections View
related:
  - ../Modules/Suggested Connections Review module.md
  - ../User stories/Review Suggested Relation flow.md
  - ../Data layer/FieldRelation.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../Architecture/Traceability model.md
implemented_by:
  - ../../Mockups/Mockup 5 - Field Relations Loop
---

# Steward Suggested Connections View

Purpose: let stewards review suggested or calculated relations involving a context they are responsible for.

## Viewer Stance

Steward, manager, host, creator, or explicitly responsible [person](../Data%20layer/Person%20entity.md) reviewing on behalf of a specific [community](../Data%20layer/Community%20entity.md) or object.

## Questions Answered

- Why is this being suggested here?
- Who or what suggested it?
- What is the relation between the suggester, host, facilitator, [event](../Data%20layer/Event%20offering%20entity.md), [venue](../Data%20layer/Venue%20entity.md), and [community](../Data%20layer/Community%20entity.md)?
- What evidence supports it?
- What might be unclear or held?
- What becomes visible if accepted?
- What movement would acceptance unlock?
- Should this be accepted, refined, redirected, declined, or kept as pattern only?

## Modules

- review-context header
- suggested connection cards
- evidence comparison
- [hold](../Ontology/Hold%20unclear%20point.md)/unclear-point explanation
- decision actions with consequences
- recently decided items

## Access Dependencies

- `platform.fieldRelations.pendingForCommunity(communityId)`
- `platform.fieldRelations.forReviewAuthority(type, id)`
- `relation.explanation()`
- `relation.movementOptions()`
- `platform.fieldRelations.accept(...)`
- `refine(...)`
- `decline(...)`
- `redirect(...)`
- `markComputedOnly(...)`

## Rules

- Keep review contained and role-gated.
- Use "Suggestions to review" or "Suggested connections" rather than unexplained internal language.
- Steward review is [community](../Data%20layer/Community%20entity.md) care, not CRM.
- Acceptance does not propagate automatic endorsement to another stewarded [community](../Data%20layer/Community%20entity.md).
