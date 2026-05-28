---
title: General Context Wiki
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
  - Architecture/Product architecture overview.md
  - Doctrine/Core product thesis.md
  - Maintenance/Context maintenance for agents.md
depends_on:
  - Doctrine/Non-goals and guardrails.md
consumed_by:
  - Tools/context-wiki
implemented_by:
---

# General Context Wiki

This folder is the canonical product/design/spec source for FieldPlatform. The local context wiki app reads and edits these Markdown files; it is not a second documentation layer.

Start here:

- [Product architecture overview](Architecture/Product%20architecture%20overview.md): the current layer model and buildable-spec direction.
- [Core product thesis](Doctrine/Core%20product%20thesis.md): what FieldPlatform is for.
- [Living field doctrine](Doctrine/Living%20field%20doctrine.md): the deeper guardrails behind the product.
- [Product ontology](Ontology/Product%20ontology.md): the main domain concepts and what each one must not become.
- [Data layer overview](Architecture/Data%20layer%20overview.md): persistent entities, invariants, and current implementation links.
- [Access layer overview](Architecture/Access%20layer%20overview.md): safe reads, writes, calculations, and view-model boundaries.
- [Frontend layer overview](Architecture/Frontend%20layer%20overview.md): views, modules, states, and language boundaries.
- [User stories overview](User%20stories/User%20stories%20overview.md): user intentions over time and the flows they move through.
- [Views overview](Frontend/Views%20overview.md): navigable surfaces.
- [Modules overview](Frontend/Modules%20overview.md): functional UI units inside views.
- [Traceability model](Architecture/Traceability%20model.md): how stories link to views, modules, access methods, data entities, and implementation.
- [Review and approval model](Architecture/Review%20and%20approval%20model.md): how to know what is generated, reviewed, approved, stale, or buildable.
- [Context maintenance for agents](Maintenance/Context%20maintenance%20for%20agents.md): how future agents should maintain this wiki without duplicating it.

## Source Of Truth Rule

There is one source: Markdown in `General context/`.

The local app under `Tools/context-wiki/` renders, searches, reviews, and can write back to these files. It must not store non-regenerable documentation, copied summaries, or a separate knowledge base.

## Status Meanings

Pages use lightweight frontmatter so the wiki tool can group and review them.

- `generated/unreviewed`: migrated or written by an agent and still needing human review.
- `human-reviewed`: a human has read and corrected it, but has not made it an approved spec.
- `human-approved`: a human has approved this as current authority.
- `buildable spec`: concrete enough that implementation can be generated or checked against it.
- `implemented`: current code appears to support the concept or contract, but the spec may still need review.
- `parked`: useful exploration or hypothesis, not current product authority.
- `stale/deprecated`: preserved only as a pointer, historical route, or retired idea.

`review_state` records whether the page needs human review, has been reviewed, is approved, or may be stale because its file hash differs from the approved hash.

## Layer Map

- Doctrine and guardrails: [Core product thesis](Doctrine/Core%20product%20thesis.md), [Living field doctrine](Doctrine/Living%20field%20doctrine.md), [Non-goals and guardrails](Doctrine/Non-goals%20and%20guardrails.md).
- Ontology and domain concepts: [Product ontology](Ontology/Product%20ontology.md), [Hold / unclear point](Ontology/Hold%20unclear%20point.md), [Pathway / ways in](Ontology/Pathway%20ways%20in.md).
- Data entities: [Community entity](Data%20layer/Community%20entity.md), [Event/offering entity](Data%20layer/Event%20offering%20entity.md), [Venue entity](Data%20layer/Venue%20entity.md), [Person entity](Data%20layer/Person%20entity.md), [ParticipationEdge](Data%20layer/ParticipationEdge.md), [FieldRelation](Data%20layer/FieldRelation.md), [GeneratedField](Data%20layer/GeneratedField.md).
- Access and calculations: [Access methods and calculations](Access%20layer/Access%20methods%20and%20calculations.md), [Contextual visibility and disclosure](Access%20layer/Contextual%20visibility%20and%20disclosure.md).
- Frontend: [Surface grammar](Frontend/Surface%20grammar.md), [Language and copy rules](Frontend/Language%20and%20copy%20rules.md), [Views overview](Frontend/Views%20overview.md), [Modules overview](Frontend/Modules%20overview.md).
- Views: [My Orientation View](Views/My%20Orientation%20View.md), [Community Overview View](Views/Community%20Overview%20View.md), [Public Event View](Views/Public%20Event%20View.md), [Generated Field View](Views/Generated%20Field%20View.md), [Steward Suggested Connections View](Views/Steward%20Suggested%20Connections%20View.md).
- User stories and flows: [Orient to what is live](User%20stories/Orient%20to%20what%20is%20live.md), [Suggest Connection flow](User%20stories/Suggest%20Connection%20flow.md), [Review Suggested Relation flow](User%20stories/Review%20Suggested%20Relation%20flow.md), [Self-resourcing and field inquiry](User%20stories/Self-resourcing%20and%20field%20inquiry.md).
- Parked material: [Future exploration notes](Parked/Future%20exploration%20notes.md), [Business and pilot hypotheses](Parked/Business%20and%20pilot%20hypotheses.md).

## Legacy Files

The former long root-level context documents are now short pointer files. They remain only to preserve old links and onboarding habits. Do not add new canonical content to those legacy files; update the most specific page in this wiki instead.
