# Design Target: Document Map

This folder is the living product/design target for the community participation app. Mockups are temporary expressions of these targets, not the source of truth.

The target is to help people orient through communities, events, fields, relationships, and participation signals without collapsing belonging into a simple member/non-member status.

## Document Structure

- [Design intent](Design%20intent.md): product philosophy, guardrails, and the core experience the app should create.
- [Data concepts and logic](Data%20concepts%20and%20logic.md): storage objects, represented relationships, calculated signals, data provenance, and how data is used.
- [Features and functionalities](Features%20and%20functionalities.md): concrete platform capabilities from the user's perspective, including navigation panes, overviews, pages, panels, controls, and contextual management features.
- [UX stories and user flows](UX%20stories%20and%20user%20flows.md): user intentions and how features map together to help users accomplish them.
- [Dev tools](Dev%20tools.md): development-only inspection and explanation tools, including the Data Model Explorer.

## Current Product Framing

Features should be identifiable parts of the platform that users can click into, not long sections they must scroll between. The product should make its major capabilities navigable as distinct surfaces, panels, pages, drawers, or modes.

Participant, creator, steward, facilitator, host, volunteer, and bridge person are useful design distinctions, but they should not imply completely separate base applications. Everyone is a participant first. Everyone can access event creation features. Everyone can access community creation features. If a person has created, hosts, stewards, or manages an event or community, they should gain the corresponding contextual features for that object.

The app should therefore be organized around user-accessible features and object-contextual capabilities:

- a person can orient to their own participation field
- a person can explore communities and generated fields
- a person can create events or offerings
- a person can create communities
- a person can manage events or communities when they have the relevant relationship to those objects
- a person can inspect or act on suggested relevance when they have the right contextual responsibility

## Important Distinctions

- Design intent describes the product's orientation and values.
- Data concepts describe what the app stores, represents, calculates, receives, and uses.
- Features describe what the app can do from a user perspective.
- UX stories describe what a user wants to accomplish and how features support that.
- Dev tools describe prototype and development aids, not intended end-user product features.

## Non-Goals And Guardrails

- Do not make the product feel like a generic event marketplace.
- Do not make community belonging a binary member/non-member truth.
- Do not make steward or community management tools feel like surveillance or CRM.
- Do not make event creation or sharing feel like ad targeting.
- Do not treat generated fields as managed communities.
- Do not hide why something is recommended or calculated.
- Do not force every mockup to express every feature identically.
- Do not make participant, creator, and steward feel like hard-separated products when they are better understood as contextual roles, permissions, and design lenses.

