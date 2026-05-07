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
