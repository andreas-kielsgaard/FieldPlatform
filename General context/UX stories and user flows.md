# UX Stories And User Flows

A UX story represents something a user wants to do. It is not just a screen sequence. It describes how the app helps the user accomplish an intention by connecting features, data, pages, panels, controls, and contextual permissions.

UX stories should answer:

- What does the user want to do?
- Which feature starts the flow?
- Which data is shown or calculated?
- Which actions are available where and when?
- Where does each click take the user?
- How are UI elements arranged so the flow is intuitive?
- What outcome should the user understand or accomplish?

When a story names actual labels, buttons, cards, empty states, or help text, use the UI register in [Language and copy register](Language%20and%20copy%20register.md). Product and data-model terms may appear in Data and calculations sections, but screen copy should favor ordinary wording such as "Suggest connection", "Ways in", "First step", "Waiting for review", and "Why am I seeing this?"

Surfaces should also make viewer stance and semantic dimensions explicit. A story should identify whether the person is browsing as a participant, managing as a host/facilitator, reviewing as a steward, or seeing an embedded/recommendation surface. Event facts, access, cost, audience, experience needed, relation type, review state, visibility, evidence, and action target should not be treated as one interchangeable label group.

## Story 1: I Want To Orient To What Is Already Live

Intent:

- The user wants to understand what is happening soon and how each event relates to their current participation.

Entry features:

- Primary navigation to My Orientation.
- Event recommendation panels.
- Upcoming events by relevance.

Flow:

1. User opens My Orientation.
2. The app shows events in layers from strongest commitment to expansion edge.
3. The first layer shows events the user is actively helping hold.
4. The next layer shows events where the user has committed to participate.
5. The next layer shows events in member, trusted, or core communities.
6. The next layer shows events from followed or lightly tracked communities.
7. The expansion layer shows adjacent events based on overlap with interests, communities, venues, tags, and low-threshold access.
8. Each event shows why it appears.
9. User can click an event, attend, mark interested, or suggest that it belongs in a context.

Data and calculations:

- Pulls event data from event objects.
- Pulls current relationships from participation edges.
- Uses event relevance calculation.
- Uses access, tag, group, venue, and creator/host signals where available.

Outcome:

- The user understands the difference between current commitment, clear relevance, and expansion edge.

## Story 2: I Want To Understand My Relationship To Groups

Intent:

- The user wants to understand where they belong lightly, formally, deeply, or dormantly.

Entry features:

- My relationships to groups.
- Personal relationship panels.
- Community pages.

Flow:

1. User opens My relationships to groups.
2. Groups are separated into followed/observing, explicit membership/access, explicit commitment/contribution, and dormant/muted.
3. Each group shows participation strength, shared exposure, access state, relationship state, role modes, and visibility.
4. Each group explains why it is represented that way.
5. User clicks a group to open the community page.
6. User can follow, request membership, attend an event, volunteer, commit, become dormant, or reactivate where appropriate.

Data and calculations:

- Pulls group data from group objects.
- Pulls relationship data from participation edges.
- Uses engagement strength and shared exposure calculations.

Outcome:

- Belonging becomes legible without being flattened into a single membership label.

## Story 3: I Want To Explore How To Participate In A Community

Intent:

- The user wants to understand a community before choosing how deeply to engage.

Entry features:

- Community page.
- Explore how to participate button.
- Community links from events, fields, recommendations, and relationship cards.

Flow:

1. User selects a community from navigation, a relationship card, an event, or a generated field.
2. The community page explains the community's own description, rhythm, norms, access rules, venues, and entry guidance.
3. The page shows the user's personal relationship to that community.
4. The page separates bridge participation events from deeper connection events.
5. The page shows adjacent communities, shared tags, shared venues, and participation overlap.
6. User chooses a way in: follow lightly, request membership, attend an event, volunteer, commit or serve, become dormant, or reactivate.

Data and calculations:

- Pulls community data from group/community object.
- Pulls user relationship from participation edge.
- Pulls events from event objects linked or relevant to the community.
- Uses group overlap, shared exposure, and event sorting logic.

Outcome:

- The user can move at an appropriate depth rather than being pushed into a generic RSVP.

## Story 4: I Want To Explore A Generated Field

Intent:

- The user wants to understand a computed pattern without mistaking it for a represented community.

Entry features:

