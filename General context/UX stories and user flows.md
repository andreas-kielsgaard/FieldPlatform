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
9. User can click an event, attend, mark interested, or suggest it to a group.

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

Entry features:

- Event page.
- Event recommendation card.
- Suggest event relevance action.

Flow:

1. User sees an event recommendation or opens an event page.
2. User clicks suggest to group.
3. The app lets the user choose a group/community.
4. The app creates a suggested event share.
5. The suggestion appears in the relevant community management/steward queue.
6. A manager or steward can feature, ignore, or review the suggestion.

Data and calculations:

- Pulls event data from event object.
- Pulls group data from group object.
- Creates suggested event share object.
- May later affect event relevance and community event lists if featured.

Outcome:

- Relevance can be socially proposed without granting automatic ownership or authority.

## Story 6: I Want To Create An Event

Intent:

- The user wants to create an offering and understand where it fits before publishing or suggesting it outward.

Entry features:

- Create event button or event creation feature.
- Draft offering form.
- Group and generated field fit panel.

Flow:

1. User opens event creation.
2. User enters title, host/facilitator, venue, access level, price/access note, tags, intended audience, and beginner-friendliness.
3. As the draft changes, the app recalculates suggested groups and generated fields.
4. The fit panel shows reasons such as tag overlap, venue fit, host/facilitator history, adjacent events, access level, beginner-friendliness, and participant overlap.
5. User can create the event.
6. User can suggest the draft to selected groups.
7. Suggested events enter community management/steward queues rather than automatically becoming community-owned.
8. After creation, the user gains contextual event management features for that event.

Data and calculations:

- Creates or updates event object.
- Uses group fit and field fit calculations.
- Uses creator/host relationship and historical event data.
- Creates suggested event share objects when suggestions are sent.

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
5. User can review suggested relevance, linked groups, and aggregate participant origins if available.
6. User can suggest the event to additional groups or update existing suggestions.

Data and calculations:

- Pulls permissions from created/managed event relationship.
- Updates event object.
- Uses creator/event recommendation logic.
- Uses aggregate participation origin signals where available.

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
7. User reviews suggested event shares and can feature events as relevant.
8. User marks formal relationships to other groups.
9. The app recalculates participant recommendations and field signals where relevant.

Data and calculations:

- Pulls community data from group/community object.
- Pulls participation edges as aggregate signals.
- Pulls membership requests and suggested event shares.
- Uses bonding, bridging, dropoff, dormant/reactivating, distribution, overlap, and generated field calculations.

Outcome:

- Community management exposes aggregate patterns, opportunities, and governance choices without becoming roster-first surveillance.

## Story 10: I Want To Inspect The Data Model

Intent:

- A designer or developer wants to inspect assumptions, raw records, computed outputs, and formulas.

Entry features:

- Dev-only Data Model Explorer.

Flow:

1. Designer/developer opens the dev tool.
2. They switch between people, groups, edges, events, venues, fields, relationships, relevance scores, and formulas.
3. They inspect raw records and computed outputs.
4. They compare formulas with visible product behavior.
5. They adjust the model or mockup when the representation is conceptually wrong.

Data and calculations:

- Pulls all prototype data objects.
- Shows formula explanations and calculated outputs.

Outcome:

- The prototype remains discussable and changeable.

