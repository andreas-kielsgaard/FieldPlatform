---
title: Person Entity
layer: data
status: implemented
maturity: implemented but needs review
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Person
  - User
related:
  - ParticipationEdge.md
  - FieldRelation.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - ../Views/My Orientation View.md
  - ../Views/Public Event View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/user.ts
  - ../../Platform data layer/source/access-layer/repositories/userRepository.ts
  - ../../Platform data layer/source/database-definition/seed.js
---

# Person Entity

A person is a participant first. Creator, host, facilitator, steward, volunteer, bridge person, and [community](Community%20entity.md) manager are contextual roles or capabilities, not separate base entities by default.

## Purpose

Represent the person enough to support orientation, participation, creation, stewardship permissions, relationship visibility, and recommendations without turning the person into a surveillance object or complete profile.

## Possible Properties

- identity and profile fields such as name, bio, visible attributes, and life context
- interests, saved [events](Event%20offering%20entity.md), followed [communities](Community%20entity.md), and followed fields
- participation edges to [communities](Community%20entity.md)
- [contextual disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md) decisions and visibility grants
- [event](Event%20offering%20entity.md) behavior such as attending, interested, hosting, volunteering, facilitating, suggesting
- [community](Community%20entity.md) behavior such as following, requesting access, member, trusted, contributor, steward, dormant
- contextual permissions derived from created or managed objects

## Relationships

- Person to [Community](Community%20entity.md) through [ParticipationEdge](ParticipationEdge.md)
- Person to [Event](Event%20offering%20entity.md) through attendance, interest, hosting, facilitation, volunteering, or management
- Person to [FieldRelation](FieldRelation.md) as suggester, reviewer, creator/host evidence, or contextual role

## Invariants And Risks

- Do not expose attendance, contact route, profile facets, relationship graph, or future activity by default.
- Logistical visibility for an [event](Event%20offering%20entity.md) does not imply social visibility to attendees, members, stewards outside the stated scope, or public pages.
- Person-related suggestions need extra privacy and consent care. Person-to-person suggestions should not be broadly available in early product design.

## Access Layer

Current methods include `platform.users.get(id)`, `platform.users.list()`, `user.participationEdges()`, `user.edgeTo(community)`, `user.events.recommended()`, `user.followCommunity(community)`, `user.requestMembership(community, note)`, `user.createEvent(data)`, and `user.createCommunity(data)`.
