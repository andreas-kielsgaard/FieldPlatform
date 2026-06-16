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

Purpose: help a [person](../Data%20layer/Person%20entity.md) understand what is happening soon and how it relates to their current participation, light overlap, and expansion edges.

## Viewer Stance

Curious participant orienting to their own field.

## Questions Answered

- What am I already helping [hold](../Ontology/Hold%20unclear%20point.md)?
- What have I committed to?
- What is happening in [communities](../Data%20layer/Community%20entity.md) where I have access, trust, or membership?
- What am I following lightly?
- What nearby possibilities may fit because of overlap?
- Why is each [event](../Data%20layer/Event%20offering%20entity.md) or [community](../Data%20layer/Community%20entity.md) shown?
- What first step is available?

## Modules

- upcoming [events](../Data%20layer/Event%20offering%20entity.md) by relevance layer
- relationship-to-groups summary
- recommendation explanations
- generated fields around me
- [Ways In module](../Modules/Ways%20In%20module.md)
- [Self-resourcing Entry module](../Modules/Self-resourcing%20Entry%20module.md) for arrival, asks, offers, care, support, and digestion

## Access Dependencies

- `user.events.recommended()`
- `user.participationEdges()`
- `user.communities.followed()`
- `user.communities.member()`
- `user.communities.committed()`
- `user.communities.dormant()`
- recommendation calculations
- [generated field](../Data%20layer/GeneratedField.md) calculations

## States

- no upcoming known [events](../Data%20layer/Event%20offering%20entity.md)
- only commitments/rooted [events](../Data%20layer/Event%20offering%20entity.md)
- expansion edges available
- recommendations hidden by visibility constraints
- generated fields available as patterns, not [communities](../Data%20layer/Community%20entity.md)

## Related Stories

- [Orient to what is live](../User%20stories/Orient%20to%20what%20is%20live.md)
- [Self-resourcing and field inquiry](../User%20stories/Self-resourcing%20and%20field%20inquiry.md)
