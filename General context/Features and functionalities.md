# Features And Functionalities

Features are concrete things the app can do from a user perspective. They should be identifiable parts of the platform that a user can navigate to or act through, such as navigation panes, overview UI, object pages, panels, drawers, tabs, controls, and feature-specific flows.

Participant, creator, steward, facilitator, host, volunteer, and bridge person are useful design distinctions, but features should not assume separate base UIs for those roles. Everyone is a participant first. Event creation and community creation should be generally accessible. Event and community management features appear contextually when the user has created, hosts, stewards, manages, or otherwise has responsibility for the relevant object.

The deeper feature center is field relations, holds, pathways, stewardship, and movement. Field should help people, communities, creators, stewards, events, venues, and practices see how they are connected, where participation is held, and what movement is available next.

Use [Language and copy register](Language%20and%20copy%20register.md) when turning these features into screens. Product docs may use terms like FieldRelation, holds, and pathways for precision, but user-facing labels should usually translate them into "connection", "what may be unclear", "ways in", "first step", "waiting for review", and "why this appears".

## Navigation And Feature Access

- Primary navigation:
  - Should let users click between major feature areas rather than scroll through unrelated features.
  - Should make orientation, events, communities, fields, creation, and management areas easy to locate.

- Contextual navigation:
  - Object pages should expose relevant actions for the current user.
  - Event pages expose attend, mark interested, suggest context, pathway actions, and management controls when applicable.
  - Community pages expose follow, request membership, explore participation, relation panels, and management controls when applicable.
  - Venue, creator/facilitator, generated field, festival, and practice/tag pages may expose contextual suggest connection or suggest context actions where privacy and consent allow.
  - Generated field pages expose exploration paths and relation evidence, not management controls unless the field becomes an intentional community.

- Feature surfacing:
  - Features may appear as panes, tabs, drawers, dashboards, panels, or dedicated pages.
  - The app should avoid burying major features in a single long page.

## Orientation Features

- My Orientation overview:
  - Shows upcoming events by degree of relevance.
  - First shows events the user is actively helping hold.
  - Then shows events where the user has committed to participate.
  - Then shows events in member/trusted/core communities.
  - Then shows events from followed or lightly tracked communities.
  - Then shows expansion-edge events based on larger overlap with interests and involvements.
  - Pulls event data from event objects.
  - Pulls relationship data from participation edges.
  - Uses calculated relevance based on community edges, event tags, access, venue familiarity, and related signals.

- My relationships to groups:
  - Separates followed groups, member/access groups, committed contribution groups, and dormant groups.
  - Shows gradient metrics for participation strength and shared exposure.
  - Explains why each relationship is represented that way.
  - Pulls group data from group objects.
  - Pulls relationship data from participation edges.
  - Uses calculated engagement strength and shared exposure.
  - May show broader FieldRelations as context around the user's participation edges, without replacing the edge model.

- Event recommendations:
  - Events are surfaced through linked groups, relevant groups, accepted or suggested FieldRelations, tag overlap, low-threshold access, creator/host context, and current participation edges.
  - Recommendations should show reasons, not just a score.
  - User can attend, mark interested, or suggest context for an event.
  - Pulls event data from event objects and recommendation data from calculated event relevance.

- Possible next steps:
  - Shows strong roots, light overlap, possible next event entry, and a group to learn about.
  - Supports pathway actions like follow lightly, request access, attend beginner event, mark interested, ask steward, volunteer, join recurring practice, become dormant, reactivate, suggest related community, create bridge event, and mark relationship between communities.
  - Uses participation edges, FieldRelations, event recommendations, group recommendations, hold types, and dormant/reactivating edge signals.

- Emergent fields around the user:
  - Shows generated fields based on tags, venues, overlap, rhythm, or participation patterns.
  - Allows exploration of a field without treating it as a managed community.
  - Pulls from generated field calculations, group objects, venue objects, and aggregate participation edges.
  - May show accepted or suggested FieldRelations that connect the generated field to events, communities, festivals, practices, venues, or creators.

## Relation And Pathway Features

