# Design Target: Features and UX Flows

This is a living product/design target for the community participation app. It is currently formulated from the state of Mockup 2, but it should not be read as a requirement that every mockup must represent every feature in the same way.

The target is to help people orient through communities, events, fields, relationships, and participation signals without collapsing belonging into a simple member/non-member status.

## Core Design Intent

The app should feel like an orientation companion for a living field of communities. It should help a participant understand:

- what they are already involved in
- what they are following lightly
- where they have explicit membership or access
- where they have made stronger commitments
- where a relationship is dormant or intentionally muted
- what is nearby through overlap, tags, venues, people, or recurring rhythm
- how to move from shallow participation into deeper connection when that is appropriate

For creators and stewards, the app should make the field legible without turning communities into advertising targets, admin rosters, or abstract analytics dashboards.

## Core Data Concepts

- Person: a participant, creator, steward, host, volunteer, or bridge person with interests, visible attributes, and current life context.
- Group/community: a named community container with norms, rhythm, access rules, stewards, venues, tags, and entry guidance.
- Event/offering: a hosted activity with venue, access level, audience, tags, interested/attending participants, and relevant groups.
- Venue: a physical place that can anchor overlap between groups and events.
- Participation edge: the central representation of a person's relationship to a group.
- Group relationship: a formal or steward-marked relationship between groups, such as overlap, collaboration, shared venue, shared participants, or sister-group relation.
- Emergent field: a generated pattern that is not necessarily a managed community, based on shared tags, venues, group overlap, rhythm, or participation patterns.
- Membership request: a formal request for explicit access or membership.
- Suggested event share: a participant or creator suggestion that an event may be relevant to a community.
- Created event: a draft or published offering created through the creator flow.

## Participation Edge Model

The participation edge should remain the main conceptual object for representing belonging. It should support separate dimensions rather than compressing them into a single status.

Binary or categorical layers:

- following/observing
- explicit membership or granted access
- explicit commitment, such as recurring participation, stewarding, hosting, volunteering, facilitating, or organizing
- dormant/muted relationship
- visibility of the relationship signal, such as private to user, visible to stewards, visible to members, or public

Gradient layers:

- engagement strength
- recency
- frequency
- contribution level
- trust level
- social embeddedness
- norm familiarity
- identity salience
- shared exposure through overlapping communities, event tags, venue use, or participation history

Design target:

- Keep "access", "attendance", "identity", "trust", "commitment", and "visibility" separate.
- Make it possible to belong lightly, deeply, formally, informally, temporarily, or dormantly.
- Avoid implying that membership alone is the full truth of participation.

## Participant Features

- My Orientation overview:
  - Shows upcoming events by degree of relevance.
  - First shows events the user is actively helping hold.
  - Then shows events where the user has committed to participate.
  - Then shows events in member/trusted/core communities.
  - Then shows events from followed or lightly tracked communities.
  - Then shows expansion-edge events based on larger overlap with interests and involvements.

- My relationships to groups:
  - Separates followed groups, member/access groups, committed contribution groups, and dormant groups.
  - Shows gradient metrics for participation strength and shared exposure.
  - Explains why each relationship is represented that way.

- Event recommendations:
  - Events are surfaced through linked groups, relevant groups, tag overlap, low-threshold access, and current participation edges.
  - Recommendations should show reasons, not just a score.
  - Participant can attend, mark interested, or suggest an event to a group.

- Possible next steps:
  - Shows strong roots, light overlap, possible next event entry, and a group to learn about.
  - Supports actions like follow group, request membership, attend event, mark interested, volunteer, become recurring, become dormant, and reactivate.

- Emergent fields around the participant:
  - Shows generated fields based on tags, venues, and overlap.
  - Allows exploration of a field without treating it as a managed community.

- Community/field participation pages:
  - "Explore how to participate" leads to a community or generated field view.
  - Community pages show entry guidance, access rules, relationship state, participation score, shared exposure, bridge events, and deeper events.
  - Generated field pages are more sparse and evidence-based, describing the pattern rather than speaking as a community representative.

## Community View Features

- Community self-description:
  - Description, state, tags, rhythm, norms, venues, access rules, and entry guidance.

- Personal relationship panel:
  - Shows how the current user relates to the community.
  - Includes relationship state, access level, decay state, role modes, participation score, and shared exposure score.

- Ways in:
  - Follow lightly.
  - Request membership.
  - Commit or serve.
  - Become dormant.

- Event sorting:
  - Bridge participation: shallow, public, beginner-friendly, low-threshold, or cross-community events.
  - Deeper connection: events closer to a specific community container, stronger commitment, or more specialized access.

- Community overlap signals:
  - Adjacent communities above light overlap.
  - Shared event tags.
  - Shared venues and participation patterns.

## Generated Field Features

- Generated field pages:
  - Describe a computed pattern rather than a represented community.
  - Show why the field exists: shared tags, venues, rhythm, or overlap.
  - Show named communities inside the field.
  - Show bridge events and deeper events.
  - Keep people represented as aggregate edges.

- Field creation logic:
  - Tag fields from repeated tags across groups.
  - Venue fields from multiple groups using the same venue.
  - Custom overlap/rhythm fields for recurrent patterns.

Design target:

- A field is not a group unless people intentionally make it one.
- A generated page should feel less authored and less socially specific than a community page.

## Creator / Facilitator Features

- Draft offering flow:
  - Creator enters title, host/facilitator, venue, access level, price/access note, tags, intended audience, and beginner-friendliness.
  - The app recalculates group and field fit as the draft changes.

- Suggested groups and emergent fields:
  - The app recommends groups based on tag overlap, venue fit, facilitator history, adjacent events, access, and beginner-friendliness.
  - The app recommends emergent fields when the offering belongs to a broader pattern rather than a single community.

