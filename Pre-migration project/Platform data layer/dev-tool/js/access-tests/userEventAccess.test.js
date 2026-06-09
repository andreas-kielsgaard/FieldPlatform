(function () {
  const { register, assert, ids, createEventDraft } = window.PlatformDataLayerTestHelpers;

  register({
    id: "user-event-access",
    objectName: "UserEventAccess",
    description: "Attending, interested, managed, and recommended event lists.",
    run(platform) {
      const user = platform.users.get("p_casey");
      const event = platform.events.get("e_ci_jam");
      event.markUserInterested(user);
      event.registerUser(user);
      const created = user.createEvent(createEventDraft("Dev Tool Managed Event"));

      const attending = user.events.attending();
      const interested = user.events.interested();
      const managed = user.events.managed();
      const recommended = user.events.recommended();

      assert(attending.some(item => item.id === event.id), "attending() should include registered event");
      assert(managed.some(item => item.id === created.id), "managed() should include created event");
      assert(Array.isArray(recommended), "recommended() should return a recommendation array");

      return {
        attending: ids(attending),
        interested: ids(interested),
        managed: ids(managed),
        recommended: recommended.map(item => ({ eventId: item.event.id, score: item.score, reasons: item.reasons }))
      };
    }
  });
})();
