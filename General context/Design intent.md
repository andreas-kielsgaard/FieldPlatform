# Design Intent

The app should feel like an orientation companion for a living field of communities, events, venues, creators, stewards, practices, and participants.

Core thesis:

Field makes latent relations visible so that essence can find context and become expression.

Product-language version:

Field helps people, communities, creators, stewards, events, venues, and practices see how they are connected, where participation is held, and what movement is available next.

Core design doctrine:

FieldPlatform supports self-resourcing through field awareness. It helps people and communities resource themselves from the living field around them by making needs, impulses, possible supports, relations, and next steps visible enough to move.

A catalogue assumes the platform already knows the world. A field-aware platform assumes the world is alive, partial, local, relational, and emergent.

Do not digitize the living field. Digitize the thresholds where the living field becomes illegible.

The reason is not only practical scope. Reality is alive, partial, and evolving. Any digital representation of it is at best a temporary, situated trace, never the field itself. If the platform starts treating that trace as the truth, it becomes a mirage: clean, legible, and false. At worst, it deadens the living process by turning contact, care, impulse, and relation into administration.

The platform should therefore stay convivial: a tool people can use to return to life, not a system that makes life serve the tool.

The product should help a person understand:

- what they are already involved in
- what they are following lightly
- where they have explicit membership or access
- where they have made stronger commitments
- where a relationship is dormant or intentionally muted
- what is nearby through overlap, tags, venues, people, recurring rhythm, or stewarded relation
- where participation is held by context, trust, boundary, language, capacity, or stewardship
- how to move from latent fit into appropriate expression when that is welcome
- how to continue, deepen, rest, or re-orient without being pushed toward constant novelty

The deeper product center is field relations, holds, pathways, stewardship, and movement. Participation edges and generated fields remain important, but they sit inside a broader relational model rather than defining the whole product center alone.

## Aliveness, Contact, And Rhythm

The app should support a field where people can enter the day, a project, a community, or a shared space with more contact. The analogy is closer to a shared morning threshold, village square, workshop commons, or day-retreat field than to a productivity dashboard.

The product should not optimize for output alone. It should protect:

- activation without coercion
- engagement without dissociation
- purpose without performance pressure
- rest as part of participation
- care for the space as real participation
- body, need, relation, and emotion as part of the field rather than noise around the work
- aliveness and contact as orientation signals, not linear productivity as the only metric

This does not mean comfort worship. The product should support contact with what is true, needed, possible, or life-serving. Sometimes that means movement, work, conversation, focus, or a first step. Sometimes it means food, rest, wintering, grief, digestion, or leaving the app and asking a nearby human.

Rhythm matters more than ownership. Desks, pages, boards, and profiles can exist as tools, but they should not become the organizing principle when the deeper purpose is state transition, shared intention, and meaningful movement.

## Visibility In Service Of Movement

Visibility is only valuable when it helps someone ask, offer, join, rest, care, focus, digest, begin, or carry something forward.

Visibility is not neutral. Making something visible can nourish movement, but it can also freeze a living process into a record people feel responsible to maintain. The platform should treat digitization as an intervention in the field, not an innocent mirror of it.

Visibility should not become:

- surveillance
- performance
- metrics for their own sake
- content production
- forced exposure
- pressure to participate more deeply
- a dead catalogue of what used to be alive
- administrative obligation
- a clean-looking mirage of a messier living reality

The smallest useful exchange is one that changes what becomes possible. If sharing a piece of information does not help someone find support, offer support, coordinate softly, remember a useful nugget, clarify a relation, or move through a threshold, the platform should not ask for it.

## Realistic And Convivial Information Exchange

There is an important difference between:

- what would be a beautiful way to organize the field if the platform knew everything
- what is a beautiful way to organize the field when the platform will never know everything
- what information can realistically, lightly, and convivially pass between reality and the app

The platform should never design from an omniscient fantasy. It should design from partial knowledge, situated exchange, and the cost of asking people to inform the system.

Before asking for input, ask:

- Is this only nice for the platform to know, or does sharing it change what becomes possible for the person or field?
- Can the platform realistically be informed about this without turning life into administration?
- Is the user already holding this information in a form they can share with low effort?
- Does the person or group receive value close enough to the moment of input?
- Would direct conversation, proximity, or doing the thing serve better?

User input is not free. Every field, prompt, status, profile detail, board item, and check-in asks for attention and life energy. A convivial platform should treat input as a cost to justify, not as raw material to harvest.

## Thresholds Where The Field Becomes Illegible

FieldPlatform should be strongest around thresholds where people, communities, or living spaces lose access to what is already around them.

Important threshold moments include:

- arrival
- morning orientation
- transition between states or activities
- stuckness
- absence or "I was not there when this became clear"
- memory
- condensation after something happened
- invitation
- handoff
- afterglow
- unresolved need
- not knowing who to ask
- not knowing whether now is the right season

These thresholds extend the existing hold model. Participation can be blocked before a pathway is visible at all: at the level of impulse, need, desire, direction, solution, availability, relation, first step, timing, or state.

## Seasonal Software Posture

The seasonal language is a useful internal design lens, especially for living houses, residencies, creative spaces, and other high-proximity fields.

- Spring: orientation, activation, state clarity, self-resourcing, surfacing what wants to move.
- Summer: doing the thing. The app should mostly get out of the way.
- Fall: digestion, condensation, pruning, nuggets, carry-forward, remembering what worked.
- Winter: rest, soft togetherness, landing, letting the field dissolve without pulling people back into the screen.

Most digital support belongs in spring and fall. Summer and winter should be protected from unnecessary platformization.

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

Relation-powered context should preserve semantic separation in UI. A person should not have to infer whether a label describes access, cost, audience, experience needed, connection type, review state, visibility, evidence, or action target. FieldRelation can hold these meanings together in the domain layer, but surfaces should separate them into understandable product language.

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

Self-resourcing holds may also appear before a relation has a clear object:

- Impulse illegibility: "I feel something, but I do not know what wants to happen."
- Need illegibility: "I know I am off, but I do not know what I need."
- Direction illegibility: "Something wants to move, but I cannot tell where it wants to go."
- Solution illegibility: "I know the need, but cannot imagine what would help."
- Availability illegibility: "I know what would help, but do not know whether it exists here now."
- Relational illegibility: "Someone could maybe help, but I do not know who or whether I may ask."
- Timing/state illegibility: "This may help, but I do not know whether now is the right moment."

These should usually appear as gentle orientation prompts, not as diagnostic labels.

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

Distributed perception should not mean everyone maps everything. It means small, timely acts of clarification when something is actually blocked, sensed, offered, needed, or ready to move.

In high-proximity settings, the platform should activate social intelligence rather than replace it. The best next step may be "ask the person next to you", "bring this to morning orientation", "take a walk with someone", or "let this rest until fall digestion."

## Orientation Without Identity Capture

The product should help people orient among possibilities without implying that the platform knows them better than they know themselves.

Orientation is not only finding events, communities, or relations. It is helping a person or group become more able to resource itself from the living field around it.

The app may support possibility recall: when a person cannot perceive what might nourish or support them, the platform can make ordinary possibilities visible again, such as food, water, movement, solitude, being listened to, conversation, bodywork, nature, practical planning, a practice, someone's knowledge, a contact, permission to rest, or a first tiny step.

Recommendations, connections, and ways in should feel like:

- helpful orientation
- meaningful context
- adjacent invitations
- continuity with what already supports the person
- permission to rest, simplify, or stay with what is already working

They should not feel like:

- identity capture
- overconfident personalization
- algorithmic certainty
- novelty pressure
- a machine pushing users toward more participation

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
- Do not build a catalogue of everything alive in the field merely because it can be represented.
- Do not ask users to map all of their resources, contacts, skills, or capacities in advance.
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
- Do not keep a user inside the app when turning toward a nearby human, a room, a meal, a walk, or direct work would serve the movement better.