- Generated field page.
- Emergent fields around me.
- Field links from community pages, event pages, and recommendations.

Flow:

1. User selects an emergent field.
2. The app opens a generated field page with a less authored, evidence-based presentation.
3. The page explains what pattern is being captured.
4. The page shows why the field exists: shared tags, venues, rhythm, overlap, or participation patterns.
5. The page shows named communities inside the field.
6. The page shows bridge events and deeper events.
7. User can click into specific communities or events inside the field.

Data and calculations:

- Pulls generated field data from field calculation logic.
- Pulls communities, events, tags, venues, and aggregate participation edges as evidence.

Outcome:

- Computed relevance can be useful without pretending to be a formal social container.

## Story 5: I Want To Suggest That An Event Is Relevant To A Community

Intent:

- The user sees an event and wants to propose that it may matter to a community.
- This is the first implementation slice of the broader gesture: "I sense that this belongs in this context."

Entry features:

- Event page.
- Event recommendation card.
- Suggest related community, suggest where this belongs, or add context action.

Flow:

1. User sees an event recommendation or opens an event page.
2. If the user is on a default public event page, the page makes the viewer stance legible: the user is browsing as a curious participant.
3. The page makes the event legible: title, time, place, host/facilitator, access, cost, who it is for, experience needed, entry support, practical expectations, concrete requirements, and whether the user can attend.
4. If the event is shown inside a recommendation, creator-fit, or steward review surface, the card may foreground why it appears in that context while keeping enough event identity visible.
5. The user clicks a contextual action such as "Suggest related community" or "Suggest where this belongs."
6. The app lets the user choose from a filtered list of likely communities rather than a universal object list.
7. The app asks for a short reason and makes clear that the suggestion is not automatic publication, ownership, or recommendation to everyone.
8. The app creates a suggested event share, or in the broader target a suggested event-to-community FieldRelation.
9. The suggestion appears in the relevant community management/steward surface as a suggestion to review.
10. A manager or steward can accept, refine, decline, redirect, feature, ignore, or hold the suggestion.
11. If accepted, the relation may change event visibility, community event placement, recommendation explanations, and available pathways.

Data and calculations:

- Pulls event data from event object.
- Pulls group data from group object.
- Creates suggested event share object in the current implementation.
- Broader target creates FieldRelation with source/target, relation kind, provenance, review state, evidence, hold types, visibility, and movementUnlocked.
- May later affect event relevance, community event lists, relation panels, and pathways if accepted or featured.

Outcome:

- Relevance can be socially proposed without granting automatic ownership, publication, or authority.
- Default public browsing remains event-legible; embedded and steward-facing surfaces may foreground the reason the event is being shown.

## Story 6: I Want To Create An Event

Intent:

- The user wants to create an offering and understand where it fits before publishing or suggesting it outward.

Entry features:

- Create event button or event creation feature.
- Draft offering form.
- Group and generated field fit panel.

Flow:

1. User opens event creation.
2. User enters title, host/facilitator, venue, access level, cost, tags, intended audience, experience needed, entry support, and practical expectations.
3. The app helps the host clarify whether newcomers are welcome, whether there is a softer entry point, whether another event is a better first step, and what first-timers should know.
4. As the draft changes, the app recalculates suggested groups and generated fields.
5. The fit panel shows reasons such as tag overlap, venue fit, host/facilitator history, adjacent events, access level, beginner-friendliness, and participant overlap.
6. User can create the event.
7. User can suggest the draft to selected groups.
8. Suggested events enter community management/steward relation queues rather than automatically becoming community-owned.
9. After creation, the user gains contextual event management features for that event.

Data and calculations:

- Creates or updates event object.
- Uses group fit and field fit calculations.
- Uses creator/host relationship and historical event data.
- Creates suggested event share objects when suggestions are sent in the first implementation.
- Broader target creates FieldRelations between event, creator, communities, venues, generated fields, festivals, or practices with provenance and hold explanations.

Outcome:

- The user learns where the offering may belong before publishing or pushing it outward.

## Story 7: I Want To Manage An Event I Created Or Hold

Intent:

- The user wants to manage an event they created, host, cohost, facilitate, or volunteer for.

Entry features:

- Event page.
- My managed events.
- Event management controls visible only when contextually relevant.

Flow:

