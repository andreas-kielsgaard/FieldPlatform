# Mockup 5.1 - Object-First Event Surfaces

This focused prototype tests one corrected design question from the Mockup 5 review:

How should the same event appear differently in a public participant-facing event page and in a steward-facing community review surface?

## What This Tests

- Same event, different surface, different priority.
- A public event page that leads with event basics before showing related community context.
- Semantic separation between access, cost, audience, experience, entry support, requirements, practical expectations, connection type, review state, visibility, evidence, and action target.
- A separate steward surface where suggested event-community connections are reviewed.
- FieldRelation-powered context translated into ordinary product language.
- Ways in grouped by the object they act on.

## Why There Are Two Surfaces

The public surface is for ordinary browsing. It makes the viewer stance explicit: a curious participant is looking at a public event page. It makes the event legible first: title, time, venue, host, access, cost, audience, experience, entry support, requirements, practical expectations, and simple attendance actions.

The steward surface is for community review. It can foreground suggested connections because the suggestion is the reason the object is being shown there. It still keeps enough event identity visible so the steward knows what they are reviewing, and it shows compact evidence before action buttons.

## How This Differs From Mockup 5

Mockup 5 tested the full relation loop and made connections prominent everywhere. Mockup 5.1 narrows the test to one event and two contexts:

- Public participant page: event first, connections second.
- Steward review surface: suggestion and review consequences first, event identity still visible.

The goal is not to build more of the platform. The goal is to pressure-test object-first surface grammar.

This refinement specifically tests whether the surface stops mixing semantic dimensions. Connection type, review state, visibility, and evidence/source now have separate visual treatments instead of appearing as one mixed badge row.

## Shared Data Layer Use

This mockup loads the shared Platform data layer browser scripts and uses managed access methods such as:

- `platform.events.get(...)`
- `platform.communities.get(...)`
- `platform.venues.get(...)`
- `platform.users.get(...)`
- `platform.fieldRelations.forObject(...)`
- `platform.fieldRelations.pendingForCommunity(...)`
- `relation.explanation()`
- `relation.movementOptions()`
- steward review methods on `platform.fieldRelations`

The local view-model only selects records for display, groups ways-in actions by target object, and translates domain values into UI labels. It does not duplicate seed data or relation formulas.

## How To Open

Open `index.html` directly in a browser from this folder.

The page resets demo storage on load so each review starts from seeded data.

## Manual Review Clickthrough

1. Open the public event page and confirm Friday Contact Jam is understandable before any related community context.
2. Check that access, cost, audience, experience, entry support, requirements, and practical details are separate.
3. Expand the venue, host, and related community previews.
4. Open `Suggest related community`, choose a community, add a reason, and send it.
5. Confirm the public page frames your own pending suggestion without showing steward-only context as ordinary public information.
6. Switch to `Steward suggestions`, choose that community, and confirm the suggestion appears under `Suggestions to review`.
7. Review the evidence panel before using action buttons.
8. Try `Accept`, `Refine`, `Redirect`, `Decline`, and `Keep as pattern only` after resetting between actions if needed.
9. Confirm consequence feedback appears and recently decided items can be expanded.
10. Return to the public event page after accepting or refining a suggestion and confirm it appears as supporting context.
11. Check that `Ways in` are grouped under the event, a prerequisite/newcomer path, a related community, and the venue.

## Relation Propagation

Accepting a suggestion confirms only the reviewed event-community connection. It may become evidence for other contexts, but it does not automatically endorse the event for another community. Redirect moves the suggestion to another community for review.

## Known Limitations

- This is a static prototype, not a production permissions model.
- The question flow behind `Ask facilitator` is represented as a future action only.
- The steward surface is intentionally narrow and only reviews a few seeded communities.
- Evidence labels are prototype-level summaries derived from existing seed data and managed access methods.
- It does not redesign venue pages, person pages, home, maps, or all object types.
- It does not change Mockup 4, Mockup 5, or the Platform data layer.
