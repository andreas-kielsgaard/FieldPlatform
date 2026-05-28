---
title: GeneratedField
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
  - GeneratedField
  - generated field
related:
  - FieldRelation.md
  - Community entity.md
  - ../Views/Generated Field View.md
depends_on:
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../Views/Generated Field View.md
  - ../Access layer/Access methods and calculations.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/generatedField.ts
  - ../../Platform data layer/source/access-layer/services/generatedFieldHandler.ts
  - ../../Platform data layer/source/calculation-layer/generatedFields.js
---

# GeneratedField

Several [communities](Community%20entity.md) may use the same [venue](Venue%20entity.md), repeat the same tags, share rhythms, or attract overlapping participation. The platform can calculate that pattern and use it for orientation.

A GeneratedField stores that calculated pattern.

It is not a managed [community](Community%20entity.md). It does not speak as a [community](Community%20entity.md) and should not imply social representation unless [people](Person%20entity.md) intentionally create a [community](Community%20entity.md) from it.

## Purpose

Represent useful computed evidence without pretending there is a stewarded social container.

## Generation Inputs

Generated field logic may use:

- repeated tags across groups
- multiple groups using the same [venue](Venue%20entity.md)
- recurring [group](Community%20entity.md) overlap
- recurring [event](Event%20offering%20entity.md) timing
- repeated participation patterns
- custom patterns that are useful for orientation

## Page Expectations

A generated field page should explain:

- why the field exists
- which named [communities](Community%20entity.md) are involved
- which tags, [venues](Venue%20entity.md), rhythms, or overlaps are evidence
- bridge [events](Event%20offering%20entity.md) and deeper [events](Event%20offering%20entity.md) inside the pattern
- aggregate participation edges without presenting [people](Person%20entity.md) as a managed roster

## Relationships

Generated fields can relate to [events](Event%20offering%20entity.md), [communities](Community%20entity.md), [venues](Venue%20entity.md), festivals, practices, and [people](Person%20entity.md) in creator/facilitator roles through [FieldRelation](FieldRelation.md). Those relations must preserve the generated field's status as computed evidence rather than social authority.

## Invariants And Risks

- Do not treat generated fields as managed [communities](Community%20entity.md).
- Do not show management controls unless a future explicit flow converts a pattern into a [community](Community%20entity.md).
- Do not imply that generated-field evidence is endorsement.

## Access Layer

Current methods include `platform.generatedFields.generateFields()`, `generateFieldsFromCommunities(communities)`, `get(id)`, and GeneratedField object methods for `communities()`, `bridgeEvents()`, `deeperEvents()`, and `bridgePeople()`.
