---
title: Product Ontology
layer: ontology
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - product ontology
related:
  - ../Data layer/FieldRelation.md
  - ../Data layer/ParticipationEdge.md
  - ../Data layer/GeneratedField.md
  - Hold unclear point.md
  - Pathway ways in.md
depends_on:
  - ../Doctrine/Core product thesis.md
  - ../Doctrine/Living field doctrine.md
consumed_by:
  - ../Architecture/Data layer overview.md
  - ../Architecture/Frontend layer overview.md
implemented_by:
---

# Product Ontology

This page owns the high-level domain concepts. Data pages define persistent entities more concretely; frontend pages define user-facing surfaces and copy.

## Core Concepts

- Person: a participant first. A person may also be creator, steward, host, facilitator, volunteer, or bridge person in a specific context.
- Community: a named social container with stewards, norms, rhythm, access rules, entry guidance, and participation edges.
- Event/offering: a hosted activity or offering with time, place, facilitator/host context, access, audience, requirements, and possible community relevance.
- Venue: a physical place that can anchor events, communities, and overlap.
- ParticipationEdge: the high-resolution person-to-community belonging model.
- FieldRelation: the broader represented relation between objects or contexts.
- GeneratedField: a computed pattern, not a managed community.
- Hold/unclear point: an explanation for why a relation, recommendation, or next step is not yet actionable, visible, or settled.
- Pathway/ways in: movement made possible by a visible, accepted, or clarified relation.

## Relationship Between Concepts

ParticipationEdge should remain central for person-to-community belonging. It keeps access, attendance, identity, trust, commitment, and visibility separate.

FieldRelation is broader. It can connect events, communities, venues, generated fields, festivals, practices, tags, and people in contextual roles. It is a data/domain primitive, not the primary UI object by default.

GeneratedField may use ParticipationEdge and FieldRelation evidence, but it does not speak for a community. It is computed evidence that can help orientation.

Holds and pathways explain movement. A hold says what is unclear or constrained; a pathway says what appropriate next step becomes available.

## Materialization Caution

Not every ontology concept deserves a stored record. Some concepts remain doctrine, copy, surface behavior, calculated output, permission logic, or future exploration until repeated product pressure makes them stable.
