(function () {
  const { register, assert, createEventDraft } = window.PlatformDataLayerTestHelpers;

  register({
    id: "user",
    objectName: "User",
    description: "Profile, tags, participation, creation, and management checks.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const community = platform.communities.get("ci");
      const edge = user.followCommunity(community);
      const request = user.requestMembership(community, "Dev tool user test");
      const event = user.createEvent(createEventDraft("Dev Tool User Event"));
      const createdCommunity = user.createCommunity({
        name: "Dev Tool User Community",
        description: "Temporary community created by the User test.",
        tags: ["dev-tool"]
      });

      assert(user.profile().id === "p_casey", "profile() should return person data");
      assert(user.tags().length > 0, "tags() should return profile tags");
      assert(edge.community().id === community.id, "followCommunity() should return an edge to the selected community");
      assert(request.status === "pending", "requestMembership() should create a pending request");
      assert(user.canManageEvent(event), "createEvent() should make the creator a manager");
      assert(user.canManageCommunity(createdCommunity), "createCommunity() should make the creator a manager");

      return {
        user: user.profile(),
        participationEdge: edge.data(),
        request,
        createdEvent: event.data(),
        createdCommunity: createdCommunity.data()
      };
    }
  });
})();
