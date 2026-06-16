# Managed OO Domain Interfaces

This document defines the object-oriented access layer that frontend code should use. Frontend code should not access generic database CRUD directly unless it is building a dev tool.

The public entry point lives in `source/access-layer/domain.ts`. The implementation is split across `models`, `repositories`, `services`, `infrastructure`, and `utils`.

## Source Layout

- `source/access-layer/domain.ts`: public export surface.
- `source/access-layer/platformDomain.ts`: root domain object.
- `source/access-layer/models/`: object definitions and object methods.
- `source/access-layer/repositories/`: object lookup and creation.
- `source/access-layer/services/`: domain operation services plus generated field, recommendation, and community health services.
- `source/access-layer/infrastructure/`: low-level database loading.
- `source/access-layer/utils/`: shared helpers.
- `source/access-layer/types.ts`: record and draft type definitions.

## Design Principle

The low-level database module stores snapshots, performs generic CRUD, and persists data. The managed OO layer is the business/domain interface.

Frontend code should think in domain objects:

```js
const platform = FieldPlatformDomain.createPlatformDomain();
const user = platform.users.get("p_casey");
const event = platform.events.get("e_ci_jam");

event.registerUser(user);
event.addTag("integration");

const fields = platform.generatedFields.generateFieldsFromCommunities(user.communities.member());
```

## PlatformDomain

Root object for the managed data layer.

Expected access points:

- `users.get(id)`
- `users.list()`
- `events.get(id)`
- `events.list()`
- `events.create(data, createdBy)`
- `communities.get(id)`
- `communities.list()`
- `communities.create(data, createdBy)`
- `venues.get(id)`
- `venues.list()`
- `fieldRelations.get(id)`
- `fieldRelations.list()`
- `fieldRelations.forObject(type, id)`
- `fieldRelations.between(sourceType, sourceId, targetType, targetId)`
- `fieldRelations.suggest(data, suggestedBy)`
- `fieldRelations.accept(id, reviewerId, note?)`
- `fieldRelations.refine(id, reviewerId, patch, note?)`
- `fieldRelations.decline(id, reviewerId, note?)`
- `fieldRelations.redirect(id, reviewerId, targetType, targetId, note?)`
- `fieldRelations.markComputedOnly(id, reviewerId, note?)`
- `fieldRelations.forReviewAuthority(type, id)`
- `fieldRelations.pendingForCommunity(communityId)`
- `dataShareRequests.get(id)`
- `dataShareRequests.list()`
- `dataShareRequests.forSubject(type, id)`
- `dataShareRequests.forContext(type, id)`
- `dataShareRequests.create(data)`
- `dataShareRequests.accept(id, acceptedBy?)`
- `dataShareRequests.revoke(id, revokedBy?)`
- `visibilityGrants.get(id)`
- `visibilityGrants.list()`
- `visibilityGrants.forSubject(type, id)`
- `visibilityGrants.forContext(type, id)`
- `visibilityGrants.create(data)`
- `visibilityGrants.revoke(id, revokedBy?)`
- `visibilityGrants.canSee(query)`
- `dataShares.createRequest(data)`
- `dataShares.acceptRequest(id, acceptedBy?)`
- `dataShares.revokeRequest(id, revokedBy?)`
- `dataShares.createGrant(data)`
- `dataShares.revokeGrant(id, revokedBy?)`
- `dataShares.grantsCoveringRequest(id)`
- `dataShares.coverageForRequest(id)`
- `dataShares.coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel?)`
- `dataShares.missingRequestsForContext(contextType, contextId, subjectType, subjectId, requirementLevel?)`
- `dataShares.canSee(query)`
- `generatedFields.generateFields()`
- `generatedFields.generateFieldsFromCommunities(communities)`
- `recommendations.eventsForUser(user)`
- `recommendations.communitiesForUser(user)`
- `communityHealth.summarize(community)`
- `participation.followGroup(personId, groupId)`
- `memberships.request(personId, groupId, note)`
- `eventRegistration.register(personId, eventId)`
- `eventSuggestions.suggest(eventId, groupId, suggestedBy, note)`
- `eventManagement.create(data, createdBy)`
- `communityManagement.create(data, createdBy)`
- `resetDatabase()`

