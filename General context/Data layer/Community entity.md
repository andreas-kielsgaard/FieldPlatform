---
title: Community Entity
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
  - Community
  - Group
related:
  - ParticipationEdge.md
  - FieldRelation.md
  - ../Views/Community Overview View.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - ../Access layer/Access methods and calculations.md
  - ../Views/Community Overview View.md
  - ../Views/Steward Suggested Connections View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/community.ts
  - ../../Platform data layer/source/access-layer/repositories/communityRepository.ts
  - ../../Platform data layer/source/access-layer/services/communityManagementService.ts
  - ../../Platform data layer/source/access-layer/services/communityHealthService.ts
---

# Community Entity

A community is a named social container with stewards, norms, rhythm, access rules, entry guidance, and relationships to people, events, venues, generated patterns, and adjacent contexts.

It is different from a generated field. A community can speak with stewarded social authority; a generated field is computed evidence.

## Purpose

Represent a social container enough to support orientation, entry guidance, community pages, participation edges, stewardship, and relation review without flattening the community into a brand, funnel, catalogue item, or CRM account.

## Possible Properties

- name, description, state, and tags
- rhythm, norms, access rules, and entry guidance
- venues
- stewards or managers
- related events
- participation edges from people
- membership or access requests
- suggested and accepted FieldRelations
- formal or steward-marked relationships to other objects

## Relationships

- Community has many ParticipationEdges.
- Community may have related, bridge, and deeper events.
- Community may meet at one or more venues.
- Community may be source, target, or review authority for FieldRelations.
- Community may contribute evidence to GeneratedFields.

## Invariants And Risks

- Community belonging is not binary membership.
- Steward review must be role-gated and contained.
- Community management should show aggregate patterns and care needs without individual surveillance.
- Acceptance by one community does not automatically endorse another community's relation.

## Access Layer

Current methods include `platform.communities.get(id)`, `community.events()`, `community.bridgeEvents()`, `community.deeperEvents()`, `community.participationEdges()`, `community.personalMetricsFor(user)`, `community.health()`, `community.generatedFields()`, `community.canBeManagedBy(user)`, and community management services.
