(function () {
  const { register, assert, ids } = window.PlatformDataLayerTestHelpers;

  register({
    id: "venue",
    objectName: "Venue",
    description: "Venue data, community references, and event references.",
    run(platform) {
      const venue = platform.venues.get("v_dome");
      const communities = venue.communities();
      const events = venue.events();

      assert(venue.name().length > 0, "name() should return venue name");
      assert(Array.isArray(communities), "communities() should return an array");
      assert(Array.isArray(events), "events() should return an array");

      return {
        venue: venue.data(),
        communities: ids(communities),
        events: ids(events)
      };
    }
  });
})();
