---
title: FieldPlatform Context Wiki
layer: architecture
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - General context navigation
related:
  - Architecture/Platform architecture overview.md
  - Principles/What FieldPlatform is for.md
  - Glossary/Project words in plain English.md
  - Maintenance/Context maintenance for agents.md
depends_on:
  - Principles/What FieldPlatform should not become.md
consumed_by:
  - Tools/context-wiki
implemented_by:
---

# FieldPlatform Context Wiki

This folder is the product, design, and specification context for FieldPlatform.

It contains the platform purpose, [operating principles](Principles/Living%20field%20principles.md), [product concepts](Ontology/Product%20ontology.md), [user stories](User%20stories/User%20stories%20overview.md), [views](Frontend/Views%20overview.md), [modules](Frontend/Modules%20overview.md), data, and access rules.

## Recommended Reading Order

1. [What FieldPlatform is for](Principles/What%20FieldPlatform%20is%20for.md): the shortest answer to why the platform exists.
2. [Living field principles](Principles/Living%20field%20principles.md): the [operating principles](Principles/Living%20field%20principles.md) behind the product.
3. [What FieldPlatform should not become](Principles/What%20FieldPlatform%20should%20not%20become.md): [product boundaries](Principles/What%20FieldPlatform%20should%20not%20become.md).
4. [Platform architecture overview](Architecture/Platform%20architecture%20overview.md): how the product is structured.
5. [Product concepts](Ontology/Product%20ontology.md): the main objects and ideas in plain domain language.
6. [User stories overview](User%20stories/User%20stories%20overview.md): what [people](Data%20layer/Person%20entity.md) are trying to do over time.
7. [Views overview](Frontend/Views%20overview.md): the main screens or surfaces.
8. [Modules overview](Frontend/Modules%20overview.md): the smaller UI parts that live inside [views](Frontend/Views%20overview.md).
9. [Data layer overview](Architecture/Data%20layer%20overview.md) and [Access layer overview](Architecture/Access%20layer%20overview.md): the technical foundations.

Use [Project words in plain English](Glossary/Project%20words%20in%20plain%20English.md) whenever a term feels too internal.

## Navigation Sections

- [Principles](Principles/What%20FieldPlatform%20is%20for.md): purpose, [operating principles](Principles/Living%20field%20principles.md), and [product boundaries](Principles/What%20FieldPlatform%20should%20not%20become.md).
- [Vocabulary](Glossary/Project%20words%20in%20plain%20English.md): plain-language meanings for recurring project terms.
- [Product Concepts](Ontology/Product%20ontology.md): [people](Data%20layer/Person%20entity.md), [communities](Data%20layer/Community%20entity.md), [events](Data%20layer/Event%20offering%20entity.md), relations, [holds](Ontology/Hold%20unclear%20point.md), and [pathways](Ontology/Pathway%20ways%20in.md).
- [User Stories and Flows](User%20stories/User%20stories%20overview.md): what someone is trying to understand or do.
- [Views](Frontend/Views%20overview.md): the places where a [person](Data%20layer/Person%20entity.md) sees and acts.
- [Modules](Frontend/Modules%20overview.md): reusable pieces inside [views](Frontend/Views%20overview.md).
- [Interface Rules](Frontend/Surface%20grammar.md): [surface grammar](Frontend/Surface%20grammar.md), language, copy, and interaction boundaries.
- [Data Layer](Architecture/Data%20layer%20overview.md): stored entities, relationships, and invariants.
- [Access and Calculation](Architecture/Access%20layer%20overview.md): safe reads, writes, calculations, permissions, and [view](Frontend/Views%20overview.md) outputs.
- [Platform Structure](Architecture/Platform%20architecture%20overview.md): how [product concepts](Ontology/Product%20ontology.md) connect to implementation areas.
- [Open Direction](Current%20direction/Open%20questions.md): unresolved product and context questions.
- [Parked Ideas](Parked/Future%20exploration%20notes.md): useful ideas outside current product direction.
- [Wiki Maintenance](Maintenance/Context%20maintenance%20for%20agents.md): [review state](Architecture/Review%20and%20approval%20model.md), [traceability](Architecture/Traceability%20model.md), and update rules.

## Source Of Truth Rule

There is one source: Markdown in `General context/`.

The local app under `Tools/context-wiki/` renders, searches, reviews, and can write back to these files. It must not store non-regenerable documentation, copied summaries, or a separate knowledge base.

## Status Meanings

Pages use lightweight frontmatter so the wiki tool can [group](Data%20layer/Community%20entity.md) and review them.

- `generated/unreviewed`: migrated or written by an agent and still needing human review. Agents may use it as current context unless another page marks it parked, stale, or explicitly uncertain.
- `human-reviewed`: a human has read and corrected it, but has not made it an approved spec.
- `human-approved`: a human has approved this as current authority.
- `buildable spec`: concrete enough that implementation can be generated or checked against it in a human-readable way.
- `implemented`: current code appears to support the [concept](Ontology/Product%20ontology.md) or contract, but the spec may still need review.
- `parked`: useful exploration or hypothesis, not current product authority.
- `stale/deprecated`: preserved only as a pointer, historical route, or retired idea.

`review_state` records whether the page needs human review, has been reviewed, is approved, or may be stale because its file hash differs from the approved hash.

## Legacy Files

The former long top-level context documents are now short pointer files. They remain only to preserve old links and onboarding habits. Do not add new canonical content to those legacy files; update the most specific page in this wiki instead.
