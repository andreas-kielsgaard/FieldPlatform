(function () {
  const { register, assert, ids } = window.PlatformDataLayerTestHelpers;

  register({
    id: "generated-field",
    objectName: "GeneratedField",
    description: "Generated field records, linked communities, events, and bridge people.",
    run(platform) {
      const field = platform.generatedFields.generateFields()[0];
      assert(field, "generateFields() should return at least one field");
      const fetched = platform.generatedFields.get(field.id);

      return {
        field: fetched.data(),
        communities: ids(fetched.communities()),
        bridgeEvents: ids(fetched.bridgeEvents()),
        deeperEvents: ids(fetched.deeperEvents()),
        bridgePeople: fetched.bridgePeople()
      };
    }
  });
})();
