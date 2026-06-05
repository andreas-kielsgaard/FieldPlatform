const {
  createPlatformDataLayer,
  createInitialPlatformSnapshot,
  calculations,
  database
} = require("../build/node");

const layer = createPlatformDataLayer({
  adapter: database.createMemoryAdapter(),
  seedFactory: createInitialPlatformSnapshot,
  calculations
});

const initial = layer.getSnapshot();
assert(initial.people.length >= 6, "seed should include people");
assert(initial.groups.length >= 6, "seed should include groups");
assert(initial.events.length >= 6, "seed should include events");
assert(initial.participationEdges.every(edge => edge.id), "edges should be normalized with ids");
assert(initial.fieldRelations.length >= 6, "seed should include FieldRelations");
assert(initial.relationReviews.length >= 3, "seed should include RelationReviews");
assert(initial.dataShareRequests.length >= 2, "seed should include DataShareRequests");
assert(initial.visibilityGrants.length >= 2, "seed should include VisibilityGrants");

const event = layer.database.update("events", "e_ci_jam", current => ({
  attendance: {
    ...current.attendance,
    interested: [...new Set([...current.attendance.interested, "p_casey"])]
  }
}));
assert(event.attendance.interested.includes("p_casey"), "generic update should persist event interest");

layer.database.update("events", "e_ci_jam", current => ({
  attendance: {
    interested: current.attendance.interested.filter(personId => personId !== "p_casey"),
    attending: [...new Set([...current.attendance.attending, "p_casey"])]
  }
}));
const updatedEvent = layer.queries.getEvent("e_ci_jam");
assert(updatedEvent.attendance.attending.includes("p_casey"), "generic update should persist attendance");

const request = layer.database.create("membershipRequests", {
  personId: "p_casey",
  groupId: "ci",
  status: "pending",
  note: "Smoke test request"
});
assert(request.status === "pending", "membership request should be created");

const createdEdge = layer.database.create("participationEdges", {
  personId: "p_casey",
  groupId: "ci",
  relationshipState: "curious",
  accessLevel: "known",
  recency: 10,
  frequency: 5,
  contributionLevel: 0,
  trustLevel: 0,
  roleModes: [],
  socialEmbeddedness: "none",
  normFamiliarity: "new",
  identitySalience: "low",
  visibility: "privateToUser",
  decayState: "active"
});
const edge = layer.database.update("participationEdges", createdEdge.id, {
  accessLevel: "requested"
});
assert(edge.accessLevel === "requested", "generic update should persist participation edge changes");

const recommendation = layer.calculations.eventInterest("p_casey", "e_ci_jam");
assert(recommendation && typeof recommendation.score === "number", "event interest should be calculated through layer");

const summary = layer.calculations.summarizeGroup("ci");
assert(typeof summary.bondingScore === "number", "group summary should include bonding score");

const seededRelation = layer.queries.getFieldRelation("fr_ci_jam_good_first_step_ci");
assert(seededRelation && seededRelation.status === "accepted", "seeded FieldRelation should be queryable");
assert(layer.queries.listFieldRelations().length >= initial.fieldRelations.length, "FieldRelations should be listable");
assert(layer.calculations.acceptedRelationsForObject("event", "e_ci_jam").some(relation => relation.id === seededRelation.id), "accepted relations should be calculable for an object");
assert(layer.calculations.acceptedRelationsForObject("event", "e_circling_intro").some(relation => relation.id === "fr_circling_intro_refined_to_tea"), "refined relations should remain in reviewed/accepted relation views");
assert(layer.calculations.activeRelationsForObject("venue", "v_dome").some(relation => relation.id === "fr_dome_shares_venue_somatic"), "computed relations should appear in active relation views");
assert(layer.calculations.pendingRelationsForReviewAuthority("community", "ecstatic").some(relation => relation.id === "fr_harbor_tea_soft_landing_ecstatic"), "pending relation review queue should be calculable");
assert(layer.calculations.movementOptionsForRelation(seededRelation.id).includes("attend"), "movement options should include attend for accepted event-community relation");
assert(layer.calculations.relationExplanation(seededRelation.id).reason, "relation explanation should include a reason");
assert(layer.calculations.holdSignalsForObject("community", "ci").some(signal => signal.holdType === "threshold"), "hold signals should summarize hold types");

