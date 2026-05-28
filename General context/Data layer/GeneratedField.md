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
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Views/Generated Field View.md
  - ../Access layer/Access methods and calculations.md
implemented_by:
  - ../../Platform data layer/source/access-layer/models/generatedField.ts
  - ../../Platform data layer/source/access-layer/services/generatedFieldHandler.ts
  - ../../Platform data layer/source/calculation-layer/generatedFields.js
---

# GeneratedField

A generated field is a computed pattern, not a managed community.

It can help people orient to repeated tags, venues, rhythms, overlaps, or participation patterns. It does not speak as a community and should not imply social representation unless people intentionally create a community from it.

## Purpose

Represent useful computed evidence without pretending there is a stewarded social container.

## Generation Inputs

Generated field logic may use:

- repeated tags across groups
- multiple groups using the same venue
- recurring group overlap
- recurring event timing
- repeated participation patterns
- custom patterns that are useful for orientation

## Page Expectations

A generated field page should explain:

- why the field exists
- which named communities are involved
- which tags, venues, rhythms, or overlaps are evidence
- bridge events and deeper events inside the pattern
- aggregate participation edges without presenting people as a managed roster

## Relationships

Generated fields can relate to events, communities, venues, festivals, practices, and people in creator/facilitator roles through FieldRelation. Those relations must preserve the generated field's status as computed evidence rather than social authority.

## Invariants And Risks

- Do not treat generated fields as managed communities.
- Do not show management controls unless a future explicit flow converts a pattern into a community.
- Do not imply that generated-field evidence is endorsement.

## Access Layer

Current methods include `platform.generatedFields.generateFields()`, `generateFieldsFromCommunities(communities)`, `get(id)`, and GeneratedField object methods for `communities()`, `bridgeEvents()`, `deeperEvents()`, and `bridgePeople()`.