1. User opens an event they manage.
2. The event page shows management controls in addition to normal participant actions.
3. User can edit event details, access level, tags, venue, intended audience, and beginner-friendliness.
4. The app recalculates group and field fit when meaningful details change.
5. User can review suggested relations, linked groups, relation evidence, hold explanations, and aggregate participant origins if available.
6. User can suggest the event to additional groups or contexts, or update existing suggestions.

Data and calculations:

- Pulls permissions from created/managed event relationship.
- Updates event object.
- Uses creator/event recommendation logic.
- Uses aggregate participation origin signals where available.
- Uses FieldRelation review state and provenance where relation suggestions exist.

Outcome:

- Event management is available as a contextual capability without creating a separate base app for creators.

## Story 8: I Want To Create A Community

Intent:

- The user wants to create a named community container rather than only participate in existing communities or generated fields.

Entry features:

- Create community button or community creation feature.
- Community setup flow.

Flow:

1. User opens community creation.
2. User enters name, description, tags, rhythm, venues, norms, access rules, and entry guidance.
3. User names initial stewards or managers, including themself where appropriate.
4. The app may show overlap with existing communities and generated fields to avoid accidental duplication or to suggest relationships.
5. User creates the community.
6. After creation, the user gains contextual community management features.

Data and calculations:

- Creates group/community object.
- Creates initial manager/steward relationship.
- May create initial participation edge.
- Uses group overlap and generated field calculations for context.

Outcome:

- The user can intentionally create a represented community container, distinct from generated fields.

## Story 9: I Want To Manage My Community

Intent:

- The user wants to steward or manage a community through aggregate signals and governance controls.

Entry features:

- Community page.
- Community management controls.
- Community health overview.
- Membership and suggestion queues.

Flow:

1. User opens a community they created, steward, or manage.
2. The page shows normal community information plus management controls.
3. User reviews community health through aggregate signals: bonding, bridging, newcomer dropoff, dormant/reactivating edges, and participation distribution.
4. User reviews adjacent groups and generated fields involving the community.
5. User edits entry guidance, norms, access rules, or group state.
6. User approves or declines membership requests.
7. User reviews suggested FieldRelations, including suggested event shares, and can accept, refine, decline, redirect, feature, or hold them.
8. User marks formal relationships to other groups or broader relations to events, venues, generated fields, festivals, creators, or practices.
9. The app recalculates participant recommendations, relation panels, field signals, and pathways where relevant.

Data and calculations:

- Pulls community data from group/community object.
- Pulls participation edges as aggregate signals.
- Pulls membership requests, suggested event shares, and broader FieldRelation records.
- Uses bonding, bridging, dropoff, dormant/reactivating, distribution, overlap, and generated field calculations.
- Uses hold taxonomy, relation provenance, review state, visibility, and movementUnlocked.

Outcome:

- Community management exposes aggregate patterns, opportunities, and governance choices without becoming roster-first surveillance.

## Story 10: I Sense This Belongs In This Context

Intent:

- The user notices a relation that the platform does not yet make visible.
- The user wants to contribute a small act of contextual clarification without claiming authority.

Entry features:

- Context-specific suggestion action such as Suggest related community, Add context, Suggest related event, Suggest a way in, Suggest community here, or Suggest event here.
- Event, community, venue, creator/facilitator, generated field, festival, practice/tag, or profile pages.
- Relation panels.

Flow:

1. User is viewing an object such as an event, venue, creator, generated field, or community.
2. The surface preserves enough native identity to show what the object is, such as event basics, community entry guidance, venue practical context, or facilitator public offerings.
3. The surface priority depends on role and context: a full public page may emphasize native orientation, while a steward, recommendation, creator-fit, or embedded surface may emphasize why this object appears here.
4. User clicks a context-specific suggestion action.
5. The app asks what likely context the object may belong with, constrained by object type, privacy, consent, and source/target pair.
6. User selects a target context from a filtered list and may add a short reason.
7. The app creates a suggested FieldRelation with provenance user-suggested, evidence/reasons, visibility, and reviewAuthority.
8. The suggestion appears as waiting for review or held, not as accepted truth.
9. If the relation needs steward confirmation, the UI uses ordinary wording such as "waiting for a community steward to review."

Data and calculations:

- Pulls source and target object records.
- Creates FieldRelation through the shared Platform data layer, or a compatible suggested relation object that is mirrored into FieldRelation.
- Stores relationKind, relationStrength if known, status, provenance, suggestedBy, visibility, evidence/reasons, relatedHoldTypes, and movementUnlocked if available.

