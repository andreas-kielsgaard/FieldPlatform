---
title: Hold / Unclear Point
layer: ontology
status: generated/unreviewed
maturity: conceptual
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Hold
  - unclear point
related:
  - Product ontology.md
  - Pathway ways in.md
  - ../Data layer/FieldRelation.md
depends_on:
  - ../Doctrine/Living field doctrine.md
consumed_by:
  - ../Modules/Ways In module.md
  - ../Views/Steward Suggested Connections View.md
implemented_by:
  - ../../Platform data layer/source/access-layer/types.ts
  - ../../Platform data layer/source/calculation-layer/fieldRelations.js
---

# Hold / Unclear Point

A hold explains why a relation, recommendation, or next step is not yet actionable, visible, or settled. In user-facing copy, prefer "what may be unclear" or a target-anchored sentence over the word "hold."

Holds are currently explanation metadata and design logic, not a heavy user-facing entity.

## Initial Hold Types

- Visibility: "I would participate if I knew this existed."
- Context: "I see it, but I do not understand what world it belongs to."
- Trust: "I am curious, but I do not know whether I am welcome."
- Threshold: "I want to enter, but I do not know the first step."
- Boundary: "We want to receive people, but not without protecting the field."
- Stewardship: "This relation is sensed, but not confirmed by someone responsible."
- Capacity: "This may be right, but not at this intensity, timing, or state."
- Language: "The thing exists, but cannot yet describe itself clearly."

Self-resourcing surfaces may also use unclear points before a relation has a stable object:

- impulse illegibility
- need illegibility
- direction illegibility
- solution illegibility
- availability illegibility
- relational illegibility
- timing or state illegibility

## Usage Rules

Use holds to clarify movement, not to judge people or communities.

Good UI shape:

- "First step into Contact Improvisation Aarhus may be unclear."
- "A community steward may need to review this connection first."
- "Newcomer welcome is not yet clear."

Avoid:

- "Threshold hold detected."
- "Stewardship hold."
- labels that make a person or community feel diagnosed.

## Data Status

The current data layer supports `holdTypes` on FieldRelation records. Future surfaces may need richer target/action metadata so unclear points can be tied to the exact object and action affected.
