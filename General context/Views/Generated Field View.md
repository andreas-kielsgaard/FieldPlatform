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

Purpose: help a user explore a computed pattern without mistaking it for a represented community.

## Viewer Stance

Participant exploring a pattern. Steward controls do not appear unless a future intentional community or review context is created.

## Questions Answered

- What pattern is this?
- Why does it exist?
- Which named communities are involved?
- Which tags, venues, rhythms, or overlaps are evidence?
- Which bridge events and deeper events appear here?
- What first steps lead into actual communities, events, or venues?

## Modules

- evidence summary
- named communities inside the pattern
- bridge/deeper event groups
- related venues or tags
- aggregate participation patterns
- FieldRelation context where accepted or suggested
- Ways In module pointing to real objects

## Access Dependencies

- `platform.generatedFields.generateFields()`
- `generatedField.communities()`
- `generatedField.bridgeEvents()`
- `generatedField.deeperEvents()`
- `generatedField.bridgePeople()` where privacy allows aggregate use
- `platform.fieldRelations.forObject("generatedField", id)`

## Rules

- The page should feel less authored and less socially specific than a community page.
- Do not imply the generated field speaks for people.
- Do not show a managed roster.
- Ways in should lead to communities, events, venues, or people through appropriate permission and visibility rules.
