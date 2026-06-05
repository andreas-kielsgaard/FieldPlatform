---
title: Product Guardrails For Agents
layer: process
status: generated/unreviewed
maturity: design target
provenance: agent-generated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - agent product guardrails
  - principle companion
  - anti-drift checks for agents
related:
  - ../Principles/What FieldPlatform is.md
  - ../Principles/Living field principles.md
  - ../Principles/What FieldPlatform should not become.md
  - Context maintenance for agents.md
depends_on:
  - ../Principles/What FieldPlatform is.md
  - ../Principles/Living field principles.md
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../../AGENTS.md
  - Context maintenance for agents.md
implemented_by:
---

# Product Guardrails For Agents

This page is the agent-facing companion to the human principle pages.

Use the principle pages to understand the project. Use this page when designing, editing, generating, reviewing, or implementing something that might change product meaning.

## Core Commitments

- FieldPlatform supports [self-resourcing through field awareness](../Principles/What%20FieldPlatform%20is.md).
- Do not digitize the [living field](../Principles/Living%20field%20principles.md). Digitize thresholds where it becomes hard to read.
- The app should help people return to contact with life instead of feeding a digital double.
- Everyone is a participant first. Creator, steward, facilitator, host, volunteer, and bridge are contextual roles, not separate base products.
- Ordinary UI should use plain language. Do not leak internal principle language or data-model terms into user-facing copy.

## Product Shapes To Resist

Do not let FieldPlatform become primarily:

- an event marketplace
- a resource catalogue
- a CRM
- a productivity dashboard
- a social feed
- an organizer funnel
- a behavioral-data project
- a universal map of community life

These shapes are not forbidden as references or partial mechanics. They become problems when they define the product center.

## Data And Representation

- Do not ask people to complete profiles, resource maps, social graphs, or digital doubles before the platform can create value.
- Every input needs a fair return: what effort is asked, what value returns, how soon it returns, and why the app is the right medium.
- Prefer lightweight declarations, scoped asks and offers, expiring signals, reviewed relations, selected carry-forward notes, and support patterns.
- Do not build a catalogue of everything alive merely because it can be represented.
- Treat generated fields as computed patterns, not [communities](../Data%20layer/Community%20entity.md).
- Treat [FieldRelation](../Data%20layer/FieldRelation.md) as a data/domain primitive, not the primary ordinary UI object.
- Treat [ParticipationEdge](../Data%20layer/ParticipationEdge.md) as person-community belonging, not a generic relationship.

## Access, Review, And Authority

- Keep access, cost, audience, experience, entry support, requirements, evidence, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, and action target distinct.
- Do not let calculated relations override consent, boundaries, capacity, or steward authority.
- Do not hide why something is recommended, calculated, related, or waiting for review.
- Steward review should be role-gated, contained, and clear about consequence.
- Suggestions should feel like contextual clarification, not ownership, automatic publication, marketing reach, or social pressure.
- Do not make attending, following, requesting access, or connecting with someone reveal identity, history, contact details, opinions, or participation graph by default.

## Language And Interface Behavior

- Keep ordinary UI close to what a person is trying to understand or do.
- Do not make community tools feel like surveillance, CRM, ad targeting, or operations software.
- Do not make community belonging a flat member/non-member truth when the real relation is more specific.
- [Holds](../Ontology/Hold%20unclear%20point.md) explain unclear movement; they are not shame labels.
- [Pathways](../Ontology/Pathway%20ways%20in.md) and ways in are grouped next actions.
- Leaving, resting, waiting, hiding, declining, and doing the thing directly can be successful outcomes.

## Agent Drift Checks

Before adding a feature, schema field, calculation, UI surface, or generated text, ask:

- Does this help people return to contact with life?
- Is this a threshold where the field has become hard to read?
- Does the input change what becomes possible for the person or field?
- Is the input feasible and worth the effort?
- Is this visibility in service of movement, or visibility for metrics, performance, capture, or control?
- Can this be handled better by proximity, direct conversation, rest, walking, a meal, or doing the work?
- Is uncertainty being marked honestly instead of being hardened into schema, workflow, or UI?

If the answer is unclear, update [Open questions](../Current%20direction/Open%20questions.md) instead of inventing authority.
