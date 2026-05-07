const FieldPlatformCollectionConfig = (() => {
  const DEFAULT_STORAGE_KEY = "field_platform_database_v1";

  const collectionNames = [
    "people",
    "groups",
    "venues",
    "events",
    "festivals",
    "forumThreads",
    "participationEdges",
    "groupRelationships",
    "membershipRequests",
    "suggestedEventShares",
    "createdEvents",
    "createdCommunities",
    "managedObjects",
    "featuredEvents"
  ];

  const collectionPrefixes = {
    people: "person",
    groups: "group",
    venues: "venue",
    events: "event",
    festivals: "festival",
    forumThreads: "thread",
    participationEdges: "edge",
    groupRelationships: "group_rel",
    membershipRequests: "request",
    suggestedEventShares: "share",
    createdEvents: "created_event",
    createdCommunities: "created_group",
    managedObjects: "managed",
    featuredEvents: "featured"
  };

  function assertCollection(collectionName) {
    if (!collectionNames.includes(collectionName)) throw new Error(`Unknown collection: ${collectionName}`);
  }

  return {
    DEFAULT_STORAGE_KEY,
    collectionNames,
    collectionPrefixes,
    assertCollection
  };
})();

if (typeof window !== "undefined") {
  window.FieldPlatformCollectionConfig = FieldPlatformCollectionConfig;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = FieldPlatformCollectionConfig;
}
