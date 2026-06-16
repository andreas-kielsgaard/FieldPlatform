(function () {
  const { register, assert, createEventDraft } = window.PlatformDataLayerTestHelpers;

  register({
    id: "services",
    objectName: "Domain Services",
    description: "Direct service access points exposed from PlatformDomain.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const community = platform.communities.get("ci");
      const event = platform.events.get("e_ci_jam");

      const edge = platform.participation.followGroup(user.id, community.id);
      const request = platform.memberships.request(user.id, community.id, "Dev tool service request");
      const approved = platform.memberships.approve(request.id, user.id);
      const interested = platform.eventRegistration.markInterested(user.id, event.id);
      const share = platform.eventSuggestions.suggest(event.id, community.id, user.id, "Dev tool service share");
      const createdEvent = platform.eventManagement.create(createEventDraft("Dev Tool Service Event"), user.id);
      const createdCommunity = platform.communityManagement.create({
        name: "Dev Tool Service Community",
        description: "Created through service test.",
        tags: ["dev-tool"]
      }, user.id);

      assert(edge.id, "participation service should return an edge");
      assert(approved.accessLevel === "member", "membership approval should return member edge");
      assert(interested.attendance.interested.includes(user.id), "event registration service should mark interest");

      return {
        edge,
        request,
        approved,
        interested,
        share,
        createdEvent,
        createdCommunity,
        recommendations: platform.recommendations.eventsForUser(user).map(item => ({ eventId: item.event.id, score: item.score })),
        health: platform.communityHealth.summarize(community)
      };
    }
  });
})();