- Relation panels:
  - May appear on event, community, venue, creator/facilitator, generated field, festival, practice/tag, and profile contexts.
  - Show represented relations with source, target, relation kind, strength, status, provenance, visibility, evidence/reasons, related hold types, and movement unlocked.
  - Distinguish accepted relations from suggested, steward-reviewed, refined, declined, or dormant relations.
  - Preserve ParticipationEdge as the detailed person-to-community belonging model.

- Suggest connection / suggest context:
  - Generalizes the current "suggest event relevance to a group" feature.
  - The deeper gesture is: "I sense that this belongs in this context."
  - Should be available contextually from events, communities, venues, creators/facilitators, generated fields, festivals, practices, and potentially profiles, with privacy and consent constraints.
  - The first implementation may still focus on event-to-community and creator/event-to-community suggestions.
  - Suggestions should create suggested FieldRelations or compatible implementation objects that can later migrate into FieldRelation.
  - Suggesting context should not imply ownership, automatic publication, or advertising reach.

- Holds as explanations:
  - Surfaces why a relation is not yet moving: visibility, context, trust, threshold, boundary, stewardship, capacity, or language.
  - Can appear in relation panels, recommendation explanations, creator fit panels, and steward queues.
  - Should clarify the next possible movement without shaming or pressuring.

- Pathway surfacing:
  - Shows movement made possible by visible or accepted relations.
  - Examples include attend beginner event, follow lightly, request access, ask steward, volunteer, join recurring practice, suggest related community, reactivate dormant edge, create bridge event, or mark relationship between communities.
  - Pathways should respect access, consent, capacity, boundary, visibility, and stewardship review.

## Event Features

- Event page:
  - Shows title, host/facilitator, venue, time, access level, price/access note, audience, tags, linked groups, relevant groups, and attendance/interest state.
  - Shows why the event is relevant to the current user.
  - Shows relation panels for accepted or suggested relations to communities, venues, creators, generated fields, festivals, and practices when useful.
  - Allows attend, mark interested, and suggest context, including event relevance to a group.

- Event creation:
  - User enters title, host/facilitator, venue, access level, price/access note, tags, intended audience, and beginner-friendliness.
  - The app recalculates group, field, venue, practice, and pathway fit as the draft changes.
  - Fit explanations may name holds such as context, language, boundary, stewardship, or capacity.
  - Event creation is not limited to a separate "creator" base UI; it is a platform feature available to users.

- Event management:
  - Available when the user created, hosts, cohosts, facilitates, volunteers for, or manages the event.
  - May include editing event details, publishing/unpublishing, managing access, reviewing relation suggestions, viewing aggregate participant origins, and linking to communities, venues, fields, festivals, or practices.
  - Should avoid turning participant data into surveillance.

- Suggested event share / suggested FieldRelation:
  - A user can suggest that an event is relevant to a community.
  - This is the first narrow implementation of the broader suggest connection / suggest context pattern.
  - Suggested events enter the relevant community management/steward queue rather than automatically becoming community-owned.
  - Future versions should represent this as event-to-community FieldRelation with provenance, evidence, hold types, review status, visibility, and movementUnlocked.

## Community Features

- Community page:
  - Shows description, state, tags, rhythm, norms, venues, access rules, and entry guidance.
  - Shows the current user's relationship to the community.
  - Includes relationship state, access level, decay state, role modes, participation score, and shared exposure score.
  - Shows relation panels for accepted, suggested, dormant, or held relations to events, venues, creators/facilitators, generated fields, festivals, practices, and other communities.

- Ways in:
  - Follow lightly.
  - Request membership.
  - Commit or serve.
  - Become dormant.
  - Reactivate when appropriate.

- Community event sorting:
  - Bridge participation: shallow, public, beginner-friendly, low-threshold, or cross-community events.
  - Deeper connection: events closer to a specific community container, stronger commitment, or more specialized access.

- Community overlap signals:
  - Adjacent communities above light overlap.
  - Shared event tags.
  - Shared venues and participation patterns.
  - Formal, steward-marked, calculated, or accepted FieldRelations.

- Community creation:
  - User can create a new community container.
  - Creation should gather name, description, tags, rhythm, norms, access rules, venues, entry guidance, and initial steward/manager responsibility.
  - Community creation should not require a separate base UI. It is a platform feature.

