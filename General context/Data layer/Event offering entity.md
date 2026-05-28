---
title: Event / Offering Entity
layer: data
status: implemented
maturity: implemented but needs revision
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Event
  - Offering
related:
  - FieldRelation.md
  - Venue entity.md
  - ../Views/Public Event View.md
depends_on:
  - ../Frontend/Surface grammar.md
consumed_by:
  - ../Views/Public Event View.md
  - ../User stories/Suggest Connection flow.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/event.ts
  - ../../Platform data layer/source/access-layer/repositories/eventRepository.ts
  - ../../Platform data layer/source/access-layer/services/eventRegistrationService.ts
  - ../../Platform data layer/source/access-layer/services/eventSuggestionService.ts
  - ../../Platform data layer/source/access-layer/services/eventManagementService.ts
---

# Event / Offering Entity

An event or offering is a hosted activity with enough context for a participant to understand what it is, whether they can attend, what is expected, who holds it, and how it relates to communities or fields.

## Purpose

Represent event facts, attendance/interest state, creator/host context, access requirements, and possible relations to communities, venues, generated fields, practices, festivals, or people in contextual roles.

## Possible Properties

- title
- host, facilitator, creator, cohosts, volunteers
- venue
- time
- access level
- cost, price, donation, sliding scale, or access note
- tags
- intended audience
- experience needed
- beginner-friendliness or low-threshold signal
- entry support
- practical expectations
- requirements or prerequisites
- linked groups and relevant groups
- interested and attending participants
- suggested FieldRelations or compatibility suggested event shares

## Semantic Separation

Event facts must not collapse into one overloaded label group. Keep these distinct:

- access
- cost
- audience
- experience needed
- entry support
- practical expectations
- requirements
- connection type
- review state
- visibility
- evidence/source
- action target

This is product grammar now and may require more explicit fields when multiple surfaces need stable shared behavior.

## Invariants And Risks

- Event creation should not feel like ad targeting.
- Suggested relevance to a community is not ownership, publication, or recommendation to everyone.
- Logistical requirements for participation must say who receives the information and why.

## Access Layer

Current methods include `platform.events.get(id)`, `event.registerUser(user)`, `event.markUserInterested(user)`, `event.suggestToCommunity(community, suggestedBy, note)`, `event.relevanceFor(user)`, `event.linkedCommunities()`, `event.relevantCommunities()`, and event creation/management services.
