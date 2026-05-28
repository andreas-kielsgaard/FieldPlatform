---
title: Community Overview View
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
  - Community Overview View
related:
  - ../Data layer/Community entity.md
  - ../Modules/Ways In module.md
  - Steward Suggested Connections View.md
depends_on:
  - ../Access layer/Access methods and calculations.md
consumed_by:
  - ../User stories/User stories overview.md
implemented_by:
  - ../../Mockups/Mockup 4
---

# Community Overview View

Purpose: help a participant understand a community, their relationship to it, and appropriate ways to participate.

## Viewer Stance

Usually curious participant or existing participant. Steward/management controls appear only when the user has contextual responsibility.

## Questions Answered

- What is this community?
- Who is it for?
- How does it meet?
- What are the norms and access rules?
- How do I enter?
- What events are bridge participation versus deeper connection?
- What is my relationship here?
- What related communities, venues, or generated patterns matter?

## Modules

- community identity and description
- rhythm, norms, access, and entry guidance
- personal relationship panel from ParticipationEdge
- upcoming community events
- bridge/deeper event grouping
- related contexts and generated fields
- Ways In module
- contextual disclosure after real participation
- steward suggested connections preview when permitted

## Access Dependencies

- `community.events()`
- `community.bridgeEvents()`
- `community.deeperEvents()`
- `community.personalMetricsFor(user)`
- `community.participationEdges()`
- `community.generatedFields()`
- `platform.fieldRelations.forObject("community", id)`
- `platform.fieldRelations.pendingForCommunity(id)` for steward mode

## Permissions

Management and review modules require creator, steward, manager, or explicit responsibility. Public participant pages should not leak steward-only relation states.

## Related Stories

- Explore participation in a community.
- Understand my relationship to groups.
- Review suggested relations when in steward mode.
