---
title: Self-resourcing Entry Module
layer: frontend
status: generated/unreviewed
maturity: conceptual
provenance: agent-generated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Self-resourcing entry module
related:
  - ../User stories/Self-resourcing and field inquiry.md
  - ../Principles/Living field principles.md
  - ../Access layer/Contextual visibility and disclosure.md
depends_on:
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../Views/My Orientation View.md
implemented_by:
---

# Self-resourcing Entry Module

The Self-resourcing Entry [module](../Frontend/Modules%20overview.md) gives a [person](../Data%20layer/Person%20entity.md) a light way to notice what they are arriving with and find possible support, rest, contact, care, or action from what is already around them.

It is a conceptual [module](../Frontend/Modules%20overview.md). It should be concrete enough for design pressure and mockups, but it should not force stable data collections before the access and [visibility model](../Access%20layer/Contextual%20visibility%20and%20disclosure.md) has earned them.

## Parent Views

- [My Orientation View](../Views/My%20Orientation%20View.md)
- future arrival, field board, care, ask, offer, and digestion surfaces

## User Questions Answered

- What am I arriving with?
- Is there a small next step, support, rest, [person](../Data%20layer/Person%20entity.md), place, or practice already nearby?
- Should this stay private, be shared with a specific context, be carried forward, or disappear?

## Displayed Data

- optional arrival prompt
- lightweight support categories such as rest, ask, offer, care, practice, conversation, practical help, or direct action
- scoped visibility choice when sharing is involved
- possible related [communities](../Data%20layer/Community%20entity.md), [events](../Data%20layer/Event%20offering%20entity.md), [venues](../Data%20layer/Venue%20entity.md), [people](../Data%20layer/Person%20entity.md) in contextual roles, or accepted field relations where output cleaning allows
- carry-forward choices for useful nuggets or support patterns

## Actions

- keep private
- ask the field
- offer something for today
- mark a care need
- find a first step
- ask a steward or facilitator where that path exists
- carry a useful nugget forward
- let the trace disappear

## Rules

- Do not require a complete resource graph, profile, or support catalogue.
- Let daily signals expire by default.
- Ask only for information that changes what becomes possible soon.
- Make direct human movement available when better than an app-mediated action.
- Keep sharing scoped, optional, and revocable where the model supports it.
- Do not turn needs-first support into therapy, a feed, a performance dashboard, or project management.

## Access And Data Status

Current implementation does not yet have stable self-resourcing collections such as FieldNeed, SupportRequest, FieldBoardItem, Nugget, or CareNeed.

Early versions may use prompt state, local mockup state, [contextual disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md) behavior, accepted FieldRelations, [ParticipationEdge](../Data%20layer/ParticipationEdge.md) context, and output-cleaned recommendations. Add persistent records only after repeated surfaces need shared lifecycle, visibility, expiry, or carry-forward behavior.