Outcome:

- Distributed perception becomes easy and respectful: a user can say "this belongs near that" without forcing visibility, ownership, or action.
- Suggestions feel like contextual clarification, not tagging, marketing, claiming, or social pressure.

## Story 11: I Want To Review Suggested Relations

Intent:

- A steward wants to review sensed or calculated relations involving a context they are responsible for.

Entry features:

- Suggestions to review.
- Community management controls.
- Steward/manager workspace or management panel.

Flow:

1. Steward opens a contained community care surface, with the viewer stance clear: reviewing on behalf of a community they steward.
2. The workspace shows suggested connections with enough native object identity to avoid disorientation.
3. The workspace separates connection type, review state, visibility, evidence/source, and possible actions.
4. The steward sees compact evidence: why this is suggested, who suggested it, suggester/community relation where privacy allows, who hosts/facilitates it, host/community relation, shared tags or practices, shared venue, shared audience, shared participation, likely benefit or risk, and what becomes visible if accepted.
5. Steward filters by status or by target-anchored unclear point, such as community endorsement not confirmed, newcomer welcome unclear, or capacity needing review.
6. Steward accepts, refines, declines, redirects, or keeps the relation as a calculated pattern.
7. Each action explains its consequence before or immediately after it happens: accepted becomes visible in relevant context surfaces; refined is adjusted before becoming visible; redirected belongs somewhere else; declined should not be shown as a connection; kept as pattern only remains calculated without community endorsement.
8. Recently decided items remain inspectable enough that the steward can see what was accepted and why.
9. Accepted relations update relevant pages, recommendation explanations, relation panels, and pathway suggestions for that specific relation.
10. Acceptance by one community does not automatically create endorsement by another community. It may increase evidence, create a new suggestion, or appear as a calculated pattern elsewhere.

Data and calculations:

- Pulls FieldRelation records from `platform.fieldRelations` where reviewAuthority or stewardedBy matches the stewarded context.
- Uses relation status: suggested, steward-reviewed, accepted, refined, declined, dormant.
- Uses provenance: user-suggested, steward-marked, creator-marked, calculated, imported.
- Uses visibility, hold taxonomy, evidence/reasons, and movementUnlocked.

Outcome:

- Stewardship confirms or redirects distributed perception without becoming surveillance or CRM.
- Ordinary users do not see review actions unless they have the relevant steward, manager, host, or creator responsibility.

## Story 12: I Want To Understand What Movement A Relation Makes Possible

Intent:

- The user sees a relation and wants to know what they can appropriately do next.

Entry features:

- Relation panel.
- Recommendation explanation.
- Community page, event page, generated field page, or orientation next steps.

Flow:

1. User opens a relation panel or expands a recommendation explanation.
2. The app shows why the relation appears, whether it is suggested or accepted, who or what proposed it, and what holds may still apply.
3. The app groups available actions by the object they act on rather than mixing them in one flat list.
4. For the current event, the user may see actions such as Attend, Mark interested, or Ask facilitator.
5. If the current event is not the best first step, the page may show a prerequisite path such as an intro/open class before the deeper event.
6. For a related community, the user may see actions such as Follow community, See beginner events, Request access, or Ask a steward.
7. For a related venue, the user may see actions such as See other events here.
8. Human paths such as Ask facilitator, Ask a community steward, or Ask before joining may appear as future expansion when trust, threshold, or context uncertainty is high.
9. Unavailable movements explain the relevant unclear point through target-anchored copy, tooltip, or expandable help rather than heavy always-visible text.
10. User chooses an available pathway, or leaves the relation as context for later.

Data and calculations:

- Pulls FieldRelation data, ParticipationEdge data where relevant, recommendation evidence, access rules, visibility settings, and hold types.
- Uses shared data-layer pathway logic to decide which domain-level MovementType values are visible, available, held, or steward-reviewed. UI labels should translate those values into ordinary language such as "Ways in" and "First step".

Outcome:

- Relations become actionable orientation without pushing every user toward the same depth of participation.
- The user knows what each action acts on.

## Story 13: I Want The Surface To Match Why This Object Is Being Shown

Intent:

- The user sees an event, community, venue, person/facilitator, generated pattern, or festival in a specific surface and wants to understand both what it is and why it is being shown here.

