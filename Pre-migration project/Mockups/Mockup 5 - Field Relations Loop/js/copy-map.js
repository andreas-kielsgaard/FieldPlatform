(function () {
  const CopyMap = {
    objectTypes: {
      event: "Event",
      community: "Community",
      venue: "Venue",
      person: "Person",
      generatedField: "Pattern",
      tag: "Practice tag"
    },
    relationKinds: {
      belongs_with: "Belongs with",
      relevant_to: "Related to",
      hosted_at: "Hosted at",
      facilitated_by: "Facilitated by",
      stewarded_by: "Reviewed by",
      overlaps_with: "Overlaps with",
      bridges_to: "Bridge into",
      shares_practice: "Shares practice",
      shares_venue: "Shares venue",
      shares_participants: "Shares people",
      good_first_step_for: "Good first step",
      deeper_pathway_into: "Deeper entry",
      soft_landing_after: "Soft landing",
      generated_from: "Pattern found"
    },
    statusLabels: {
      suggested: "Suggested connection - waiting for review",
      accepted: "Accepted connection",
      refined: "Accepted connection - clarified by stewards",
      declined: "Not shown as a connection",
      computed: "Pattern found",
      dormant: "Quiet for now"
    },
    visibilityLabels: {
      private: "This connection is private",
      visible_to_stewards: "Only stewards can see this while it is reviewed",
      visible_to_members: "Visible to members",
      public: "Publicly visible"
    },
    holdLabels: {
      visibility: "People may not know this exists",
      context: "It may be unclear what this belongs with",
      trust: "People may wonder whether they are welcome",
      threshold: "The first step may be unclear",
      boundary: "Access may need care or review",
      stewardship: "A community steward may need to review this",
      capacity: "This may need a gentler or deeper entry option",
      language: "The invitation may need clearer wording"
    },
    movementLabels: {
      attend: "Attend event",
      follow: "Follow community",
      mark_interested: "Mark interested",
      request_access: "Request access",
      ask_steward: "Ask a steward",
      volunteer: "Volunteer or help host",
      join_recurring: "Join recurring practice",
      create_bridge_event: "Create bridge event",
      suggest_connection: "Suggest another connection",
      reactivate: "Reconnect",
      remain_observing: "Keep observing"
    },
    provenanceLabels: {
      user_suggested: "Suggested by a person",
      steward_marked: "Accepted by stewards",
      creator_marked: "Suggested by a host",
      calculated: "Calculated from shared context",
      imported: "Imported from another source"
    },
    suggestionKinds: [
      { label: "Belongs with", value: "belongs_with" },
      { label: "Good first step for", value: "good_first_step_for" },
      { label: "Soft landing after", value: "soft_landing_after" },
      { label: "Bridge into", value: "bridges_to" },
      { label: "Shares venue", value: "shares_venue" },
      { label: "Shares practice", value: "shares_practice" },
      { label: "Related to", value: "relevant_to" }
    ],
    visibilityOptions: [
      { label: "Only stewards can see this while it is reviewed", value: "visible_to_stewards" },
      { label: "Public if accepted", value: "public" },
      { label: "Private note", value: "private" },
      { label: "Visible to members", value: "visible_to_members" }
    ]
  };

  window.Mockup5Copy = CopyMap;
})();
