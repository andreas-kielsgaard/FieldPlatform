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
- `membershipRequests`: requests for explicit access or membership.
- `suggestedEventShares`: proposed relevance links from an event to a community.
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

## Reset

`source/database-definition/seed.js` defines the initial snapshot. The database engine can reset all data back to that snapshot.