const seededDataShareRequest = layer.queries.getDataShareRequest("dsr_ci_jam_casey_name_contact");
assert(seededDataShareRequest && seededDataShareRequest.status === "accepted", "seeded DataShareRequest should be queryable");
assert(layer.queries.getDataShareRequestsForSubject("person", "p_casey").some(item => item.id === seededDataShareRequest.id), "DataShareRequests should be queryable by subject");
assert(layer.queries.getDataShareRequestsForContext("event", "e_ci_jam").some(item => item.id === seededDataShareRequest.id), "DataShareRequests should be queryable by context");

const seededVisibilityGrant = layer.queries.getVisibilityGrant("vg_ci_jam_casey_name_contact");
assert(seededVisibilityGrant && seededVisibilityGrant.status === "active", "seeded VisibilityGrant should be queryable");
assert(layer.queries.getVisibilityGrantsForSubject("person", "p_casey").some(item => item.id === seededVisibilityGrant.id), "VisibilityGrants should be queryable by subject");
assert(layer.queries.getVisibilityGrantsForContext("event", "e_ci_jam").some(item => item.id === seededVisibilityGrant.id), "VisibilityGrants should be queryable by context");

const createdRelation = layer.database.create("fieldRelations", {
  sourceType: "event",
  sourceId: "e_morning_sit",
  targetType: "community",
  targetId: "meditation",
  relationKind: "good_first_step_for",
  status: "suggested",
  provenance: "user_suggested",
  suggestedBy: "p_casey",
  reviewAuthorityType: "community",
  reviewAuthorityId: "meditation",
  visibility: "visible_to_stewards",
  reason: "Smoke test suggested connection.",
  holdTypes: ["stewardship"],
  movementUnlocked: ["ask_steward"]
});
assert(createdRelation.id, "generic create should persist FieldRelation");

const review = layer.database.create("relationReviews", {
  fieldRelationId: createdRelation.id,
  reviewerId: "p_henrik",
  action: "accept",
  previousStatus: "suggested",
  nextStatus: "accepted",
  note: "Smoke test review"
});
assert(review.id, "generic create should persist RelationReview");

const createdDataShareRequest = layer.database.create("dataShareRequests", {
  requesterType: "event",
  requesterId: "e_morning_sit",
  subjectType: "person",
  subjectId: "p_casey",
  contextType: "event",
  contextId: "e_morning_sit",
  facets: ["name"],
  recipientScope: "event_facilitators",
  purpose: "event_logistics",
  requirementLevel: "required_before_action",
  status: "pending"
});
assert(createdDataShareRequest.id, "generic create should persist DataShareRequest");

const createdVisibilityGrant = layer.database.create("visibilityGrants", {
  sourceRequestId: createdDataShareRequest.id,
  subjectType: "person",
  subjectId: "p_casey",
  contextType: "event",
  contextId: "e_morning_sit",
  facets: ["name"],
  recipientScope: "event_facilitators",
  purpose: "event_logistics",
  status: "active"
});
assert(createdVisibilityGrant.id, "generic create should persist VisibilityGrant");

const createdCommunity = layer.database.create("groups", {
  name: "Smoke Test Community",
  description: "Temporary community for data layer smoke tests.",
  tags: ["test"],
  norms: [],
  venues: [],
  stewards: ["p_casey"],
  rhythm: "Irregular",
  accessRules: "Draft only",
  entryGuidance: "Ask the test runner.",
  creatorId: "p_casey"
});
assert(layer.queries.canManageCommunity("p_casey", createdCommunity.id), "creator should manage created community");

const reset = layer.resetDatabase();
assert(!reset.groups.some(group => group.id === createdCommunity.id), "reset should restore initial snapshot");

console.log("Platform data layer smoke test passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
