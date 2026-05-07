(function () {
  const { register, assert, ids } = window.PlatformDataLayerTestHelpers;

  register({
    id: "user-community-access",
    objectName: "UserCommunityAccess",
    description: "Followed, member, committed, dormant, and managed community lists.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const community = platform.communities.get("ci");
      const edge = user.followCommunity(community);
      edge.makeDormant();
      const created = user.createCommunity({
        name: "Dev Tool Managed Community",
        description: "Temporary managed community.",
        tags: ["dev-tool"]
      });

      const followed = user.communities.followed();
      const member = user.communities.member();
      const committed = user.communities.committed();
      const dormant = user.communities.dormant();
      const managed = user.communities.managed();

      assert(dormant.some(item => item.id === community.id), "dormant() should include a dormant edge community");
      assert(managed.some(item => item.id === created.id), "managed() should include created community");

      return {
        followed: ids(followed),
        member: ids(member),
        committed: ids(committed),
        dormant: ids(dormant),
        managed: ids(managed)
      };
    }
  });
})();
