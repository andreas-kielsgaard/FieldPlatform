const { database } = require("../build/node");
const { createPlatformDomain } = require("../build/node/access-layer/domain");

const platform = createPlatformDomain({
  adapter: database.createMemoryAdapter()
});

const user = platform.users.get("p_casey");
const event = platform.events.get("e_ci_jam");
const community = platform.communities.get("ci");
const venue = platform.venues.get("v_dome");

event.registerUser(user);
assert(event.data().attendance.attending.includes(user.id), "event.registerUser(user) should mark attendance");

event.markUserInterested(user);
assert(event.data().attendance.interested.includes(user.id), "event.markUserInterested(user) should mark interest");

event.changeName("Friday Contact Jam - Managed OO Test");
assert(event.title().includes("Managed OO Test"), "event.changeName should update event title");

event.addTag("managed-oo");
assert(event.data().tags.includes("managed-oo"), "event.addTag should add tag");

event.removeTag("managed-oo");
assert(!event.data().tags.includes("managed-oo"), "event.removeTag should remove tag");

community.addTag("managed-oo-community");
assert(community.data().tags.includes("managed-oo-community"), "community.addTag should add tag");

community.removeTag("managed-oo-community");
assert(!community.data().tags.includes("managed-oo-community"), "community.removeTag should remove tag");

community.addVenue(venue);
assert(community.data().venues.includes(venue.id), "community.addVenue should keep or add venue");

const edge = user.followCommunity(community);
assert(edge.community().id === community.id, "user.followCommunity should return participation edge");

const request = user.requestMembership(community, "Domain smoke request");
assert(request.status === "pending", "user.requestMembership should create request");

const createdEvent = user.createEvent({
  title: "Managed Domain Event",
  venueId: "v_dome",
  tags: ["managed", "domain"],
  audience: "test users"
});
assert(createdEvent.canBeManagedBy(user), "created event should be manageable by creator");

const createdCommunity = user.createCommunity({
  name: "Managed Domain Community",
  description: "Created through the OO domain layer.",
  tags: ["managed", "domain"]
});
assert(createdCommunity.canBeManagedBy(user), "created community should be manageable by creator");

const fields = platform.generatedFields.generateFieldsFromCommunities(user.communities.member());
assert(Array.isArray(fields), "GeneratedFieldHandler.generateFieldsFromCommunities should return an array");

const recommendations = user.events.recommended();
assert(recommendations.length > 0, "user.events.recommended should return event recommendations");

const health = community.health();
assert(typeof health.bondingScore === "number", "community.health should return summary");

const seededRelation = platform.fieldRelations.get("fr_ci_jam_good_first_step_ci");
assert(seededRelation.isAccepted(), "fieldRelations.get should return accepted seeded relation");
assert(platform.fieldRelations.forObject("event", "e_ci_jam").length > 0, "fieldRelations.forObject should list event relations");
assert(platform.fieldRelations.between("event", "e_ci_jam", "community", "ci").length > 0, "fieldRelations.between should list matching relations");
assert(platform.fieldRelations.pendingForCommunity("ecstatic").some(relation => relation.id === "fr_harbor_tea_soft_landing_ecstatic"), "pendingForCommunity should list suggested relations");
assert(seededRelation.movementOptions().includes("attend"), "FieldRelation.movementOptions should expose MovementType values");
assert(seededRelation.explanation(), "FieldRelation.explanation should return structured output");

const suggestedRelation = platform.fieldRelations.suggest({
  sourceType: "event",
  sourceId: "e_morning_sit",
  targetType: "community",
  targetId: "meditation",
  relationKind: "good_first_step_for",
  status: "accepted",
  provenance: "steward_marked",
  reviewAuthorityType: "community",
  reviewAuthorityId: "meditation",
  reason: "Managed access smoke suggestion."
}, user.id);
assert(suggestedRelation.isPending(), "fieldRelations.suggest should create pending relation");
assert(suggestedRelation.data().status === "suggested", "fieldRelations.suggest should force suggested status");
assert(suggestedRelation.data().provenance === "user_suggested", "fieldRelations.suggest should force user_suggested provenance");

const acceptedRelation = platform.fieldRelations.accept(suggestedRelation.id, "p_henrik", "Accepted by smoke test.");
assert(acceptedRelation.isAccepted(), "fieldRelations.accept should accept relation");

const refinedRelation = platform.fieldRelations.refine(acceptedRelation.id, "p_henrik", { relationKind: "belongs_with" }, "Refined by smoke test.");
assert(refinedRelation.data().status === "refined", "fieldRelations.refine should mark relation refined");
assert(refinedRelation.data().relationKind === "belongs_with", "fieldRelations.refine should apply patch");
assert(refinedRelation.isAccepted(), "refined relation should count as reviewed/accepted in model helpers");
assert(platform.raw().calculations.acceptedRelationsForObject("event", "e_morning_sit").some(relation => relation.id === refinedRelation.id), "refined relation should appear in accepted/reviewed relation calculation");

const computedRelation = platform.fieldRelations.markComputedOnly(refinedRelation.id, "p_henrik", "Keep as computed only.");
assert(computedRelation.data().status === "computed", "fieldRelations.markComputedOnly should mark relation computed");
assert(platform.raw().calculations.activeRelationsForObject("event", "e_morning_sit").some(relation => relation.id === computedRelation.id), "computed relation should appear in active relation calculation");

const redirectedRelation = platform.fieldRelations.redirect(computedRelation.id, "p_henrik", "community", "tea", "Redirected by smoke test.");
assert(redirectedRelation.data().targetId === "tea", "fieldRelations.redirect should update target");
assert(redirectedRelation.data().status === "refined", "fieldRelations.redirect should mark relation refined");

const declinedRelation = platform.fieldRelations.decline(redirectedRelation.id, "p_henrik", "Declined by smoke test.");
assert(declinedRelation.data().status === "declined", "fieldRelations.decline should mark relation declined");
assert(declinedRelation.reviews().length >= 5, "relation review history should be recorded");

const mirroredShare = platform.eventSuggestions.suggest("e_ci_jam", "somatic", user.id, "Mirror suggested share into FieldRelation.");
assert(mirroredShare.id, "event suggestion compatibility service should still create suggestedEventShare");
assert(platform.fieldRelations.between("event", "e_ci_jam", "community", "somatic").some(relation => relation.data().reason.includes("Mirror")), "event suggestion should also create matching FieldRelation");
const mirroredRelationCount = platform.fieldRelations.between("event", "e_ci_jam", "community", "somatic").length;
const duplicateShare = platform.eventSuggestions.suggest("e_ci_jam", "somatic", user.id, "Second legacy share should not duplicate mirror relation.");
assert(duplicateShare.id, "duplicate legacy suggestedEventShare should still be created");
assert(platform.fieldRelations.between("event", "e_ci_jam", "community", "somatic").length === mirroredRelationCount, "duplicate event suggestion should not create surprising duplicate FieldRelation mirror");

platform.resetDatabase();
assert(!platform.events.list().some(item => item.id === createdEvent.id), "reset should remove created event");

console.log("Managed OO domain smoke test passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
