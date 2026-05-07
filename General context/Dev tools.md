# Dev Tools

Dev tools are not intended end-user product features. They exist so designers, developers, and model authors can inspect, argue with, and change the assumptions behind the prototype.

Dev tools may expose internal and domain names such as FieldRelation, ParticipationEdge, GeneratedField, provenance, reviewAuthority, and movementUnlocked. Because dev tools are often used in design review, they should still include plain-language explanations where useful. Use [Language and copy register](Language%20and%20copy%20register.md) to decide when a technical label needs a human explanation beside it.

## Data Model Explorer

The Data Model Explorer is a development aid. It should be visually and navigationally separate from the participant-facing, event-facing, community-facing, and management-facing product.

It may be available in prototypes, internal builds, or debug modes, but should not be framed as a normal part of the final product experience.

## Inspectable Objects

The model explorer should allow inspection of:

- people
- groups/communities
- participation edges
- FieldRelations
- events
- venues
- computed group relationships
- emergent fields
- event relevance
- formulas
- membership requests
- suggested event shares
- suggested context / suggested connection records
- relation provenance
- relation review state
- hold taxonomy and related hold types
- movement unlocked / pathway outputs
- created events
- created communities

## Explainable Formulas

The model explorer should explain:

- engagement strength
- bonding score
- bridging score
- group overlap
- field relation strength and review eligibility
- emergent field generation
- participant group recommendations
- participant event recommendations
- creator/event group recommendations
- dormant participant detection
- newcomer dropoff detection
- bridge people detection
- user interest in an event
- creator or host fit to a community
- hold explanations such as visibility, context, trust, threshold, boundary, stewardship, capacity, and language holds
- pathway surfacing from movementUnlocked

## FieldRelation Inspection

The model explorer should make it possible to inspect FieldRelation records and relation-like implementation objects side by side.

Useful columns:

- id
- sourceType/sourceId
- targetType/targetId
- relationKind
- relationStrength
- status
- provenance
- suggestedBy
- stewardedBy or reviewAuthority
- visibility
- evidence/reasons
- relatedHoldTypes
- movementUnlocked
- createdAt/updatedAt

The explorer should distinguish:

- ParticipationEdge as high-resolution person-to-community belonging
- FieldRelation as a broader relation object between contexts
- suggested event shares as an early implementation slice of suggested event-to-community FieldRelation
- generated fields as computed patterns, not managed communities

## Stewardship And Suggestion Debugging

Dev tools should help designers and developers answer:

- Why was this relation suggested?
- Was it user-suggested, steward-marked, creator-marked, calculated, or imported?
- Who has review authority?
- What status is it in: suggested, steward-reviewed, accepted, refined, declined, or dormant?
- Which hold types explain why it cannot move yet?
- What movement would acceptance unlock?
- Which pages, recommendations, and pathway surfaces changed because the relation was accepted?

## Dev Tool Design Target

- Computed signals should remain explainable.
- Raw records and computed outputs should be inspectable side by side.
- Model assumptions should be easy to find and revise.
- Relation provenance, review state, hold taxonomy, and movementUnlocked should be inspectable.
- Dev tools should help the prototype remain discussable and changeable.
- Dev tools should not shape the final product navigation unless they graduate into intentional user-facing features.
