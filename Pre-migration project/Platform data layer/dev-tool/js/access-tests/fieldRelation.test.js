(function () {
  const { register, assert } = window.PlatformDataLayerTestHelpers;

  register({
    id: "field-relation",
    objectName: "FieldRelation",
    description: "FieldRelation records, review state, hold types, and movement options.",
    run(platform) {
      const seeded = platform.fieldRelations.get("fr_ci_jam_good_first_step_ci");
      const eventRelations = platform.fieldRelations.forObject("event", "e_ci_jam");
      const pending = platform.fieldRelations.pendingForCommunity("ecstatic");
      const suggested = platform.fieldRelations.suggest({
        sourceType: "event",
        sourceId: "e_morning_sit",
        targetType: "community",
        targetId: "meditation",
        relationKind: "good_first_step_for",
        reviewAuthorityType: "community",
        reviewAuthorityId: "meditation",
        reason: "Dev tool suggested connection."
      }, "p_casey");
      const accepted = platform.fieldRelations.accept(suggested.id, "p_henrik", "Accepted in dev tool test.");

      assert(seeded.isAccepted(), "seeded relation should be accepted");
      assert(eventRelations.length > 0, "event should have relations");
      assert(pending.length > 0, "ecstatic should have pending relation review");
      assert(accepted.isAccepted(), "accepted suggested relation should be accepted");

      return {
        seeded: seeded.data(),
        explanation: seeded.explanation(),
        movementOptions: seeded.movementOptions(),
        eventRelations: eventRelations.map(relation => relation.data().id),
        pending: pending.map(relation => relation.data().id),
        accepted: accepted.data(),
        reviews: accepted.reviews()
      };
    }
  });
})();
