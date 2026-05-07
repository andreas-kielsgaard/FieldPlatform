(function () {
  const { register, assert } = window.PlatformDataLayerTestHelpers;

  register({
    id: "participation-edge",
    objectName: "ParticipationEdge",
    description: "Edge lookup, strength, state updates, dormancy, and reactivation.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const community = platform.communities.get("ci");
      const edge = user.followCommunity(community);
      const strength = edge.strength();
      edge.update({ contributionLevel: 22, trustLevel: 18 });
      const dormant = edge.makeDormant();
      const reactivated = dormant.reactivate();

      assert(edge.user().id === user.id, "user() should return linked user");
      assert(edge.community().id === community.id, "community() should return linked community");
      assert(typeof strength === "number", "strength() should return a number");
      assert(reactivated.data().decayState === "reactivating", "reactivate() should set reactivating state");

      return {
        initialStrength: strength,
        updated: edge.data(),
        dormant: dormant.data(),
        reactivated: reactivated.data()
      };
    }
  });
})();
