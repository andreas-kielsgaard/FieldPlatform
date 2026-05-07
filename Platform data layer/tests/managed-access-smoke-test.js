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

platform.resetDatabase();
assert(!platform.events.list().some(item => item.id === createdEvent.id), "reset should remove created event");

console.log("Managed OO domain smoke test passed.");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
