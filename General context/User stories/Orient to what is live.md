---
title: Orient To What Is Live
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
  - Orient to what is live
related:
  - ../Views/My Orientation View.md
  - ../Data layer/ParticipationEdge.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../Views/My Orientation View.md
implemented_by:
  - ../../Mockups/Mockup 4
---

# Orient To What Is Live

Intent: the user wants to understand what is happening soon and how each event relates to their current participation.

## Flow

1. User opens My Orientation.
2. The app shows events in layers from strongest commitment to expansion edge.
3. The first layer shows events the user is actively helping hold.
4. The next layer shows events where the user has committed to participate.
5. The next layer shows events in member, trusted, or core communities.
6. The next layer shows followed or lightly tracked communities.
7. The expansion layer shows adjacent events based on overlap with interests, communities, venues, tags, and low-threshold access.
8. Each event shows why it appears.
9. User can open an event, attend, mark interested, or suggest that it belongs in a context.

## Views And Modules

- [My Orientation View](../Views/My%20Orientation%20View.md)
- Public Event View when an event is opened
- Ways In module
- recommendation explanation module

## Access And Data

- Event objects
- ParticipationEdges
- event relevance calculations
- tags, access, venue, creator/host, and relation signals where available

## Outcome

The user understands the difference between current commitment, clear relevance, and expansion edge.
