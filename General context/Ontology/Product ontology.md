---
title: Product Concepts
layer: concepts
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - product concepts
related:
  - ../Data layer/FieldRelation.md
  - ../Data layer/ParticipationEdge.md
  - ../Data layer/GeneratedField.md
  - Hold unclear point.md
  - Pathway ways in.md
depends_on:
  - ../Principles/What FieldPlatform is for.md
  - ../Principles/Living field principles.md
consumed_by:
  - ../Architecture/Data layer overview.md
  - ../Architecture/Frontend layer overview.md
implemented_by:
---

# Product Concepts

Use when a product term needs a stable meaning before it becomes UI, data, calculation, or code.

Data pages define stored entities more concretely. Frontend pages define user-facing surfaces and copy.

## Example

A participant opens [My Orientation](../Views/My%20Orientation%20View.md) and sees a nearby [event](../Data%20layer/Event%20offering%20entity.md). The [event](../Data%20layer/Event%20offering%20entity.md) appears because it is connected to a [community](../Data%20layer/Community%20entity.md) they follow, happens at a [venue](../Data%20layer/Venue%20entity.md) used by adjacent [communities](../Data%20layer/Community%20entity.md), and has beginner-friendly entry guidance.

In product terms:

- participant -> [Person](../Data%20layer/Person%20entity.md)
- [group](../Data%20layer/Community%20entity.md) they follow -> [Community](../Data%20layer/Community%20entity.md)
- gathering -> [Event](../Data%20layer/Event%20offering%20entity.md)/[offering](../Data%20layer/Event%20offering%20entity.md)
- place -> [Venue](../Data%20layer/Venue%20entity.md)
- [person](../Data%20layer/Person%20entity.md)'s relationship to the [community](../Data%20layer/Community%20entity.md) -> [ParticipationEdge](../Data%20layer/ParticipationEdge.md)
- event-to-community connection -> [FieldRelation](../Data%20layer/FieldRelation.md)
- missing review or unclear access -> [Hold](Hold%20unclear%20point.md)
- available next step -> [Pathway](Pathway%20ways%20in.md) or [way in](Pathway%20ways%20in.md)

## Core Concepts

- [Person](../Data%20layer/Person%20entity.md): a participant first. A [person](../Data%20layer/Person%20entity.md) may also be creator, steward, host, facilitator, volunteer, or bridge [person](../Data%20layer/Person%20entity.md) in a specific context.
- [Community](../Data%20layer/Community%20entity.md): a named social container with stewards, norms, rhythm, access rules, entry guidance, and participation edges.
- [Event](../Data%20layer/Event%20offering%20entity.md)/[offering](../Data%20layer/Event%20offering%20entity.md): a hosted activity or [offering](../Data%20layer/Event%20offering%20entity.md) with time, place, facilitator/host context, access, audience, requirements, and possible [community](../Data%20layer/Community%20entity.md) relevance.
- [Venue](../Data%20layer/Venue%20entity.md): a physical place that can anchor [events](../Data%20layer/Event%20offering%20entity.md), [communities](../Data%20layer/Community%20entity.md), and overlap.
- [ParticipationEdge](../Data%20layer/ParticipationEdge.md): the detailed relationship between a [person](../Data%20layer/Person%20entity.md) and a [community](../Data%20layer/Community%20entity.md).
- [FieldRelation](../Data%20layer/FieldRelation.md): a represented connection between two objects or contexts.
- [GeneratedField](../Data%20layer/GeneratedField.md): a calculated pattern, not a managed [community](../Data%20layer/Community%20entity.md).
- [Hold](Hold%20unclear%20point.md)/[unclear point](Hold%20unclear%20point.md): an explanation for why a relation, recommendation, or next step is not yet actionable, visible, or settled.
- [Pathway](Pathway%20ways%20in.md)/[ways in](Pathway%20ways%20in.md): movement made possible by a visible, accepted, or clarified relation.

## Relationship Between Concepts

[ParticipationEdge](../Data%20layer/ParticipationEdge.md) should remain central for person-to-community belonging. It keeps access, attendance, identity, trust, commitment, and visibility separate.

[FieldRelation](../Data%20layer/FieldRelation.md) is broader. It can connect [events](../Data%20layer/Event%20offering%20entity.md), [communities](../Data%20layer/Community%20entity.md), [venues](../Data%20layer/Venue%20entity.md), generated fields, festivals, practices, tags, and [people](../Data%20layer/Person%20entity.md) in contextual roles. It is a technical building block, not the primary UI object by default.

[GeneratedField](../Data%20layer/GeneratedField.md) may use [ParticipationEdge](../Data%20layer/ParticipationEdge.md) and [FieldRelation](../Data%20layer/FieldRelation.md) evidence, but it does not speak for a [community](../Data%20layer/Community%20entity.md). It is computed evidence that can help orientation.

[Holds](Hold%20unclear%20point.md) and [pathways](Pathway%20ways%20in.md) explain movement. A [hold](Hold%20unclear%20point.md) says what is unclear or constrained; a [pathway](Pathway%20ways%20in.md) says what appropriate next step becomes available.

## Implementation Caution

Not every product concept deserves a stored record. Some concepts remain [principles](../Principles/What%20FieldPlatform%20is%20for.md), copy, surface behavior, calculated output, permission logic, or [future exploration](../Parked/Future%20exploration%20notes.md) until repeated product pressure makes them stable.