- Community management:
  - Available when the user created, stewards, manages, or has explicit responsibility for a community.
  - May include editing norms and entry guidance, adjusting access rules and group state, approving membership requests, reviewing suggested FieldRelations, featuring suggested events as relevant, and marking formal relationships to other groups.
  - Should expose aggregate patterns, opportunities, and governance choices.
  - Should not default to a roster-first or individual-monitoring interface.

## Generated Field Features

- Generated field page:
  - Describes a computed pattern rather than a represented community.
  - Shows why the field exists: shared tags, venues, rhythm, or overlap.
  - Shows named communities inside the field.
  - Shows bridge events and deeper events.
  - Keeps people represented as aggregate edges.
  - Shows FieldRelations that connect the field to events, communities, venues, practices, festivals, or creators, while preserving that the field itself is computed.

- Field exploration:
  - User can explore communities, events, venues, and tags inside the field.
  - The field can help orient without speaking as a social container.
  - User may suggest context from a generated field into a stewarded community or event when consent and authority allow.

- Field distinction:
  - A field is not a group unless people intentionally make it one.
  - A generated page should feel less authored and less socially specific than a community page.

## Recommendation And Explanation Features

- Explain event relevance:
  - Shows why an event appears for the user.
  - May cite current participation edges, relevant groups, accepted or suggested FieldRelations, tags, low-threshold access, venue familiarity, creator relationship, social suggestions, or holds.

- Explain group relevance:
  - Shows why a group appears as a possible next step.
  - May cite shared tags, public access, overlapping people, related venues, nearby events, FieldRelations, or pathways unlocked.

- Explain relationship state:
  - Shows why a participation edge is represented as observing, curious, recurring, contributor, dormant, or another state.
  - Should keep access, attendance, identity, trust, commitment, and visibility separate.

- Explain generated fields:
  - Shows the evidence for the field.
  - Avoids implying that the field is managed or socially represented.

- Explain field relations:
  - Shows source, target, relation kind, provenance, evidence, status, review authority, visibility, hold types, and movement unlocked.
  - Makes clear whether the relation was user-suggested, steward-marked, creator-marked, calculated, or imported.
  - Shows why the relation appears and what can happen next.

## Community Health And Management Features

- Community health overview:
  - Focuses on a selected managed community.
  - Shows aggregate participation, not member surveillance.
  - May show held relations and pathways at an aggregate or object level, not as individual targeting.

- Community health metrics:
  - Bonding capacity.
  - Bridging capacity.
  - Newcomer dropoff signal.
  - Dormant/reactivating edge signal.

- Participation distribution:
  - Shows distribution across observing, curious, occasional, recurring, contributor, facilitator, steward, dormant, and alumnus states.

- Aggregate suggestions:
  - Summarizes field hints such as newcomer continuation, strongest overlap, bridge-richness, or need for clearer entry guidance.
  - May summarize common hold types such as threshold, boundary, capacity, language, context, or stewardship holds.

- Adjacent group and field awareness:
  - Shows adjacent groups through computed overlap.
  - Shows emergent fields involving the managed community.
  - Allows community managers or stewards to notice emerging fields.

- Stewardship relation queue:
  - Reviews suggested FieldRelations, not only suggested event shares.
  - Lets stewards accept, refine, decline, redirect, or leave a relation dormant/held.
  - Shows provenance, evidence, related hold types, review authority, visibility, and movement that would be unlocked by acceptance.
  - Accepted relations should change visibility, recommendation explanations, community pages, event pages, generated field pages, and pathways where relevant.
  - Queue design should remain respectful and non-coercive, avoiding CRM-style individual tracking.

## Known Expansion Space

- event/community/festival views showing where participants are coming from
- festival pages with sub-events and orientation features
- festival forums
- community forums
- richer participant origin/source visualizations
- stronger page distinction between managed communities and generated fields
- lens-specific orientation features for current involvements, connected field, and connection edge
- richer community creation and community management flows
- richer event management and suggested relevance review flows
- relation panels across object pages
- FieldRelation review queues and pathway surfacing
- hold taxonomy visualization and explanation patterns
