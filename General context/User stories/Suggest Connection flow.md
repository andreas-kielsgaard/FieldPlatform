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

Intent: the user senses that an event, venue, community, person, or pattern belongs in a context and wants to suggest that connection without claiming authority.

The first implementation slice is event-to-community suggestion.

## Flow

1. User sees an event recommendation or opens a Public Event View.
2. The page makes event identity legible: title, time, venue, host/facilitator, access, cost, audience, experience needed, entry support, expectations, requirements, and attendance state.
3. User chooses a contextual action such as "Suggest related community", "Suggest where this belongs", or "Add context."
4. The app shows a filtered target list, not a universal object picker.
5. User adds a short reason.
6. The app says the suggestion is not automatic publication, ownership, or recommendation to everyone.
7. The access layer creates a suggested relation or compatibility suggested event share.
8. The suggestion appears in the relevant steward review surface.
9. A steward accepts, refines, redirects, declines, or keeps it as a calculated pattern.

## Access And Data

- Event object
- Community object
- FieldRelation with provenance, review state, evidence, hold types, visibility, and movementUnlocked
- compatibility suggested event share where still needed

## Outcome

Relevance can be socially proposed without granting automatic authority or marketing reach.
