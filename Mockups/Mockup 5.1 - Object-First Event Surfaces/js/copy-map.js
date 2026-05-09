(function () {
  const relationKinds = {
    belongs_with: "Belongs with",
    relevant_to: "Related context",
    hosted_at: "Hosted here",
    facilitated_by: "Facilitated by",
    stewarded_by: "Reviewed by stewards",
    overlaps_with: "Overlaps with",
    bridges_to: "Bridge",
    shares_practice: "Shared practice",
    shares_venue: "Common venue",
    shares_participants: "Shared participants",
    good_first_step_for: "Good first step",
    deeper_pathway_into: "Deeper pathway",
    soft_landing_after: "Soft landing",
    generated_from: "Pattern found"
  };

  const statusLabels = {
    suggested: "Waiting for review",
    accepted: "Accepted",
    refined: "Refined",
    declined: "Declined",
    computed: "Kept as pattern",
    dormant: "Not active right now"
  };

  const visibilityLabels = {
    private: "Private",
    visible_to_stewards: "Steward-visible",
    visible_to_members: "Members only",
    public: "Public"
  };

  const movementLabels = {
    attend: "Attend",
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
  };

  const holdLabels = {
    visibility: "People may not know this exists",
    context: "Context around this connection may need clarification",
    trust: "People may wonder whether they are welcome",
    threshold: "The first step may need clearer wording",
    boundary: "Access may need care or review",
    stewardship: "Community endorsement is not yet confirmed",
    capacity: "This may need a gentler or deeper entry option",
    language: "The invitation may need clearer wording"
  };

  const evidenceTypes = {
    shared_tag: "Shared tag",
    event_access: "Event access",
    community_entry_guidance: "Community guidance",
    linked_group: "Linked community",
    shared_participants: "Shared participation",
    venue_use: "Shared venue",
    venue_cluster: "Venue pattern",
    calculated_overlap: "Calculated pattern",
    practice_tag: "Shared practice",
    person_reason: "Suggested reason",
    saved_event: "Saved event",
    person_tag: "Person interest"
  };

  const suggestionKinds = [
    { value: "good_first_step_for", label: "Good first step for" },
    { value: "belongs_with", label: "Belongs with" },
    { value: "soft_landing_after", label: "Soft landing after" },
    { value: "deeper_pathway_into", label: "Deeper pathway into" },
    { value: "relevant_to", label: "Related to" }
  ];

  const visibilityOptions = [
    { value: "public", label: "Ask stewards to review before showing publicly" },
    { value: "visible_to_stewards", label: "Only stewards should see the suggestion" },
    { value: "private", label: "Keep private for now" }
  ];

  const reviewConsequences = {
    accept: "This now appears on the event page as related community context.",
    refine: "This connection is adjusted before becoming visible.",
    redirect: "This was redirected to another community.",
    decline: "This will no longer appear as a suggested connection.",
    computed: "This remains a pattern but is not community-endorsed."
  };

  window.Mockup51Copy = {
    relationKinds,
    statusLabels,
    visibilityLabels,
    movementLabels,
    holdLabels,
    evidenceTypes,
    suggestionKinds,
    visibilityOptions,
    reviewConsequences
  };
})();