Entry features:

- Event page.
- Community page.
- Venue page.
- Person/facilitator page.
- Generated pattern page.
- Embedded object card.
- Recommendation panel.
- Steward/management surface.
- Creator-fit surface.
- Connection/relation surface.

Flow:

1. User sees an object in a full page, embedded card, recommendation panel, steward workspace, creator-fit surface, or connection/relation surface.
2. The surface preserves enough native identity that the user can recognize the object.
3. Object type provides default affordances: events need event basics, communities need identity/rhythm/entry cues, venues need practical place context, and people/facilitators need public role and appropriate access.
4. User role, entry point, surrounding context, and surface type determine what is emphasized first.
5. A public participant page may emphasize native orientation before relation context.
6. A steward surface may emphasize suggested connections, unresolved entry issues, review consequences, or governance actions.
7. A recommendation panel may emphasize why this appears and the available next step.
8. A creator-fit surface may emphasize fit evidence, possible destination communities, audience overlap, venue/context fit, and suggestion actions.
9. A connection surface may foreground the connection itself while preserving enough source and target identity.
10. Review actions appear only for users with relevant responsibility.

Data and calculations:

- Pulls the native object record.
- Pulls FieldRelations, ParticipationEdges, generated patterns, and recommendations as supporting context.
- Uses shared data-layer movement logic to build grouped ways-in actions.

Outcome:

- The user understands what the object is and why this surface is emphasizing this object now.

## Story 13A: I Need The Page To Separate Similar-Looking Meanings

Intent:

- The user sees event facts, labels, badges, and actions and wants to understand what each one means without interpreting the data model.

Entry features:

- Public event page.
- Recommendation panel.
- Steward review surface.
- Relation panel.

Flow:

1. The surface states or implies viewer stance clearly.
2. Event facts are separated into access, cost, audience, experience needed, entry support, practical expectations, and requirements.
3. Connection type is shown separately from review state.
4. Review state is shown separately from visibility.
5. Visibility is shown separately from evidence/source.
6. Evidence/source is shown with concrete reasons such as suggested by a person, shared venue, shared tags, or calculated pattern.
7. Actions are grouped by the object they act on.
8. Any "what may be unclear" copy names the target and action, rather than exposing a generic hold.

Data and calculations:

- Pulls event facts, FieldRelation state, visibility, provenance, evidence, hold types, and movement options from shared models where available.
- Future data-layer work may need more separated event fact fields and more explicit action-target metadata.

Outcome:

- The user understands event facts, relation meaning, review state, visibility, evidence, and action target without having to infer those dimensions from one mixed badge row.

## Story 14: I Want To Ask Before Joining

Intent:

- The user is interested but uncertain and wants to ask a facilitator, steward, or beginner/interested channel a question before attending or requesting access.

Entry features:

- Event page.
- Community page.
- Ways in panel.
- Related community context.

Flow:

1. User sees an event or community that may fit but still has trust, threshold, or context uncertainty.
2. The page offers a future pathway such as "Ask facilitator", "Ask a community steward", "Ask before joining", or "Question from someone new" when appropriate.
3. The user sends a bounded question without being forced into attendance, membership, or deeper participation.
4. The question reaches an appropriate role or channel, not a broad public audience.

Data and calculations:

- Uses event host/facilitator, community steward, access, visibility, and relation context to decide whether this pathway is available.
- This is future expansion space, not an immediate implementation requirement.

Outcome:

- The user can reduce uncertainty without having to interpret the app's relation model or prematurely deepen participation.

## Story 15: I Want To Inspect The Data Model

Intent:

- A designer or developer wants to inspect assumptions, raw records, computed outputs, and formulas.

Entry features:

- Dev-only Data Model Explorer.

Flow:

1. Designer/developer opens the dev tool.
2. They switch between people, groups, participation edges, events, venues, fields, FieldRelations, suggested relations, holds, pathways, relevance scores, and formulas.
3. They inspect raw records and computed outputs.
4. They compare formulas with visible product behavior.
5. They adjust the model or mockup when the representation is conceptually wrong.

Data and calculations:

- Pulls all prototype data objects.
- Shows formula explanations and calculated outputs.
- Shows relation provenance, review state, hold taxonomy, movementUnlocked, and suggestion evidence.

Outcome:

- The prototype remains discussable and changeable.
