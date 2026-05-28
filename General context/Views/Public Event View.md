---
title: Public Event View
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
  - Public Event View
related:
  - ../Data layer/Event offering entity.md
  - ../User stories/Suggest Connection flow.md
  - ../Modules/Ways In module.md
depends_on:
  - ../Frontend/Surface grammar.md
  - ../Access layer/Contextual visibility and disclosure.md
consumed_by:
  - ../Architecture/Traceability model.md
implemented_by:
  - ../../Mockups/Mockup 5.1 - Object-First Event Surfaces
---

# Public Event View

Purpose: let a curious participant understand an event first, then understand why it may matter in context and what actions are available.

## Viewer Stance

Curious participant. Host/facilitator management and steward review are separate modes or surfaces.

## Questions Answered

- What is this event?
- When and where is it?
- Who holds or facilitates it?
- Can I attend?
- What does it cost?
- Who is it for?
- What experience is needed?
- What entry support or requirements apply?
- Why am I seeing this?
- What communities or fields is it connected to?
- What can I do next?

## Modules

- event facts with semantic separation
- venue and facilitator/host context
- attendance and interest actions
- recommendation explanation
- related community/context panel
- Ways In module
- suggest context action
- contextual disclosure prompt after real interaction

## Access Dependencies

- `event.data()`
- `event.venue()`
- `event.relevanceFor(user)`
- `event.linkedCommunities()`
- `event.relevantCommunities()`
- `event.registerUser(user)`
- `event.markUserInterested(user)`
- `event.suggestToCommunity(community, suggestedBy, note)`
- `platform.fieldRelations.forObject("event", id)`

## Empty And Held States

- No reviewed community context yet.
- Suggested connection waiting for steward review, shown only if relevant and plain.
- First step unclear; point to ask facilitator, ask steward, or an intro event when available.

## Non-Leak Rule

Do not show steward-only relation mechanics on the public page unless the current user is in a clear preview/admin mode or the state is directly relevant to their task.
