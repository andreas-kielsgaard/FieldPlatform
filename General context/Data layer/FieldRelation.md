---
title: FieldRelation
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
  - FieldRelation
related:
  - ParticipationEdge.md
  - GeneratedField.md
  - ../Ontology/Hold unclear point.md
  - ../Ontology/Pathway ways in.md
depends_on:
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Steward Suggested Connections View.md
  - ../Modules/Suggested Connections Review module.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/fieldRelation.ts
  - ../../Platform data layer/source/access-layer/repositories/fieldRelationRepository.ts
  - ../../Platform data layer/source/access-layer/services/fieldRelationService.ts
  - ../../Platform data layer/source/calculation-layer/fieldRelations.js
  - ../../Platform data layer/source/access-layer/types.ts
---

# FieldRelation

FieldRelation represents a relation between two objects or contexts. It is broader than ParticipationEdge and should eventually replace one-off relation objects where useful, while still allowing specialized models to keep their additional detail.

FieldRelation is a central data/domain primitive. It should not become the primary ordinary UI object by default.

## Purpose

Represent relations such as:

- an event that belongs in a community context
- a creator whose offering repeatedly fits a practice field
- a venue that holds several adjacent communities
- a festival that bridges multiple fields
- a generated field that reveals overlap between named communities
- a steward-reviewed connection between practices, venues, events, or communities

## Current Object Types

- person
- community
- event
- venue
- generatedField
- festival
- practice
- tag

Creator, facilitator, host, volunteer, steward, and bridge person are contextual roles or relation meanings, not separate source/target object types yet.

## Current Fields

- `id`
- `sourceType`, `sourceId`
- `targetType`, `targetId`
- `relationKind`
- `relationStrength`
- `status`: suggested, accepted, refined, declined, computed, dormant
- `provenance`: user_suggested, steward_marked, creator_marked, calculated, imported
- `suggestedBy`
- `reviewedBy`
- `reviewAuthorityType`, `reviewAuthorityId`
- `visibility`
- `reason`
- `evidence`
- `holdTypes`
- `movementUnlocked`
- `createdAt`, `updatedAt`

## Invariants

- Relations must show why they appear, who or what suggested them, who can review them, and what movement they make possible.
- Accepting a relation in one stewarded context confirms only that specific relation. It may create evidence or a new suggestion elsewhere, but does not automatically endorse another community's context.
- User-facing surfaces should translate relation data into ordinary product language and preserve native object identity.
- Connection type, review state, visibility, evidence, and action target must stay visually and conceptually separate.

## Access Layer

Current methods include `platform.fieldRelations.forObject(type, id)`, `between(...)`, `suggest(...)`, `accept(...)`, `refine(...)`, `decline(...)`, `redirect(...)`, `markComputedOnly(...)`, `forReviewAuthority(...)`, `pendingForCommunity(...)`, `relation.explanation()`, and `relation.movementOptions()`.
