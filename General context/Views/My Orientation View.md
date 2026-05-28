---
title: My Orientation View
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
  - My Orientation View
related:
  - ../User stories/Orient to what is live.md
  - ../Data layer/ParticipationEdge.md
  - ../Modules/Ways In module.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../Architecture/Traceability model.md
implemented_by:
  - ../../Mockups/Mockup 4
  - ../../Mockups/Participant Orientation - Paths Threads Living Field
---

# My Orientation View

Purpose: help a person understand what is happening soon and how it relates to their current participation, light overlap, and expansion edges.

## Viewer Stance

Curious participant orienting to their own field.

## Questions Answered

- What am I already helping hold?
- What have I committed to?
- What is happening in communities where I have access, trust, or membership?
- What am I following lightly?
- What nearby possibilities may fit because of overlap?
- Why is each event or community shown?
- What first step is available?

## Modules

- upcoming events by relevance layer
- relationship-to-groups summary
- recommendation explanations
- generated fields around me
- Ways In module
- possible self-resourcing entry points when adopted

## Access Dependencies

- `user.events.recommended()`
- `user.participationEdges()`
- `user.communities.followed()`
- `user.communities.member()`
- `user.communities.committed()`
- `user.communities.dormant()`
- recommendation calculations
- generated field calculations

## States

- no upcoming known events
- only commitments/rooted events
- expansion edges available
- recommendations hidden by visibility constraints
- generated fields available as patterns, not communities

## Related Stories

- [Orient to what is live](../User%20stories/Orient%20to%20what%20is%20live.md)
- [Self-resourcing and field inquiry](../User%20stories/Self-resourcing%20and%20field%20inquiry.md)
