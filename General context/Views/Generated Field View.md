---
title: Generated Field View
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
  - Generated Field View
related:
  - ../Data layer/GeneratedField.md
  - ../Data layer/FieldRelation.md
  - ../Modules/Ways In module.md
depends_on:
  - ../Frontend/Surface grammar.md
consumed_by:
  - ../User stories/User stories overview.md
implemented_by:
  - ../../Mockups/Mockup 4
---

# Generated Field View

Purpose: help a [user](../Data%20layer/Person%20entity.md) explore a computed pattern without mistaking it for a represented [community](../Data%20layer/Community%20entity.md).

## Viewer Stance

Participant exploring a pattern. Steward controls do not appear unless a future intentional [community](../Data%20layer/Community%20entity.md) or review context is created.

## Questions Answered

- What pattern is this?
- Why does it exist?
- Which named [communities](../Data%20layer/Community%20entity.md) are involved?
- Which tags, [venues](../Data%20layer/Venue%20entity.md), rhythms, or overlaps are evidence?
- Which bridge [events](../Data%20layer/Event%20offering%20entity.md) and deeper [events](../Data%20layer/Event%20offering%20entity.md) appear here?
- What first steps lead into actual [communities](../Data%20layer/Community%20entity.md), [events](../Data%20layer/Event%20offering%20entity.md), or [venues](../Data%20layer/Venue%20entity.md)?

## Modules

- evidence summary
- named [communities](../Data%20layer/Community%20entity.md) inside the pattern
- bridge/deeper [event](../Data%20layer/Event%20offering%20entity.md) groups
- related [venues](../Data%20layer/Venue%20entity.md) or tags
- aggregate participation patterns
- [FieldRelation](../Data%20layer/FieldRelation.md) context where accepted or suggested
- [Ways In module](../Modules/Ways%20In%20module.md) pointing to real objects

## Access Dependencies

- `platform.generatedFields.generateFields()`
- `generatedField.communities()`
- `generatedField.bridgeEvents()`
- `generatedField.deeperEvents()`
- `generatedField.bridgePeople()` where privacy allows aggregate use
- `platform.fieldRelations.forObject("generatedField", id)`

## Rules

- The page should feel less authored and less socially specific than a [community](../Data%20layer/Community%20entity.md) page.
- Do not imply the [generated field](../Data%20layer/GeneratedField.md) speaks for [people](../Data%20layer/Person%20entity.md).
- Do not show a managed roster.
- [Ways in](../Ontology/Pathway%20ways%20in.md) should lead to [communities](../Data%20layer/Community%20entity.md), [events](../Data%20layer/Event%20offering%20entity.md), [venues](../Data%20layer/Venue%20entity.md), or [people](../Data%20layer/Person%20entity.md) through appropriate permission and visibility rules.
