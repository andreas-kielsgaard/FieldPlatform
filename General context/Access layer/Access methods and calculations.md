---
title: Access Methods And Calculations
layer: access
status: implemented
maturity: implemented but needs revision
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - access methods
  - calculation logic
related:
  - ../Architecture/Access layer overview.md
  - Contextual visibility and disclosure.md
  - ../Data layer/FieldRelation.md
depends_on:
  - ../Architecture/Data layer overview.md
consumed_by:
  - ../Frontend/Views overview.md
  - ../Modules/Ways In module.md
implemented_by:
  - ../../Platform data layer/source/access-layer/platformDomain.ts
  - ../../Platform data layer/source/calculation-layer/calculations.js
  - ../../Platform data layer/source/calculation-layer/recommendations.js
  - ../../Platform data layer/source/calculation-layer/communityHealth.js
  - ../../Platform data layer/source/calculation-layer/fieldRelations.js
---

# Access Methods And Calculations

This page is the first access-layer contract index. It is incomplete and should be refined as views become buildable specs.

## Current Managed Access Families

- Users: person lookup, profile, participation edges, community lists, recommended events, managed objects, and creation actions.
- Events: lookup, list, create, registration, interest, tags, venue, access, relevance, linked/relevant communities, and suggestion to community.
- Communities: lookup, list, create, events, bridge/deeper events, participation edges, personal metrics, health, generated fields, access requests, entry guidance, and management.
- Venues: lookup, list, events, and communities.
- FieldRelations: lookup, list, for object, between objects, suggest, accept, refine, decline, redirect, computed-only, review authority queues, pending for community, explanation, visibility, movement options, and reviews.
- GeneratedFields: generate, generate from communities, get, communities, bridge events, deeper events, and bridge people.
- Recommendations: events for user, communities for user, groups for event draft.
- Community health: bonding score, bridging score, newcomer dropoff, dormant participants, aggregate summary.

## Calculation Families

Engagement strength uses relationship state, access level, recency, frequency, contribution, trust, embeddedness, norm familiarity, decay state, and role modes.

User interest in an event may use participation in linked or relevant communities, accepted/refined FieldRelations, event tags, user tags, venue familiarity, access, beginner-friendliness, creator/host relationship, prior attendance, and social suggestions.

Group overlap may use shared active participants, tags, venues, event participation, formal or steward-marked relationships, accepted FieldRelations, and calculated relation candidates.

Creator group fit may use draft event tags, venue, host/facilitator history, previous relevant events, participant overlap, beginner-friendliness, community access rules, entry guidance, existing FieldRelations, and holds.

Community health may use bonding capacity, bridging capacity, newcomer dropoff, dormant/reactivating edge signal, participation distribution, and held relations.

Field relation review may use source/target type, relation kind, provenance, evidence, holdTypes, review authority, visibility, prior decisions, and ParticipationEdge data.

## Known Gaps

- Event recommendations do not yet directly consume FieldRelations as fully as the target behavior describes.
- Ways-in actions may need explicit action targets so the UI can say exactly what each action acts on.
- Visibility/output cleaning needs fuller user-aware permission logic before private participation appears in explanations or aggregate hints.
- View-specific data packages are not yet fully specified for every canonical view.
