window.createInitialDemoData = function createInitialDemoData() {
  const people = [
    {
      id: "p_maya",
      name: "Maya Holm",
      bio: "Newer to Aarhus, curious about movement, meditation, and low-pressure social rooms.",
      tags: ["newcomer", "movement", "meditation", "low-threshold"],
      visibleAttributes: ["new in Aarhus", "likes beginner-friendly spaces"],
      lifeContext: "arriving in the city and rebuilding social rhythm"
    },
    {
      id: "p_liv",
      name: "Liv Norr",
      bio: "Recurring Contact Impro participant who also dips into relational practice.",
      tags: ["contact improvisation", "relational", "somatics"],
      visibleAttributes: ["regular mover", "prefers consent-forward spaces"],
      lifeContext: "deepening one practice while keeping adjacent doors open"
    },
    {
      id: "p_samir",
      name: "Samir Qadir",
      bio: "Facilitator weaving meditation, somatic inquiry, and small group practice.",
      tags: ["facilitator", "meditation", "somatics", "teaching"],
      visibleAttributes: ["offers workshops", "hosts small groups"],
      lifeContext: "building offerings across several practice circles"
    },
    {
      id: "p_rune",
      name: "Rune Iversen",
      bio: "Steward for Circling Aarhus and careful holder of entry guidance.",
      tags: ["steward", "circling", "authentic relating"],
      visibleAttributes: ["community steward", "facilitates circles"],
      lifeContext: "protecting depth while making entry less mysterious"
    },
    {
      id: "p_noa",
      name: "Noa Vang",
      bio: "Bridge person across queer embodiment, ecstatic dance, and tea socials.",
      tags: ["queer", "dance", "bridge", "social"],
      visibleAttributes: ["bridge participant", "volunteers sometimes"],
      lifeContext: "keeps weak ties alive across many rooms"
    },
    {
      id: "p_ella",
      name: "Ella Strand",
      bio: "Trusted CI contributor who sometimes teaches beginner labs.",
      tags: ["contact improvisation", "teaching", "volunteer"],
      visibleAttributes: ["trusted contributor", "beginner support"],
      lifeContext: "alternating between contributing and resting"
    },
    {
      id: "p_tobias",
      name: "Tobias Moller",
      bio: "Acro regular with weak but useful bridges into dance and somatics.",
      tags: ["acro", "movement", "partner practice"],
      visibleAttributes: ["partner movement regular"],
      lifeContext: "looking for playful and physical spaces"
    },
    {
      id: "p_isha",
      name: "Isha Berg",
      bio: "Meditation regular with quiet links to tea socials and circling.",
      tags: ["meditation", "tea", "presence"],
      visibleAttributes: ["quiet regular", "likes morning rhythm"],
      lifeContext: "prefers spacious recurring practice"
    },
    {
      id: "p_kai",
      name: "Kai Sol",
      bio: "Somatic practitioner and facilitator with a broad local field view.",
      tags: ["somatics", "facilitator", "bodywork", "bridge"],
      visibleAttributes: ["practitioner", "facilitator"],
      lifeContext: "connecting practitioners without over-organizing them"
    },
    {
      id: "p_freja",
      name: "Freja Lind",
      bio: "Tea social host, connector, and soft landing point for newcomers.",
      tags: ["tea", "hosting", "social", "newcomers"],
      visibleAttributes: ["host", "newcomer-friendly"],
      lifeContext: "making informal belonging visible"
    },
    {
      id: "p_jonas",
      name: "Jonas Reen",
      bio: "Dormant ecstatic dance participant reappearing through beginner events.",
      tags: ["dance", "dormant", "reactivating"],
      visibleAttributes: ["returning after a break"],
      lifeContext: "testing whether participation fits this season"
    },
    {
      id: "p_amal",
      name: "Amal Hadi",
      bio: "Queer Embodiment steward who values boundaries, joy, and consent.",
      tags: ["queer", "steward", "embodiment", "safer-space"],
      visibleAttributes: ["steward", "agreement carrier"],
      lifeContext: "holding a boundaried community container"
    },
    {
      id: "p_emil",
      name: "Emil Voss",
      bio: "Curious observer of several groups, mostly reading and saving events.",
      tags: ["observer", "curious", "weak ties"],
      visibleAttributes: ["light overlap in many spaces"],
      lifeContext: "gathering context before showing up"
    },
    {
      id: "p_sara",
      name: "Sara Due",
      bio: "Alumnus-like CI participant who moved away but visits monthly.",
      tags: ["alumnus", "contact improvisation", "visiting"],
      visibleAttributes: ["visiting participant"],
      lifeContext: "still belongs lightly through recurring visits"
    },
    {
      id: "p_mikkel",
      name: "Mikkel Faber",
      bio: "Venue host at Dome Studio, often aware of cross-community rhythms.",
      tags: ["venue", "host", "stewardship"],
      visibleAttributes: ["venue host"],
      lifeContext: "supporting multiple practice communities"
    },
    {
      id: "p_alma",
      name: "Alma Weiss",
      bio: "Authentic relating participant who volunteers with Tea and Connection.",
      tags: ["relational", "volunteer", "tea"],
      visibleAttributes: ["volunteer", "recurring participant"],
      lifeContext: "building strong ties through gentle service"
    },
    {
      id: "p_henrik",
      name: "Henrik Dahl",
      bio: "Long-time meditator with trusted access but low public identity.",
      tags: ["meditation", "trusted", "low visibility"],
      visibleAttributes: ["trusted regular"],
      lifeContext: "deeply engaged without public identity emphasis"
    },
    {
      id: "p_nora",
      name: "Nora Beck",
      bio: "First-time participant drawn by a friend from Ecstatic Dance.",
      tags: ["first-time", "dance", "social"],
      visibleAttributes: ["first-time participant"],
      lifeContext: "trying one room at a time"
    },
    {
      id: "p_casey",
      name: "Casey Holm",
      bio: "Coverage persona with hosting, attending, membership, following, dormant, and expansion-edge signals active at once.",
      tags: ["somatics", "movement", "queer", "relational", "low-threshold", "hosting"],
      visibleAttributes: ["hosts sometimes", "member in one group", "follows several edges", "has dormant edges"],
      lifeContext: "testing every participant orientation state in one maintained demo profile"
    }
  ];

  const groups = [
    {
      id: "ci",
      name: "Contact Improvisation Aarhus",
      description: "A movement field for touch, weight sharing, consent, improvisation, and playful presence.",
      state: "public",
      color: "#376d9f",
      tags: ["contact improvisation", "somatics", "movement", "consent", "jam"],
      norms: ["Consent can change at any time", "Arrive sober", "No photos during jams", "Pause is always allowed"],
      rhythm: "Friday open jam, Sunday morning practice, monthly workshop day",
      venues: ["v_dome", "v_godsbanen", "v_park"],
      stewards: ["p_ella", "p_sara"],
      accessRules: "Public jams. Trusted layer for holding intros and opening/closing the room.",
      entryGuidance: "Good first step: Friday jam intro at 18:45. Wear soft clothes and arrive early."
    },
    {
      id: "circling",
      name: "Circling / Authentic Relating Aarhus",
      description: "Relational practice for presence, truthful contact, and careful group attention.",
      state: "semi-private",
      color: "#6f5aa8",
      tags: ["circling", "authentic relating", "presence", "relational", "talk-based"],
      norms: ["Speak from I", "Confidentiality matters", "No advice without consent", "Silence is welcome"],
      rhythm: "Wednesday open circle, monthly intro evening, quarterly day intensive",
      venues: ["v_attune", "v_teahouse"],
      stewards: ["p_rune"],
      accessRules: "Intro evenings are public. Ongoing labs use requested access.",
      entryGuidance: "Start with the monthly intro evening before joining deeper labs."
    },
    {
      id: "ecstatic",
      name: "Ecstatic Dance Aarhus",
      description: "A sober, music-led dance space with opening circle, free movement, and integration.",
      state: "public",
      color: "#c4812f",
      tags: ["ecstatic dance", "movement", "music", "ritual", "sober"],
      norms: ["No talking on the dance floor", "Respect movement bubbles", "Arrive before opening circle", "Sober space"],
      rhythm: "Biweekly Sunday dance and occasional Thursday dance meditation",
      venues: ["v_godsbanen", "v_dome"],
      stewards: ["p_noa"],
      accessRules: "Public events. Facilitator circle is trusted/core.",
      entryGuidance: "Low threshold if you can arrive on time and respect the no-talking dance floor."
    },
    {
      id: "meditation",
      name: "Meditation Collective",
      description: "A quiet, non-dogmatic practice rhythm for sitting, breath, inquiry, and spacious attention.",
      state: "public",
      color: "#466f55",
      tags: ["meditation", "breathwork", "mindfulness", "inquiry", "morning"],
      norms: ["Silence during practice", "All traditions welcome", "No fixing others", "Sliding scale dana"],
      rhythm: "Tuesday and Thursday morning sits, Sunday longer practice",
      venues: ["v_stillpoint"],
      stewards: ["p_henrik", "p_isha"],
      accessRules: "Public sits. Known access for peer inquiry groups.",
      entryGuidance: "Drop in for a morning sit. The bell rings at 07:00."
    },
    {
      id: "somatic",
      name: "Somatic Practitioners Network",
      description: "A loose professional and peer learning network for bodyworkers, movers, and trauma-aware practitioners.",
      state: "semi-private",
      color: "#168f86",
      tags: ["somatics", "bodywork", "practitioners", "peer learning", "nervous system"],
      norms: ["No client solicitation in peer labs", "Consent before touch", "Name scope of practice", "Resource before depth"],
      rhythm: "Monthly peer lab, quarterly case clinic, irregular public talks",
      venues: ["v_attune", "v_dome", "v_teahouse"],
      stewards: ["p_kai"],
      accessRules: "Public talks. Peer labs are requested access.",
      entryGuidance: "Public talks are the easiest entry. Peer labs ask for relevant practice background."
    },
    {
      id: "queer",
      name: "Queer Embodiment Circle",
      description: "Embodiment, movement, and social practice centered on queer and trans experience.",
      state: "semi-private",
      color: "#c94b72",
      tags: ["queer", "embodiment", "safer-space", "movement", "identity"],
      norms: ["Pronouns matter", "No uninvited photos", "Consent-forward", "Safer-space agreement applies"],
      rhythm: "Biweekly movement circle and monthly shared meal",
      venues: ["v_rainbow", "v_teahouse"],
      stewards: ["p_amal"],
      accessRules: "Visible publicly. Signup asks people to read and accept the agreement.",
      entryGuidance: "Start with the open movement circle if the safer-space agreement fits you."
    },
    {
      id: "acro",
      name: "Acro / Partner Movement Jam",
      description: "Playful partner practice with acro basics, spotting culture, and strength through cooperation.",
      state: "public",
      color: "#b46f27",
      tags: ["acro", "partner movement", "play", "jam", "spotting"],
      norms: ["Ask before joining", "Spot before styling", "No pressure to base or fly", "Rest is participation"],
      rhythm: "Monday training, Saturday park jam in warm months",
      venues: ["v_park", "v_dome"],
      stewards: ["p_tobias"],
      accessRules: "Public jams. Advanced labs use known or requested access.",
      entryGuidance: "Monday basics is best for first-timers. Come with clean indoor shoes."
    },
    {
      id: "tea",
      name: "Tea & Connection Socials",
      description: "Low-threshold hosted social rooms with tea, gentle prompts, and space to arrive slowly.",
      state: "public",
      color: "#9a6a42",
      tags: ["tea", "connection", "social", "newcomers", "low-threshold"],
      norms: ["Opt in to prompts", "No networking pressure", "Leave when complete", "Small kindnesses count"],
      rhythm: "Friday late tea, monthly newcomer table, occasional post-event integration",
      venues: ["v_teahouse", "v_harbor"],
      stewards: ["p_freja", "p_alma"],
      accessRules: "Public events. Volunteer host layer is known/trusted.",
      entryGuidance: "A good first room if you want human contact without joining a practice yet."
    }
  ];

  const venues = [
    { id: "v_dome", name: "Dome Studio", type: "dance studio", location: "Frederiksbjerg", atmosphere: "Warm wooden floor, focused practice room", associatedGroups: ["ci", "ecstatic", "somatic", "acro"] },
    { id: "v_godsbanen", name: "Godsbanen Hall", type: "art space", location: "Godsbanen", atmosphere: "Lively, public, high ceiling, good for larger movement events", associatedGroups: ["ci", "ecstatic"] },
    { id: "v_attune", name: "Attune Rooms", type: "practice room", location: "Latin Quarter", atmosphere: "Small, quiet, good for circles and practitioner labs", associatedGroups: ["circling", "somatic"] },
    { id: "v_teahouse", name: "Teahouse Back Room", type: "cafe room", location: "Mejlgade", atmosphere: "Soft seating, low barrier, good for conversation", associatedGroups: ["tea", "circling", "queer", "somatic"] },
    { id: "v_stillpoint", name: "Stillpoint Loft", type: "meditation room", location: "Troejborg", atmosphere: "Quiet, bright morning light, mats and cushions", associatedGroups: ["meditation"] },
    { id: "v_rainbow", name: "Rainbow House", type: "community house", location: "Aarhus C", atmosphere: "Welcoming, politicized, safer-space oriented", associatedGroups: ["queer", "tea"] },
    { id: "v_park", name: "Botanical Garden Lawn", type: "outdoor spot", location: "Botanical Garden", atmosphere: "Open air, playful, weather dependent", associatedGroups: ["acro", "ci"] },
    { id: "v_harbor", name: "Harbor Sauna Commons", type: "social commons", location: "Aarhus O", atmosphere: "Informal, after-event integration, water nearby", associatedGroups: ["tea", "ecstatic"] }
  ];

  const events = [
    {
      id: "e_ci_jam",
      title: "Friday Contact Jam with Beginner Landing",
      hostId: "p_ella",
      linkedGroups: ["ci"],
      relevantGroups: ["ci", "somatic", "acro"],
      venueId: "v_dome",
      time: "Fri 19:00",
      tags: ["contact improvisation", "movement", "beginner-friendly", "consent"],
      audience: "curious, recurring, and returning movers",
      access: "public",
      price: "80 DKK",
      attendance: { interested: ["p_maya", "p_liv", "p_emil"], attending: ["p_ella", "p_tobias", "p_sara"] }
    },
    {
      id: "e_circling_intro",
      title: "Intro to Authentic Relating",
      hostId: "p_rune",
      linkedGroups: ["circling"],
      relevantGroups: ["circling", "tea", "somatic"],
      venueId: "v_attune",
      time: "Tue 18:30",
      tags: ["authentic relating", "presence", "beginner-friendly", "low-threshold"],
      audience: "people curious about relational practice",
      access: "public",
      price: "120 DKK",
      attendance: { interested: ["p_maya", "p_liv", "p_alma"], attending: ["p_rune", "p_isha"] }
    },
    {
      id: "e_ecstatic_sunday",
      title: "Sunday Ecstatic Dance",
      hostId: "p_noa",
      linkedGroups: ["ecstatic"],
      relevantGroups: ["ecstatic", "ci", "queer", "meditation"],
      venueId: "v_godsbanen",
      time: "Sun 10:30",
      tags: ["ecstatic dance", "movement", "music", "ritual"],
      audience: "movers, dancers, and people who want a sober expressive space",
      access: "public",
      price: "150 DKK",
      attendance: { interested: ["p_nora", "p_jonas", "p_emil"], attending: ["p_noa", "p_liv", "p_tobias", "p_casey"] }
    },
    {
      id: "e_morning_sit",
      title: "Thursday Morning Sit",
      hostId: "p_henrik",
      linkedGroups: ["meditation"],
      relevantGroups: ["meditation", "somatic", "circling"],
      venueId: "v_stillpoint",
      time: "Thu 07:00",
      tags: ["meditation", "morning", "quiet", "drop-in"],
      audience: "anyone who wants a steady quiet practice",
      access: "public",
      price: "Dana",
      attendance: { interested: ["p_maya"], attending: ["p_henrik", "p_isha", "p_samir"] }
    },
    {
      id: "e_somatic_lab",
      title: "Somatic Peer Lab: Boundaries in Touch",
      hostId: "p_kai",
      linkedGroups: ["somatic"],
      relevantGroups: ["somatic", "ci", "queer", "circling"],
      venueId: "v_attune",
      time: "Sat 13:00",
      tags: ["somatics", "touch", "boundaries", "peer learning"],
      audience: "practitioners and experienced participants",
      access: "visible-but-member-signup-only",
      price: "220 DKK",
      attendance: { interested: ["p_ella", "p_amal"], attending: ["p_kai", "p_samir"] }
    },
    {
      id: "e_queer_movement",
      title: "Queer Embodiment: Slow Strength",
      hostId: "p_amal",
      linkedGroups: ["queer"],
      relevantGroups: ["queer", "somatic", "ecstatic", "tea"],
      venueId: "v_rainbow",
      time: "Sat 14:00",
      tags: ["queer", "embodiment", "movement", "safer-space"],
      audience: "queer and trans participants, allies by invitation",
      access: "visible-but-member-signup-only",
      price: "Sliding scale",
      attendance: { interested: ["p_noa"], attending: ["p_amal", "p_freja"] }
    },
    {
      id: "e_acro_basics",
      title: "Acro Basics and Spotting Culture",
      hostId: "p_tobias",
      linkedGroups: ["acro"],
      relevantGroups: ["acro", "ci"],
      venueId: "v_dome",
      time: "Mon 18:00",
      tags: ["acro", "partner movement", "beginner-friendly", "spotting"],
      audience: "first-time and occasional partner movement participants",
      access: "public",
      price: "90 DKK",
      attendance: { interested: ["p_maya", "p_liv"], attending: ["p_tobias", "p_nora"] }
    },
    {
      id: "e_tea_newcomers",
      title: "Tea and Connection: Newcomer Table",
      hostId: "p_freja",
      linkedGroups: ["tea"],
      relevantGroups: ["tea", "circling", "queer", "meditation"],
      venueId: "v_teahouse",
      time: "Fri 20:30",
      tags: ["tea", "connection", "newcomers", "low-threshold"],
      audience: "people who want a gentle entry point",
      access: "public",
      price: "Donation",
      attendance: { interested: ["p_maya", "p_emil", "p_jonas"], attending: ["p_freja", "p_alma", "p_isha"] }
    },
    {
      id: "e_harbor_integration",
      title: "Post-Dance Harbor Tea",
      hostId: "p_noa",
      linkedGroups: ["tea", "ecstatic"],
      relevantGroups: ["tea", "ecstatic", "ci"],
      venueId: "v_harbor",
      time: "Sun 15:00",
      tags: ["tea", "integration", "dance", "social"],
      audience: "people coming out of movement spaces who want a soft landing",
      access: "public",
      price: "60 DKK",
      attendance: { interested: ["p_jonas"], attending: ["p_noa", "p_freja", "p_nora"] }
    },
    {
      id: "e_casey_somatic_bridge",
      title: "Somatic Bridge Practice Circle",
      hostId: "p_casey",
      cohostIds: ["p_kai"],
      volunteerIds: ["p_casey"],
      linkedGroups: ["somatic"],
      relevantGroups: ["somatic", "ci", "circling"],
      venueId: "v_attune",
      time: "Wed 17:30",
      tags: ["somatics", "presence", "movement", "beginner-friendly"],
      audience: "people who want a held bridge between body practice and relational inquiry",
      access: "public",
      price: "Sliding scale",
      attendance: { interested: ["p_maya", "p_liv"], attending: ["p_casey", "p_kai"] }
    },
    {
      id: "e_casey_queer_entry",
      title: "Queer Movement Low-Pressure Entry",
      hostId: "p_amal",
      linkedGroups: ["queer"],
      relevantGroups: ["queer"],
      venueId: "v_rainbow",
      time: "Thu 18:00",
      tags: ["queer", "movement", "low-threshold", "beginner-friendly"],
      audience: "people near queer embodiment who want a soft first step",
      access: "public",
      price: "Donation",
      attendance: { interested: ["p_casey"], attending: ["p_amal"] }
    }
  ];

  const participationEdges = [
    edge("p_maya", "ci", "curious", "public", 35, 20, 18, 0, 12, ["attends"], "light", "new", "medium", "privateToUser", "active"),
    edge("p_maya", "meditation", "occasional", "known", 48, 60, 32, 0, 22, ["attends"], "light", "familiar", "low", "visibleToStewards", "active"),
    edge("p_maya", "tea", "curious", "public", 42, 30, 20, 0, 18, ["attends", "suggests"], "light", "new", "medium", "privateToUser", "active"),
    edge("p_liv", "ci", "recurring", "trusted", 82, 90, 78, 35, 72, ["attends", "volunteers"], "strong", "carrier", "high", "visibleToMembers", "active"),
    edge("p_liv", "circling", "occasional", "requested", 44, 45, 24, 0, 30, ["attends"], "light", "familiar", "medium", "visibleToStewards", "active"),
    edge("p_liv", "ecstatic", "recurring", "member", 70, 80, 58, 10, 52, ["attends"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_samir", "meditation", "facilitator", "core", 88, 95, 70, 65, 82, ["attends", "hosts", "facilitates", "teaches"], "strong", "carrier", "high", "public", "active"),
    edge("p_samir", "somatic", "contributor", "trusted", 74, 80, 56, 45, 70, ["attends", "facilitates", "suggests"], "moderate", "carrier", "medium", "visibleToMembers", "active"),
    edge("p_samir", "circling", "occasional", "known", 38, 25, 20, 0, 35, ["attends"], "light", "familiar", "low", "visibleToStewards", "active"),
    edge("p_rune", "circling", "steward", "core", 94, 96, 88, 80, 92, ["attends", "hosts", "facilitates", "organizes", "mediates"], "strong", "carrier", "high", "public", "active"),
    edge("p_rune", "tea", "occasional", "known", 42, 45, 26, 10, 42, ["attends", "suggests"], "light", "familiar", "low", "visibleToStewards", "active"),
    edge("p_noa", "queer", "contributor", "trusted", 80, 84, 58, 52, 75, ["attends", "volunteers", "organizes"], "strong", "carrier", "high", "visibleToMembers", "active"),
    edge("p_noa", "ecstatic", "steward", "core", 90, 90, 82, 75, 88, ["attends", "hosts", "facilitates", "organizes"], "strong", "carrier", "high", "public", "active"),
    edge("p_noa", "tea", "recurring", "member", 60, 72, 46, 20, 55, ["attends", "hosts"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_ella", "ci", "contributor", "core", 90, 94, 80, 78, 88, ["attends", "hosts", "facilitates", "volunteers", "teaches"], "strong", "carrier", "high", "public", "active"),
    edge("p_ella", "somatic", "recurring", "trusted", 65, 72, 48, 20, 62, ["attends", "suggests"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_tobias", "acro", "steward", "core", 88, 92, 78, 70, 86, ["attends", "hosts", "organizes", "teaches"], "strong", "carrier", "high", "public", "active"),
    edge("p_tobias", "ci", "occasional", "known", 50, 55, 30, 6, 38, ["attends"], "light", "familiar", "medium", "visibleToStewards", "active"),
    edge("p_isha", "meditation", "recurring", "trusted", 78, 92, 70, 18, 76, ["attends", "volunteers"], "strong", "carrier", "medium", "visibleToMembers", "active"),
    edge("p_isha", "tea", "occasional", "known", 44, 55, 24, 4, 36, ["attends"], "light", "familiar", "low", "visibleToStewards", "active"),
    edge("p_kai", "somatic", "steward", "core", 92, 90, 82, 82, 92, ["attends", "hosts", "facilitates", "organizes", "mediates", "teaches"], "strong", "carrier", "high", "public", "active"),
    edge("p_kai", "ci", "recurring", "trusted", 68, 70, 50, 25, 68, ["attends", "facilitates"], "moderate", "carrier", "medium", "visibleToMembers", "active"),
    edge("p_freja", "tea", "steward", "core", 90, 92, 82, 85, 88, ["attends", "hosts", "organizes", "volunteers"], "strong", "carrier", "high", "public", "active"),
    edge("p_freja", "queer", "recurring", "member", 62, 68, 44, 18, 54, ["attends", "volunteers"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_jonas", "ecstatic", "dormant", "member", 26, 8, 8, 0, 32, ["attends"], "light", "familiar", "medium", "visibleToStewards", "reactivating"),
    edge("p_jonas", "tea", "curious", "public", 34, 24, 16, 0, 20, ["attends"], "light", "new", "low", "privateToUser", "reactivating"),
    edge("p_amal", "queer", "steward", "core", 95, 96, 84, 85, 94, ["attends", "hosts", "facilitates", "organizes", "mediates"], "strong", "carrier", "high", "public", "active"),
    edge("p_amal", "somatic", "recurring", "trusted", 58, 62, 40, 16, 66, ["attends", "suggests"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_emil", "ci", "observing", "public", 12, 10, 4, 0, 5, [], "none", "new", "low", "privateToUser", "active"),
    edge("p_emil", "circling", "curious", "public", 24, 18, 10, 0, 12, ["suggests"], "light", "new", "low", "privateToUser", "active"),
    edge("p_emil", "tea", "observing", "public", 18, 12, 8, 0, 8, [], "none", "new", "low", "privateToUser", "active"),
    edge("p_sara", "ci", "alumnus", "trusted", 56, 32, 24, 16, 74, ["attends", "suggests"], "moderate", "carrier", "medium", "visibleToMembers", "fading"),
    edge("p_mikkel", "somatic", "contributor", "trusted", 58, 60, 30, 42, 62, ["hosts", "organizes", "funds"], "moderate", "familiar", "medium", "public", "active"),
    edge("p_mikkel", "ci", "contributor", "known", 44, 50, 20, 38, 52, ["hosts", "organizes"], "light", "familiar", "low", "public", "active"),
    edge("p_alma", "tea", "contributor", "trusted", 76, 86, 62, 55, 68, ["attends", "volunteers", "hosts"], "strong", "carrier", "high", "visibleToMembers", "active"),
    edge("p_alma", "circling", "recurring", "member", 64, 75, 50, 16, 56, ["attends", "volunteers"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_henrik", "meditation", "contributor", "core", 88, 96, 78, 62, 92, ["attends", "hosts", "teaches"], "strong", "carrier", "low", "visibleToStewards", "active"),
    edge("p_nora", "ecstatic", "curious", "public", 30, 28, 12, 0, 18, ["attends"], "light", "new", "medium", "privateToUser", "active"),
    edge("p_nora", "acro", "occasional", "known", 44, 54, 24, 0, 30, ["attends"], "light", "familiar", "medium", "visibleToStewards", "active"),
    edge("p_casey", "somatic", "contributor", "trusted", 82, 88, 70, 64, 76, ["attends", "hosts", "volunteers", "facilitates", "suggests"], "strong", "carrier", "high", "public", "active"),
    edge("p_casey", "circling", "recurring", "member", 66, 72, 48, 18, 58, ["attends"], "moderate", "familiar", "medium", "visibleToMembers", "active"),
    edge("p_casey", "acro", "curious", "public", 36, 28, 18, 0, 18, ["attends"], "light", "new", "medium", "privateToUser", "active"),
    edge("p_casey", "tea", "observing", "public", 22, 18, 8, 0, 10, [], "none", "new", "low", "privateToUser", "active"),
    edge("p_casey", "ecstatic", "dormant", "member", 24, 6, 6, 0, 28, ["attends"], "light", "familiar", "medium", "visibleToStewards", "dormant")
  ];

  const groupRelationships = [
    { fromGroupId: "ci", toGroupId: "somatic", type: "overlapsWith", note: "Shared somatic touch vocabulary and recurring people." },
    { fromGroupId: "ci", toGroupId: "ecstatic", type: "sharesParticipantsWith", note: "Movement participants often move between jams and Sunday dances." },
    { fromGroupId: "circling", toGroupId: "tea", type: "collaboratesWith", note: "Tea hosts often provide low-threshold integration after relational evenings." },
    { fromGroupId: "somatic", toGroupId: "queer", type: "sisterGroupOf", note: "Shared boundaries, body literacy, and consent practices." },
    { fromGroupId: "acro", toGroupId: "ci", type: "sharesVenueWith", note: "Both use Dome Studio and the Botanical Garden Lawn." },
    { fromGroupId: "tea", toGroupId: "ecstatic", type: "overlapsWith", note: "Post-dance social landing has started to form." }
  ];

  const personas = ["p_casey", "p_maya", "p_liv", "p_samir", "p_rune", "p_noa"];

  return {
    currentView: "participant",
    currentPersonId: "p_casey",
    stewardGroupId: "circling",
    focus: { type: "group", id: "ci" },
    people,
    groups,
    venues,
    events,
    participationEdges,
    groupRelationships,
    personas,
    createdEvents: [],
    featuredEvents: [],
    membershipRequests: [
      { id: "req_1", personId: "p_maya", groupId: "circling", status: "pending", note: "Maya wants to join the intro evening first." }
    ],
    suggestedEventShares: [
      { id: "share_1", eventId: "e_tea_newcomers", groupId: "circling", suggestedBy: "p_alma", status: "pending", note: "Gentle landing for people who found open circle intense." }
    ],
    lastChange: null
  };

  function edge(personId, groupId, relationshipState, accessLevel, engagementStrength, recency, frequency, contributionLevel, trustLevel, roleModes, socialEmbeddedness, normFamiliarity, identitySalience, visibility, decayState) {
    return {
      personId,
      groupId,
      relationshipState,
      accessLevel,
      engagementStrength,
      recency,
      frequency,
      contributionLevel,
      trustLevel,
      roleModes,
      socialEmbeddedness,
      normFamiliarity,
      identitySalience,
      visibility,
      decayState
    };
  }
};
