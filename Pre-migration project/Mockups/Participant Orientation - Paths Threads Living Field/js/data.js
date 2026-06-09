(function () {
  const seed = {
    personas: [
      {
        id: "newcomer",
        name: "Newcomer to Aarhus",
        shortName: "Newcomer",
        description: "Few ties, curious about embodiment and connection, looking for low-threshold entry.",
        tags: ["newcomer", "embodiment", "connection", "low-threshold"],
        needs: ["soft-entry", "plain-context", "beginner-path"],
        preferredSections: ["softWays", "newConnected", "openings", "places", "close"]
      },
      {
        id: "ci_regular",
        name: "Contact Improvisation regular",
        shortName: "CI regular",
        description: "Strong rhythm with CI, some overlap with dance, embodiment, and partner movement.",
        tags: ["contact improvisation", "movement", "consent", "dance"],
        needs: ["continuation", "adjacency", "deeper-path"],
        preferredSections: ["continue", "close", "openings", "places", "newConnected"]
      },
      {
        id: "dormant_circling",
        name: "Dormant Circling participant",
        shortName: "Dormant Circling",
        description: "Used to attend relational spaces, has not participated for months, may need a soft way back.",
        tags: ["relational", "presence", "tea", "soft-entry"],
        needs: ["re-entry", "low-pressure", "trust"],
        preferredSections: ["dormant", "softWays", "continue", "close", "openings"]
      },
      {
        id: "overcommitted",
        name: "Overcommitted regular seeking rest",
        shortName: "Rest seeker",
        description: "Already attends many things and needs continuity, integration, and lower-friction choices.",
        tags: ["movement", "somatics", "tea", "rest", "continuity"],
        needs: ["rest", "integration", "continuity"],
        preferredSections: ["continue", "places", "dormant", "openings", "close"]
      },
      {
        id: "curious_outsider",
        name: "Curious outsider with few ties",
        shortName: "Curious outsider",
        description: "Interested in the wider field, but has no strong community belonging yet.",
        tags: ["curious", "beginner", "exploration", "social"],
        needs: ["understandable-path", "field-preview", "beginner-path"],
        preferredSections: ["newConnected", "softWays", "openings", "close", "places"]
      }
    ],

    people: [
      { id: "ella", name: "Ella Holm", type: "facilitator", description: "CI contributor who often holds beginner landings.", tags: ["contact improvisation", "teaching", "consent"] },
      { id: "noa", name: "Noa Vester", type: "facilitator", description: "Ecstatic Dance host with a gentle integration practice.", tags: ["ecstatic dance", "music", "integration"] },
      { id: "rune", name: "Rune Falk", type: "facilitator", description: "Circling steward focused on careful entry into relational practice.", tags: ["circling", "presence", "entry"] },
      { id: "freja", name: "Freja Lind", type: "facilitator", description: "Tea host and bridge person for soft social entry.", tags: ["tea", "newcomers", "hosting"] },
      { id: "kai", name: "Kai Moller", type: "facilitator", description: "Somatic practitioner connecting bodywork, boundaries, and peer learning.", tags: ["somatics", "bodywork", "boundaries"] }
    ],

    communities: [
      { id: "ci", name: "Contact Improvisation Aarhus", type: "community", description: "Touch, weight sharing, consent, improvisation, and playful presence.", tags: ["contact improvisation", "movement", "consent"], venueIds: ["dance_studio", "park_spot"], facilitatorIds: ["ella"] },
      { id: "circling", name: "Circling / Authentic Relating Aarhus", type: "community", description: "Presence, truth, group attention, and careful relational entry.", tags: ["circling", "relational", "presence"], venueIds: ["yoga_studio", "cafe_back_room"], facilitatorIds: ["rune"] },
      { id: "ecstatic", name: "Ecstatic Dance Aarhus", type: "community", description: "Sober music-led dance with opening circle, free movement, and integration.", tags: ["ecstatic dance", "movement", "music"], venueIds: ["warehouse", "dance_studio"], facilitatorIds: ["noa"] },
      { id: "meditation", name: "Meditation Collective", type: "community", description: "Quiet sitting, breath, inquiry, and contemplative practice.", tags: ["meditation", "breath", "quiet"], venueIds: ["meditation_room"], facilitatorIds: [] },
      { id: "somatic", name: "Somatic Practitioners Network", type: "community", description: "Peer learning for bodywork, boundaries, and practice ethics.", tags: ["somatics", "bodywork", "boundaries"], venueIds: ["yoga_studio", "dance_studio"], facilitatorIds: ["kai"] },
      { id: "queer", name: "Queer Embodiment Circle", type: "community", description: "Embodiment and movement centered on queer and trans experience.", tags: ["queer", "embodiment", "movement"], venueIds: ["community_house"], facilitatorIds: [] },
      { id: "acro", name: "Acro / Partner Movement Jam", type: "community", description: "Partner movement, spotting culture, and playful physical trust.", tags: ["acro", "partner movement", "play"], venueIds: ["park_spot", "dance_studio"], facilitatorIds: [] },
      { id: "tea", name: "Tea & Connection Socials", type: "community", description: "Low-pressure hosted social rooms with tea, prompts, and space to arrive slowly.", tags: ["tea", "connection", "newcomers"], venueIds: ["cafe_back_room", "harbor_sauna"], facilitatorIds: ["freja"] }
    ],

    venues: [
      { id: "dance_studio", name: "Dome Dance Studio", type: "venue", description: "Warm floor, movement classes, partner practice, and smaller dance gatherings.", tags: ["movement", "dance", "practice"], atmosphere: "focused and warm" },
      { id: "yoga_studio", name: "Attune Yoga Studio", type: "venue", description: "Quiet room used for circles, somatic labs, and slower practice.", tags: ["quiet", "somatics", "relational"], atmosphere: "soft and contained" },
      { id: "community_house", name: "Rainbow Community House", type: "venue", description: "Community rooms with safer-space agreements and shared meals.", tags: ["queer", "community", "care"], atmosphere: "welcoming and explicit" },
      { id: "cafe_back_room", name: "Teahouse Back Room", type: "venue", description: "Low-key cafe room for tea, integration, and gentle conversation.", tags: ["tea", "social", "low-threshold"], atmosphere: "soft and informal" },
      { id: "harbor_sauna", name: "Harbor Sauna", type: "venue", description: "Warmth, water, informal integration, and after-practice decompression.", tags: ["sauna", "rest", "integration"], atmosphere: "restorative" },
      { id: "park_spot", name: "Botanical Garden Lawn", type: "venue", description: "Open-air summer spot for jams, acro, and informal movement.", tags: ["outdoor", "play", "movement"], atmosphere: "open and playful" },
      { id: "meditation_room", name: "Stillpoint Meditation Room", type: "venue", description: "Small quiet room for morning sits and contemplative groups.", tags: ["meditation", "quiet", "morning"], atmosphere: "bright and still" },
      { id: "warehouse", name: "Godsbanen Warehouse", type: "venue", description: "Large public arts space used for bigger dances and mixed cultural events.", tags: ["music", "dance", "public"], atmosphere: "large and lively" }
    ],

    fields: [
      { id: "embodiment_field", name: "Aarhus Embodiment Field", type: "field", description: "A generated pattern around movement, somatics, touch, and body literacy.", tags: ["movement", "somatics", "embodiment", "consent"] },
      { id: "relational_field", name: "Relational Practice Field", type: "field", description: "A generated pattern around circling, authentic relating, tea socials, and presence.", tags: ["relational", "presence", "connection", "tea"] },
      { id: "dance_integration_field", name: "Dance + Integration Field", type: "field", description: "A generated pattern around dance events, aftercare, tea, sauna, and integration.", tags: ["dance", "integration", "tea", "rest"] },
      { id: "soft_social_field", name: "Soft Social Entry Field", type: "field", description: "A generated pattern of low-pressure rooms for people entering the ecosystem gently.", tags: ["newcomers", "low-threshold", "tea", "social"] },
      { id: "contemplative_field", name: "Contemplative Practice Field", type: "field", description: "A generated pattern around meditation, breath, quiet rooms, and inquiry.", tags: ["meditation", "breath", "quiet", "inquiry"] }
    ],

    events: [
      { id: "ci_class", name: "Wednesday Open CI Class", type: "event", description: "Beginner-friendly contact improvisation class before the open jam.", when: "Wed 18:00", venueId: "dance_studio", communityId: "ci", facilitatorId: "ella", fieldIds: ["embodiment_field"], tags: ["contact improvisation", "movement", "beginner", "consent"], entry: "beginner path" },
      { id: "ci_sauna", name: "Post-Class Harbor Sauna", type: "event", description: "Warm decompression after movement practice; informal and optional.", when: "Wed 20:15", venueId: "harbor_sauna", communityId: "tea", facilitatorId: "freja", fieldIds: ["dance_integration_field", "soft_social_field"], tags: ["sauna", "rest", "integration", "social"], entry: "continuation" },
      { id: "ecstatic_dance", name: "Sunday Ecstatic Dance", type: "event", description: "Sober expressive dance with opening circle and integration.", when: "Sun 10:30", venueId: "warehouse", communityId: "ecstatic", facilitatorId: "noa", fieldIds: ["dance_integration_field"], tags: ["ecstatic dance", "movement", "music", "ritual"], entry: "direct" },
      { id: "post_dance_tea", name: "Post-Dance Harbor Tea", type: "event", description: "Quiet tea gathering after dance for people who want a softer landing.", when: "Sun 15:00", venueId: "cafe_back_room", communityId: "tea", facilitatorId: "freja", fieldIds: ["dance_integration_field", "soft_social_field"], tags: ["tea", "integration", "dance", "social"], entry: "soft landing" },
      { id: "circling_open", name: "Open Circling Evening", type: "event", description: "A low-threshold evening for people returning to relational practice.", when: "Tue 18:30", venueId: "yoga_studio", communityId: "circling", facilitatorId: "rune", fieldIds: ["relational_field"], tags: ["circling", "relational", "presence", "beginner"], entry: "re-entry" },
      { id: "morning_sit", name: "Thursday Morning Sit", type: "event", description: "Quiet sitting and tea before the day begins.", when: "Thu 07:00", venueId: "meditation_room", communityId: "meditation", facilitatorId: null, fieldIds: ["contemplative_field"], tags: ["meditation", "quiet", "morning"], entry: "direct" },
      { id: "somatic_lab", name: "Somatic Boundaries Lab", type: "event", description: "Peer learning around boundaries, touch, and nervous-system pacing.", when: "Sat 13:00", venueId: "yoga_studio", communityId: "somatic", facilitatorId: "kai", fieldIds: ["embodiment_field"], tags: ["somatics", "boundaries", "touch", "peer learning"], entry: "deeper path" },
      { id: "queer_entry", name: "Queer Movement Low-Pressure Entry", type: "event", description: "Gentle movement space with clear agreements and newcomer support.", when: "Thu 18:00", venueId: "community_house", communityId: "queer", facilitatorId: null, fieldIds: ["soft_social_field", "embodiment_field"], tags: ["queer", "movement", "low-threshold", "beginner"], entry: "beginner path" },
      { id: "acro_park", name: "Saturday Acro Park Jam", type: "event", description: "Outdoor partner movement with spotters and easy observing.", when: "Sat 11:00", venueId: "park_spot", communityId: "acro", facilitatorId: null, fieldIds: ["embodiment_field"], tags: ["acro", "partner movement", "outdoor", "play"], entry: "exploratory horizon" }
    ],

    participationEdges: [
      { personaId: "newcomer", objectType: "field", objectId: "soft_social_field", strength: 22, state: "curious", basis: "saved interests in low-threshold social rooms" },
      { personaId: "newcomer", objectType: "venue", objectId: "cafe_back_room", strength: 18, state: "curious", basis: "looked at tea socials" },
      { personaId: "ci_regular", objectType: "community", objectId: "ci", strength: 92, state: "active", basis: "regular classes and jams" },
      { personaId: "ci_regular", objectType: "venue", objectId: "dance_studio", strength: 78, state: "active", basis: "familiar practice venue" },
      { personaId: "ci_regular", objectType: "field", objectId: "embodiment_field", strength: 72, state: "active", basis: "movement and consent practice" },
      { personaId: "dormant_circling", objectType: "community", objectId: "circling", strength: 64, state: "dormant", basis: "used to attend open evenings" },
      { personaId: "dormant_circling", objectType: "field", objectId: "relational_field", strength: 58, state: "dormant", basis: "old relational practice rhythm" },
      { personaId: "overcommitted", objectType: "community", objectId: "ci", strength: 80, state: "active", basis: "ongoing practice" },
      { personaId: "overcommitted", objectType: "community", objectId: "ecstatic", strength: 76, state: "active", basis: "frequent Sunday dance" },
      { personaId: "overcommitted", objectType: "community", objectId: "tea", strength: 52, state: "active", basis: "uses tea as decompression" },
      { personaId: "overcommitted", objectType: "field", objectId: "dance_integration_field", strength: 70, state: "active", basis: "needs integration after busy weeks" },
      { personaId: "curious_outsider", objectType: "field", objectId: "embodiment_field", strength: 24, state: "curious", basis: "browsing movement and embodiment" },
      { personaId: "curious_outsider", objectType: "field", objectId: "contemplative_field", strength: 18, state: "curious", basis: "interest in quiet spaces" }
    ],

    relations: [
      { fromType: "event", fromId: "ci_class", toType: "event", toId: "ci_sauna", label: "continues into", weight: 72, note: "Some people decompress at sauna after class." },
      { fromType: "event", fromId: "ecstatic_dance", toType: "event", toId: "post_dance_tea", label: "soft landing after", weight: 84, note: "Tea follows the dance as a gentler continuation." },
      { fromType: "community", fromId: "ci", toType: "community", toId: "acro", label: "shares partner movement", weight: 48, note: "Some people cross between CI and acro." },
      { fromType: "community", fromId: "ci", toType: "community", toId: "somatic", label: "shares body literacy", weight: 66, note: "Somatic practice overlaps with CI consent and pacing." },
      { fromType: "community", fromId: "circling", toType: "community", toId: "tea", label: "soft social bridge", weight: 70, note: "Tea can be easier after intense relational spaces." },
      { fromType: "facilitator", fromId: "ella", toType: "community", toId: "ci", label: "holds beginner entry", weight: 80, note: "Ella often names the first step clearly." },
      { fromType: "facilitator", fromId: "freja", toType: "community", toId: "tea", label: "hosts soft entry", weight: 82, note: "Freja creates low-pressure social rooms." },
      { fromType: "facilitator", fromId: "kai", toType: "community", toId: "somatic", label: "bridges practice ethics", weight: 76, note: "Kai connects bodywork and peer practice." },
      { fromType: "venue", fromId: "dance_studio", toType: "community", toId: "ci", label: "common venue", weight: 74, note: "CI regularly gathers here." },
      { fromType: "venue", fromId: "dance_studio", toType: "community", toId: "acro", label: "shared venue", weight: 46, note: "Acro sometimes trains here too." },
      { fromType: "venue", fromId: "cafe_back_room", toType: "community", toId: "tea", label: "home-like venue", weight: 88, note: "Tea socials often happen here." },
      { fromType: "field", fromId: "soft_social_field", toType: "community", toId: "tea", label: "low-threshold doorway", weight: 90, note: "Tea is the clearest soft social entry." },
      { fromType: "field", fromId: "embodiment_field", toType: "community", toId: "ci", label: "expressed through", weight: 82, note: "CI is one strong embodiment practice path." },
      { fromType: "field", fromId: "dance_integration_field", toType: "event", toId: "post_dance_tea", label: "expressed as integration", weight: 86, note: "Tea is a continuation after movement." }
    ]
  };

  window.ParticipantOrientationSeed = {
    createDemoData() {
      return JSON.parse(JSON.stringify(seed));
    }
  };
})();
