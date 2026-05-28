---
title: Language And Copy Rules
layer: frontend
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - language register
  - UI copy rules
related:
  - Surface grammar.md
  - ../Principles/Living field principles.md
depends_on:
  - ../Ontology/Product ontology.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Modules/Ways In module.md
implemented_by:
---

# Language And Copy Rules

FieldPlatform has deep internal philosophy and technical data [vocabulary](../Glossary/Project%20words%20in%20plain%20English.md). Most of that language should not appear in ordinary UI.

Use four language levels:

- Internal philosophy: field, movement, [holds](../Ontology/Hold%20unclear%20point.md), [pathways](../Ontology/Pathway%20ways%20in.md), stewardship, [self-resourcing](../Modules/Self-resourcing%20Entry%20module.md), conviviality.
- Domain/data model: [FieldRelation](../Data%20layer/FieldRelation.md), [ParticipationEdge](../Data%20layer/ParticipationEdge.md), RelationReview, provenance, holdTypes, movementUnlocked.
- Product language: connection, suggested connection, [ways in](../Ontology/Pathway%20ways%20in.md), first step, [contextual disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md), visibility scope, why this appears, ask the field, care for the space.
- User-facing copy: "Related [communities](../Data%20layer/Community%20entity.md)", "[Ways in](../Ontology/Pathway%20ways%20in.md)", "Waiting for review", "Why am I seeing this?", "Ask a steward", "How do you want to show up here?", "Keep this private", "Let this disappear".

## Translation Rules

- Prefer "connection" over "relation" in UI.
- Prefer "[ways in](../Ontology/Pathway%20ways%20in.md)" or "first step" over "[pathway](../Ontology/Pathway%20ways%20in.md)."
- Prefer "what may be unclear" over "[hold](../Ontology/Hold%20unclear%20point.md)."
- Prefer "waiting for review" over "stewardship [hold](../Ontology/Hold%20unclear%20point.md)."
- Prefer "why this appears" over "provenance."
- Prefer contextual suggestion labels such as "Suggest related [community](../Data%20layer/Community%20entity.md)", "Suggest where this belongs", or "Add context."
- Use "Suggestions to review" for steward-facing surfaces rather than unexplained "Review queue."

## Terms To Avoid In Ordinary UI

Avoid [FieldRelation](../Data%20layer/FieldRelation.md), [ParticipationEdge](../Data%20layer/ParticipationEdge.md), movementUnlocked, relation provenance, reviewAuthorityType, reviewAuthorityId, distributed perception, [threshold illegibility](../Principles/Living%20field%20principles.md), [self-resourcing through field awareness](../Principles/What%20FieldPlatform%20is%20for.md), digital double, anti-convivial, input bargain, omniscient-platform assumption, and any copy implying "the platform knows what you need."

## Semantic Separation

Do not style access, cost, audience, experience needed, entry support, practical expectations, requirements, connection type, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, evidence, and action target as if they were the same kind of label.

Good UI copy explains why something appears, what state it is in, who can see it, and what the [user](../Data%20layer/Person%20entity.md) can do next.
