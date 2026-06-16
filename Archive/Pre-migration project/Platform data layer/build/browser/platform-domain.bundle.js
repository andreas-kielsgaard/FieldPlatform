"use strict";
var FieldPlatformDomain = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // source/access-layer/domain.ts
  var domain_exports = {};
  __export(domain_exports, {
    Community: () => Community,
    CommunityHealthService: () => CommunityHealthService,
    CommunityManagementService: () => CommunityManagementService,
    CommunityRepository: () => CommunityRepository,
    DataShareRequest: () => DataShareRequest,
    DataShareRequestRepository: () => DataShareRequestRepository,
    DataShareService: () => DataShareService,
    Event: () => Event,
    EventManagementService: () => EventManagementService,
    EventRegistrationService: () => EventRegistrationService,
    EventRepository: () => EventRepository,
    EventSuggestionService: () => EventSuggestionService,
    FieldRelation: () => FieldRelation,
    FieldRelationRepository: () => FieldRelationRepository,
    FieldRelationService: () => FieldRelationService,
    GeneratedField: () => GeneratedField,
    GeneratedFieldHandler: () => GeneratedFieldHandler,
    MembershipService: () => MembershipService,
    ParticipationEdge: () => ParticipationEdge,
    ParticipationService: () => ParticipationService,
    PlatformDomain: () => PlatformDomain,
    RecommendationService: () => RecommendationService,
    User: () => User,
    UserCommunityAccess: () => UserCommunityAccess,
    UserEventAccess: () => UserEventAccess,
    UserRepository: () => UserRepository,
    Venue: () => Venue,
    VenueRepository: () => VenueRepository,
    VisibilityGrant: () => VisibilityGrant,
    VisibilityGrantRepository: () => VisibilityGrantRepository,
    createPlatformDomain: () => createPlatformDomain
  });

  // source/access-layer/infrastructure/loadLowLevelModule.ts
  function loadLowLevelModule() {
    if (typeof window !== "undefined" && window.FieldPlatformDatabase && window.FieldPlatformSeed && window.FieldPlatformCalculations) {
      return {
        createPlatformDataLayer: (options = {}) => window.FieldPlatformDatabase.createDataLayer({
          seedFactory: window.FieldPlatformSeed.createInitialPlatformSnapshot,
          calculations: window.FieldPlatformCalculations,
          ...options
        })
      };
    }
    if (typeof __require === "function") {
      return __require("../../index");
    }
    return null;
  }

  // source/access-layer/utils/domainUtils.ts
  function idOf(value) {
    return typeof value === "string" ? value : value.id;
  }
  function addUnique(items, item) {
    return items.includes(item) ? [...items] : [...items, item];
  }
  function normalizeEventDraft(data, creatorId) {
    return {
      access: "public",
      tags: [],
      linkedGroups: [],
      relevantGroups: [],
      attendance: { interested: [], attending: [] },
      ...data,
      creatorId: data.creatorId || creatorId,
      hostId: data.hostId || creatorId
    };
  }
  function normalizeCommunityDraft(data) {
    return {
      state: "draft",
      tags: [],
      norms: [],
      venues: [],
      stewards: [],
      ...data
    };
  }
  function touchesCommunity(event, communityId) {
    return [...event.linkedGroups, ...event.relevantGroups].includes(communityId);
  }
  function isBridgeEvent(event) {
    return event.access === "public" || event.tags.includes("beginner-friendly") || event.tags.includes("low-threshold") || event.tags.includes("drop-in");
  }
  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  // source/access-layer/models/participationEdge.ts
  var ParticipationEdge = class _ParticipationEdge {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().database.get("participationEdges", this.id);
    }
    user() {
      return this.platform.users.get(this.data().personId);
    }
    community() {
      return this.platform.communities.get(this.data().groupId);
    }
    strength() {
      return Number(this.platform.raw().calculations.engagementStrength(this.id));
    }
    makeDormant() {
      const record = this.platform.participation.makeDormant(this.data().personId, this.data().groupId);
      return new _ParticipationEdge(this.platform, record.id);
    }
    reactivate() {
      const record = this.platform.participation.reactivate(this.data().personId, this.data().groupId);
      return new _ParticipationEdge(this.platform, record.id);
    }
    update(patch) {
      this.platform.participation.setEdge(this.data().personId, this.data().groupId, patch);
      return this;
    }
  };

  // source/access-layer/models/community.ts
  var Community = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getGroup(this.id);
    }
    name() {
      return this.data().name;
    }
    changeName(name) {
      this.platform.communityManagement.update(this.id, { name });
      return this;
    }
    addTag(tag) {
      const tags = addUnique(this.data().tags, tag);
      this.platform.communityManagement.update(this.id, { tags });
      return this;
    }
    removeTag(tag) {
      const tags = this.data().tags.filter((existing) => existing !== tag);
      this.platform.communityManagement.update(this.id, { tags });
      return this;
    }
    addVenue(venue) {
      const venues = addUnique(this.data().venues, idOf(venue));
      this.platform.communityManagement.update(this.id, { venues });
      return this;
    }
    removeVenue(venue) {
      const venueId = idOf(venue);
      const venues = this.data().venues.filter((existing) => existing !== venueId);
      this.platform.communityManagement.update(this.id, { venues });
      return this;
    }
    updateEntryGuidance(entryGuidance) {
      this.platform.communityManagement.update(this.id, { entryGuidance });
      return this;
    }
    updateAccessRules(accessRules) {
      this.platform.communityManagement.update(this.id, { accessRules });
      return this;
    }
    followedBy(user) {
      const record = this.platform.participation.followGroup(idOf(user), this.id);
      return new ParticipationEdge(this.platform, record.id);
    }
    requestMembership(user, note = "") {
      return this.platform.memberships.request(idOf(user), this.id, note);
    }
    approveMembershipRequest(requestId, approver) {
      const record = this.platform.memberships.approve(requestId, idOf(approver));
      return new ParticipationEdge(this.platform, record.id);
    }
    markRelationshipTo(otherCommunity, type = "markedBySteward", note = "", markedBy) {
      return this.platform.communityManagement.markRelationshipTo(this.id, idOf(otherCommunity), type, note, markedBy ? idOf(markedBy) : null);
    }
    events() {
      return this.platform.events.list().filter((event) => touchesCommunity(event.data(), this.id));
    }
    bridgeEvents() {
      return this.events().filter((event) => isBridgeEvent(event.data()));
    }
    deeperEvents() {
      return this.events().filter((event) => !isBridgeEvent(event.data()));
    }
    participationEdges() {
      return this.platform.raw().queries.getEdgesForGroup(this.id).map((record) => new ParticipationEdge(this.platform, record.id));
    }
    personalMetricsFor(user) {
      return this.platform.raw().calculations.personalGroupMetrics(idOf(user), this.id);
    }
    health() {
      return this.platform.communityHealth.summarize(this);
    }
    generatedFields() {
      return this.platform.generatedFields.generateFieldsFromCommunities([this]);
    }
    canBeManagedBy(user) {
      return Boolean(this.platform.raw().queries.canManageCommunity(idOf(user), this.id));
    }
    dataShareRequests() {
      return this.platform.dataShareRequests.forContext("community", this.id);
    }
  };

  // source/access-layer/repositories/communityRepository.ts
  var CommunityRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getGroup(id);
      if (!record) throw new Error(`Community not found: ${id}`);
      return new Community(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listGroups().map((record) => new Community(this.platform, record.id));
    }
    create(data, createdBy) {
      const creatorId = idOf(createdBy);
      const record = this.platform.communityManagement.create(data, creatorId);
      return new Community(this.platform, record.id);
    }
  };

  // source/access-layer/models/visibilityGrant.ts
  var VisibilityGrant = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getVisibilityGrant(this.id);
    }
    isActive() {
      return this.data().status === "active";
    }
    revoke(revokedBy) {
      this.platform.dataShares.revokeGrant(this.id, revokedBy);
      return this;
    }
    covers(query) {
      const grant = this.data();
      if (grant.status !== "active") return false;
      if (grant.subjectType !== query.subjectType || grant.subjectId !== query.subjectId) return false;
      if (!grant.facets.includes(query.facet)) return false;
      if (query.purpose && grant.purpose !== query.purpose) return false;
      if (query.recipientScope && grant.recipientScope !== query.recipientScope && grant.recipientScope !== "public") return false;
      if (query.recipientId && (grant.recipientIds || []).length > 0 && !(grant.recipientIds || []).includes(query.recipientId)) return false;
      if (grant.contextType || grant.contextId) return grant.contextType === query.contextType && grant.contextId === query.contextId;
      return true;
    }
  };

  // source/access-layer/models/dataShareRequest.ts
  var DataShareRequest = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getDataShareRequest(this.id);
    }
    accept(acceptedBy) {
      this.platform.dataShares.acceptRequest(this.id, acceptedBy);
      return this;
    }
    revoke(revokedBy) {
      this.platform.dataShares.revokeRequest(this.id, revokedBy);
      return this;
    }
    visibilityGrants() {
      return this.platform.dataShares.grantsCoveringRequest(this.id).map((grant) => new VisibilityGrant(this.platform, grant.id));
    }
  };

  // source/access-layer/repositories/dataShareRequestRepository.ts
  var DataShareRequestRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getDataShareRequest(id);
      if (!record) throw new Error(`DataShareRequest not found: ${id}`);
      return new DataShareRequest(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listDataShareRequests().map((record) => new DataShareRequest(this.platform, record.id));
    }
    forSubject(subjectType, subjectId) {
      return this.platform.raw().queries.getDataShareRequestsForSubject(subjectType, subjectId).map((record) => new DataShareRequest(this.platform, record.id));
    }
    forContext(contextType, contextId) {
      return this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId).map((record) => new DataShareRequest(this.platform, record.id));
    }
    create(data) {
      const record = this.platform.dataShares.createRequest(data);
      return new DataShareRequest(this.platform, record.id);
    }
    accept(id, acceptedBy) {
      const { request } = this.platform.dataShares.acceptRequest(id, acceptedBy);
      return new DataShareRequest(this.platform, request.id);
    }
    revoke(id, revokedBy) {
      const request = this.platform.dataShares.revokeRequest(id, revokedBy);
      return new DataShareRequest(this.platform, request.id);
    }
  };

  // source/access-layer/models/event.ts
  var Event = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getEvent(this.id);
    }
    title() {
      return this.data().title;
    }
    changeName(name) {
      this.platform.eventManagement.update(this.id, { title: name });
      return this;
    }
    addTag(tag) {
      const tags = addUnique(this.data().tags, tag);
      this.platform.eventManagement.update(this.id, { tags });
      return this;
    }
    removeTag(tag) {
      const tags = this.data().tags.filter((existing) => existing !== tag);
      this.platform.eventManagement.update(this.id, { tags });
      return this;
    }
    setVenue(venue) {
      this.platform.eventManagement.update(this.id, { venueId: idOf(venue) });
      return this;
    }
    setAccess(access) {
      this.platform.eventManagement.update(this.id, { access });
      return this;
    }
    registerUser(user) {
      this.platform.eventRegistration.register(idOf(user), this.id);
      return this;
    }
    markUserInterested(user) {
      this.platform.eventRegistration.markInterested(idOf(user), this.id);
      return this;
    }
    suggestToCommunity(community, suggestedBy, note = "") {
      return this.platform.eventSuggestions.suggest(this.id, idOf(community), idOf(suggestedBy), note);
    }
    relevanceFor(user) {
      return this.platform.raw().calculations.eventInterest(idOf(user), this.id);
    }
    linkedCommunities() {
      return this.data().linkedGroups.map((groupId) => this.platform.communities.get(groupId));
    }
    relevantCommunities() {
      return this.data().relevantGroups.map((groupId) => this.platform.communities.get(groupId));
    }
    venue() {
      return this.platform.venues.get(this.data().venueId);
    }
    canBeManagedBy(user) {
      return Boolean(this.platform.raw().queries.canManageEvent(idOf(user), this.id));
    }
    dataShareRequests() {
      return this.platform.dataShareRequests.forContext("event", this.id);
    }
  };

  // source/access-layer/repositories/eventRepository.ts
  var EventRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getEvent(id);
      if (!record) throw new Error(`Event not found: ${id}`);
      return new Event(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listEvents().map((record) => new Event(this.platform, record.id));
    }
    create(data, createdBy) {
      const creatorId = idOf(createdBy);
      const record = this.platform.eventManagement.create(data, creatorId);
      return new Event(this.platform, record.id);
    }
  };

  // source/access-layer/models/fieldRelation.ts
  var FieldRelation = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getFieldRelation(this.id);
    }
    source() {
      const record = this.data();
      return objectFor(this.platform, record.sourceType, record.sourceId);
    }
    target() {
      const record = this.data();
      return objectFor(this.platform, record.targetType, record.targetId);
    }
    isPending() {
      return this.data().status === "suggested";
    }
    isAccepted() {
      return ["accepted", "refined"].includes(this.data().status);
    }
    // This is a simple visibility-context check, not full user-aware access control.
    isVisibleTo(visibilityContext = "public") {
      const relation = this.data();
      if (relation.visibility === "public") return true;
      const context = typeof visibilityContext === "string" ? visibilityContext : visibilityContext.visibility || "private";
      if (relation.visibility === "private") return context === "private";
      if (relation.visibility === "visible_to_stewards") return ["private", "visible_to_stewards"].includes(context);
      if (relation.visibility === "visible_to_members") return ["private", "visible_to_stewards", "visible_to_members"].includes(context);
      return false;
    }
    explanation() {
      return this.platform.raw().calculations.relationExplanation(this.id);
    }
    movementOptions() {
      return this.platform.raw().calculations.movementOptionsForRelation(this.id);
    }
    reviews() {
      return clone(this.platform.raw().queries.getRelationReviewsForRelation(this.id) || []);
    }
  };
  function objectFor(platform, objectType, objectId) {
    if (objectType === "person") return platform.users.get(objectId);
    if (objectType === "community") return platform.communities.get(objectId);
    if (objectType === "event") return platform.events.get(objectId);
    if (objectType === "venue") return platform.venues.get(objectId);
    if (objectType === "generatedField") return platform.generatedFields.get(objectId);
    if (objectType === "festival") {
      return platform.raw().queries.getFestival(objectId);
    }
    if (objectType === "practice" || objectType === "tag") return { id: objectId, objectType };
    return { id: objectId, objectType };
  }

  // source/access-layer/repositories/fieldRelationRepository.ts
  var FieldRelationRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getFieldRelation(id);
      if (!record) throw new Error(`FieldRelation not found: ${id}`);
      return new FieldRelation(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listFieldRelations().map((record) => new FieldRelation(this.platform, record.id));
    }
    forObject(type, id) {
      return this.platform.raw().queries.getFieldRelationsForObject(type, id).map((record) => new FieldRelation(this.platform, record.id));
    }
    between(sourceType, sourceId, targetType, targetId) {
      return this.platform.raw().queries.getFieldRelationsBetween(sourceType, sourceId, targetType, targetId).map((record) => new FieldRelation(this.platform, record.id));
    }
    suggest(data, suggestedBy) {
      const record = this.platform.fieldRelationService.suggest(data, suggestedBy);
      return new FieldRelation(this.platform, record.id);
    }
    accept(id, reviewerId, note = "") {
      const record = this.platform.fieldRelationService.accept(id, reviewerId, note);
      return new FieldRelation(this.platform, record.id);
    }
    refine(id, reviewerId, patch, note = "") {
      const record = this.platform.fieldRelationService.refine(id, reviewerId, patch, note);
      return new FieldRelation(this.platform, record.id);
    }
    decline(id, reviewerId, note = "") {
      const record = this.platform.fieldRelationService.decline(id, reviewerId, note);
      return new FieldRelation(this.platform, record.id);
    }
    redirect(id, reviewerId, targetType, targetId, note = "") {
      const record = this.platform.fieldRelationService.redirect(id, reviewerId, targetType, targetId, note);
      return new FieldRelation(this.platform, record.id);
    }
    markComputedOnly(id, reviewerId, note = "") {
      const record = this.platform.fieldRelationService.markComputedOnly(id, reviewerId, note);
      return new FieldRelation(this.platform, record.id);
    }
    forReviewAuthority(type, id) {
      return this.platform.raw().queries.getFieldRelationsForReviewAuthority(type, id).map((record) => new FieldRelation(this.platform, record.id));
    }
    pendingForCommunity(communityId) {
      return this.platform.raw().queries.getPendingFieldRelationsForReviewAuthority("community", communityId).map((record) => new FieldRelation(this.platform, record.id));
    }
  };

  // source/access-layer/models/userCommunityAccess.ts
  var UserCommunityAccess = class {
    constructor(platform, user) {
      this.platform = platform;
      this.user = user;
    }
    followed() {
      return this.edgesByState(["observing", "curious", "occasional"]);
    }
    member() {
      return this.user.participationEdges().filter((edge) => ["member", "trusted", "core", "requested"].includes(edge.data().accessLevel)).map((edge) => edge.community());
    }
    committed() {
      return this.edgesByState(["recurring", "contributor", "facilitator", "steward"]);
    }
    dormant() {
      return this.user.participationEdges().filter((edge) => edge.data().relationshipState === "dormant" || edge.data().decayState === "dormant" || edge.data().decayState === "fading").map((edge) => edge.community());
    }
    managed() {
      return this.platform.communities.list().filter((community) => community.canBeManagedBy(this.user));
    }
    edgesByState(states) {
      return this.user.participationEdges().filter((edge) => states.includes(edge.data().relationshipState)).map((edge) => edge.community());
    }
  };

  // source/access-layer/models/userEventAccess.ts
  var UserEventAccess = class {
    constructor(platform, user) {
      this.platform = platform;
      this.user = user;
    }
    attending() {
      return this.platform.events.list().filter((event) => event.data().attendance.attending.includes(this.user.id));
    }
    interested() {
      return this.platform.events.list().filter((event) => event.data().attendance.interested.includes(this.user.id));
    }
    managed() {
      return this.platform.events.list().filter((event) => event.canBeManagedBy(this.user));
    }
    recommended() {
      return this.platform.recommendations.eventsForUser(this.user);
    }
  };

  // source/access-layer/models/user.ts
  var User = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
      this.events = new UserEventAccess(platform, this);
      this.communities = new UserCommunityAccess(platform, this);
    }
    profile() {
      return this.platform.raw().queries.getPerson(this.id);
    }
    name() {
      return this.profile().name;
    }
    tags() {
      return [...this.profile().tags];
    }
    participationEdges() {
      return this.platform.raw().queries.getEdgesForPerson(this.id).map((record) => new ParticipationEdge(this.platform, record.id));
    }
    edgeTo(community) {
      const record = this.platform.raw().queries.getParticipationEdge(this.id, idOf(community));
      return record ? new ParticipationEdge(this.platform, record.id) : null;
    }
    followCommunity(community) {
      const record = this.platform.participation.followGroup(this.id, idOf(community));
      return new ParticipationEdge(this.platform, record.id);
    }
    requestMembership(community, note = "") {
      return this.platform.memberships.request(this.id, idOf(community), note);
    }
    createEvent(data) {
      return this.platform.events.create(data, this);
    }
    createCommunity(data) {
      return this.platform.communities.create(data, this);
    }
    canManageEvent(event) {
      return Boolean(this.platform.raw().queries.canManageEvent(this.id, idOf(event)));
    }
    canManageCommunity(community) {
      return Boolean(this.platform.raw().queries.canManageCommunity(this.id, idOf(community)));
    }
    dataShareRequests() {
      return this.platform.dataShareRequests.forSubject("person", this.id);
    }
    visibilityGrants() {
      return this.platform.visibilityGrants.forSubject("person", this.id);
    }
  };

  // source/access-layer/repositories/userRepository.ts
  var UserRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getPerson(id);
      if (!record) throw new Error(`User not found: ${id}`);
      return new User(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listPeople().map((record) => new User(this.platform, record.id));
    }
  };

  // source/access-layer/models/venue.ts
  var Venue = class {
    constructor(platform, id) {
      this.platform = platform;
      this.id = id;
    }
    data() {
      return this.platform.raw().queries.getVenue(this.id);
    }
    name() {
      return this.data().name;
    }
    communities() {
      return this.platform.communities.list().filter((community) => community.data().venues.includes(this.id));
    }
    events() {
      return this.platform.events.list().filter((event) => event.data().venueId === this.id);
    }
  };

  // source/access-layer/repositories/venueRepository.ts
  var VenueRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getVenue(id);
      if (!record) throw new Error(`Venue not found: ${id}`);
      return new Venue(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listVenues().map((record) => new Venue(this.platform, record.id));
    }
  };

  // source/access-layer/repositories/visibilityGrantRepository.ts
  var VisibilityGrantRepository = class {
    constructor(platform) {
      this.platform = platform;
    }
    get(id) {
      const record = this.platform.raw().queries.getVisibilityGrant(id);
      if (!record) throw new Error(`VisibilityGrant not found: ${id}`);
      return new VisibilityGrant(this.platform, id);
    }
    list() {
      return this.platform.raw().queries.listVisibilityGrants().map((record) => new VisibilityGrant(this.platform, record.id));
    }
    forSubject(subjectType, subjectId) {
      return this.platform.raw().queries.getVisibilityGrantsForSubject(subjectType, subjectId).map((record) => new VisibilityGrant(this.platform, record.id));
    }
    forContext(contextType, contextId) {
      return this.platform.raw().queries.getVisibilityGrantsForContext(contextType, contextId).map((record) => new VisibilityGrant(this.platform, record.id));
    }
    create(data) {
      const record = this.platform.dataShares.createGrant(data);
      return new VisibilityGrant(this.platform, record.id);
    }
    revoke(id, revokedBy) {
      const record = this.platform.dataShares.revokeGrant(id, revokedBy);
      return new VisibilityGrant(this.platform, record.id);
    }
    canSee(query) {
      return this.platform.dataShares.canSee(query);
    }
  };

  // source/access-layer/services/communityHealthService.ts
  var CommunityHealthService = class {
    constructor(platform) {
      this.platform = platform;
    }
    summarize(community) {
      return this.platform.raw().calculations.summarizeGroup(idOf(community));
    }
    bondingScore(community) {
      return Number(this.platform.raw().calculations.bondingScore(idOf(community)));
    }
    bridgingScore(community) {
      return Number(this.platform.raw().calculations.bridgingScore(idOf(community)));
    }
    newcomerDropoff(community) {
      return this.platform.raw().calculations.newcomerDropoff(idOf(community));
    }
    dormantParticipants(community) {
      return this.platform.raw().calculations.dormantParticipants(idOf(community));
    }
  };

  // source/access-layer/utils/recordFactories.ts
  function edgeId(personId, groupId) {
    return `edge_${personId}_${groupId}`;
  }
  function groupRelationshipId(fromGroupId, toGroupId, type) {
    return `group_rel_${fromGroupId}_${toGroupId}_${type}_${Date.now()}`;
  }
  function defaultParticipationEdge(personId, groupId) {
    return {
      id: edgeId(personId, groupId),
      personId,
      groupId,
      relationshipState: "observing",
      accessLevel: "public",
      engagementStrength: 0,
      recency: 0,
      frequency: 0,
      contributionLevel: 0,
      trustLevel: 0,
      roleModes: [],
      socialEmbeddedness: "none",
      normFamiliarity: "new",
      identitySalience: "low",
      visibility: "privateToUser",
      decayState: "active"
    };
  }

  // source/access-layer/services/communityManagementService.ts
  var CommunityManagementService = class {
    constructor(platform) {
      this.platform = platform;
    }
    create(data, createdBy) {
      const normalized = normalizeCommunityDraft({
        ...data,
        creatorId: createdBy,
        stewards: addUnique(data.stewards || [], createdBy)
      });
      const community = this.platform.raw().database.create("groups", normalized);
      this.platform.participation.setEdge(createdBy, community.id, {
        relationshipState: "steward",
        accessLevel: "core",
        contributionLevel: 70,
        trustLevel: 70,
        roleModes: ["steward"],
        socialEmbeddedness: "strong",
        normFamiliarity: "carrier",
        visibility: "visibleToStewards",
        decayState: "active"
      });
      return community;
    }
    update(groupId, patch) {
      return this.platform.raw().database.update("groups", groupId, patch);
    }
    markRelationshipTo(fromGroupId, toGroupId, type = "markedBySteward", note = "", markedBy = null) {
      return this.platform.raw().database.create("groupRelationships", {
        id: groupRelationshipId(fromGroupId, toGroupId, type),
        fromGroupId,
        toGroupId,
        type,
        note,
        markedBy,
        source: "managed-access-layer"
      });
    }
  };

  // source/access-layer/services/dataShareService.ts
  var DataShareService = class {
    constructor(platform) {
      this.platform = platform;
    }
    createRequest(data) {
      const now = this.now();
      return this.platform.raw().database.create("dataShareRequests", {
        ...data,
        status: data.status || "pending",
        requirementLevel: data.requirementLevel || "optional_before_action",
        recipientIds: data.recipientIds || [],
        createdAt: data.createdAt || now,
        updatedAt: now
      });
    }
    acceptRequest(id, acceptedBy) {
      const current = this.getRequestRecord(id);
      if (current.status === "revoked") throw new Error(`Cannot accept revoked DataShareRequest: ${id}`);
      const now = this.now();
      const request = this.platform.raw().database.update("dataShareRequests", id, {
        status: "accepted",
        acceptedBy,
        acceptedAt: current.acceptedAt || now,
        updatedAt: now
      });
      const existingGrant = this.activeSourceGrant(request.id);
      const grantPatch = this.grantFromRequest(request, existingGrant?.id);
      const grant = existingGrant ? this.platform.raw().database.update("visibilityGrants", existingGrant.id, {
        ...grantPatch,
        status: "active",
        updatedAt: now
      }) : this.platform.raw().database.create("visibilityGrants", grantPatch);
      return { request, grant };
    }
    revokeRequest(id, revokedBy) {
      const current = this.getRequestRecord(id);
      const now = this.now();
      const request = this.platform.raw().database.update("dataShareRequests", id, {
        status: "revoked",
        revokedBy,
        revokedAt: current.revokedAt || now,
        updatedAt: now
      });
      this.platform.raw().queries.listVisibilityGrants().filter((grant) => grant.sourceRequestId === id && grant.status === "active").forEach((grant) => {
        this.revokeGrant(grant.id, revokedBy);
      });
      return request;
    }
    createGrant(data) {
      const now = this.now();
      return this.platform.raw().database.create("visibilityGrants", {
        ...data,
        status: data.status || "active",
        recipientIds: data.recipientIds || [],
        createdAt: data.createdAt || now,
        updatedAt: now
      });
    }
    revokeGrant(id, revokedBy) {
      const current = this.getGrantRecord(id);
      const now = this.now();
      return this.platform.raw().database.update("visibilityGrants", id, {
        status: "revoked",
        revokedBy,
        revokedAt: current.revokedAt || now,
        updatedAt: now
      });
    }
    grantsCoveringRequest(requestId) {
      const request = this.getRequestRecord(requestId);
      return this.platform.raw().queries.listVisibilityGrants().filter((grant) => this.grantCoversRequest(grant, request));
    }
    coverageForRequest(requestId) {
      const request = this.getRequestRecord(requestId);
      const grants = this.grantsCoveringRequest(request.id);
      return {
        request,
        grants,
        isCovered: grants.length > 0
      };
    }
    coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel) {
      return this.platform.raw().queries.getDataShareRequestsForContext(contextType, contextId).filter((request) => request.subjectType === subjectType && request.subjectId === subjectId).filter((request) => !requirementLevel || request.requirementLevel === requirementLevel).map((request) => this.coverageForRequest(request.id));
    }
    missingRequestsForContext(contextType, contextId, subjectType, subjectId, requirementLevel) {
      return this.coverageForContext(contextType, contextId, subjectType, subjectId, requirementLevel).filter((coverage) => !coverage.isCovered).map((coverage) => coverage.request);
    }
    canSee(query) {
      return this.platform.raw().queries.listVisibilityGrants().some((grant) => this.grantCoversQuery(grant, query));
    }
    getRequestRecord(id) {
      const request = this.platform.raw().queries.getDataShareRequest(id);
      if (!request) throw new Error(`DataShareRequest not found: ${id}`);
      return request;
    }
    getGrantRecord(id) {
      const grant = this.platform.raw().queries.getVisibilityGrant(id);
      if (!grant) throw new Error(`VisibilityGrant not found: ${id}`);
      return grant;
    }
    activeSourceGrant(requestId) {
      return this.platform.raw().queries.listVisibilityGrants().find((grant) => grant.sourceRequestId === requestId && grant.status === "active") || null;
    }
    grantFromRequest(request, id) {
      return {
        id,
        sourceRequestId: request.id,
        subjectType: request.subjectType,
        subjectId: request.subjectId,
        contextType: request.contextType,
        contextId: request.contextId,
        facets: [...request.facets],
        recipientScope: request.recipientScope,
        recipientIds: [...request.recipientIds || []],
        purpose: request.purpose,
        status: "active",
        source: "accepted_data_share_request",
        audienceBehavior: request.materialChangeBehavior || "requires_update_on_change",
        createdAt: request.acceptedAt || this.now(),
        updatedAt: this.now(),
        expiresAt: request.expiresAt
      };
    }
    grantCoversRequest(grant, request) {
      if (!this.isActiveGrant(grant)) return false;
      if (grant.subjectType !== request.subjectType || grant.subjectId !== request.subjectId) return false;
      if (grant.purpose !== request.purpose) return false;
      if (grant.recipientScope !== request.recipientScope && grant.recipientScope !== "public") return false;
      if (!this.contextCovers(grant.contextType, grant.contextId, request.contextType, request.contextId)) return false;
      if (!this.facetsInclude(grant.facets, request.facets)) return false;
      return this.recipientIdsCover(grant.recipientIds || [], request.recipientIds || []);
    }
    grantCoversQuery(grant, query) {
      if (!this.isActiveGrant(grant, query.at)) return false;
      if (grant.subjectType !== query.subjectType || grant.subjectId !== query.subjectId) return false;
      if (!grant.facets.includes(query.facet)) return false;
      if (query.purpose && grant.purpose !== query.purpose) return false;
      if (query.recipientScope && grant.recipientScope !== query.recipientScope && grant.recipientScope !== "public") return false;
      if (query.recipientId && (grant.recipientIds || []).length > 0 && !(grant.recipientIds || []).includes(query.recipientId)) return false;
      return this.contextCovers(grant.contextType, grant.contextId, query.contextType, query.contextId);
    }
    isActiveGrant(grant, at = /* @__PURE__ */ new Date()) {
      if (grant.status !== "active") return false;
      if (!grant.expiresAt) return true;
      const timestamp2 = typeof at === "string" ? new Date(at).getTime() : at.getTime();
      return new Date(grant.expiresAt).getTime() > timestamp2;
    }
    contextCovers(grantType, grantId, requestedType, requestedId) {
      if (!grantType && !grantId) return true;
      return grantType === requestedType && grantId === requestedId;
    }
    facetsInclude(grantFacets, requestedFacets) {
      return requestedFacets.every((facet) => grantFacets.includes(facet));
    }
    recipientIdsCover(grantRecipientIds, requestedRecipientIds) {
      if (requestedRecipientIds.length === 0) return true;
      if (grantRecipientIds.length === 0) return true;
      return requestedRecipientIds.every((id) => grantRecipientIds.includes(id));
    }
    now() {
      return (/* @__PURE__ */ new Date()).toISOString();
    }
  };

  // source/access-layer/services/eventManagementService.ts
  var EventManagementService = class {
    constructor(platform) {
      this.platform = platform;
    }
    create(data, createdBy) {
      const normalized = normalizeEventDraft(data, createdBy);
      return this.platform.raw().database.create("events", normalized);
    }
    update(eventId, patch) {
      const collectionName = this.findEventCollection(eventId);
      return this.platform.raw().database.update(collectionName, eventId, patch);
    }
    findEventCollection(eventId) {
      if (this.platform.raw().database.get("events", eventId)) return "events";
      if (this.platform.raw().database.get("createdEvents", eventId)) return "createdEvents";
      throw new Error(`Event not found: ${eventId}`);
    }
  };

  // source/access-layer/services/eventRegistrationService.ts
  var EventRegistrationService = class {
    constructor(platform) {
      this.platform = platform;
    }
    register(personId, eventId) {
      return this.updateAttendance(eventId, (attendance) => ({
        interested: attendance.interested.filter((id) => id !== personId),
        attending: addUnique(attendance.attending, personId)
      }));
    }
    markInterested(personId, eventId) {
      return this.updateAttendance(eventId, (attendance) => ({
        ...attendance,
        interested: addUnique(attendance.interested, personId)
      }));
    }
    updateAttendance(eventId, update) {
      const collectionName = this.findEventCollection(eventId);
      return this.platform.raw().database.update(collectionName, eventId, (event) => ({
        attendance: update(event.attendance || { interested: [], attending: [] })
      }));
    }
    findEventCollection(eventId) {
      if (this.platform.raw().database.get("events", eventId)) return "events";
      if (this.platform.raw().database.get("createdEvents", eventId)) return "createdEvents";
      throw new Error(`Event not found: ${eventId}`);
    }
  };

  // source/access-layer/services/eventSuggestionService.ts
  var EventSuggestionService = class {
    constructor(platform) {
      this.platform = platform;
    }
    suggest(eventId, groupId, suggestedBy, note = "") {
      const share = this.platform.raw().database.create("suggestedEventShares", {
        eventId,
        groupId,
        suggestedBy,
        status: "pending",
        note
      });
      const existingMirror = this.platform.raw().queries.getFieldRelationsBetween("event", eventId, "community", groupId).find(
        (relation) => relation.relationKind === "relevant_to" && relation.status === "suggested" && relation.provenance === "user_suggested" && relation.suggestedBy === suggestedBy
      );
      if (!existingMirror) {
        this.platform.raw().database.create("fieldRelations", {
          sourceType: "event",
          sourceId: eventId,
          targetType: "community",
          targetId: groupId,
          relationKind: "relevant_to",
          relationStrength: 0,
          status: "suggested",
          provenance: "user_suggested",
          suggestedBy,
          reviewAuthorityType: "community",
          reviewAuthorityId: groupId,
          visibility: "visible_to_stewards",
          reason: note || "Event suggested as related to this community.",
          evidence: [{ type: "suggested_event_share", label: share.id, objectType: "event", objectId: eventId }],
          holdTypes: ["stewardship"],
          movementUnlocked: ["ask_steward", "remain_observing"]
        });
      }
      return share;
    }
    feature(shareId, featuredBy) {
      const updated = this.platform.raw().database.update("suggestedEventShares", shareId, {
        status: "featured",
        featuredBy
      });
      this.platform.raw().database.transaction((snapshot) => {
        if (!snapshot.featuredEvents.includes(updated.eventId)) snapshot.featuredEvents.push(updated.eventId);
      });
      return updated;
    }
  };

  // source/access-layer/services/fieldRelationService.ts
  var FieldRelationService = class {
    constructor(platform) {
      this.platform = platform;
    }
    suggest(data, suggestedBy) {
      const now = timestamp();
      return this.platform.raw().database.create("fieldRelations", {
        relationStrength: 0,
        visibility: "visible_to_stewards",
        evidence: [],
        holdTypes: [],
        movementUnlocked: [],
        ...data,
        status: "suggested",
        provenance: "user_suggested",
        suggestedBy,
        createdAt: data.createdAt || now,
        updatedAt: now
      });
    }
    accept(id, reviewerId, note = "") {
      return this.reviewAndUpdate(id, reviewerId, "accept", { status: "accepted" }, note);
    }
    refine(id, reviewerId, patch, note = "") {
      const { id: _ignoredId, ...safePatch } = patch;
      return this.reviewAndUpdate(id, reviewerId, "refine", { ...safePatch, status: "refined" }, note);
    }
    decline(id, reviewerId, note = "") {
      return this.reviewAndUpdate(id, reviewerId, "decline", { status: "declined", movementUnlocked: ["remain_observing"] }, note);
    }
    redirect(id, reviewerId, targetType, targetId, note = "") {
      return this.reviewAndUpdate(id, reviewerId, "redirect", {
        targetType,
        targetId,
        status: "refined"
      }, note);
    }
    markComputedOnly(id, reviewerId, note = "") {
      return this.reviewAndUpdate(id, reviewerId, "mark_computed_only", {
        status: "computed",
        provenance: "calculated"
      }, note);
    }
    reviewAndUpdate(id, reviewerId, action, patch, note = "") {
      const current = this.platform.raw().queries.getFieldRelation(id);
      if (!current) throw new Error(`FieldRelation not found: ${id}`);
      const previousStatus = current.status;
      const nextStatus = patch.status || current.status;
      const updated = this.platform.raw().database.update("fieldRelations", id, {
        ...patch,
        reviewedBy: reviewerId,
        updatedAt: timestamp()
      });
      this.platform.raw().database.create("relationReviews", {
        fieldRelationId: id,
        reviewerId,
        action,
        previousStatus,
        nextStatus,
        note,
        refinedRelationKind: action === "refine" ? updated.relationKind : void 0,
        redirectedTargetType: action === "redirect" ? updated.targetType : void 0,
        redirectedTargetId: action === "redirect" ? updated.targetId : void 0,
        createdAt: timestamp()
      });
      return updated;
    }
  };
  function timestamp() {
    return (/* @__PURE__ */ new Date()).toISOString();
  }

  // source/access-layer/models/generatedField.ts
  var GeneratedField = class {
    constructor(platform, record) {
      this.platform = platform;
      this.record = record;
    }
    get id() {
      return this.record.id;
    }
    data() {
      return clone(this.record);
    }
    communities() {
      return this.record.groups.map((groupId) => this.platform.communities.get(groupId));
    }
    bridgeEvents() {
      return eventsForField(this.platform, this.record).filter((event) => isBridgeEvent(event.data()));
    }
    deeperEvents() {
      return eventsForField(this.platform, this.record).filter((event) => !isBridgeEvent(event.data()));
    }
    bridgePeople() {
      return this.platform.raw().calculations.bridgePeople(this.record.id);
    }
  };
  function eventsForField(platform, field) {
    return platform.events.list().filter((event) => {
      const record = event.data();
      return [...record.linkedGroups, ...record.relevantGroups].some((groupId) => field.groups.includes(groupId));
    });
  }

  // source/access-layer/services/generatedFieldHandler.ts
  var GeneratedFieldHandler = class {
    constructor(platform) {
      this.platform = platform;
    }
    generateFields() {
      return this.platform.raw().calculations.generatedFields().map((record) => new GeneratedField(this.platform, record));
    }
    generateFieldsFromCommunities(communities) {
      const groupIds = communities.map(idOf);
      return this.generateFields().filter((field) => {
        const fieldGroupIds = field.data().groups;
        return fieldGroupIds.some((groupId) => groupIds.includes(groupId));
      });
    }
    get(id) {
      const field = this.generateFields().find((item) => item.id === id);
      if (!field) throw new Error(`Generated field not found: ${id}`);
      return field;
    }
  };

  // source/access-layer/services/membershipService.ts
  var MembershipService = class {
    constructor(platform) {
      this.platform = platform;
    }
    request(personId, groupId, note = "") {
      const request = this.platform.raw().database.create("membershipRequests", {
        personId,
        groupId,
        status: "pending",
        note
      });
      this.platform.participation.setEdge(personId, groupId, {
        relationshipState: "curious",
        accessLevel: "requested",
        visibility: "visibleToStewards",
        recency: 45,
        decayState: "active"
      });
      return request;
    }
    approve(requestId, approverId) {
      const request = this.platform.raw().database.get("membershipRequests", requestId);
      if (!request) throw new Error(`Membership request not found: ${requestId}`);
      this.platform.raw().database.update("membershipRequests", requestId, {
        status: "approved",
        approvedBy: approverId
      });
      return this.platform.participation.setEdge(request.personId, request.groupId, {
        relationshipState: "recurring",
        accessLevel: "member",
        visibility: "visibleToStewards",
        recency: 60,
        frequency: 35,
        trustLevel: 35,
        normFamiliarity: "familiar",
        socialEmbeddedness: "light",
        decayState: "active"
      });
    }
  };

  // source/access-layer/services/participationService.ts
  var ParticipationService = class {
    constructor(platform) {
      this.platform = platform;
    }
    setEdge(personId, groupId, patch) {
      const existing = this.platform.raw().queries.getParticipationEdge(personId, groupId);
      if (existing) {
        return this.platform.raw().database.update("participationEdges", existing.id, patch);
      }
      return this.platform.raw().database.create("participationEdges", {
        ...defaultParticipationEdge(personId, groupId),
        ...patch,
        personId,
        groupId
      });
    }
    followGroup(personId, groupId) {
      return this.setEdge(personId, groupId, {
        relationshipState: "curious",
        accessLevel: "known",
        recency: 35,
        frequency: 10,
        visibility: "visibleToStewards",
        decayState: "active"
      });
    }
    makeDormant(personId, groupId) {
      return this.setEdge(personId, groupId, {
        relationshipState: "dormant",
        decayState: "dormant",
        recency: 0
      });
    }
    reactivate(personId, groupId) {
      return this.setEdge(personId, groupId, {
        relationshipState: "curious",
        decayState: "reactivating",
        recency: 25,
        visibility: "visibleToStewards"
      });
    }
  };

  // source/access-layer/services/recommendationService.ts
  var RecommendationService = class {
    constructor(platform) {
      this.platform = platform;
    }
    eventsForUser(user) {
      return this.platform.raw().calculations.recommendEventsForPerson(idOf(user)).map((item) => ({
        event: this.platform.events.get(item.event.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
    }
    communitiesForUser(user) {
      return this.platform.raw().calculations.recommendGroupsForPerson(idOf(user)).map((item) => ({
        community: this.platform.communities.get(item.group.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
    }
    groupsForEventDraft(eventDraft) {
      return this.platform.raw().calculations.recommendGroupsForEvent(normalizeEventDraft(eventDraft)).map((item) => ({
        community: this.platform.communities.get(item.group.id),
        score: item.score,
        reasons: [...item.reasons]
      }));
    }
  };

  // source/access-layer/platformDomain.ts
  var lowLevelModule = loadLowLevelModule();
  var PlatformDomain = class _PlatformDomain {
    constructor(options = {}) {
      if (!options.lowLevelPlatform && !lowLevelModule) {
        throw new Error("PlatformDomain requires a low-level platform module.");
      }
      this.lowLevel = options.lowLevelPlatform || lowLevelModule.createPlatformDataLayer({
        adapter: options.adapter,
        storageKey: options.storageKey
      });
      this.participation = new ParticipationService(this);
      this.memberships = new MembershipService(this);
      this.eventRegistration = new EventRegistrationService(this);
      this.fieldRelationService = new FieldRelationService(this);
      this.dataShares = new DataShareService(this);
      this.eventSuggestions = new EventSuggestionService(this);
      this.eventManagement = new EventManagementService(this);
      this.communityManagement = new CommunityManagementService(this);
      this.users = new UserRepository(this);
      this.events = new EventRepository(this);
      this.communities = new CommunityRepository(this);
      this.venues = new VenueRepository(this);
      this.fieldRelations = new FieldRelationRepository(this);
      this.dataShareRequests = new DataShareRequestRepository(this);
      this.visibilityGrants = new VisibilityGrantRepository(this);
      this.generatedFields = new GeneratedFieldHandler(this);
      this.recommendations = new RecommendationService(this);
      this.communityHealth = new CommunityHealthService(this);
    }
    static create(options = {}) {
      return new _PlatformDomain(options);
    }
    resetDatabase() {
      this.lowLevel.resetDatabase();
    }
    snapshot() {
      return this.lowLevel.getSnapshot();
    }
    raw() {
      return this.lowLevel;
    }
  };
  function createPlatformDomain(options = {}) {
    return new PlatformDomain(options);
  }
  return __toCommonJS(domain_exports);
})();
