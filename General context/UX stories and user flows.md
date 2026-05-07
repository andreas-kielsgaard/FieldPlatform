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
- Suggest event relevance or suggest context action.

Flow:

1. User sees an event recommendation or opens an event page.
2. User clicks suggest context or suggest to group.
3. The app lets the user choose a group/community.
4. The app creates a suggested event share, or in the broader target a suggested event-to-community FieldRelation.
5. The suggestion appears in the relevant community management/steward queue.
6. A manager or steward can accept, refine, decline, redirect, feature, ignore, or hold the suggestion.
7. If accepted, the relation may change event visibility, community event placement, recommendation explanations, and available pathways.

Data and calculations:

- Pulls event data from event object.
- Pulls group data from group object.
- Creates suggested event share object in the current implementation.
- Broader target creates FieldRelation with source/target, relation kind, provenance, review state, evidence, hold types, visibility, and movementUnlocked.
- May later affect event relevance, community event lists, relation panels, and pathways if accepted or featured.

Outcome:

- Relevance can be socially proposed without granting automatic ownership, publication, or authority.

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
7. Suggested events enter community management/steward relation queues rather than automatically becoming community-owned.
8. After creation, the user gains contextual event management features for that event.

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

- Suggest connection / suggest context action.
- Event, community, venue, creator/facilitator, generated field, festival, practice/tag, or profile pages.
- Relation panels.

Flow:

1. User is viewing an object such as an event, venue, creator, generated field, or community.
2. User clicks suggest context.
3. The app asks what context the object may belong with, constrained by privacy, consent, and available object types.
4. User selects a target context and may add a short reason.
5. The app creates a suggested FieldRelation with provenance user-suggested, evidence/reasons, visibility, and reviewAuthority.
6. The suggestion appears as pending or held, not as accepted truth.
7. If the relation needs steward confirmation, the app names the stewardship hold.

Data and calculations:

- Pulls source and target object records.
- Creates FieldRelation or a compatible suggested relation object.
- Stores relationKind, relationStrength if known, status, provenance, suggestedBy, visibility, evidence/reasons, relatedHoldTypes, and movementUnlocked if available.

Outcome:

- Distributed perception becomes easy and respectful: a user can say "this belongs near that" without forcing visibility, ownership, or action.

## Story 11: I Want To Review Suggested Relations

Intent:

- A steward wants to review sensed or calculated relations involving a context they are responsible for.

Entry features:

- Stewardship queue.
- Community management controls.
- Relation panels from object pages.

Flow:

1. Steward opens the relation queue for a community, event, venue, festival, or other stewarded context.
2. The queue shows suggested FieldRelations with source, target, relation kind, provenance, evidence, hold types, visibility, and movement that acceptance would unlock.
3. Steward filters by status or hold type, such as stewardship, boundary, capacity, context, or language hold.
4. Steward accepts, refines, declines, redirects, or keeps the relation dormant/held.
5. Accepted relations update relevant pages, recommendation explanations, relation panels, and pathway suggestions.
6. Refined or redirected relations preserve provenance and review history.

Data and calculations:

- Pulls FieldRelation records where reviewAuthority or stewardedBy matches the stewarded context.
- Uses relation status: suggested, steward-reviewed, accepted, refined, declined, dormant.
- Uses provenance: user-suggested, steward-marked, creator-marked, calculated, imported.
- Uses visibility, hold taxonomy, evidence/reasons, and movementUnlocked.

Outcome:

- Stewardship confirms or redirects distributed perception without becoming surveillance or CRM.

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
3. The app shows movementUnlocked as pathways such as attend beginner event, follow lightly, request access, ask steward, volunteer, join recurring practice, suggest related community, reactivate dormant edge, create bridge event, or mark relationship between communities.
4. Unavailable movements explain the relevant hold rather than disappearing silently.
5. User chooses an available pathway, or leaves the relation as context for later.

Data and calculations:

- Pulls FieldRelation data, ParticipationEdge data where relevant, recommendation evidence, access rules, visibility settings, and hold types.
- Uses pathway logic to decide which actions are visible, available, held, or steward-reviewed.

Outcome:

- Relations become actionable orientation without pushing every user toward the same depth of participation.

## Story 13: I Want To Inspect The Data Model

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
