# Object Page And Connection UX Principles

Mockup 5 confirmed that FieldRelation is useful as a data/domain primitive, but it should not become the primary UI object by default. The user's primary object is usually the thing they are viewing: event, community, venue, person/facilitator, generated pattern, or festival.

Sharper principle:

Object type defines the default affordances; user role, entry point, surrounding context, and surface type define the priority.

Every object surface should preserve enough native identity that the user can recognize what they are looking at. The first emphasized information should depend on why the object is being shown here.

## 1. Object Type Defines Default Affordances

Object-specific guidance is a default public-viewer grammar, not a universal hierarchy. A full public object page usually needs enough native orientation before it asks the user to interpret connections, review state, or ways in.

For an event, default public-viewer orientation often includes:

- what is this event?
- when is it?
- where is it?
- who holds or facilitates it?
- can I attend?
- what should I expect?
- what level of experience or access is needed?

For a community, default public-viewer orientation often includes:

- what is this community?
- who is it for?
- how does it meet?
- what are the norms?
- how do I enter?
- what are the beginner-friendly or low-threshold options?

For a venue, default public-viewer orientation often includes:

- where is this?
- what happens here?
- what kinds of communities or events use it?
- what practical expectations matter?

For a person/facilitator, default public-viewer orientation often includes:

- who is this?
- what do they offer or hold?
- what public context are they connected through?
- what contact or access is appropriate?

These are native affordances, not fixed first sections. A steward workspace, recommendation card, or creator-fit panel may foreground something else while still preserving enough native identity to avoid disorientation.

## 2. Surface Context Determines Priority

The same object can appear in different surfaces with different priorities.

Full object page:

- should preserve native orientation
- event basics, community identity, venue practicality, person/facilitator public role, generated-pattern evidence, or festival structure should remain legible
- connections usually support the object after its identity is clear

Embedded object card:

- should foreground why the object appears in this parent context
- an event card inside a community steward's suggestions surface may foreground shared tags, review state, and why it may belong with that community
- native identity should be compact but sufficient

Steward/management surface:

- should foreground review consequences, unresolved suggestions, relevant patterns, entry issues, or governance actions
- object identity still matters, but the action context may be primary
- review actions should be role-gated and contained

Recommendation surface:

- should foreground why this appears and what next step is available
- object basics should be compact but sufficient
- user-facing copy should explain relevance without exposing the relation model

Creator-fit surface:

- should foreground fit evidence, possible destination communities, audience overlap, venue/context fit, and what suggestion action is available
- it should not feel like ad targeting or a way to push an offering into a community

Connection/relation surface:

- may foreground the connection itself because the connection is the reason the object is being shown
- should still include enough object identity to avoid disorientation
- should show what the connection changes or makes possible

## 3. Connections Support The Current Task

Connections should support the user's current task. In many public object pages, that means appearing after the object itself is legible. In embedded, steward-facing, recommendation, creator-fit, or relation-review contexts, the connection may be the reason the object is being shown.

A connection panel or surface should answer:

- what is this connected to?
- why does that connection matter here?
- is the connection accepted, suggested, or calculated?
- what can I do because this connection exists?

It should not require the user to understand the app's relation model. The UI should describe the meaning of the connection, not expose the data structure.

Concrete examples:

- A public event page should usually foreground time, place, host/facilitator, access, expectations, and attendance.
- An event embedded inside a community steward's "Suggestions to review" surface may foreground shared tags, why it may be relevant to that community, review state, and what accepting it would do.
- A community page for a new participant should usually foreground identity, rhythm, norms, and ways in.
- A community page for a steward may foreground suggested connections, unresolved entry issues, participation patterns, or contextual management actions.
- A venue page for a participant should usually foreground location and what happens there.
- A venue shown inside an event page may only need practical location, atmosphere, and "other things here."
- A person/facilitator page should foreground public role, offerings, and appropriate access.
- A person object embedded inside a steward/debug/review surface should be treated with extra privacy care.

## 4. Steward Review Is Role-Gated And Contained

Do not show steward review queues on ordinary event or community pages unless the current user has steward, manager, host, or creator responsibility for the relevant object.

For non-stewards:

- show status such as "waiting for review" only where relevant
- do not show review actions
- avoid making review mechanics feel like part of ordinary browsing

For stewards:

- use a contained workspace or management panel
- prefer labels like "Suggestions to review" or "Suggested connections"
- avoid "Review queue" as unexplained UI language
- make clear what accepting, refining, redirecting, declining, or keeping as a pattern does

A steward review action should explain its consequence:

- Accepted: this connection becomes visible in relevant context surfaces.
- Refined: this connection is adjusted before becoming visible.
- Redirected: this belongs somewhere else.
- Declined: this should not be shown as a connection.
- Keep as pattern only: this can remain a calculated pattern without becoming community-endorsed.

## 5. Ways In Must Be Grouped By Target Object

Do not mix actions that act on different objects in one flat list.

Bad:

- Attend event
- Mark interested
- Follow community
- Request access

Better:

For this event:

