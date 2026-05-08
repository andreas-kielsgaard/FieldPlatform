# Database Definition

This prototype data layer currently uses a JSON snapshot database rather than SQL tables. This is intentionally lightweight so the data concepts can change quickly and the database can be re-seeded when the model changes.

Think of each top-level snapshot array as a table-like collection.

## Collections

- `people`: users/participants and their profile data.
- `groups`: managed community containers.
- `venues`: physical places.
- `events`: event/offering records.
- `festivals`: temporary multi-event gatherings used by current mockups.
- `forumThreads`: community/festival discussion records used by current mockups.
- `participationEdges`: user-to-community relationship records.
- `groupRelationships`: formal or steward-marked relationships between communities.
- `fieldRelations`: broader object-to-object/context-to-context connection records for events, communities, venues, people, generated fields, festivals, practices, and tags.
- `relationReviews`: review history for FieldRelation accept/refine/decline/redirect actions.
- `membershipRequests`: requests for explicit access or membership.
- `suggestedEventShares`: proposed relevance links from an event to a community. This remains as a compatibility/narrow predecessor to event-to-community FieldRelation.
- `createdEvents`: currently retained for compatibility with earlier mockups; new event creation writes to `events`.
- `createdCommunities`: audit-style records for created communities.
- `managedObjects`: derived and explicit records describing which users can manage which events or communities.
- `featuredEvents`: event IDs featured by community management/steward actions.

## Views

There is no SQL view engine yet. View-like outputs are created through the calculation layer and managed access layer:

- generated fields
- event recommendations
- community recommendations
- community health summary
- personal community relationship metrics
- group overlap
- bridge people
- FieldRelation lookup by object or review authority
- relation explanations
- movement options / ways-in values derived from relation state and object context
- hold/friction signals by object

## FieldRelation Notes

`fieldRelations` records include:

- source and target endpoint: `sourceType/sourceId`, `targetType/targetId`
- `relationKind`
- optional `relationStrength`
- `status`: suggested, accepted, refined, declined, computed, dormant
- `provenance`: user_suggested, steward_marked, creator_marked, calculated, imported
- review authority: `reviewAuthorityType/reviewAuthorityId`
- visibility
- evidence/reasons
- typed friction signals in `holdTypes`
- derived or pre-seeded `movementUnlocked` values

`relationReviews` records preserve review history for accept, refine, decline, redirect, and mark-computed-only actions.

Pathways / ways-in are not stored as a separate collection yet. They are derived from FieldRelation state, object context, event access, community entry guidance, ParticipationEdges, membership requests, and review status.

`suggestedEventShares` should not be removed yet. It remains a compatibility collection for existing mockups and services, while new access-layer behavior also creates a matching FieldRelation for event-to-community suggestions.

## Reset

`source/database-definition/seed.js` defines the initial snapshot. The database engine can reset all data back to that snapshot.
