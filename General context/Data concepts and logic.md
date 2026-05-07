# Data Concepts And Logic

This document describes storage objects, represented relationships, calculated signals, where data comes from, and how the app uses it.

## Implementation Boundary

The platform data layer lives in `Platform data layer/`. Mockups and product UI should access stored data, management operations, and calculated values through that layer rather than directly editing data arrays or calling local formulas.

Frontend feature code should use the managed object-oriented domain layer first. The preferred interaction style is through objects such as `User`, `Event`, `Community`, `Venue`, `ParticipationEdge`, `FieldRelation`, and `GeneratedFieldHandler`. Direct generic CRUD is reserved for dev tools, tests, and internal implementation work.

The current data concepts are expected to change strongly. The data layer should therefore prioritize separation of concern, resettable seed data, and stable access points over final schema perfection. When the model changes substantially, it is acceptable to re-seed the database from an updated initial snapshot.

## Core Data Concepts

- Person: a participant, creator, steward, host, volunteer, bridge person, or community manager with interests, visible attributes, and current life context.
- Group/community: a named community container with norms, rhythm, access rules, stewards, venues, tags, and entry guidance.
- Event/offering: a hosted activity with venue, access level, audience, tags, interested/attending participants, and relevant groups.
- Venue: a physical place that can anchor overlap between groups and events.
- Participation edge: the high-resolution representation of a person's relationship to a group/community.
- Field relation: the broader represented relation between two objects or contexts, such as participant, community, event/offering, venue, creator/facilitator, steward, generated field, festival, practice, or tag.
- Group relationship: an older or narrower form of relation between groups, such as overlap, collaboration, shared venue, shared participants, or sister-group relation. This should increasingly be expressible as FieldRelation.
- Emergent field: a generated pattern that is not necessarily a managed community, based on shared tags, venues, group overlap, rhythm, or participation patterns.
- Membership request: a formal request for explicit access or membership.
- Suggested event share: an initial implementation slice of suggested FieldRelation, usually event-to-community.
- Hold: a design and explanation lens for where expression cannot yet move through context.
- Pathway: a movement made possible when a relation becomes visible, accepted, or clarified.
- Created event: a draft or published offering created through event creation.
- Created community: a draft or published community container created through community creation.
- Managed object: an event or community for which a user has creation, hosting, stewarding, facilitation, or admin responsibility.

## Person Data

A person may have:

- identity and profile fields: name, bio, visible attributes, life context
- interest fields: tags, saved events, followed communities, followed fields
- relationship fields: participation edges to groups
- sensed or suggested field relations, where privacy permits
- event behavior: attended, interested, hosted, cohosted, volunteered, facilitated, suggested
- community behavior: followed, requested access, member, trusted, contributor, steward, dormant
- permissions or contextual capabilities derived from created or managed objects

Data may be received from:

- user-entered profile data
- actions such as attend, mark interested, follow, request membership, suggest relevance, create event, create community
- steward or manager actions such as approving requests, marking relationships, reviewing suggested field relations, featuring event relevance, editing entry guidance
- imported or integrated event/community data in future versions
- calculated signals from participation history and object overlap

Data is used for:

- orientation overviews
- event recommendations
- group recommendations
- community and field relationship panels
- relation panels and pathway surfacing
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
- suggested field relations, including event, creator, venue, festival, generated field, practice, or community context suggestions
- formal or steward-reviewed relationships to other objects

Data may be received from:

- community creator setup
- steward or manager edits
- event links and relation suggestions
- calculated overlap with other groups
- venue and tag reuse

Data is used for:

- community pages
- entry guidance
- event sorting into bridge participation and deeper connection
- participation edge context
- relation panels showing accepted, suggested, dormant, or steward-held FieldRelations
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
- suggested field relations, initially including suggested event shares

Data may be received from:

- event creator forms
- host or facilitator profile data
- venue selection
- tags and intended audience entered by the creator
- participant actions such as attend, mark interested, suggest to group
- steward or manager actions such as accepting, refining, declining, redirecting, or featuring a suggested relation
- calculated fit to groups and fields

Data is used for:

- event pages
- participant orientation layers
- event recommendations
- creator fit suggestions
- community bridge/deeper event sorting
- steward relation queues
- generated field evidence

## FieldRelation Model

A FieldRelation represents a relation between two objects or contexts. It is broader than ParticipationEdge and should eventually replace one-off relation objects where useful, while still allowing specialized models like ParticipationEdge to keep their additional detail.

Possible source and target types:

- participant/person
- community
- event/offering
- venue
- creator/facilitator
- steward
- generated field
- festival
- practice/tag

Suggested fields:

- id
- sourceType
- sourceId
- targetType
- targetId
- relationKind
- relationStrength
- status: suggested, steward-reviewed, accepted, refined, declined, dormant
- provenance: user-suggested, steward-marked, creator-marked, calculated, imported
- suggestedBy
- stewardedBy or reviewAuthority
- visibility
- evidence or reasons
- relatedHoldTypes
- movementUnlocked
- createdAt
- updatedAt

