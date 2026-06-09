(function () {
  const { register, assert, ids } = window.PlatformDataLayerTestHelpers;

  register({
    id: "community",
    objectName: "Community",
    description: "Mutable community methods, membership, events, health, and generated fields.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const community = platform.communities.get("ci");
      const otherCommunity = platform.communities.get("somatic");
      const venue = platform.venues.get("v_dome");

      community.changeName("Dev Tool Community Name");
      community.addTag("dev-tool-community");
      community.removeTag("dev-tool-community");
      community.addVenue(venue);
      community.updateEntryGuidance("Dev tool entry guidance");
      community.updateAccessRules("Dev tool access rules");
      const edge = community.followedBy(user);
      const request = community.requestMembership(user, "Dev tool community request");
      const approvedEdge = community.approveMembershipRequest(request.id, user);
      const relationship = community.markRelationshipTo(otherCommunity, "devToolRelated", "Temporary relation", user);

      assert(community.name() === "Dev Tool Community Name", "changeName() should update name");
      assert(community.data().venues.includes(venue.id), "addVenue() should update venue list");
      assert(approvedEdge.data().accessLevel === "member", "approveMembershipRequest() should make member edge");

      return {
        community: community.data(),
        followedEdge: edge.data(),
        request,
        approvedEdge: approvedEdge.data(),
        relationship,
        events: ids(community.events()),
        bridgeEvents: ids(community.bridgeEvents()),
        deeperEvents: ids(community.deeperEvents()),
        personalMetrics: community.personalMetricsFor(user),
        health: community.health(),
        generatedFields: community.generatedFields().map(field => field.data()),
        manageableByUser: community.canBeManagedBy(user)
      };
    }
  });
})();
