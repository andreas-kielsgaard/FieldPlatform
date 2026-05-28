---
title: Suggest Connection Flow
layer: user stories
status: generated/unreviewed
maturity: buildable spec
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Suggest Connection flow
related:
  - ../Views/Public Event View.md
  - ../Data layer/FieldRelation.md
  - ../Modules/Suggested Connections Review module.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Steward Suggested Connections View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/services/eventSuggestionService.ts
---

# Suggest Connection Flow

Intent: the [user](../Data%20layer/Person%20entity.md) senses that an [event](../Data%20layer/Event%20offering%20entity.md), [venue](../Data%20layer/Venue%20entity.md), [community](../Data%20layer/Community%20entity.md), [person](../Data%20layer/Person%20entity.md), or pattern belongs in a context and wants to suggest that connection without claiming authority.

The first implementation slice is event-to-community suggestion.

## Flow

1. [User](../Data%20layer/Person%20entity.md) sees an [event](../Data%20layer/Event%20offering%20entity.md) recommendation or opens a [Public Event View](../Views/Public%20Event%20View.md).
2. The page makes [event](../Data%20layer/Event%20offering%20entity.md) identity legible: title, time, [venue](../Data%20layer/Venue%20entity.md), host/facilitator, access, cost, audience, experience needed, entry support, expectations, requirements, and attendance state.
3. [User](../Data%20layer/Person%20entity.md) chooses a contextual action such as "Suggest related [community](../Data%20layer/Community%20entity.md)", "Suggest where this belongs", or "Add context."
4. The app shows a filtered target list, not a universal object picker.
5. [User](../Data%20layer/Person%20entity.md) adds a short reason.
6. The app says the suggestion is not automatic publication, ownership, or recommendation to everyone.
7. The [access layer](../Architecture/Access%20layer%20overview.md) creates a suggested relation or compatibility suggested [event](../Data%20layer/Event%20offering%20entity.md) share.
8. The suggestion appears in the relevant steward review surface.
9. A steward accepts, refines, redirects, declines, or keeps it as a calculated pattern.

## Access And Data

- [Event](../Data%20layer/Event%20offering%20entity.md) object
- [Community](../Data%20layer/Community%20entity.md) object
- [FieldRelation](../Data%20layer/FieldRelation.md) with provenance, [review state](../Architecture/Review%20and%20approval%20model.md), evidence, [hold](../Ontology/Hold%20unclear%20point.md) types, visibility, and movementUnlocked
- compatibility suggested [event](../Data%20layer/Event%20offering%20entity.md) share where still needed

## Outcome

Relevance can be socially proposed without granting automatic authority or marketing reach.
