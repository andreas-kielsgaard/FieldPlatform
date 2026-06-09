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

This page is the first access-layer contract index. It is incomplete and should be refined as [views](../Frontend/Views%20overview.md) become buildable specs.

## Current Managed Access Families

- Users: [person](../Data%20layer/Person%20entity.md) lookup, profile, participation edges, [community](../Data%20layer/Community%20entity.md) lists, recommended [events](../Data%20layer/Event%20offering%20entity.md), managed objects, and creation actions.
- [Events](../Data%20layer/Event%20offering%20entity.md): lookup, list, create, registration, interest, tags, [venue](../Data%20layer/Venue%20entity.md), access, relevance, linked/relevant [communities](../Data%20layer/Community%20entity.md), and suggestion to [community](../Data%20layer/Community%20entity.md).
- [Communities](../Data%20layer/Community%20entity.md): lookup, list, create, [events](../Data%20layer/Event%20offering%20entity.md), bridge/deeper [events](../Data%20layer/Event%20offering%20entity.md), participation edges, personal relationship summaries, aggregate health signals, generated fields, access requests, entry guidance, and management.
- [Venues](../Data%20layer/Venue%20entity.md): lookup, list, [events](../Data%20layer/Event%20offering%20entity.md), and [communities](../Data%20layer/Community%20entity.md).
- FieldRelations: lookup, list, for object, between objects, suggest, accept, refine, decline, redirect, computed-only, review authority queues, pending for [community](../Data%20layer/Community%20entity.md), explanation, visibility, movement options, and reviews.
- GeneratedFields: generate, generate from [communities](../Data%20layer/Community%20entity.md), get, [communities](../Data%20layer/Community%20entity.md), bridge [events](../Data%20layer/Event%20offering%20entity.md), deeper [events](../Data%20layer/Event%20offering%20entity.md), and bridge [people](../Data%20layer/Person%20entity.md).
- Recommendations: [events](../Data%20layer/Event%20offering%20entity.md) for [user](../Data%20layer/Person%20entity.md), [communities](../Data%20layer/Community%20entity.md) for [user](../Data%20layer/Person%20entity.md), groups for [event](../Data%20layer/Event%20offering%20entity.md) draft.
- [Community](../Data%20layer/Community%20entity.md) health: aggregate bonding signals, aggregate bridging signals, newcomer dropoff risk, dormant/reactivating relationship patterns, and summary indicators.

## Calculation Families

Engagement strength uses relationship state, access level, recency, frequency, contribution, trust, embeddedness, norm familiarity, decay state, and role modes. It is an internal relationship signal, not a public rank, worth score, or steward-facing individual performance metric by default.

[User](../Data%20layer/Person%20entity.md) interest in an [event](../Data%20layer/Event%20offering%20entity.md) may use participation in linked or relevant [communities](../Data%20layer/Community%20entity.md), accepted/refined FieldRelations, [event](../Data%20layer/Event%20offering%20entity.md) tags, [user](../Data%20layer/Person%20entity.md) tags, [venue](../Data%20layer/Venue%20entity.md) familiarity, access, beginner-friendliness, creator/host relationship, prior attendance, and social suggestions.

[Group](../Data%20layer/Community%20entity.md) overlap may use shared active participants, tags, [venues](../Data%20layer/Venue%20entity.md), [event](../Data%20layer/Event%20offering%20entity.md) participation, formal or steward-marked relationships, accepted FieldRelations, and calculated relation candidates.

Creator [group](../Data%20layer/Community%20entity.md) fit may use draft [event](../Data%20layer/Event%20offering%20entity.md) tags, [venue](../Data%20layer/Venue%20entity.md), host/facilitator history, previous relevant [events](../Data%20layer/Event%20offering%20entity.md), participant overlap, beginner-friendliness, [community](../Data%20layer/Community%20entity.md) access rules, entry guidance, existing FieldRelations, and [holds](../Ontology/Hold%20unclear%20point.md).

[Community](../Data%20layer/Community%20entity.md) health may use bonding capacity, bridging capacity, newcomer dropoff, dormant/reactivating edge signal, participation distribution, and held relations. User-facing or steward-facing versions should be aggregate, contextual, and care-oriented unless a [person](../Data%20layer/Person%20entity.md) has explicitly chosen a narrower visibility scope.

[Field relation](../Data%20layer/FieldRelation.md) review may use source/target type, relation kind, provenance, evidence, holdTypes, review authority, visibility, prior decisions, and [ParticipationEdge](../Data%20layer/ParticipationEdge.md) data. Review surfaces should show only the evidence needed for the decision and should clean outputs so private participation is not exposed by implication.

## Example Flow: Suggesting Event Context

When a participant suggests that an [event](../Data%20layer/Event%20offering%20entity.md) belongs in a [community](../Data%20layer/Community%20entity.md) context:

1. The [Public Event View](../Views/Public%20Event%20View.md) asks the [access layer](../Architecture/Access%20layer%20overview.md) for the [event](../Data%20layer/Event%20offering%20entity.md), its [venue](../Data%20layer/Venue%20entity.md), its host/facilitator context, existing reviewed [community](../Data%20layer/Community%20entity.md) links, and a user-aware recommendation explanation.
2. The suggestion action uses a filtered list of likely [communities](../Data%20layer/Community%20entity.md) instead of exposing every object in the system.
3. Submitting the suggestion creates a [FieldRelation](../Data%20layer/FieldRelation.md) or compatible suggested [event](../Data%20layer/Event%20offering%20entity.md) share with source, target, reason, provenance, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, and review authority.
4. The [Steward Suggested Connections View](../Views/Steward%20Suggested%20Connections%20View.md) reads pending relations for the responsible [community](../Data%20layer/Community%20entity.md) and asks the [access layer](../Architecture/Access%20layer%20overview.md) for cleaned evidence and movement options.
5. Accepting, refining, redirecting, declining, or keeping the relation as pattern-only updates the relation state through a managed command.
6. [Public event](../Views/Public%20Event%20View.md) and [community](../Data%20layer/Community%20entity.md) [views](../Frontend/Views%20overview.md) then show only the user-facing outcome that is appropriate for the viewer, such as reviewed context, waiting for review, or a clearer first step.

## Known Gaps

- [Event](../Data%20layer/Event%20offering%20entity.md) recommendations do not yet directly consume FieldRelations as fully as the target behavior describes.
- Ways-in actions may need explicit action targets so the UI can say exactly what each action acts on.
- Visibility/output cleaning needs fuller user-aware permission logic before private participation appears in explanations or aggregate hints.
- View-specific data packages are not yet fully specified for every canonical [view](../Frontend/Views%20overview.md).
