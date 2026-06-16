(function () {
  const { register, assert, ids } = window.PlatformDataLayerTestHelpers;

  register({
    id: "event",
    objectName: "Event",
    description: "Mutable event methods and relation methods.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const event = platform.events.get("e_ci_jam");
      const community = platform.communities.get("ci");
      const venue = platform.venues.get("v_dome");

      event.changeName("Dev Tool Event Name");
      event.addTag("dev-tool-event");
      event.removeTag("dev-tool-event");
      event.setVenue(venue);
      event.setAccess("public");
      event.markUserInterested(user);
      event.registerUser(user);
      const share = event.suggestToCommunity(community, user, "Dev tool suggestion");
      const relevance = event.relevanceFor(user);

      assert(event.title() === "Dev Tool Event Name", "changeName() should update title");
      assert(event.data().venueId === venue.id, "setVenue() should update venue");
      assert(event.data().attendance.attending.includes(user.id), "registerUser() should mark attendance");
      assert(share.status === "pending", "suggestToCommunity() should create a share");

      return {
        event: event.data(),
        share,
        relevance,
        linkedCommunities: ids(event.linkedCommunities()),
        relevantCommunities: ids(event.relevantCommunities()),
        venue: event.venue().data(),
        manageableByUser: event.canBeManagedBy(user)
      };
    }
  });
})();