- Attend
- Mark interested
- Ask facilitator

For Contact Improvisation Aarhus:

- Follow community
- See beginner events
- Ask a steward

For this venue:

- See other events here

Every action should make clear what it acts on. If clicking "Follow community", the UI must show which community.

## 6. Ways-In Language Should Be Concrete

Avoid heavy explanatory empty states such as:

> No clear next step yet. Connections that are accepted or found as patterns can make first steps clearer.

Prefer:

- "No first step is shown yet."
- "A community steward may need to review this connection first."
- Or hide the section until there is something useful to show.

Do not burden the user with explanations they cannot act on. Use tooltips, inline info, or expandable help for design explanations.

## 7. Use Visual Identifiers For Recurring Connection Types

Important connection concepts should not rely only on plain text.

Future mockups should visually distinguish:

- Good first step
- Soft landing
- Bridge
- Pattern found
- Waiting for review
- Private or steward-visible connection
- Deeper pathway

The exact visual system is open. The principle is that users should recognize the type of connection at a glance before reading every card.

## 8. Use Progressive Disclosure And Tooltips Liberally During Design

Explanations are useful while designing because they reveal intended meaning, but they should not overload the main UI.

Use:

- hover tooltips
- info icons
- expandable explanation areas
- dev/design notes in separated panels

Especially for:

- why a connection appears
- what accepting a suggestion does
- why a first step is unavailable
- what visibility means
- why a generated pattern is not a community

## 9. "Suggest Connection" Should Become Context-Specific In UI

"Suggest connection" can remain the generic product concept, but the visible label should often depend on the object being viewed and the surface where the action appears.

Event page:

- Suggest related community
- Suggest where this belongs
- Add context

Community page:

- Suggest related event
- Suggest related community
- Suggest a way in

Venue page:

- Suggest community here
- Suggest event here

Creator-fit surface:

- Suggest to this community
- Ask a steward to review fit
- Add context for review

Person/facilitator page:

- Use much more care. Person-related suggestions should be constrained by privacy and consent.

The suggestion drawer should not show one huge universal list of target objects and connection types. It should be filtered by the current source object, surrounding context, likely user intent, and privacy constraints.

## 10. Relation Types Must Be Constrained By Source/Target Pair

Do not show generic relation kinds for every object pair.

Event to community:

- Good first step for
- Belongs with
- Soft landing after
- Deeper pathway into

Venue to community:

- Meets here
- Common venue
- Hosted here

Community to community:

- Related community
- Bridge into
- Shared practice
- Soft landing for

Event to event:

- Before this
- After this
- Good preparation for
- Integration after

Person to community:

- Should usually be self-declared, steward-visible, or derived from actual participation, not broadly suggested by unrelated users.

Person to person:

- Should not be broadly suggested by other users in early product design. This is privacy-sensitive and can easily become socially invasive.

## 11. Temporal Direction Matters

Some connections are directional in time.

Represent separately:

- Before / preparation
- During / belongs with
- After / integration or soft landing
- Ongoing / community pathway
- Adjacent / related context

Example: Post-Dance Harbor Tea is not merely "related to" Ecstatic Dance. It may be an after-event soft landing or integration context. The UI should make this direction clear.

## 12. Different Surface Grammars Need Different Layouts

Event pages, community pages, venue pages, person/facilitator pages, embedded cards, recommendation panels, steward workspaces, and creator-fit surfaces should not all use the same layout with different data.

Default public event page grammar:

- event basics
- attending/access/expectations
- host/facilitator
- related community context
- ways in

Default public community page grammar:

- community identity and rhythm
- ways in / beginner entry
- norms and access
- events and related contexts
- stewarded suggestions only where relevant to the current user

Default public venue page grammar:

- location and practical setting
- communities/events that meet here
- patterns around the place

Default public person/facilitator page grammar:

- public role and offerings
- communities/events they hold or contribute to
- privacy-aware relations only

Steward surface grammar:

- review state and consequences
- suggested connections
- unresolved entry or context issues
- relevant object identity
- contained actions

Recommendation surface grammar:

- why this appears
- compact object identity
- available next step
- optional explanation

Creator-fit surface grammar:

- fit evidence
- possible destination communities
- audience/venue/context overlap
- suggestion action and review expectation

## 13. "Ask Community" / "Ask Facilitator" As Future Expansion

Future expansion: a user who is interested but uncertain should be able to ask a facilitator, steward, or beginner/interested-channel a question before joining.

Possible labels:

- Ask facilitator
- Ask a community steward
- Ask before joining
- Question from someone new

This supports trust, threshold, and context uncertainty without requiring the user to fully interpret the app.

## 14. Suggested Connections Should Not Feel Like Marketing, Tagging, Or Ownership

Suggestion flows should make clear:

- a suggestion is not automatic publication
- a suggestion does not mean the community owns the event
- a suggestion does not mean the event is recommended to everyone
- a suggestion may be reviewed, refined, redirected, declined, or kept as a pattern

Suggestion should feel like contextual clarification, not promotion, tagging, claiming, or social pressure.
