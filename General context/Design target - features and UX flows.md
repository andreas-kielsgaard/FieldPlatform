# Design Target: Document Map

This folder is the living product/design target for the community participation app. Mockups are temporary expressions of these targets, not the source of truth.

The target is to help people orient through communities, events, fields, relationships, and participation signals without collapsing belonging into a simple member/non-member status.

Deeper product center: field relations, holds, pathways, stewardship, and movement.

Core thesis: Field makes latent relations visible so that essence can find context and become expression.

Product-language version: Field helps people, communities, creators, stewards, events, venues, and practices see how they are connected, where participation is held, and what movement is available next.

## Document Structure

- [Design intent](Design%20intent.md): product philosophy, guardrails, and the core experience the app should create.
- [Data concepts and logic](Data%20concepts%20and%20logic.md): storage objects, represented relationships, calculated signals, data provenance, and how data is used.
- [Features and functionalities](Features%20and%20functionalities.md): concrete platform capabilities from the user's perspective, including navigation panes, overviews, pages, panels, controls, and contextual management features.
- [UX stories and user flows](UX%20stories%20and%20user%20flows.md): user intentions and how features map together to help users accomplish them.
- [Dev tools](Dev%20tools.md): development-only inspection and explanation tools, including the Data Model Explorer.
- [Language and copy register](Language%20and%20copy%20register.md): guidance for separating internal philosophy, domain/data-model vocabulary, product language, and user-facing UI copy.
- [Object page and connection UX principles](Object%20page%20and%20connection%20UX%20principles.md): guidance for context-dependent object surfaces, native object affordances, supporting connection panels, role-gated steward review, grouped ways-in actions, and contextual suggestion flows.
- [Design process and project wayfinding](Design%20process%20and%20project%20wayfinding.md): guidance for orienting in the repo, choosing which layer to touch next, processing feedback, timing complexity, and keeping mockups exploratory.
- [Future exploration notes](Future%20exploration%20notes.md): exploratory ideas such as orientation-home windows, map/rhythm modes, validation methods, accessibility, and privacy notes that are not current implementation direction.
- [Business and pilot hypotheses](Business%20and%20pilot%20hypotheses.md): unvalidated business, pilot, and go-to-market hypotheses for human planning reference.

## Authority Note

When sources conflict, prefer the current explicit user instruction, then current General context, then recent mockup review findings captured in General context, then Platform data layer docs for implementation interface truth, then the relevant mockup README. Older generated Design Instructions are archived reference only.

This repo supports a split workflow: an advisor/planning agent can use [Design process and project wayfinding](Design%20process%20and%20project%20wayfinding.md) to interpret project state and prepare focused prompts; a code/execution agent should follow the supplied prompt, consult relevant current docs, make concrete changes, and report functionally.

Older generated Design Instructions now live under `Archive/Generated design instructions/`. Use them only as reference or inspiration. If an idea from that archive is adopted, distill it into General context rather than treating the archive as active instruction.

## Current Product Framing

Features should be identifiable parts of the platform that users can click into, not long sections they must scroll between. The product should make its major capabilities navigable as distinct surfaces, panels, pages, drawers, or modes.

Participant, creator, steward, facilitator, host, volunteer, and bridge person are useful design distinctions, but they should not imply completely separate base applications. Everyone is a participant first. Everyone can access event creation features. Everyone can access community creation features. If a person has created, hosts, stewards, or manages an event or community, they should gain the corresponding contextual features for that object.

The app should therefore be organized around user-accessible features and object-contextual capabilities:

- a person can orient to their own participation field
- a person can explore communities and generated fields
- a person can create events or offerings
- a person can create communities
- a person can manage events or communities when they have the relevant relationship to those objects
- a person can suggest that an event, creator, venue, community, generated field, festival, profile, or practice belongs in a context
- a steward can review suggested field relations when they have the right contextual responsibility
- a person can understand what movement a visible relation makes possible

FieldRelation may be a central data/domain primitive, but it should not become the primary UI object by default. Future mockups should preserve enough native identity that a person can recognize the event, community, venue, person/facilitator, generated pattern, or festival being shown. User role, entry point, surrounding context, and surface type should determine whether the surface foregrounds object basics, connection evidence, review consequences, recommendation reasons, creator fit, or available next steps.

Current surface-grammar pressure: Mockup 5.1 showed that event-first structure is a useful direction, but future mockups now need stronger semantic separation. Event facts, access, cost, audience, experience needed, entry support, requirements, connection type, review state, visibility, evidence, and action target should be visually and conceptually distinct.

Adoption and data principle: the field becomes visible through distributed perception. Participants, creators, and stewards should be able to contribute small acts of contextual clarification that are easy, respectful, reviewable, and non-coercive.

Mockup 4 currently expresses an important implementation slice of this target: participation edges, generated fields, suggested event shares, community health, and steward queues. It should be read as a working slice, not as the full conceptual center.

## Important Distinctions

- Design intent describes the product's orientation and values.
- Data concepts describe what the app stores, represents, calculates, receives, and uses.
- Features describe what the app can do from a user perspective.
- UX stories describe what a user wants to accomplish and how features support that.
- Dev tools describe prototype and development aids, not intended end-user product features.
- ParticipationEdge is the high-resolution person-to-community relation model.
- FieldRelation is the broader relational object that can connect people, communities, events, venues, creators, stewards, generated fields, festivals, and practices.
- A generated field is computed evidence, not a managed community.
- A pathway is movement made possible when a relation becomes visible.
- A hold explains where expression cannot yet move through context.

## Non-Goals And Guardrails

- Do not make the product feel like a generic event marketplace.
- Do not make community belonging a binary member/non-member truth.
- Do not make steward or community management tools feel like surveillance or CRM.
- Do not make event creation or sharing feel like ad targeting.
- Do not treat generated fields as managed communities.
- Do not hide why something is recommended or calculated.
- Do not hide why a relation appears, who or what suggested it, or what review state it is in.
- Do not make suggested relations feel like automatic ownership, publication, or social pressure.
- Do not let steward tools become surveillance, CRM, or individual targeting.
- Do not let calculated relations override consent, boundaries, capacity, or steward authority.
- Do not force every mockup to express every feature identically.
- Do not make participant, creator, and steward feel like hard-separated products when they are better understood as contextual roles, permissions, and design lenses.
