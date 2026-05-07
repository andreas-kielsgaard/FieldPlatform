(function () {
  const { register, assert, ids, createEventDraft } = window.PlatformDataLayerTestHelpers;

  register({
    id: "repositories",
    objectName: "Repositories",
    description: "Repository list, get, and create entry points.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const event = platform.events.create(createEventDraft("Dev Tool Repository Event"), user);
      const community = platform.communities.create({
        name: "Dev Tool Repository Community",
        description: "Created through repository test.",
        tags: ["dev-tool"]
      }, user);

      assert(platform.users.list().length > 0, "users.list() should return users");
      assert(platform.events.get(event.id).id === event.id, "events.get() should retrieve created event");
      assert(platform.communities.get(community.id).id === community.id, "communities.get() should retrieve created community");
      assert(platform.venues.list().length > 0, "venues.list() should return venues");

      return {
        users: ids(platform.users.list()),
        createdEvent: event.data(),
        createdCommunity: community.data(),
        venues: ids(platform.venues.list())
      };
    }
  });
})();
