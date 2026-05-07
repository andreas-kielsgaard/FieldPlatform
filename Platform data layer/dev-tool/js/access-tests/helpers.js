(function () {
  const tests = [];

  function register(test) {
    tests.push(test);
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function ids(items) {
    return items.map(item => item.id);
  }

  function createEventDraft(title) {
    return {
      title,
      venueId: "v_dome",
      tags: ["dev-tool", "low-threshold"],
      audience: "Database tool smoke users",
      beginnerFriendly: true,
      relevantGroups: ["ci"],
      linkedGroups: ["ci"]
    };
  }

  window.PlatformDataLayerDevTests = tests;
  window.PlatformDataLayerTestHelpers = {
    register,
    assert,
    ids,
    createEventDraft
  };
})();
