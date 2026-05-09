# Object Page And Connection UX Principles

Mockup 5 confirmed that FieldRelation is useful as a data/domain primitive, but it should not become the primary UI object. The user's primary object is the thing they are viewing: event, community, venue, person/facilitator, generated pattern, or festival.

Connections should help explain context and available movement after the object itself is understood.

## 1. Object Pages Lead With The Object's Native Purpose

Connections and context are important, but they are secondary to the native page hierarchy.

For an event, the user first needs:

- what is this event?
- when is it?
- where is it?
- who holds or facilitates it?
- can I attend?
- what should I expect?
- what level of experience or access is needed?

For a community, the user first needs:

- what is this community?
- who is it for?
- how does it meet?
- what are the norms?
- how do I enter?
- what are the beginner-friendly or low-threshold options?

For a venue, the user first needs:

- where is this?
- what happens here?
- what kinds of communities or events use it?
- what practical expectations matter?

For a person/facilitator, the user first needs:

- who is this?
- what do they offer or hold?
- what public context are they connected through?
- what contact or access is appropriate?

Connections should support orientation. They should not replace the native page hierarchy.

## 2. Connections Are Context Support, Not The Whole Page

A connection panel should answer:

- what is this connected to?
- why does that connection matter?
- is the connection accepted, suggested, or calculated?
- what can I do because this connection exists?

It should not require the user to understand the app's relation model. The UI should describe the meaning of the connection, not expose the data structure.

## 3. Steward Review Is Role-Gated And Contained

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

## 4. Ways In Must Be Grouped By Target Object

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

## 5. Ways-In Language Should Be Concrete

Avoid heavy explanatory empty states such as:

> No clear next step yet. Connections that are accepted or found as patterns can make first steps clearer.

Prefer:

- "No first step is shown yet."
- "A community steward may need to review this connection first."
- Or hide the section until there is something useful to show.

Do not burden the user with explanations they cannot act on. Use tooltips, inline info, or expandable help for design explanations.

## 6. Use Visual Identifiers For Recurring Connection Types

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

## 7. Use Progressive Disclosure And Tooltips Liberally During Design

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

## 8. "Suggest Connection" Should Become Context-Specific In UI

"Suggest connection" can remain the generic product concept, but the visible label should often depend on the object being viewed.

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

Person/facilitator page:

- Use much more care. Person-related suggestions should be constrained by privacy and consent.

The suggestion drawer should not show one huge universal list of target objects and connection types. It should be filtered by the current source object and likely user intent.

## 9. Relation Types Must Be Constrained By Source/Target Pair

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

## 10. Temporal Direction Matters

Some connections are directional in time.

Represent separately:

- Before / preparation
- During / belongs with
- After / integration or soft landing
- Ongoing / community pathway
- Adjacent / related context

Example: Post-Dance Harbor Tea is not merely "related to" Ecstatic Dance. It may be an after-event soft landing or integration context. The UI should make this direction clear.

## 11. Different Object Types Need Different Page Grammars

Event pages, community pages, venue pages, and person/facilitator pages should not all use the same layout with different data.

Event page grammar:

- event basics first
- attending/access/expectations
- host/facilitator
- related community context
- ways in

Community page grammar:

- community identity and rhythm first
- ways in / beginner entry
- norms and access
- events and related contexts
- stewarded suggestions only where relevant

Venue page grammar:

- location and practical setting first
- communities/events that meet here
- patterns around the place

Person/facilitator page grammar:

- public role and offerings first
- communities/events they hold or contribute to
- privacy-aware relations only

## 12. "Ask Community" / "Ask Facilitator" As Future Expansion

Future expansion: a user who is interested but uncertain should be able to ask a facilitator, steward, or beginner/interested-channel a question before joining.

Possible labels:

- Ask facilitator
- Ask a community steward
- Ask before joining
- Question from someone new

This supports trust, threshold, and context uncertainty without requiring the user to fully interpret the app.

## 13. Suggested Connections Should Not Feel Like Marketing, Tagging, Or Ownership

Suggestion flows should make clear:

- a suggestion is not automatic publication
- a suggestion does not mean the community owns the event
- a suggestion does not mean the event is recommended to everyone
- a suggestion may be reviewed, refined, redirected, declined, or kept as a pattern

Suggestion should feel like contextual clarification, not promotion, tagging, claiming, or social pressure.