## User

Represents a person using the platform. Everyone is a user/participant first, regardless of whether they also host, create, facilitate, steward, or manage something.

Expected properties and methods:

- `id`
- `profile()`
- `tags()`
- `participationEdges()`
- `edgeTo(community)`
- `events.attending()`
- `events.interested()`
- `events.managed()`
- `events.recommended()`
- `dataShareRequests()`
- `visibilityGrants()`
- `communities.followed()`
- `communities.member()`
- `communities.committed()`
- `communities.dormant()`
- `communities.managed()`
- `followCommunity(community)`
- `requestMembership(community, note)`
- `createEvent(data)`
- `createCommunity(data)`
- `canManageEvent(event)`
- `canManageCommunity(community)`

## Event

Represents an event/offering.

Expected properties and methods:

- `id`
- `data()`
- `title()`
- `changeName(name)`
- `addTag(tag)`
- `removeTag(tag)`
- `setVenue(venue)`
- `setAccess(access)`
- `registerUser(user)`
- `markUserInterested(user)`
- `suggestToCommunity(community, suggestedBy, note)`
- `relevanceFor(user)`
- `linkedCommunities()`
- `relevantCommunities()`
- `venue()`
- `canBeManagedBy(user)`
- `dataShareRequests()`

Creation:

- `platform.events.create(data, createdBy)`
- `user.createEvent(data)`

## Community

Represents a managed social container.

Expected properties and methods:

- `id`
- `data()`
- `name()`
- `changeName(name)`
- `addTag(tag)`
- `removeTag(tag)`
- `addVenue(venue)`
- `removeVenue(venue)`
- `updateEntryGuidance(text)`
- `updateAccessRules(text)`
- `followedBy(user)`
- `requestMembership(user, note)`
- `approveMembershipRequest(requestId, approver)`
- `markRelationshipTo(otherCommunity, type, note, markedBy)`
- `events()`
- `bridgeEvents()`
- `deeperEvents()`
- `participationEdges()`
- `personalMetricsFor(user)`
- `health()`
- `generatedFields()`
- `canBeManagedBy(user)`
- `dataShareRequests()`

Creation:

- `platform.communities.create(data, createdBy)`
- `user.createCommunity(data)`

## Venue

Represents a physical place.

Expected properties and methods:

- `id`
- `data()`
- `name()`
- `communities()`
- `events()`

## ParticipationEdge

Represents a user's relationship to a community.

Expected properties and methods:

- `id`
- `data()`
- `user()`
- `community()`
- `strength()`
- `makeDormant()`
- `reactivate()`
- `update(patch)`

ParticipationEdge remains the high-resolution person-to-community relationship object. It is not replaced by FieldRelation.

## FieldRelation

Represents a broader object-to-object or context-to-context connection. It can connect people, communities, events, venues, generated fields, festivals, practices, and tags. Creator, facilitator, and steward are not separate entity types yet; model those as person roles or relation kinds.

SuggestedEventShare is still supported for older event-to-community suggestion flows. New calls to `eventSuggestions.suggest(...)` keep creating `suggestedEventShares` and also mirror the suggestion into a FieldRelation.

Expected properties and methods:

- `id`
- `data()`
- `source()`
- `target()`
- `isPending()`
- `isAccepted()`
- `isVisibleTo(visibilityContext?)`
- `explanation()`
- `movementOptions()`
- `reviews()`

Managed repository methods:

- `platform.fieldRelations.get(id)`
- `platform.fieldRelations.list()`
- `platform.fieldRelations.forObject(type, id)`
- `platform.fieldRelations.between(sourceType, sourceId, targetType, targetId)`
- `platform.fieldRelations.suggest(data, suggestedBy)`
- `platform.fieldRelations.accept(id, reviewerId, note?)`
- `platform.fieldRelations.refine(id, reviewerId, patch, note?)`
- `platform.fieldRelations.decline(id, reviewerId, note?)`
- `platform.fieldRelations.redirect(id, reviewerId, targetType, targetId, note?)`
- `platform.fieldRelations.markComputedOnly(id, reviewerId, note?)`
- `platform.fieldRelations.forReviewAuthority(type, id)`
- `platform.fieldRelations.pendingForCommunity(communityId)`

