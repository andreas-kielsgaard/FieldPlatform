# Dev Tools

Dev tools are not intended end-user product features. They exist so designers, developers, and model authors can inspect, argue with, and change the assumptions behind the prototype.

## Data Model Explorer

The Data Model Explorer is a development aid. It should be visually and navigationally separate from the participant-facing, event-facing, community-facing, and management-facing product.

It may be available in prototypes, internal builds, or debug modes, but should not be framed as a normal part of the final product experience.

## Inspectable Objects

The model explorer should allow inspection of:

- people
- groups/communities
- participation edges
- events
- venues
- computed group relationships
- emergent fields
- event relevance
- formulas
- membership requests
- suggested event shares
- created events
- created communities

## Explainable Formulas

The model explorer should explain:

- engagement strength
- bonding score
- bridging score
- group overlap
- emergent field generation
- participant group recommendations
- participant event recommendations
- creator/event group recommendations
- dormant participant detection
- newcomer dropoff detection
- bridge people detection
- user interest in an event
- creator or host fit to a community

## Dev Tool Design Target

- Computed signals should remain explainable.
- Raw records and computed outputs should be inspectable side by side.
- Model assumptions should be easy to find and revise.
- Dev tools should help the prototype remain discussable and changeable.
- Dev tools should not shape the final product navigation unless they graduate into intentional user-facing features.

