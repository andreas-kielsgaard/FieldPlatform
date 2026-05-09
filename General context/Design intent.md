# Design Intent

The app should feel like an orientation companion for a living field of communities, events, venues, creators, stewards, practices, and participants.

Core thesis:

Field makes latent relations visible so that essence can find context and become expression.

Product-language version:

Field helps people, communities, creators, stewards, events, venues, and practices see how they are connected, where participation is held, and what movement is available next.

The product should help a person understand:

- what they are already involved in
- what they are following lightly
- where they have explicit membership or access
- where they have made stronger commitments
- where a relationship is dormant or intentionally muted
- what is nearby through overlap, tags, venues, people, recurring rhythm, or stewarded relation
- where participation is held by context, trust, boundary, language, capacity, or stewardship
- how to move from latent fit into appropriate expression when that is welcome

The deeper product center is field relations, holds, pathways, stewardship, and movement. Participation edges and generated fields remain important, but they sit inside a broader relational model rather than defining the whole product center alone.

## Product Posture

Everyone is a participant first. A person may also create an event, create a community, manage an event, steward a community, facilitate a gathering, volunteer, host, or act as a bridge between communities. These are contextual roles and capabilities, not separate base products.

The app should reveal contextual functionality when the user has the right relationship to an object:

- if the user creates an event, they can manage that event
- if the user creates or stewards a community, they can manage that community
- if the user is trusted, core, or explicitly responsible in a community, they may see deeper governance or review controls
- if the user is simply exploring, they should still have clear ways to follow, attend, request access, suggest context, ask a steward, or become dormant

## Field Relation Posture

A FieldRelation is the broader represented relation between two objects or contexts. It may connect participants, communities, events, offerings, venues, creators, facilitators, stewards, generated fields, festivals, practices, or tags.

FieldRelation may be central in the data/domain layer, but it should not become the primary object of ordinary UI by default. Object type defines default affordances; user role, entry point, surrounding context, and surface type define priority. A surface should preserve enough native identity that a person can recognize the event, community, venue, person/facilitator, generated pattern, or festival being shown, while relations support the current task by explaining context, review state, visibility, and appropriate next movement.

ParticipationEdge should remain central for belonging, but it should be positioned as the high-resolution person-to-community relation model. FieldRelation is the more general relational object that lets the product represent:

- an event that belongs in a community context
- a creator whose offering repeatedly fits a practice field
- a venue that holds several adjacent communities
- a festival that bridges multiple fields
- a generated field that reveals overlap between named communities
- a steward-reviewed relation between practices, venues, events, or communities

Relations must show why they appear, who or what suggested them, who can review them, and what movement they make possible.

## Holds

A hold is where expression cannot yet move through context. Holds are initially a design and explanation lens, not necessarily a heavy user-facing entity.

Initial hold taxonomy:

- Visibility hold: "I would participate if I knew this existed."
- Context hold: "I see it, but I do not understand what world it belongs to."
- Trust hold: "I am curious, but I do not know whether I am welcome."
- Threshold hold: "I want to enter, but I do not know the first step."
- Boundary hold: "We want to receive people, but not without protecting the field."
- Stewardship hold: "This relation is sensed, but not confirmed by someone responsible."
- Capacity hold: "This may be right, but not at this intensity, timing, or state."
- Language hold: "The thing exists, but cannot yet describe itself clearly."

The product should use holds to explain why a relation is not yet active, visible, recommended, or actionable. Holds should not become labels that shame people or communities.

## Pathways And Movement

A pathway is the movement made possible when a relation becomes visible. Pathways should be surfaced as appropriate next moves, not generic conversion prompts.

Examples:

- attend beginner event
- follow lightly
- request access
- ask steward
- volunteer
- join recurring practice
- suggest related community
- reactivate dormant edge
- create bridge event
- mark relationship between communities

Pathways should be constrained by consent, visibility, capacity, access rules, and steward authority. A relation becoming visible does not mean every action becomes available.

## Distributed Perception

The field becomes visible through distributed perception. Participants, creators, and stewards all contribute small acts of contextual clarification.

The platform should make these acts easy, respectful, reviewable, and non-coercive:

- a participant can say, "I sense this belongs in this context"
- a creator can suggest where an offering may fit
- a steward can accept, refine, decline, redirect, or hold a suggested relation
- calculations can propose possible relations with clear evidence
- imported data can provide weak signals without pretending to be social truth

Distributed perception must not become extraction. People should be able to contribute without being pressured to map every relationship or expose private belonging.

## Navigational Intent

Features should be identifiable, clickable parts of the platform from the user's perspective. The app should not depend on long scrolling between unrelated feature areas.

Good feature surfaces may include:

- navigation panes
- object pages
- overview dashboards
- drawers
- tabs
- segmented views
- contextual panels
- feature-specific flows

The product can still contain scrolling within a feature, but movement between features should be navigationally clear.

## Belonging Model

The participation edge should remain the high-resolution conceptual object for representing a person's belonging to a community. It should support separate dimensions rather than compressing them into a single status.

Design target:

- Keep access, attendance, identity, trust, commitment, and visibility separate.
- Make it possible to belong lightly, deeply, formally, informally, temporarily, or dormantly.
- Avoid implying that membership alone is the full truth of participation.
- Let ParticipationEdge inform FieldRelation evidence, pathway suggestions, and hold explanations without replacing the broader relation model.

## Communities And Fields

Managed communities and generated fields must feel different.

A community is a named social container with stewards, norms, rhythm, access rules, and entry guidance.

A generated field is a computed pattern. It may be useful for orientation, but it does not speak as a community and should not imply social representation unless people intentionally make it one.

FieldRelation can connect communities and generated fields, but such relations must preserve this distinction. A generated field can reveal a pattern; it does not automatically become a stewarded container.

## Creator And Steward Experience

Event creation should feel like guided field discovery. It should help people find fit without making communities feel like marketing segments.

Community management and stewardship tools should expose aggregate patterns, opportunities, holds, suggested relations, and governance choices. They should not default to a roster-first or individual-monitoring interface.

Steward tools should review suggested field relations, not only suggested event shares. Stewards should be able to accept, refine, decline, redirect, or keep a relation held for later.

## Non-Goals And Guardrails

- Do not make the product feel like a generic event marketplace.
- Do not make community belonging a binary member/non-member truth.
- Do not make community management tools feel like surveillance or CRM.
- Do not make event creation or sharing feel like ad targeting.
- Do not treat generated fields as managed communities.
- Do not hide why something is recommended, calculated, or related.
- Do not make contextual roles feel like completely separate base apps.
- Do not make relation suggestion feel like social pressure.
- Do not make relation panels or review queues dominate ordinary object pages.
- Do not let steward review become individual tracking.
- Do not let calculated relations override consent, boundary, or steward authority.