`movementOptions()` returns domain `MovementType` values, not UI copy. Future user-facing mockups should translate those through `General context/Language and copy register.md`.

`isAccepted()` treats both `accepted` and `refined` as reviewed/active relation states. Low-level calculations also expose `activeRelationsForObject(...)`, which includes `accepted`, `refined`, and `computed` relations.

`isVisibleTo(...)` is currently a simple visibility-context helper. It is not full user-aware permission or access-control logic.

## DataShareRequest

Represents a contextual data exchange request, offer, or requirement. It can be attached to an event, community, venue, person, or relationship context and asks for semantic data facets such as name, contact route, attendance, access need, experience note, profile summary, or community relationship.

Expected properties and methods:

- `id`
- `data()`
- `accept(acceptedBy?)`
- `revoke(revokedBy?)`
- `visibilityGrants()`

Managed repository methods:

- `platform.dataShareRequests.get(id)`
- `platform.dataShareRequests.list()`
- `platform.dataShareRequests.forSubject(type, id)`
- `platform.dataShareRequests.forContext(type, id)`
- `platform.dataShareRequests.create(data)`
- `platform.dataShareRequests.accept(id, acceptedBy?)`
- `platform.dataShareRequests.revoke(id, revokedBy?)`

Accepting a request through the managed access layer creates or updates a source `VisibilityGrant`. Revoking a request revokes active grants created from that request.

## VisibilityGrant

Represents a durable current visibility relation: which facets of a subject are visible to a recipient scope, in a context, for a purpose.

Expected properties and methods:

- `id`
- `data()`
- `isActive()`
- `revoke(revokedBy?)`
- `covers(query)`

Managed repository methods:

- `platform.visibilityGrants.get(id)`
- `platform.visibilityGrants.list()`
- `platform.visibilityGrants.forSubject(type, id)`
- `platform.visibilityGrants.forContext(type, id)`
- `platform.visibilityGrants.create(data)`
- `platform.visibilityGrants.revoke(id, revokedBy?)`
- `platform.visibilityGrants.canSee(query)`

`VisibilityGrant` is not meant to be read directly by frontend code as a permission shortcut. Use repository/service methods such as `canSee(...)` or future presentation-specific access methods so visibility logic stays centralized.

## DataShareService

Coordinates request and grant consistency.

Expected methods:

- `createRequest(data)`
- `acceptRequest(id, acceptedBy?)`
- `revokeRequest(id, revokedBy?)`
- `createGrant(data)`
- `revokeGrant(id, revokedBy?)`
- `grantsCoveringRequest(id)`
- `coverageForRequest(id)`
- `coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel?)`
- `missingRequestsForContext(contextType, contextId, subjectType, subjectId, requirementLevel?)`
- `canSee(query)`

This service is the first visibility-resolution layer. It does not decide UI presentation, timing, or copy. It exposes structured state and authoritative checks that frontend surfaces can use.

## GeneratedField

Represents a computed field, not a managed community.

Expected properties and methods:

- `id`
- `data()`
- `communities()`
- `bridgeEvents()`
- `deeperEvents()`
- `bridgePeople()`

Generated fields are read-oriented unless intentionally converted into a community through a future community creation flow.

## GeneratedFieldHandler

Expected methods:

- `generateFields()`
- `generateFieldsFromCommunities(communities)`
- `get(id)`

## RecommendationService

Expected methods:

- `eventsForUser(user)`
- `communitiesForUser(user)`
- `groupsForEventDraft(eventDraft)`

## CommunityHealthService

Expected methods:

- `summarize(community)`
- `bondingScore(community)`
- `bridgingScore(community)`
- `newcomerDropoff(community)`
- `dormantParticipants(community)`

## Lower-Level Database Access

The generic database API remains available for dev tools and test tooling, but normal feature code should use the domain objects above.
