# Features And Functionalities

Features are concrete things the app can do from a user perspective. They should be identifiable parts of the platform that a user can navigate to or act through, such as navigation panes, overview UI, object pages, panels, drawers, tabs, controls, and feature-specific flows.

Participant, creator, steward, facilitator, host, volunteer, and bridge person are useful design distinctions, but features should not assume separate base UIs for those roles. Everyone is a participant first. Event creation and community creation should be generally accessible. Event and community management features appear contextually when the user has created, hosts, stewards, manages, or otherwise has responsibility for the relevant object.

## Navigation And Feature Access

- Primary navigation:
  - Should let users click between major feature areas rather than scroll through unrelated features.
  - Should make orientation, events, communities, fields, creation, and management areas easy to locate.

- Contextual navigation:
  - Object pages should expose relevant actions for the current user.
  - Event pages expose attend, mark interested, suggest relevance, and management controls when applicable.
  - Community pages expose follow, request membership, explore participation, and management controls when applicable.
  - Generated field pages expose exploration paths, not management controls unless the field becomes an intentional community.

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

- Event recommendations:
  - Events are surfaced through linked groups, relevant groups, tag overlap, low-threshold access, creator/host context, and current participation edges.
  - Recommendations should show reasons, not just a score.
  - User can attend, mark interested, or suggest an event to a group.
  - Pulls event data from event objects and recommendation data from calculated event relevance.

- Possible next steps:
  - Shows strong roots, light overlap, possible next event entry, and a group to learn about.
  - Supports actions like follow group, request membership, attend event, mark interested, volunteer, become recurring, become dormant, and reactivate.
  - Uses participation edges, event recommendations, group recommendations, and dormant/reactivating edge signals.

- Emergent fields around the user:
  - Shows generated fields based on tags, venues, overlap, rhythm, or participation patterns.
  - Allows exploration of a field without treating it as a managed community.
  - Pulls from generated field calculations, group objects, venue objects, and aggregate participation edges.

## Event Features

- Event page:
  - Shows title, host/facilitator, venue, time, access level, price/access note, audience, tags, linked groups, relevant groups, and attendance/interest state.
  - Shows why the event is relevant to the current user.
  - Allows attend, mark interested, and suggest event relevance to a group.

- Event creation:
  - User enters title, host/facilitator, venue, access level, price/access note, tags, intended audience, and beginner-friendliness.
  - The app recalculates group and field fit as the draft changes.
  - Event creation is not limited to a separate "creator" base UI; it is a platform feature available to users.

- Event management:
  - Available when the user created, hosts, cohosts, facilitates, volunteers for, or manages the event.
  - May include editing event details, publishing/unpublishing, managing access, reviewing relevance suggestions, viewing aggregate participant origins, and linking to communities.
  - Should avoid turning participant data into surveillance.

- Suggested event share:
  - A user can suggest that an event is relevant to a community.
  - Suggested events enter the relevant community management/steward queue rather than automatically becoming community-owned.

## Community Features

- Community page:
  - Shows description, state, tags, rhythm, norms, venues, access rules, and entry guidance.
  - Shows the current user's relationship to the community.
  - Includes relationship state, access level, decay state, role modes, participation score, and shared exposure score.

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
  - Formal or steward-marked relationships.

- Community creation:
  - User can create a new community container.
  - Creation should gather name, description, tags, rhythm, norms, access rules, venues, entry guidance, and initial steward/manager responsibility.
  - Community creation should not require a separate base UI. It is a platform feature.

- Community management:
  - Available when the user created, stewards, manages, or has explicit responsibility for a community.
  - May include editing norms and entry guidance, adjusting access rules and group state, approving membership requests, featuring suggested events as relevant, and marking formal relationships to other groups.
  - Should expose aggregate patterns, opportunities, and governance choices.
  - Should not default to a roster-first or individual-monitoring interface.

## Generated Field Features

- Generated field page:
  - Describes a computed pattern rather than a represented community.
  - Shows why the field exists: shared tags, venues, rhythm, or overlap.
  - Shows named communities inside the field.
  - Shows bridge events and deeper events.
  - Keeps people represented as aggregate edges.

- Field exploration:
  - User can explore communities, events, venues, and tags inside the field.
  - The field can help orient without speaking as a social container.

- Field distinction:
  - A field is not a group unless people intentionally make it one.
  - A generated page should feel less authored and less socially specific than a community page.

## Recommendation And Explanation Features

- Explain event relevance:
  - Shows why an event appears for the user.
  - May cite current participation edges, relevant groups, tags, low-threshold access, venue familiarity, creator relationship, or social suggestions.

- Explain group relevance:
  - Shows why a group appears as a possible next step.
  - May cite shared tags, public access, overlapping people, related venues, or nearby events.

- Explain relationship state:
  - Shows why a participation edge is represented as observing, curious, recurring, contributor, dormant, or another state.
  - Should keep access, attendance, identity, trust, commitment, and visibility separate.

- Explain generated fields:
  - Shows the evidence for the field.
  - Avoids implying that the field is managed or socially represented.

## Community Health And Management Features

- Community health overview:
  - Focuses on a selected managed community.
  - Shows aggregate participation, not member surveillance.

- Community health metrics:
  - Bonding capacity.
  - Bridging capacity.
  - Newcomer dropoff signal.
  - Dormant/reactivating edge signal.

- Participation distribution:
  - Shows distribution across observing, curious, occasional, recurring, contributor, facilitator, steward, dormant, and alumnus states.

- Aggregate suggestions:
  - Summarizes field hints such as newcomer continuation, strongest overlap, bridge-richness, or need for clearer entry guidance.

- Adjacent group and field awareness:
  - Shows adjacent groups through computed overlap.
  - Shows emergent fields involving the managed community.
  - Allows community managers or stewards to notice emerging fields.

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