Relation kind examples:

- belongsInContext
- relevantTo
- hostedAt
- facilitatedBy
- stewardedBy
- overlapsWith
- bridgesTo
- sharesPractice
- sharesVenue
- recurringPathwayTo
- generatedFrom
- boundaryHeldBy

Relation state should be reviewable and explainable. A calculated relation may begin as suggested. A steward-marked relation may become accepted. A relation may be refined to point to a better target, declined because it violates boundary or context, or dormant because the timing or capacity is wrong.

Accepted FieldRelations may change:

- recommendation explanations
- event and community pages
- generated field pages
- relation panels
- steward dashboards
- pathway suggestions
- visibility of bridge events or entry points

## Hold Taxonomy

A hold is where expression cannot yet move through context. Holds are initially a design and explanation lens, not necessarily a heavy user-facing entity.

Initial hold types:

- visibility hold: "I would participate if I knew this existed."
- context hold: "I see it, but I do not understand what world it belongs to."
- trust hold: "I am curious, but I do not know whether I am welcome."
- threshold hold: "I want to enter, but I do not know the first step."
- boundary hold: "We want to receive people, but not without protecting the field."
- stewardship hold: "This relation is sensed, but not confirmed by someone responsible."
- capacity hold: "This may be right, but not at this intensity, timing, or state."
- language hold: "The thing exists, but cannot yet describe itself clearly."

Holds may appear as explanation metadata on a FieldRelation, as a reason a pathway is unavailable, or as a steward hint. They should be used to clarify movement, not to judge people or communities.

## Pathway Logic

A pathway is the movement made possible when a relation becomes visible.

Movement unlocked may include:

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

Pathways are constrained by relation status, visibility, access rules, capacity, boundary, and stewardship authority. A suggested relation may unlock only "ask steward" or "follow lightly." An accepted event-to-community relation may unlock recommendation visibility, community event placement, or beginner entry. A dormant ParticipationEdge may unlock reactivation prompts only when that is respectful and explainable.

## Participation Edge Model

The participation edge represents a person's relationship to a group. It is the high-resolution person-to-community relation model and should remain central for belonging. It should support separate layers rather than compressing belonging into one status.

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
- FieldRelation evidence and pathway logic where person-to-community belonging matters

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

Generated fields can be related to events, communities, venues, festivals, practices, and creators through FieldRelation, but those relations must preserve the generated field's status as computed evidence rather than social authority.

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
- accepted or steward-reviewed FieldRelations involving the event, host, venue, community, generated field, or practice
- event tags
- user tags and saved interests
- venue familiarity
- access level
- beginner-friendliness or low-threshold signal
- creator or host relationship to the user or communities
- prior attendance or interest in similar events
- suggested relevance from people or stewards, including relation provenance

Used for:

- event recommendations
- My Orientation ordering
- explanation text for why an event appears
- expansion-edge suggestions
- pathway suggestions such as attend beginner event, ask steward, or request access

### Group Overlap

Potential inputs:

- shared active participants
- shared tags
- shared venues
- shared event participation
- formal or steward-marked relationships
- accepted FieldRelations and calculated relation candidates

Used for:

- adjacent community signals
- generated field detection
- group recommendations
- steward field awareness
- relation panels and bridge pathway suggestions

### Creator Group Fit

Potential inputs:

- draft event tags
- selected venue
- host or facilitator history
- previous relevant events
- participant overlap between creator audience and community
- beginner-friendliness
- community access rules and entry guidance
- existing FieldRelations between creator, event, venue, practice tags, generated fields, and communities
- hold types such as stewardship, boundary, context, capacity, or language

Used for:

- event creation fit panel
- suggested groups
- suggested generated fields
- steward relation queues
- relation suggestion explanations

### Community Health

Potential inputs:

- bonding capacity
- bridging capacity
- newcomer dropoff signal
- dormant/reactivating edge signal
- participation distribution across observing, curious, occasional, recurring, contributor, facilitator, steward, dormant, and alumnus states
- held relations by hold type, especially threshold, boundary, capacity, language, and stewardship holds

Used for:

- community management or steward dashboards
- aggregate suggestions
- entry guidance improvements
- field awareness
- pathway surfacing and relation review priorities

### Field Relation Review

Potential inputs:

- source and target object types
- relation kind and strength
- provenance
- evidence/reasons
- related hold types
- review authority
- visibility constraints
- prior accepted, declined, refined, or dormant relations
- ParticipationEdge data when the relation involves a person and a community

Used for:

- stewardship queue ordering
- accept/refine/decline/redirect actions
- relation panels
- recommendation explanations
- movementUnlocked/pathway surfacing
- dev inspection of why a relation is suggested or held

## Open Naming Question

The term "calculation logic" is currently preferred over "calculation data" because these sections describe how represented data becomes computed signals. Other possible names:

- signal logic
- computed signals
- calculation flows
- recommendation logic
- model logic
