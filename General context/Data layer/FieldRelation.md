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
  - ../Principles/What FieldPlatform should not become.md
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

Someone suggests that a [public event](../Views/Public%20Event%20View.md) belongs in a [community](Community%20entity.md) context. A steward reviews the suggestion, accepts it, and the [event](Event%20offering%20entity.md) can now appear as an appropriate way into that [community](Community%20entity.md).

FieldRelation stores that object-to-object connection.

It is broader than [ParticipationEdge](ParticipationEdge.md) and should eventually replace one-off relation objects where useful, while still allowing specialized models to keep their additional detail. It should not become the primary ordinary UI object by default.

## Purpose

Represent relations such as:

- an [event](Event%20offering%20entity.md) that belongs in a [community](Community%20entity.md) context
- a creator whose [offering](Event%20offering%20entity.md) repeatedly fits a practice field
- a [venue](Venue%20entity.md) that [holds](../Ontology/Hold%20unclear%20point.md) several adjacent [communities](Community%20entity.md)
- a festival that bridges multiple fields
- a [generated field](GeneratedField.md) that reveals overlap between named [communities](Community%20entity.md)
- a steward-reviewed connection between practices, [venues](Venue%20entity.md), [events](Event%20offering%20entity.md), or [communities](Community%20entity.md)

## Current Object Types

- [person](Person%20entity.md)
- [community](Community%20entity.md)
- [event](Event%20offering%20entity.md)
- [venue](Venue%20entity.md)
- [generatedField](GeneratedField.md)
- festival
- practice
- tag

Creator, facilitator, host, volunteer, steward, and bridge [person](Person%20entity.md) are contextual roles or relation meanings, not separate source/target object types yet.

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
- Accepting a relation in one stewarded context confirms only that specific relation. It may create evidence or a new suggestion elsewhere, but does not automatically endorse another [community](Community%20entity.md)'s context.
- User-facing surfaces should translate relation data into ordinary product language and preserve native object identity.
- Connection type, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, evidence, and action target must stay visually and conceptually separate.

## Access Layer

Current methods include `platform.fieldRelations.forObject(type, id)`, `between(...)`, `suggest(...)`, `accept(...)`, `refine(...)`, `decline(...)`, `redirect(...)`, `markComputedOnly(...)`, `forReviewAuthority(...)`, `pendingForCommunity(...)`, `relation.explanation()`, and `relation.movementOptions()`.
