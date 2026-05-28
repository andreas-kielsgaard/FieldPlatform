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

Intent: the [user](../Data%20layer/Person%20entity.md) wants to understand what is happening soon and how each [event](../Data%20layer/Event%20offering%20entity.md) relates to their current participation.

## Flow

1. [User](../Data%20layer/Person%20entity.md) opens [My Orientation](../Views/My%20Orientation%20View.md).
2. The app shows [events](../Data%20layer/Event%20offering%20entity.md) in layers from strongest commitment to expansion edge.
3. The first layer shows [events](../Data%20layer/Event%20offering%20entity.md) the [user](../Data%20layer/Person%20entity.md) is actively helping [hold](../Ontology/Hold%20unclear%20point.md).
4. The next layer shows [events](../Data%20layer/Event%20offering%20entity.md) where the [user](../Data%20layer/Person%20entity.md) has committed to participate.
5. The next layer shows [events](../Data%20layer/Event%20offering%20entity.md) in member, trusted, or core [communities](../Data%20layer/Community%20entity.md).
6. The next layer shows followed or lightly tracked [communities](../Data%20layer/Community%20entity.md).
7. The expansion layer shows adjacent [events](../Data%20layer/Event%20offering%20entity.md) based on overlap with interests, [communities](../Data%20layer/Community%20entity.md), [venues](../Data%20layer/Venue%20entity.md), tags, and low-threshold access.
8. Each [event](../Data%20layer/Event%20offering%20entity.md) shows why it appears.
9. [User](../Data%20layer/Person%20entity.md) can open an [event](../Data%20layer/Event%20offering%20entity.md), attend, mark interested, or suggest that it belongs in a context.

## Views And Modules

- [My Orientation View](../Views/My%20Orientation%20View.md)
- [Public Event View](../Views/Public%20Event%20View.md) when an [event](../Data%20layer/Event%20offering%20entity.md) is opened
- [Ways In module](../Modules/Ways%20In%20module.md)
- recommendation explanation [module](../Frontend/Modules%20overview.md)

## Access And Data

- [Event](../Data%20layer/Event%20offering%20entity.md) objects
- ParticipationEdges
- [event](../Data%20layer/Event%20offering%20entity.md) relevance calculations
- tags, access, [venue](../Data%20layer/Venue%20entity.md), creator/host, and relation signals where available

## Outcome

The [user](../Data%20layer/Person%20entity.md) understands the difference between current commitment, clear relevance, and expansion edge.