- Creator signal metrics:
  - Participant overlap between the creator's audience and the community.
  - Community relevance or proportional relevance.
  - Whether the creator has hosted or been marked relevant there before.
  - Relevant creator event count.
  - Shared participant count.
  - Tag overlap.

- Sharing/suggestion flow:
  - Creator can create an event.
  - Creator can suggest the draft to selected groups.
  - Suggested events enter steward queues rather than automatically becoming community-owned.

Design target:

- The creator experience should feel like guided field discovery.
- It should help creators find fit without making communities feel like marketing segments.

## Steward Features

- Steward dashboard:
  - Focuses on a selected group.
  - Shows community health through aggregate participation, not member surveillance.

- Steward metrics:
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
  - Shows emergent fields involving the stewarded group.
  - Allows stewards to notice emerging fields.

- Formal structure controls:
  - Edit norms and entry guidance.
  - Adjust access rules and group state.
  - Approve/request membership.
  - Feature suggested events as relevant.
  - Mark a formal relationship to another group.

Design target:

- Steward tools should expose aggregate patterns, opportunities, and governance choices.
- They should not default to a roster-first or individual-monitoring interface.

## Data Model Explorer Features

- Inspect core objects:
  - people
  - groups
  - participation edges
  - events
  - venues
  - computed group relationships
  - emergent fields
  - event relevance
  - formulas

- Explain formulas:
  - engagement strength
  - bonding score
  - bridging score
  - group overlap
  - emergent field generation
  - participant group recommendations
  - participant event recommendations
  - creator group recommendations
  - dormant participant detection
  - newcomer dropoff detection
  - bridge people detection

Design target:

- The model explorer exists so assumptions can be inspected, argued with, and changed.
- Computed signals should remain explainable.

## UX Story / Flow List

### Flow 1: Participant Orients to What Is Already Live

1. Participant opens My Orientation.
2. The app shows events in layers from strongest commitment to expansion edge.
3. Participant sees what they are helping hold, what they are attending, what their member communities are offering, what followed groups are offering, and what is adjacent.
4. Participant can attend, mark interested, or follow the relevant community path.

Outcome:

- The participant understands the difference between current commitment, clear relevance, and expansion edge.

### Flow 2: Participant Understands Their Relationship to Groups

1. Participant opens My relationships to groups.
2. Groups are separated into following, explicit membership/access, explicit commitment/contribution, and dormant.
3. Each group shows participation strength, shared exposure, and explanation.
4. Participant can choose to explore how to participate.

Outcome:

- Belonging becomes legible without being flattened into a single membership label.

### Flow 3: Participant Explores a Community

1. Participant selects "Explore how to participate" on a group.
2. Community page explains the community's own description, rhythm, norms, access, and entry guidance.
3. The participant sees their own relationship to the community.
4. The page separates low-threshold bridge events from deeper community-specific events.
5. Participant can follow, request membership, attend an event, volunteer, become dormant, or reactivate.

Outcome:

- The participant can move at an appropriate depth rather than being pushed into a generic RSVP.

### Flow 4: Participant Explores a Generated Field

1. Participant selects an emergent field.
2. The app shows a sparse generated page.
3. The page explains what pattern is being captured and which named communities are involved.
4. The participant can explore specific communities or events inside the field.

Outcome:

- Computed relevance can be useful without pretending to be a formal social container.

### Flow 5: Participant Suggests Event Relevance

1. Participant sees an event recommendation.
2. Participant chooses to suggest it to a group.
3. The app creates a suggested event share.
4. The suggestion appears in the steward's queue.

Outcome:

- Relevance can be socially proposed without granting automatic ownership or authority.

### Flow 6: Creator Drafts an Offering

1. Creator opens the creator/facilitator view.
2. Creator edits event details.
3. The app recalculates which groups and fields might fit.
4. Creator reviews fit reasons, participant overlap, prior relevance, and tag overlap.
5. Creator creates the event or suggests the draft to selected groups.

Outcome:

- The creator learns where the offering may belong before publishing or pushing it outward.

### Flow 7: Steward Reviews Community Health

1. Steward opens group field/community health.
2. Steward chooses the group they steward.
3. The dashboard shows bonding, bridging, dropoff, dormant/reactivating signals, and participation distribution.
4. Steward reviews aggregate field suggestions and adjacent group overlaps.

Outcome:

- Steward sees the living field around the community rather than only a member list.

### Flow 8: Steward Acts on Structure

1. Steward edits entry guidance, norms, access rules, or group state.
2. Steward approves membership requests.
3. Steward features relevant suggested events.
4. Steward marks formal relationships to other groups.
5. The app recalculates participant recommendations and field signals.

Outcome:

- Formal governance overlays computed field signals without replacing them.

### Flow 9: Data Model Is Inspected

1. Designer/developer opens the data model explorer.
2. They switch between people, groups, edges, events, venues, fields, relationships, relevance scores, and formulas.
3. They inspect raw records and computed outputs.
4. They adjust the model or mockup when the representation is conceptually wrong.

Outcome:

- The prototype remains discussable and changeable.

## Non-Goals And Guardrails

- Do not make the product feel like a generic event marketplace.
- Do not make community belonging a binary member/non-member truth.
- Do not make steward tools feel like surveillance or CRM.
- Do not make creator tools feel like ad targeting.
- Do not treat generated fields as managed communities.
- Do not hide why something is recommended.
- Do not force every mockup to express every feature identically.

## Known Expansion Space

These ideas may be added to the design target as they become clearer:

- event/community/festival views showing where participants are coming from
- festival pages with sub-events and orientation features
- festival forums
- community forums
- richer participant origin/source visualizations
- stronger view-page distinction between managed communities and generated fields
- lens-specific UX stories for current involvements, connected field, and connection edge

