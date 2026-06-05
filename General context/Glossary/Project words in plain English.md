---
title: Project Words In Plain English
layer: glossary
status: generated/unreviewed
maturity: design target
provenance: agent
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - project vocabulary
  - plain language onboarding
related:
  - ../Principles/What FieldPlatform is.md
  - ../Principles/Living field principles.md
  - ../Ontology/Product ontology.md
depends_on:
  - ../Principles/What FieldPlatform is.md
consumed_by:
  - ../README.md
implemented_by:
---

# Project Words In Plain English

Use this as a quick glossary. The detailed pages still decide the exact product behavior.

## Core Terms

- [Living field](../Principles/Living%20field%20principles.md): the real web of [people](../Data%20layer/Person%20entity.md), places, [communities](../Data%20layer/Community%20entity.md), [events](../Data%20layer/Event%20offering%20entity.md), needs, offers, care, memory, trust, and timing around someone. The app can point to parts of it, but cannot contain it.
- FieldPlatform: a tool for noticing useful connections and possible next steps when the surrounding field has become hard to read.
- [Self-resourcing](../Modules/Self-resourcing%20Entry%20module.md): [people](../Data%20layer/Person%20entity.md) and [communities](../Data%20layer/Community%20entity.md) finding support, direction, and next steps from what is already around them.
- Field awareness: seeing enough of the surrounding context to act with care.
- Threshold: a moment where movement is possible but not yet clear, such as arriving, asking, joining, leaving, handing off, or digesting what happened.
- Convivial: tool-shaped for human agency. A convivial tool helps [people](../Data%20layer/Person%20entity.md) act, ask, join, care, rest, and understand without making the tool the center.
- Steward: someone trusted to care for a [community](../Data%20layer/Community%20entity.md), context, relation, or review decision. A steward is not a CRM operator.

## Product Words

- [Person](../Data%20layer/Person%20entity.md): someone using or appearing in the platform. They are a participant first, even when they also host, create, facilitate, steward, or volunteer.
- [Community](../Data%20layer/Community%20entity.md): a named social container with rhythm, norms, entry guidance, and [people](../Data%20layer/Person%20entity.md) who care for it.
- [Event](../Data%20layer/Event%20offering%20entity.md) or [offering](../Data%20layer/Event%20offering%20entity.md): a hosted activity with time, place, host or facilitator context, access, audience, and requirements.
- [Venue](../Data%20layer/Venue%20entity.md): a physical place that can anchor [events](../Data%20layer/Event%20offering%20entity.md), [communities](../Data%20layer/Community%20entity.md), and overlap.
- [Hold](../Ontology/Hold%20unclear%20point.md) or [unclear point](../Ontology/Hold%20unclear%20point.md): the reason something is not yet actionable, visible, or settled.
- [Pathway](../Ontology/Pathway%20ways%20in.md) or [way in](../Ontology/Pathway%20ways%20in.md): a next step that has become appropriate, such as follow, ask, attend, request access, or talk to a steward.

## Technical Words

- [Product concept](../Ontology/Product%20ontology.md): a product idea that needs a clear meaning before it becomes UI, data, or code.
- [Data layer](../Architecture/Data%20layer%20overview.md): the stored records and rules that keep information consistent.
- [Access layer](../Architecture/Access%20layer%20overview.md): the safe way for [views](../Frontend/Views%20overview.md) and [modules](../Frontend/Modules%20overview.md) to ask questions, write changes, run calculations, and receive filtered outputs.
- [View](../Frontend/Views%20overview.md): a whole product surface, such as [My Orientation](../Views/My%20Orientation%20View.md) or a [Community Overview](../Views/Community%20Overview%20View.md).
- [Module](../Frontend/Modules%20overview.md): a reusable piece inside a [view](../Frontend/Views%20overview.md), such as [Ways In](../Ontology/Pathway%20ways%20in.md) or [Contextual Disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md).
- [ParticipationEdge](../Data%20layer/ParticipationEdge.md): the detailed relationship between a [person](../Data%20layer/Person%20entity.md) and a [community](../Data%20layer/Community%20entity.md).
- [FieldRelation](../Data%20layer/FieldRelation.md): a represented connection between two objects or contexts, such as an [event](../Data%20layer/Event%20offering%20entity.md) and a [community](../Data%20layer/Community%20entity.md).
- [GeneratedField](../Data%20layer/GeneratedField.md): a calculated pattern that may help orientation but does not speak for a [community](../Data%20layer/Community%20entity.md).
