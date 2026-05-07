# Data Concepts And Logic

This document describes storage objects, represented relationships, calculated signals, where data comes from, and how the app uses it.

## Implementation Boundary

The platform data layer lives in `Platform data layer/`. Mockups and product UI should access stored data, management operations, and calculated values through that layer rather than directly editing data arrays or calling local formulas.

Frontend feature code should use the managed object-oriented domain layer first. The preferred interaction style is through objects such as `User`, `Event`, `Community`, `Venue`, `ParticipationEdge`, and `GeneratedFieldHandler`. Direct generic CRUD is reserved for dev tools, tests, and internal implementation work.

The current data concepts are expected to change strongly. The data layer should therefore prioritize separation of concern, resettable seed data, and stable access points over final schema perfection. When the model changes substantially, it is acceptable to re-seed the database from an updated initial snapshot.

## Core Data Concepts

- Person: a participant, creator, steward, host, volunteer, bridge person, or community manager with interests, visible attributes, and current life context.
- Group/community: a named community container with norms, rhythm, access rules, stewards, venues, tags, and entry guidance.
- Event/offering: a hosted activity with venue, access level, audience, tags, interested/attending participants, and relevant groups.
- Venue: a physical place that can anchor overlap between groups and events.
- Participation edge: the central representation of a person's relationship to a group.
- Group relationship: a formal or steward-marked relationship between groups, such as overlap, collaboration, shared venue, shared participants, or sister-group relation.
- Emergent field: a generated pattern that is not necessarily a managed community, based on shared tags, venues, group overlap, rhythm, or participation patterns.
- Membership request: a formal request for explicit access or membership.
- Suggested event share: a participant or creator suggestion that an event may be relevant to a community.
- Created event: a draft or published offering created through event creation.
- Created community: a draft or published community container created through community creation.
- Managed object: an event or community for which a user has creation, hosting, stewarding, facilitation, or admin responsibility.

## Person Data

A person may have:

- identity and profile fields: name, bio, visible attributes, life context
- interest fields: tags, saved events, followed communities, followed fields
- relationship fields: participation edges to groups
- event behavior: attended, interested, hosted, cohosted, volunteered, facilitated, suggested
- community behavior: followed, requested access, member, trusted, contributor, steward, dormant
- permissions or contextual capabilities derived from created or managed objects

Data may be received from:

- user-entered profile data
- actions such as attend, mark interested, follow, request membership, suggest relevance, create event, create community
- steward or manager actions such as approving requests, marking relationships, featuring event relevance, editing entry guidance
- imported or integrated event/community data in future versions
- calculated signals from participation history and object overlap

Data is used for:

- orientation overviews
- event recommendations
- group recommendations
- community and field relationship panels
- contextual feature access
- aggregate community health
- generated field detection
- explainable model inspection

## Group And Community Data

A group/community may have:

- name, description, state, tags
- rhythm, norms, access rules, entry guidance
- venues
- stewards or managers
- related events
- participation edges from people
- membership or access requests
- suggested event shares
- formal relationships to other groups

Data may be received from:

- community creator setup
- steward or manager edits
- event links and suggestions
- calculated overlap with other groups
- venue and tag reuse

Data is used for:

- community pages
- entry guidance
- event sorting into bridge participation and deeper connection
- participation edge context
- steward or community management dashboards
- generated field calculations
- recommendations and overlap explanations

## Event Data

An event/offering may have:

- title
- host, facilitator, creator, cohosts, volunteers
- venue
- time
- access level
- price or access note
- tags
- intended audience
- beginner-friendliness or low-threshold signal
- linked groups
- relevant groups
- interested and attending participants
- suggested event shares

Data may be received from:

- event creator forms
- host or facilitator profile data
- venue selection
- tags and intended audience entered by the creator
- participant actions such as attend, mark interested, suggest to group
- steward or manager actions such as featuring a suggested event
- calculated fit to groups and fields

Data is used for:

- event pages
- participant orientation layers
- event recommendations
- creator fit suggestions
- community bridge/deeper event sorting
- steward suggested-event queues
- generated field evidence

## Participation Edge Model

The participation edge represents a person's relationship to a group. It should support separate layers rather than compressing belonging into one status.

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

Used by:

- My Orientation
- My relationships to groups
- community personal relationship panels
- event and group recommendations
- steward aggregate health signals
- generated field evidence
- dev model inspection

## Generated Field Logic

Generated fields are computed patterns, not managed communities.

Field creation logic may include:

- tag fields from repeated tags across groups
- venue fields from multiple groups using the same venue
- overlap fields from recurring group overlap
- rhythm fields from recurring event timing or repeated participation patterns
- custom fields for recurrent patterns that are useful for orientation

Generated field pages should explain:

- why the field exists
- which named communities are involved
- which tags, venues, rhythms, or overlaps are evidence
- bridge events and deeper events inside the pattern
- aggregate participation edges, without presenting people as a managed roster

## Calculation Logic

Calculation flows should remain explainable. The exact formulas may change, but the inputs and intent should stay legible.

### Engagement Strength

Potential inputs:

- relationship state
- access level
- recency
- frequency
- contribution level
- trust level
- social embeddedness
- norm familiarity
- decay state
- role modes

Used for:

- relationship cards
- participation distribution
- recommendation weighting
- bridge people detection

### User Interest In An Event

Potential inputs:

- participation in linked or relevant communities
- strength of participation edges
- event tags
- user tags and saved interests
- venue familiarity
- access level
- beginner-friendliness or low-threshold signal
- creator or host relationship to the user or communities
- prior attendance or interest in similar events
- suggested relevance from people or stewards

Used for:

- event recommendations
- My Orientation ordering
- explanation text for why an event appears
- expansion-edge suggestions

### Group Overlap

Potential inputs:

- shared active participants
- shared tags
- shared venues
- shared event participation
- formal or steward-marked relationships

Used for:

- adjacent community signals
- generated field detection
- group recommendations
- steward field awareness

### Creator Group Fit

Potential inputs:

- draft event tags
- selected venue
- host or facilitator history
- previous relevant events
- participant overlap between creator audience and community
- beginner-friendliness
- community access rules and entry guidance

Used for:

- event creation fit panel
- suggested groups
- suggested generated fields
- steward suggestion queues

### Community Health

Potential inputs:

- bonding capacity
- bridging capacity
- newcomer dropoff signal
- dormant/reactivating edge signal
- participation distribution across observing, curious, occasional, recurring, contributor, facilitator, steward, dormant, and alumnus states

Used for:

- community management or steward dashboards
- aggregate suggestions
- entry guidance improvements
- field awareness

## Open Naming Question

The term "calculation logic" is currently preferred over "calculation data" because these sections describe how represented data becomes computed signals. Other possible names:

- signal logic
- computed signals
- calculation flows
- recommendation logic
- model logic
