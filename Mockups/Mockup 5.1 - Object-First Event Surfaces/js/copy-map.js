(function () {
  const relationKinds = {
    belongs_with: "Belongs with",
    relevant_to: "Related to",
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
    accepted: "Accepted connection",
    refined: "Accepted connection",
    declined: "Declined",
    computed: "Pattern found",
    dormant: "Not active right now"
  };

  const visibilityLabels = {
    private: "Private",
    visible_to_stewards: "Only visible to stewards",
    visible_to_members: "Visible to members",
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
    context: "It may be unclear what this belongs with",
    trust: "People may wonder whether they are welcome",
    threshold: "The first step may be unclear",
    boundary: "Access may need care or review",
    stewardship: "A community steward may need to review this",
    capacity: "This may need a gentler or deeper entry option",
    language: "The invitation may need clearer wording"
  };

  const suggestionKinds = [
    { value: "good_first_step_for", label: "Good first step for" },
    { value: "belongs_with", label: "Belongs with" },
    { value: "soft_landing_after", label: "Soft landing after" },
    { value: "deeper_pathway_into", label: "Deeper pathway into" },
    { value: "relevant_to", label: "Related to" }
  ];

  const visibilityOptions = [
    { value: "visible_to_stewards", label: "Send to community stewards first" },
    { value: "public", label: "Public if accepted" },
    { value: "private", label: "Keep private for now" }
  ];

  const reviewConsequences = {
    accept: "This connection can appear as visible context.",
    refine: "Adjust the connection before it becomes visible.",
    redirect: "Move the suggestion to a better community context.",
    decline: "Do not show this as a connection.",
    computed: "Keep this as a pattern without community endorsement."
  };

  window.Mockup51Copy = {
    relationKinds,
    statusLabels,
    visibilityLabels,
    movementLabels,
    holdLabels,
    suggestionKinds,
    visibilityOptions,
    reviewConsequences
  };
})();
