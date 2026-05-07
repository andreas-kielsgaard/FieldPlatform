// ─── Seeded fake data for the Aarhus prototype ───

const DATA = (() => {

  // ─── Communities ───
  const communities = [
    {
      id: 'ci', slug: 'ci',
      name: 'Contact Improvisation Aarhus',
      shortName: 'CI Aarhus',
      color: '#4a90d9',
      emoji: '🤝',
      description: 'A space for spontaneous movement dialogue through touch, weight-sharing, and improvisational dance. All bodies, all levels.',
      tagline: 'Move together, without a script.',
      practices: ['Contact Impro', 'Somatic Movement', 'Improvisation'],
      tags: ['embodiment', 'movement', 'touch-based', 'weekly jams', 'all levels'],
      tone: 'Playful, present, consent-forward',
      whoFor: 'Anyone curious about physical presence and connection. No dance background needed.',
      beginnerFriendly: true,
      howToEngage: 'Drop in on any Friday jam. No registration needed. Show up 15 minutes early if it\'s your first time.',
      channels: ['WhatsApp group', 'Monthly newsletter', 'Instagram'],
      rhythm: [
        { day: 'Friday', time: '19:00–22:00', name: 'Open Jam', type: 'recurring', venue: 'v1' },
        { day: 'Sunday', time: '10:00–12:30', name: 'Morning Practice', type: 'recurring', venue: 'v3' },
        { day: 'Monthly', time: 'Last Saturday', name: 'Workshop Day', type: 'monthly', venue: 'v7' }
      ],
      norms: ['Consent is ongoing and revocable', 'No photography during jams', 'Arrive sober', 'Beginners welcome at all events'],
      stewards: ['p12', 'p34'],
      facilitators: ['f1', 'f3', 'f7'],
      venues: ['v1', 'v3', 'v7'],
      overlaps: [
        { communityId: 'ed', strength: 0.7, reason: '60% of members also attend Ecstatic Dance' },
        { communityId: 'sp', strength: 0.8, reason: 'Strong somatic practice overlap' },
        { communityId: 'ac', strength: 0.5, reason: 'Shared movement vocabulary' },
        { communityId: 'qe', strength: 0.45, reason: 'Many facilitators bridge both scenes' }
      ],
      memberCount: 120,
      location: { lat: 56.158, lng: 10.203 }
    },
    {
      id: 'ed', slug: 'ed',
      name: 'Ecstatic Dance Aarhus',
      shortName: 'Ecstatic Dance',
      color: '#e8742a',
      emoji: '💃',
      description: 'Free-form movement to curated music, sober and silent. A ritual space for embodied expression without judgment.',
      tagline: 'Your body knows the way.',
      practices: ['Free Dance', 'Ecstatic Dance', 'Ritual Movement'],
      tags: ['movement', 'sober', 'music-led', 'bi-weekly', 'expressive'],
      tone: 'Sacred, expressive, sober space',
      whoFor: 'Everyone. Especially those who love music and want to move without prescribed steps.',
      beginnerFriendly: true,
      howToEngage: 'Join any Sunday. Arrive before the opening circle. No phones on the dance floor.',
      channels: ['Facebook group', 'WhatsApp', 'Mailing list'],
      rhythm: [
        { day: 'Sunday', time: '10:30–14:00', name: 'Ecstatic Dance', type: 'biweekly', venue: 'v7' },
        { day: 'Thursday', time: '19:00–21:00', name: 'Dance Meditation', type: 'monthly', venue: 'v2' }
      ],
      norms: ['No talking on the dance floor', 'Sober space', 'Respect others\' movement bubbles', 'Clothes stay on'],
      stewards: ['p56'],
      facilitators: ['f2', 'f5', 'f9'],
      venues: ['v7', 'v2'],
      overlaps: [
        { communityId: 'ci', strength: 0.7, reason: '60% shared members' },
        { communityId: 'mc', strength: 0.5, reason: 'Overlapping mindfulness emphasis' },
        { communityId: 'qe', strength: 0.6, reason: 'Shared queer-affirming ethos' },
        { communityId: 'cs', strength: 0.4, reason: 'Social connection orientation' }
      ],
      memberCount: 200,
      location: { lat: 56.152, lng: 10.215 }
    },
    {
      id: 'cr', slug: 'cr',
      name: 'Circling & Authentic Relating Aarhus',
      shortName: 'Circling Aarhus',
      color: '#7b5ea7',
      emoji: '⭕',
      description: 'A practice of radical presence — speaking from experience, landing in the room, and being genuinely seen. Both structured formats and open circles.',
      tagline: 'Here, now, this.',
      practices: ['Circling', 'Authentic Relating', 'Relational Practice'],
      tags: ['relational', 'presence', 'introspective', 'weekly', 'talk-based'],
      tone: 'Precise, warm, relationally intimate',
      whoFor: 'People drawn to depth, self-awareness, and honest relational exchange. Good for people new to AR too.',
      beginnerFriendly: true,
      howToEngage: 'Join an intro evening first. They run on the first Tuesday of each month. Then open jams on Wednesdays.',
      channels: ['Telegram group', 'Newsletter'],
      rhythm: [
        { day: 'Wednesday', time: '19:00–21:30', name: 'Open Circle', type: 'weekly', venue: 'v4' },
        { day: 'Tuesday', time: '18:30–20:30', name: 'Intro Evening', type: 'monthly', venue: 'v4' },
        { day: 'Saturday', time: '10:00–17:00', name: 'Day Intensive', type: 'monthly', venue: 'v6' }
      ],
      norms: ['What\'s shared stays here', 'Speak from "I"', 'No advice-giving unless requested', 'Silence is welcome'],
      stewards: ['p78'],
      facilitators: ['f4', 'f6', 'f11'],
      venues: ['v4', 'v6'],
      overlaps: [
        { communityId: 'mc', strength: 0.6, reason: 'Strong mindfulness crossover' },
        { communityId: 'sp', strength: 0.55, reason: 'Somatic + relational integration' },
        { communityId: 'cs', strength: 0.65, reason: 'Conscious social scene is the same crowd' },
        { communityId: 'qe', strength: 0.5, reason: 'Values-alignment on safety and identity' }
      ],
      memberCount: 80,
      location: { lat: 56.162, lng: 10.198 }
    },
    {
      id: 'mc', slug: 'mc',
      name: 'Meditation Collective',
      shortName: 'Meditation Collective',
      color: '#3aaa7a',
      emoji: '🧘',
      description: 'A non-denominational space for meditation practice — from vipassana-influenced sits to movement meditation, breathwork, and inquiry. No doctrine.',
      tagline: 'Sit. Breathe. Notice.',
      practices: ['Meditation', 'Breathwork', 'Mindfulness', 'Inquiry'],
      tags: ['meditation', 'breathwork', 'weekly', 'all levels', 'non-religious'],
      tone: 'Quiet, non-dogmatic, warm',
      whoFor: 'Anyone interested in contemplative practice. Experienced meditators and complete beginners.',
      beginnerFriendly: true,
      howToEngage: 'Drop in on any Tuesday or Thursday morning sit. The door is open 10 minutes before.',
      channels: ['Newsletter', 'Instagram', 'Quiet WhatsApp'],
      rhythm: [
        { day: 'Tuesday', time: '07:00–08:00', name: 'Morning Sit', type: 'weekly', venue: 'v5' },
        { day: 'Thursday', time: '07:00–08:00', name: 'Morning Sit', type: 'weekly', venue: 'v5' },
        { day: 'Sunday', time: '16:00–18:00', name: 'Longer Practice', type: 'biweekly', venue: 'v5' }
      ],
      norms: ['Silence during practice', 'All traditions welcome', 'No proselytizing', 'Sliding scale dana'],
      stewards: ['p90'],
      facilitators: ['f8', 'f10'],
      venues: ['v5'],
      overlaps: [
        { communityId: 'cr', strength: 0.6, reason: 'Mindfulness and presence overlap' },
        { communityId: 'ed', strength: 0.5, reason: 'Contemplative movement shared' },
        { communityId: 'sp', strength: 0.65, reason: 'Somatic + contemplative integration' },
        { communityId: 'cs', strength: 0.35, reason: 'Some members overlap' }
      ],
      memberCount: 90,
      location: { lat: 56.170, lng: 10.188 }
    },
    {
      id: 'qe', slug: 'qe',
      name: 'Queer Embodiment Collective',
      shortName: 'Queer Embodiment',
      color: '#d94a7a',
      emoji: '🌈',
      description: 'Movement, connection and practice rooted in queer experience. Embodiment, somatics, and social space that centers queer and trans people.',
      tagline: 'Our bodies, our movements, our space.',
      practices: ['Somatic Movement', 'Embodiment', 'Community Space'],
      tags: ['queer', 'trans-inclusive', 'embodiment', 'safer-space', 'community'],
      tone: 'Affirming, boundaried, celebratory',
      whoFor: 'Queer and trans people primarily. Allies welcome with awareness.',
      beginnerFriendly: true,
      howToEngage: 'Attend an intro session. Community agreement signing required. Check socials for schedule.',
      channels: ['Signal group', 'Instagram'],
      rhythm: [
        { day: 'Saturday', time: '13:00–16:00', name: 'Movement Circle', type: 'biweekly', venue: 'v8' },
        { day: 'Wednesday', time: '19:00–21:00', name: 'Social Gathering', type: 'monthly', venue: 'v4' }
      ],
      norms: ['Pronoun respect required', 'Consent-forward', 'No uninvited photographs', 'Safer space agreement applies'],
      stewards: ['p102'],
      facilitators: ['f12', 'f15'],
      venues: ['v8', 'v4'],
      overlaps: [
        { communityId: 'ci', strength: 0.45, reason: 'Movement practice connection' },
        { communityId: 'ed', strength: 0.6, reason: 'Dance + queer culture intersection' },
        { communityId: 'cr', strength: 0.5, reason: 'Relational practice shared' },
        { communityId: 'sp', strength: 0.5, reason: 'Somatic grounding interest' }
      ],
      memberCount: 65,
      location: { lat: 56.155, lng: 10.222 }
    },
    {
      id: 'ac', slug: 'ac',
      name: 'Acro & Partner Movement Jam',
      shortName: 'Acro Jam',
      color: '#f0a500',
      emoji: '🤸',
      description: 'Playful explorations in acrobatics, partner balancing, and movement play. Structured jams with skill-sharing and open practice time.',
      tagline: 'Play. Balance. Fly.',
      practices: ['Acrobatics', 'Partner Movement', 'Play'],
      tags: ['acro', 'partner', 'playful', 'physical', 'skill-sharing'],
      tone: 'Energetic, playful, skill-building',
      whoFor: 'People who want to play with gravity and partner movement. Some fitness helpful but not required.',
      beginnerFriendly: true,
      howToEngage: 'Show up to any Sunday jam. Intro spotting taught at every session.',
      channels: ['Facebook group', 'WhatsApp'],
      rhythm: [
        { day: 'Sunday', time: '13:00–16:00', name: 'Open Jam', type: 'weekly', venue: 'v1' },
        { day: 'Saturday', time: '11:00–13:00', name: 'Beginner Session', type: 'biweekly', venue: 'v1' }
      ],
      norms: ['Spotters required for new moves', 'Ask before initiating', 'Skill levels shared honestly'],
      stewards: ['p45'],
      facilitators: ['f13', 'f16'],
      venues: ['v1'],
      overlaps: [
        { communityId: 'ci', strength: 0.5, reason: 'Partner movement vocabulary' },
        { communityId: 'ed', strength: 0.35, reason: 'Movement community overlap' },
        { communityId: 'sp', strength: 0.3, reason: 'Some somatic awareness crossover' }
      ],
      memberCount: 75,
      location: { lat: 56.165, lng: 10.208 }
    },
    {
      id: 'sp', slug: 'sp',
      name: 'Somatic Practitioners Network',
      shortName: 'Somatic Network',
      color: '#5abcb9',
      emoji: '🌿',
      description: 'A peer network for practitioners, students and enthusiasts of somatic disciplines: bodywork, movement therapy, trauma-informed practice, and more.',
      tagline: 'Body-first, always.',
      practices: ['Somatic Bodywork', 'Movement Therapy', 'Trauma-informed Practice'],
      tags: ['professional', 'somatic', 'learning', 'peer-support', 'advanced'],
      tone: 'Thoughtful, clinical respect, peer community',
      whoFor: 'Practitioners and advanced students in somatic fields. Also open to serious students.',
      beginnerFriendly: false,
      howToEngage: 'Apply to join the peer network. Monthly peer supervision groups and quarterly study days.',
      channels: ['Newsletter', 'Private Slack', 'Quarterly gatherings'],
      rhythm: [
        { day: 'Monthly', time: 'First Monday 19:00', name: 'Peer Supervision', type: 'monthly', venue: 'v6' },
        { day: 'Quarterly', time: 'See schedule', name: 'Study Day', type: 'quarterly', venue: 'v9' }
      ],
      norms: ['Confidentiality on case material', 'Professional ethics apply', 'Peer support, not supervision by seniors'],
      stewards: ['p67'],
      facilitators: ['f1', 'f7', 'f10'],
      venues: ['v6', 'v9'],
      overlaps: [
        { communityId: 'ci', strength: 0.8, reason: 'Strong CI/somatic pipeline' },
        { communityId: 'mc', strength: 0.65, reason: 'Contemplative + somatic integration' },
        { communityId: 'cr', strength: 0.55, reason: 'Relational somatic work' },
        { communityId: 'qe', strength: 0.5, reason: 'Trauma-informed somatic care' }
      ],
      memberCount: 40,
      location: { lat: 56.175, lng: 10.195 }
    },
    {
      id: 'cs', slug: 'cs',
      name: 'Conscious Socials & Tea Connection',
      shortName: 'Conscious Socials',
      color: '#a07850',
      emoji: '🍵',
      description: 'Alcohol-free social gatherings designed for genuine conversation. Tea ceremonies, icebreakers, and slow time together. For people tired of bar-based social life.',
      tagline: 'Real connection, no hangover.',
      practices: ['Tea Ceremony', 'Conscious Conversation', 'Social Ritual'],
      tags: ['sober', 'social', 'conversation', 'community', 'monthly'],
      tone: 'Warm, unhurried, genuinely curious',
      whoFor: 'Anyone who wants meaningful connection outside of alcohol-based social spaces.',
      beginnerFriendly: true,
      howToEngage: 'Register for any monthly gathering. No commitment required. Come once, come often.',
      channels: ['Instagram', 'Newsletter', 'Meetup page'],
      rhythm: [
        { day: 'Monthly', time: 'Second Friday 18:30', name: 'Tea & Connection', type: 'monthly', venue: 'v10' },
        { day: 'Monthly', time: 'Last Wednesday 19:30', name: 'Conversation Salon', type: 'monthly', venue: 'v4' }
      ],
      norms: ['Sober gathering', 'All welcome', 'No pitching or networking pressure', 'Leave your phone in your pocket'],
      stewards: ['p89'],
      facilitators: ['f14', 'f17'],
      venues: ['v10', 'v4'],
      overlaps: [
        { communityId: 'cr', strength: 0.65, reason: 'Authentic relating crowd crossover' },
        { communityId: 'ed', strength: 0.4, reason: 'Sober social culture shared' },
        { communityId: 'mc', strength: 0.35, reason: 'Contemplative social interest' }
      ],
      memberCount: 150,
      location: { lat: 56.160, lng: 10.210 }
    }
  ];

  // ─── Venues ───
  const venues = [
    { id: 'v1', name: 'Movement Lab Aarhus', type: 'dance studio', atmosphere: 'Sprung floor, mirrors optional, great acoustics', location: { lat: 56.158, lng: 10.203 }, address: 'Nørre Allé 12', communities: ['ci', 'ac'], upcoming: 8, accessibility: 'Ground floor. No steps.' },
    { id: 'v2', name: 'Aarhus Yoga Studio', type: 'yoga studio', atmosphere: 'Calm, minimal, clean. Mats provided.', location: { lat: 56.162, lng: 10.213 }, address: 'Frederiksgade 32', communities: ['ed', 'mc'], upcoming: 5, accessibility: 'Elevator available.' },
    { id: 'v3', name: 'Folkehuset', type: 'community house', atmosphere: 'Warm, community-owned, slightly chaotic in the best way', location: { lat: 56.168, lng: 10.196 }, address: 'Jægergårdsgade 55', communities: ['ci', 'cs'], upcoming: 6, accessibility: 'Accessible entrance via side door.' },
    { id: 'v4', name: 'Café Kvindehjemmet', type: 'café with back room', atmosphere: 'Intimate, quiet back room. Good tea. Feminist-run space.', location: { lat: 56.160, lng: 10.207 }, address: 'Klostergade 14', communities: ['cr', 'qe', 'cs'], upcoming: 9, accessibility: 'Step at entrance. Portable ramp on request.' },
    { id: 'v5', name: 'Mindfulness Center Aarhus', type: 'practice room', atmosphere: 'Dedicated contemplative space. Cushions, zafu, mats.', location: { lat: 56.171, lng: 10.187 }, address: 'Vennelyst Boulevard 4', communities: ['mc'], upcoming: 12, accessibility: 'Fully accessible.' },
    { id: 'v6', name: 'Therapy Room Collective', type: 'therapy / practice room', atmosphere: 'Small, intimate, professional setting. Good for groups of 8–16.', location: { lat: 56.155, lng: 10.199 }, address: 'Mølleparkvej 7', communities: ['cr', 'sp'], upcoming: 4, accessibility: 'Lift available.' },
    { id: 'v7', name: 'Godsbanen Culture Center', type: 'warehouse / art space', atmosphere: 'High ceilings, industrial. Excellent for large movement events.', location: { lat: 56.150, lng: 10.220 }, address: 'Skovgaardsgade 3', communities: ['ci', 'ed'], upcoming: 7, accessibility: 'Wheelchair accessible main hall.' },
    { id: 'v8', name: 'Queer House', type: 'community house', atmosphere: 'Vibrant, activist-owned space. Art on walls, safe atmosphere.', location: { lat: 56.165, lng: 10.224 }, address: 'Nørrebrogade 22', communities: ['qe'], upcoming: 3, accessibility: 'Step at main entrance. Side entrance accessible.' },
    { id: 'v9', name: 'Marselisborg Retreat', type: 'retreat venue outside city', atmosphere: 'Forest-adjacent. Great for longer days. Accommodation available.', location: { lat: 56.115, lng: 10.195 }, address: 'Marselisboulevard 99', communities: ['sp', 'mc'], upcoming: 2, accessibility: 'Partial. Contact in advance.' },
    { id: 'v10', name: 'Te & Kaffe', type: 'café with back room', atmosphere: 'Quiet specialty tea house. Very intentional feel.', location: { lat: 56.158, lng: 10.216 }, address: 'Rosensgade 8', communities: ['cs'], upcoming: 4, accessibility: 'Accessible.' },
    { id: 'v11', name: 'Tangkrogen Park', type: 'outdoor park spot', atmosphere: 'Open grass area by the harbour. Weather-dependent.', location: { lat: 56.143, lng: 10.231 }, address: 'Tangkrogen, Aarhus harbour', communities: ['ac', 'ed'], upcoming: 3, accessibility: 'Outdoor, uneven terrain in places.' },
    { id: 'v12', name: 'Latinkvarteret Studio', type: 'dance studio', atmosphere: 'Cozy, wood floors, great for smaller groups up to 25.', location: { lat: 56.156, lng: 10.208 }, address: 'Mejlgade 18', communities: ['ci', 'ed', 'qe'], upcoming: 5, accessibility: 'Stairs to first floor. No lift.' }
  ];

  // ─── Facilitators ───
  const facilitators = [
    {
      id: 'f1', name: 'Sofie Lundgren', initials: 'SL', color: '#4a7c59',
      bio: 'Sofie has been practicing and teaching Contact Improvisation for 12 years. She trained with Kirstie Simson and Nancy Stark Smith, and regularly brings somatic awareness into her teaching.',
      lineages: ['Contact Improvisation (Simson lineage)', 'Body-Mind Centering', 'Feldenkrais'],
      communities: ['ci', 'sp'],
      practices: ['Contact Improvisation', 'Somatic Movement', 'BMC'],
      values: 'I\'m interested in what happens when we stop trying to perform and start actually sensing.',
      intendedFor: 'Curious movers. People who want to develop listening through the body.',
      accessibilityNotes: 'Works with all mobility levels. Wheelchair-accessible events on request.',
      upcomingEvents: ['e1', 'e8', 'e22'],
      coHosts: ['f3', 'f7'],
      tags: ['CI', 'somatic', 'experienced teacher', 'bodywork']
    },
    {
      id: 'f2', name: 'Lars Nørby', initials: 'LN', color: '#e8742a',
      bio: 'Lars has been a DJ and facilitator in the free dance world for 8 years. He weaves music with movement invitations and holds space with a light touch.',
      lineages: ['Ecstatic Dance (Wo Yaa lineage)', 'Five Rhythms'],
      communities: ['ed', 'cs'],
      practices: ['Ecstatic Dance', 'DJ', 'Music Facilitation'],
      values: 'Music is the best invitation I know. My job is to stay out of the way.',
      intendedFor: 'Anyone who wants to move. Especially useful for people who feel awkward on a "normal" dancefloor.',
      upcomingEvents: ['e3', 'e14', 'e29'],
      coHosts: ['f5'],
      tags: ['DJ', 'ecstatic dance', 'music', 'facilitation']
    },
    {
      id: 'f3', name: 'Emma Dahl', initials: 'ED', color: '#7b5ea7',
      bio: 'Emma trained in CI and Authentic Relating simultaneously. She often designs experiences that weave relational awareness into movement.',
      lineages: ['Contact Improvisation', 'Authentic Relating (ART lineage)'],
      communities: ['ci', 'cr'],
      practices: ['Contact Improvisation', 'Authentic Relating', 'Relational Movement'],
      values: 'Contact is always two-way. What are we co-creating right now?',
      intendedFor: 'People who are curious about the relational dimension of movement.',
      upcomingEvents: ['e5', 'e17', 'e31'],
      coHosts: ['f1', 'f6'],
      tags: ['CI', 'authentic relating', 'relational', 'crossover']
    },
    {
      id: 'f4', name: 'Magnus Christoffersen', initials: 'MC', color: '#3aaa7a',
      bio: 'Magnus is one of the founders of the Circling community in Aarhus. He trained with the Circling Institute and teaches both in Denmark and internationally.',
      lineages: ['Circling (Circling Institute)', 'Gestalt', 'Integral'],
      communities: ['cr', 'cs'],
      practices: ['Circling', 'Authentic Relating', 'Gestalt-influenced facilitation'],
      values: 'The most radical act is to actually be here, with this person, right now.',
      intendedFor: 'People who want to go deeper in relational practice. Some experience in therapy or personal development helpful.',
      upcomingEvents: ['e6', 'e19', 'e33'],
      coHosts: ['f6', 'f11'],
      tags: ['circling', 'facilitation', 'depth', 'advanced']
    },
    {
      id: 'f5', name: 'Yasmin Osei', initials: 'YO', color: '#d94a7a',
      bio: 'Yasmin brings her background in African dance, queer activism, and ecstatic dance together. Her offerings are high energy, celebratory, and fiercely inclusive.',
      lineages: ['West African Dance', 'Ecstatic Dance', 'Queer arts'],
      communities: ['ed', 'qe'],
      practices: ['Ecstatic Dance', 'African Dance', 'DJ'],
      values: 'Joy is political. So is rest. I want this to be both.',
      intendedFor: 'Everyone. Especially queer people, Black and Brown dancers, beginners who are worried about being watched.',
      upcomingEvents: ['e4', 'e21', 'e36'],
      coHosts: ['f12'],
      tags: ['queer-affirming', 'ecstatic', 'celebratory', 'inclusive']
    },
    {
      id: 'f6', name: 'Anne Vestergaard', initials: 'AV', color: '#5abcb9',
      bio: 'Anne works at the intersection of Circling, trauma-informed facilitation, and somatic practice. She has a background in psychology and has been facilitating for 6 years.',
      lineages: ['Authentic Relating', 'Trauma-informed facilitation', 'SE-influenced'],
      communities: ['cr', 'sp'],
      practices: ['Authentic Relating', 'Circling', 'Somatic facilitation'],
      values: 'Safety and depth can coexist. I\'m interested in what becomes possible when both are present.',
      intendedFor: 'People who want depth AND safety. Good for people with trauma history who want to engage with relational practice.',
      upcomingEvents: ['e7', 'e18', 'e34'],
      coHosts: ['f4'],
      tags: ['trauma-informed', 'somatic', 'circling', 'safe space']
    },
    {
      id: 'f7', name: 'Jonas Rasmussen', initials: 'JR', color: '#a07850',
      bio: 'Jonas teaches Contact Improvisation with a particular focus on floor work, weight and surrender. He also practices and teaches Systema (Russian martial art).',
      lineages: ['Contact Improvisation', 'Systema', 'Butoh-influenced'],
      communities: ['ci', 'sp', 'ac'],
      practices: ['Contact Improvisation', 'Systema', 'Floor work'],
      values: 'There\'s something about gravity. It\'s the most patient teacher.',
      intendedFor: 'People with some CI experience looking to deepen. Also athletes and martial artists curious about movement.',
      upcomingEvents: ['e2', 'e11', 'e25'],
      coHosts: ['f1', 'f13'],
      tags: ['CI', 'martial arts', 'advanced', 'floor work']
    },
    {
      id: 'f8', name: 'Rikke Sonne', initials: 'RS', color: '#3aaa7a',
      bio: 'Rikke has practiced vipassana meditation for 15 years and trained as a mindfulness teacher. Her approach is non-dogmatic and emphasizes everyday application.',
      lineages: ['Vipassana (Goenka tradition)', 'MBSR', 'Inquiry'],
      communities: ['mc'],
      practices: ['Meditation', 'Mindfulness', 'Inquiry'],
      values: 'Nothing to fix. Just noticing.',
      intendedFor: 'Anyone. Beginners especially welcome. Also experienced practitioners who want a clear, simple container.',
      upcomingEvents: ['e9', 'e23', 'e38'],
      coHosts: ['f10'],
      tags: ['meditation', 'MBSR', 'beginner-friendly', 'non-religious']
    },
    {
      id: 'f9', name: 'Tobias Kramer', initials: 'TK', color: '#e8742a',
      bio: 'Tobias trained in dance therapy and brings a therapeutic lens to ecstatic and free dance. He also runs breathwork sessions.',
      lineages: ['Dance Therapy', 'Biodanza', 'Holotropic Breathwork'],
      communities: ['ed', 'sp'],
      practices: ['Dance Therapy', 'Ecstatic Dance', 'Breathwork'],
      values: 'The body never lies. I just try to create space for it to speak.',
      intendedFor: 'People in healing processes. Those drawn to the emotional depth of movement.',
      upcomingEvents: ['e10', 'e24', 'e37'],
      coHosts: ['f2'],
      tags: ['therapeutic', 'breathwork', 'healing', 'dance therapy']
    },
    {
      id: 'f10', name: 'Nanna Kjeldsen', initials: 'NK', color: '#5abcb9',
      bio: 'Nanna is a body psychotherapist and meditation teacher. She bridges somatic psychology with contemplative practice in a grounded, accessible way.',
      lineages: ['Body Psychotherapy (Biodynamic)', 'Mindfulness', 'Somatic Experiencing'],
      communities: ['mc', 'sp'],
      practices: ['Body Psychotherapy', 'Meditation', 'Somatic Experiencing'],
      values: 'The nervous system is wise. Learning to trust it changes everything.',
      intendedFor: 'People interested in the somatic dimension of wellbeing. Practitioners in training.',
      upcomingEvents: ['e12', 'e26', 'e39'],
      coHosts: ['f8', 'f6'],
      tags: ['psychotherapy', 'somatic', 'nervous system', 'professional']
    },
    {
      id: 'f11', name: 'Ida Markussen', initials: 'IM', color: '#7b5ea7',
      bio: 'Ida comes from theater and embodied performance and found her way to circling through improvisation. She brings a lightness and warmth to relational practice.',
      lineages: ['Theater / Applied Performance', 'Circling', 'Improv'],
      communities: ['cr', 'cs'],
      practices: ['Circling', 'Improv', 'Social facilitation'],
      values: 'Presence doesn\'t have to be heavy. It can be light.',
      intendedFor: 'People who might be intimidated by "deep" formats. Those who learn through play.',
      upcomingEvents: ['e15', 'e28', 'e40'],
      coHosts: ['f4'],
      tags: ['theater', 'light touch', 'accessible', 'playful']
    },
    {
      id: 'f12', name: 'Sana Khalil', initials: 'SK', color: '#d94a7a',
      bio: 'Sana is a queer Arab-Danish facilitator working with embodiment, identity, and collective healing. She creates safer spaces for LGBTQ+ BIPOC communities.',
      lineages: ['Somatic healing', 'Queer arts', 'Liberation psychology'],
      communities: ['qe', 'ed'],
      practices: ['Embodiment', 'Movement', 'Healing circles'],
      values: 'Our bodies carry history. And they also carry the possibility of something else.',
      intendedFor: 'Queer and trans people. BIPOC community members. Those seeking an intersectional embodiment space.',
      upcomingEvents: ['e13', 'e27', 'e41'],
      coHosts: ['f5'],
      tags: ['queer', 'BIPOC', 'intersectional', 'healing']
    },
    {
      id: 'f13', name: 'Viktor Sørensen', initials: 'VS', color: '#f0a500',
      bio: 'Viktor is a professional acrobat and clown who fell in love with AcroYoga as a teaching vehicle. His sessions are playful, physically precise, and very fun.',
      lineages: ['Acrobatics', 'AcroYoga', 'Clown / Physical Theater'],
      communities: ['ac', 'ci'],
      practices: ['Acro', 'AcroYoga', 'Partner movement'],
      values: 'Play is serious work. And falling is part of flying.',
      intendedFor: 'Anyone who wants to play with gravity. All fitness levels.',
      upcomingEvents: ['e16', 'e30', 'e43'],
      coHosts: ['f7'],
      tags: ['acro', 'play', 'physical', 'fun']
    },
    {
      id: 'f14', name: 'Camille Roux', initials: 'CR', color: '#a07850',
      bio: 'Camille is a French-Danish facilitator trained in the Japanese tea ceremony tradition. She designs conscious social experiences that slow time down.',
      lineages: ['Japanese Tea Ceremony (Chado)', 'Conscious facilitation'],
      communities: ['cs', 'mc'],
      practices: ['Tea Ceremony', 'Conscious Social Design', 'Hosting'],
      values: 'A cup of tea properly made and shared is a practice of full presence.',
      intendedFor: 'Everyone. Especially people who feel exhausted by performance in social settings.',
      upcomingEvents: ['e20', 'e35', 'e44'],
      coHosts: ['f17'],
      tags: ['tea', 'slow', 'social ritual', 'non-performative']
    },
    {
      id: 'f15', name: 'Kit Andersen', initials: 'KA', color: '#d94a7a',
      bio: 'Kit is non-binary and has practiced somatic movement, consent education, and facilitation for queer communities for 7 years.',
      lineages: ['Somatic Movement', 'Consent Education', 'Queer facilitation'],
      communities: ['qe'],
      practices: ['Somatic Movement', 'Consent workshops', 'Group facilitation'],
      values: 'Consent is a language. I want everyone in the room to speak it fluently.',
      intendedFor: 'Queer community. People who want to deepen consent literacy in embodied contexts.',
      upcomingEvents: ['e32', 'e42'],
      coHosts: ['f12'],
      tags: ['consent', 'queer', 'somatic', 'education']
    },
    {
      id: 'f16', name: 'Mikkel Friis', initials: 'MF', color: '#f0a500',
      bio: 'Mikkel started with breakdance, moved into gymnastics coaching, and now teaches acrobatics with a strong emphasis on progressive skill-building and safety.',
      lineages: ['Breakdance', 'Gymnastics', 'AcroYoga'],
      communities: ['ac'],
      practices: ['Acrobatics', 'Gymnastics', 'Breakdance'],
      values: 'Everyone can learn to do amazing things with their body. The only prerequisite is patience.',
      intendedFor: 'All levels. Especially beginners who want a structured entry into physical practice.',
      upcomingEvents: ['e43', 'e45'],
      coHosts: ['f13'],
      tags: ['beginner-friendly', 'structured', 'gymnastics', 'acro']
    },
    {
      id: 'f17', name: 'Peter Holst', initials: 'PH', color: '#a07850',
      bio: 'Peter has been hosting community gatherings for 10 years. He is particularly skilled at creating the conditions for strangers to become genuinely curious about each other.',
      lineages: ['Art of Hosting', 'Open Space Technology', 'Community facilitation'],
      communities: ['cs', 'cr'],
      practices: ['Community facilitation', 'Conversation design', 'Hosting'],
      values: 'Good conversation is a rare thing. And it can be designed for.',
      intendedFor: 'Anyone tired of small talk and looking for better conversations.',
      upcomingEvents: ['e20', 'e44', 'e46'],
      coHosts: ['f14', 'f11'],
      tags: ['conversation', 'community', 'hosting', 'social design']
    },
    {
      id: 'f18', name: 'Mia Thorsen', initials: 'MT', color: '#3aaa7a',
      bio: 'Mia is a meditation teacher and breathwork facilitator who has worked with the Wim Hof method and holotropic breathwork. She bridges accessible wellness with deeper somatic work.',
      lineages: ['Wim Hof Method', 'Holotropic Breathwork', 'Yoga'],
      communities: ['mc', 'sp'],
      practices: ['Breathwork', 'Meditation', 'Yoga'],
      values: 'One breath can change everything.',
      intendedFor: 'People curious about breathwork. Those wanting more energy, clarity, or embodied calm.',
      upcomingEvents: ['e47', 'e50'],
      coHosts: ['f9'],
      tags: ['breathwork', 'wim hof', 'accessible', 'wellness']
    }
  ];

  // ─── Generate events (50 events over 6 weeks from a reference date) ───
  function dateFromNow(daysOffset, hour = 19, min = 0) {
    const d = new Date(2026, 3, 23); // April 23, 2026 reference
    d.setDate(d.getDate() + daysOffset);
    d.setHours(hour, min, 0, 0);
    return d;
  }

  function fmt(d) {
    return d.toLocaleDateString('en-DK', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function fmtTime(d) {
    return d.toLocaleTimeString('en-DK', { hour: '2-digit', minute: '2-digit' });
  }

  const events = [
    { id: 'e1', title: 'Friday CI Open Jam', host: 'f1', communities: ['ci'], venue: 'v1', date: dateFromNow(1, 19), duration: '3h', price: 0, priceLabel: 'Free / donation', tags: ['CI', 'open', 'all levels'], beginnerFriendly: true, description: 'Our regular Friday jam. Come as you are, move as you like. A floor full of improvisational contact.', whoFor: 'Everyone. Beginners explicitly welcome.', whatToExpect: 'Warm-up, open jam, closing. No performance expectations.', attending: ['p1', 'p2', 'p5', 'p8', 'p12', 'p34', 'p45', 'p67'], suggested: [], relevanceLabels: ['From your CI circle', 'Beginner friendly', 'Near your usual venue'], recurring: true },
    { id: 'e2', title: 'Floor Work Intensive', host: 'f7', communities: ['ci', 'sp'], venue: 'v7', date: dateFromNow(3, 10), duration: '5h', price: 280, priceLabel: '280 DKK', tags: ['CI', 'floor work', 'intermediate'], beginnerFriendly: false, description: 'Deep dive into floor-based CI: rolling point of contact, micro-weight, dissolution. Requires some CI experience.', whoFor: 'People with 3+ months of CI practice.', whatToExpect: 'Skill work, partnered exploration, some solo practice.', attending: ['p1', 'p5', 'p12', 'p34', 'p67'], suggested: [], relevanceLabels: ['CI community event', '4 people from your circle are going'], recurring: false },
    { id: 'e3', title: 'Sunday Ecstatic Dance', host: 'f2', communities: ['ed'], venue: 'v7', date: dateFromNow(3, 10, 30), duration: '3.5h', price: 80, priceLabel: '80 DKK', tags: ['ecstatic', 'music', 'free dance'], beginnerFriendly: true, description: 'Bi-weekly ecstatic dance with live DJ set by Lars Nørby. Opening circle, free dance, closing.', whoFor: 'Everyone. All bodies, all ages, all movement styles.', whatToExpect: 'Warm-up ritual, wave of music, integration time.', attending: ['p2', 'p3', 'p6', 'p9', 'p15', 'p22', 'p45', 'p56', 'p78', 'p90'], suggested: [], relevanceLabels: ['Popular in your area', 'Suggested by CI Aarhus'], recurring: true },
    { id: 'e4', title: 'Queer Dance Party: Embodied Joy', host: 'f5', communities: ['ed', 'qe'], venue: 'v7', date: dateFromNow(8, 18), duration: '4h', price: 100, priceLabel: '100 DKK (sliding scale 60–150)', tags: ['queer', 'dance', 'celebratory', 'safer space'], beginnerFriendly: true, description: 'A queer-centered ecstatic dance event. DJ Yasmin brings African rhythms and electronic music together in a space that centers queer joy.', whoFor: 'Queer and trans people primarily. Allies welcome with awareness.', whatToExpect: 'Opening circle, free dance, community integration.', attending: ['p3', 'p6', 'p9', 'p22', 'p56', 'p102'], suggested: ['cs', 'cr'], relevanceLabels: ['Adjacent to your ED community', 'Queer-affirming space'] },
    { id: 'e5', title: 'Relational Movement Lab', host: 'f3', communities: ['ci', 'cr'], venue: 'v12', date: dateFromNow(5, 19), duration: '2.5h', price: 120, priceLabel: '120 DKK', tags: ['CI', 'authentic relating', 'relational', 'crossover'], beginnerFriendly: true, description: 'A blended evening: Contact Impro meeting Authentic Relating. Move with language, speak with your body.', whoFor: 'People curious about the crossover between physical and verbal relating.', whatToExpect: 'Alternating between movement practices and verbal relational exercises.', attending: ['p1', 'p2', 'p8', 'p12', 'p34', 'p78'], suggested: ['ed'], relevanceLabels: ['Bridges CI and Circling', 'Facilitator connected to your communities', 'New to you, adjacent to what you do'] },
    { id: 'e6', title: 'Wednesday Open Circle', host: 'f4', communities: ['cr'], venue: 'v4', date: dateFromNow(2, 19), duration: '2.5h', price: 60, priceLabel: '60 DKK', tags: ['circling', 'authentic relating', 'weekly'], beginnerFriendly: true, description: 'Our regular Wednesday circle. Open format, welcoming to newcomers. Usually 8–14 people.', whoFor: 'Anyone. New people introduce themselves in the opening round.', whatToExpect: 'Short intro for newcomers, one or two circling rounds, integration.', attending: ['p8', 'p78', 'p45', 'p89', 'p34', 'p23'], suggested: [], relevanceLabels: ['From your Circling community', 'Recurring weekly event'], recurring: true },
    { id: 'e7', title: 'Trauma-Informed Circle', host: 'f6', communities: ['cr', 'sp'], venue: 'v6', date: dateFromNow(7, 18, 30), duration: '2.5h', price: 150, priceLabel: '150 DKK', tags: ['trauma-informed', 'circling', 'safe space', 'somatic'], beginnerFriendly: false, description: 'A circling format specifically designed with trauma-informed principles. Slower pacing, more check-ins, explicit nervous-system care.', whoFor: 'People with lived experience of trauma who want to engage with relational practice carefully.', whatToExpect: 'More structured than open circles. Regular grounding pauses.', attending: ['p8', 'p34', 'p67', 'p78'], suggested: ['mc'], relevanceLabels: ['Somatic Network event', 'Lower demand, quiet week — good time to go', 'Facilitator connected to your communities'] },
    { id: 'e8', title: 'CI Technique Workshop: Spirals & Weight', host: 'f1', communities: ['ci'], venue: 'v7', date: dateFromNow(10, 10), duration: '6h', price: 350, priceLabel: '350 DKK (sliding 280–420)', tags: ['CI', 'workshop', 'technique', 'intermediate'], beginnerFriendly: false, description: 'Full-day workshop on spiral movement pathways and weight-sharing. Deepening the technical vocabulary of CI.', whoFor: 'Intermediate to advanced CI practitioners.', whatToExpect: 'Teaching segments, partnered practice, group exploration.', attending: ['p1', 'p5', 'p12', 'p34', 'p45', 'p67'], suggested: ['sp'], relevanceLabels: ['CI community event', 'Sofie Lundgren teaching'] },
    { id: 'e9', title: 'Morning Meditation Sit', host: 'f8', communities: ['mc'], venue: 'v5', date: dateFromNow(1, 7), duration: '1h', price: 0, priceLabel: 'Dana / donation', tags: ['meditation', 'morning', 'vipassana-style', 'beginner-friendly'], beginnerFriendly: true, description: 'Quiet morning sit. 45 minutes of guided and unguided meditation followed by short inquiry.', whoFor: 'Everyone. Cushions and chairs provided.', whatToExpect: 'Simple. You sit. You notice. You\'re welcome here.', attending: ['p90', 'p15', 'p45', 'p67'], suggested: [], relevanceLabels: ['Meditation Collective event', 'Beginner friendly', 'Morning rhythm'], recurring: true },
    { id: 'e10', title: 'Breathwork Journey', host: 'f9', communities: ['ed', 'sp'], venue: 'v7', date: dateFromNow(13, 14), duration: '3h', price: 250, priceLabel: '250 DKK', tags: ['breathwork', 'therapeutic', 'embodied', 'longer session'], beginnerFriendly: true, description: 'A guided breathwork journey using rhythmic connected breathing. Emotional release and integration supported.', whoFor: 'Anyone curious about breathwork. People going through transitions.', whatToExpect: 'Brief intro, 90 min active breathing, 45 min integration, sharing.', attending: ['p9', 'p22', 'p56', 'p67', 'p90'], suggested: ['mc', 'cr'], relevanceLabels: ['Popular with Ecstatic Dance crowd', 'Adjacent to your practice', 'Suggested by Circling Aarhus'] },
    { id: 'e11', title: 'Systema Ground Work', host: 'f7', communities: ['ci', 'sp'], venue: 'v1', date: dateFromNow(6, 18), duration: '2h', price: 100, priceLabel: '100 DKK', tags: ['systema', 'floor', 'martial arts', 'somatic'], beginnerFriendly: false, description: 'Principles from Systema applied to partner movement and floor-based exploration. Strong overlap with CI.', whoFor: 'People with some movement background. Martial artists, athletes, advanced CI practitioners.', whatToExpect: 'Structure: solo warm-up, partnered exploration, integration.', attending: ['p1', 'p5', 'p12', 'p67'], suggested: [], relevanceLabels: ['CI community event', 'Near your usual venue'] },
    { id: 'e12', title: 'Somatic Experiencing Introduction', host: 'f10', communities: ['sp'], venue: 'v6', date: dateFromNow(9, 18), duration: '3h', price: 200, priceLabel: '200 DKK', tags: ['SE', 'somatic', 'professional', 'introductory'], beginnerFriendly: true, description: 'An accessible introduction to the Somatic Experiencing framework for practitioners and curious individuals.', whoFor: 'Practitioners, therapists, students. Anyone working with trauma or nervous system.', whatToExpect: 'Theory, demonstration, experiential exercises.', attending: ['p67', 'p34', 'p78'], suggested: ['cr', 'mc'], relevanceLabels: ['Somatic Network event', 'Facilitator connected to your communities'] },
    { id: 'e13', title: 'Healing in Body: BIPOC Circle', host: 'f12', communities: ['qe'], venue: 'v8', date: dateFromNow(11, 16), duration: '2.5h', price: 80, priceLabel: '80 DKK (free for those who can\'t afford it)', tags: ['BIPOC', 'healing', 'community', 'somatic'], beginnerFriendly: true, description: 'A somatic healing circle specifically for BIPOC community members. Slow, gentle, grounded.', whoFor: 'Black, Indigenous, and People of Color. Not for white people.', whatToExpect: 'Check-in, somatic practice, community sharing.', attending: ['p3', 'p22', 'p102'], suggested: [], relevanceLabels: ['Queer Embodiment event', 'Safer space'] },
    { id: 'e14', title: 'Dance Meditation: Thursdays', host: 'f2', communities: ['ed'], venue: 'v2', date: dateFromNow(4, 19), duration: '2h', price: 60, priceLabel: '60 DKK', tags: ['dance', 'meditation', 'music', 'shorter'], beginnerFriendly: true, description: 'Shorter dance meditation session. Good entry point for people unfamiliar with ecstatic dance.', whoFor: 'Newcomers to free dance. People with only 2 hours.', whatToExpect: 'Brief opening, 80 min music wave, 20 min integration.', attending: ['p6', 'p15', 'p22', 'p56'], suggested: [], relevanceLabels: ['Good entry point', 'Beginner friendly'], recurring: true },
    { id: 'e15', title: 'Circling Intro Evening', host: 'f11', communities: ['cr'], venue: 'v4', date: dateFromNow(7, 18, 30), duration: '2h', price: 0, priceLabel: 'Free', tags: ['circling', 'intro', 'newcomer', 'beginner-friendly'], beginnerFriendly: true, description: 'First time at Circling? Come to this. Ida makes it light, warm, and genuinely easy to enter.', whoFor: 'Anyone who has never been to circling or authentic relating.', whatToExpect: 'Brief explanation, a taste of the practice, Q&A, tea.', attending: ['p23', 'p45', 'p56', 'p89', 'p90'], suggested: ['cs'], relevanceLabels: ['Intro event', 'Free', 'Beginner friendly'] },
    { id: 'e16', title: 'Sunday Acro Jam', host: 'f13', communities: ['ac'], venue: 'v1', date: dateFromNow(3, 13), duration: '3h', price: 60, priceLabel: '60 DKK', tags: ['acro', 'open jam', 'all levels', 'playful'], beginnerFriendly: true, description: 'Come fly! Open jam with structured skill-sharing at the start. All levels.', whoFor: 'Everyone. Especially beginners — spotting taught at each session.', whatToExpect: 'Skill-share, open jam, playful atmosphere.', attending: ['p45', 'p12', 'p15', 'p56'], suggested: ['ci'], relevanceLabels: ['Acro Jam community event', 'Beginner friendly', 'Same venue as CI'], recurring: true },
    { id: 'e17', title: 'Relational CI Weekend', host: 'f3', communities: ['ci', 'cr'], venue: 'v7', date: dateFromNow(14, 10), duration: '2 days', price: 850, priceLabel: '850 DKK (sliding 680–1050)', tags: ['CI', 'authentic relating', 'residential', 'weekend'], beginnerFriendly: false, description: 'A two-day residential blending Contact Improvisation with Authentic Relating practices. Facilitated by Emma Dahl with guest appearances.', whoFor: 'People with experience in at least one of CI or AR.', whatToExpect: 'Morning movement, relational labs, evening sharing, integration.', attending: ['p1', 'p2', 'p8', 'p12', 'p34', 'p78', 'p45'], suggested: ['sp', 'cs'], relevanceLabels: ['Signature CI + AR event', 'High demand', 'People from 3 communities going'] },
    { id: 'e18', title: 'Somatic Circling Lab', host: 'f6', communities: ['cr', 'sp'], venue: 'v12', date: dateFromNow(5, 19, 30), duration: '2.5h', price: 140, priceLabel: '140 DKK', tags: ['somatic', 'circling', 'body-based', 'experimental'], beginnerFriendly: false, description: 'What happens when circling meets somatic awareness? An experimental lab format.', whoFor: 'People with some circling and some somatic practice background.', whatToExpect: 'Mostly experiential. Some pauses for reflection.', attending: ['p8', 'p34', 'p67', 'p78'], suggested: ['mc'], relevanceLabels: ['Somatic + Circling overlap', 'Niche and deep'] },
    { id: 'e19', title: 'Circling Weekend Intensive', host: 'f4', communities: ['cr'], venue: 'v9', date: dateFromNow(21, 9), duration: '2 days', price: 1200, priceLabel: '1200 DKK (includes meals)', tags: ['circling', 'intensive', 'residential', 'advanced'], beginnerFriendly: false, description: 'Deep immersive weekend of Circling with Magnus. Requires prior experience.', whoFor: 'People with at least 6 months of circling practice.', whatToExpect: 'Full-day formats, evening circles, integration.', attending: ['p8', 'p78', 'p23', 'p34'], suggested: ['sp'], relevanceLabels: ['Advanced format', 'Retreat venue', 'High intensity'] },
    { id: 'e20', title: 'Tea & Connection Monthly', host: 'f14', communities: ['cs'], venue: 'v10', date: dateFromNow(4, 18, 30), duration: '2.5h', price: 80, priceLabel: '80 DKK incl. tea', tags: ['tea', 'social', 'connection', 'sober'], beginnerFriendly: true, description: 'Monthly alcohol-free gathering around the tea table. Good conversation, unhurried time.', whoFor: 'Everyone. Especially if you\'re tired of bars and networking events.', whatToExpect: 'Tea ceremony, facilitated conversation rounds, open socializing.', attending: ['p89', 'p45', 'p56', 'p90', 'p23'], suggested: ['cr', 'mc'], relevanceLabels: ['Conscious Socials event', 'Sober gathering', 'Good entry point'], recurring: true },
    { id: 'e21', title: 'Ecstatic Sunday with Yasmin', host: 'f5', communities: ['ed', 'qe'], venue: 'v7', date: dateFromNow(17, 10, 30), duration: '3.5h', price: 90, priceLabel: '90 DKK (sliding 60–130)', tags: ['ecstatic', 'queer', 'celebratory', 'African rhythms'], beginnerFriendly: true, description: 'DJ Yasmin brings African-rooted music and queer joy to the dance floor.', whoFor: 'Everyone. Queer community especially centered.', whatToExpect: 'Opening ritual, extended music wave, community integration.', attending: ['p3', 'p6', 'p9', 'p22', 'p56', 'p102'], suggested: ['ci'], relevanceLabels: ['Queer-affirming space', 'High energy'] },
    { id: 'e22', title: 'CI Beginners Evening', host: 'f1', communities: ['ci'], venue: 'v12', date: dateFromNow(6, 19), duration: '2h', price: 120, priceLabel: '120 DKK', tags: ['CI', 'beginner', 'intro', 'newcomer'], beginnerFriendly: true, description: 'An intentionally slow and well-explained introduction to Contact Improvisation. No experience needed.', whoFor: 'Complete beginners. First-timers welcome.', whatToExpect: 'Consent framework, basic principles, gentle partner work, questions welcome.', attending: ['p23', 'p56', 'p89', 'p90'], suggested: ['ed', 'ac'], relevanceLabels: ['Beginner friendly', 'CI entry point', 'New in city? Start here'] },
    { id: 'e23', title: 'Longer Sunday Sit', host: 'f8', communities: ['mc'], venue: 'v5', date: dateFromNow(10, 16), duration: '2h', price: 0, priceLabel: 'Dana', tags: ['meditation', 'sitting', 'longer', 'dhamma'], beginnerFriendly: true, description: 'Bi-weekly longer sit. An hour of silent meditation followed by dharma talk and discussion.', whoFor: 'All practitioners. Beginners may want to attend a morning sit first.', whatToExpect: 'Extended sitting, walking meditation, dharma sharing.', attending: ['p90', 'p67', 'p45', 'p15'], suggested: ['cr'], relevanceLabels: ['Meditation Collective event', 'Deepening your practice'] },
    { id: 'e24', title: 'Dance Therapy Open Session', host: 'f9', communities: ['ed', 'sp'], venue: 'v12', date: dateFromNow(8, 19), duration: '2h', price: 130, priceLabel: '130 DKK', tags: ['dance therapy', 'therapeutic', 'movement', 'emotional'], beginnerFriendly: true, description: 'A gently held space using dance therapy approaches for emotional integration and expression.', whoFor: 'People in therapeutic processes. Those using movement for wellbeing.', whatToExpect: 'Structured invitation to move with feeling. No performance.', attending: ['p22', 'p56', 'p67', 'p78'], suggested: ['mc', 'cr'], relevanceLabels: ['Therapeutic movement', 'Adjacent to Ecstatic Dance'] },
    { id: 'e25', title: 'CI Advanced Scores', host: 'f7', communities: ['ci'], venue: 'v7', date: dateFromNow(12, 18), duration: '3h', price: 160, priceLabel: '160 DKK', tags: ['CI', 'advanced', 'scores', 'composition'], beginnerFriendly: false, description: 'Advanced session exploring compositional scores in CI. For experienced practitioners wanting to go deeper.', whoFor: 'People with 1+ years of consistent CI practice.', whatToExpect: 'Score work, discussion, open practice time.', attending: ['p1', 'p5', 'p12', 'p34'], suggested: [], relevanceLabels: ['CI community advanced track', 'Jonas Rasmussen teaching'] },
    { id: 'e26', title: 'Nervous System Regulation Workshop', host: 'f10', communities: ['sp', 'mc'], venue: 'v5', date: dateFromNow(11, 10), duration: '4h', price: 300, priceLabel: '300 DKK', tags: ['nervous system', 'SE', 'regulation', 'workshop'], beginnerFriendly: true, description: 'Half-day workshop exploring nervous system regulation through somatic tools. Theory and practice combined.', whoFor: 'Anyone experiencing stress, burnout, or dysregulation. Practitioners in training.', whatToExpect: 'Short lecture, experiential exercises, integration pauses.', attending: ['p67', 'p90', 'p45', 'p78'], suggested: ['cr', 'cs'], relevanceLabels: ['Somatic + Meditation overlap', 'High relevance for practitioners'] },
    { id: 'e27', title: 'Queer Movement Circle', host: 'f12', communities: ['qe'], venue: 'v8', date: dateFromNow(9, 14), duration: '2.5h', price: 80, priceLabel: '80 DKK (sliding 50–120)', tags: ['queer', 'movement', 'community', 'slower'], beginnerFriendly: true, description: 'Bi-weekly movement circle centering queer bodies and experiences. Gentle, consensual, communal.', whoFor: 'Queer and trans people.', whatToExpect: 'Opening check-in, somatic movement, sharing.', attending: ['p3', 'p102', 'p22', 'p6'], suggested: ['ci'], relevanceLabels: ['Queer Embodiment event', 'Safer space'], recurring: true },
    { id: 'e28', title: 'Playful Circling', host: 'f11', communities: ['cr', 'cs'], venue: 'v4', date: dateFromNow(15, 19), duration: '2h', price: 60, priceLabel: '60 DKK', tags: ['circling', 'light', 'playful', 'accessible'], beginnerFriendly: true, description: 'Circling but lighter. Ida brings her theater background to create something that feels like play as much as practice.', whoFor: 'Perfect for people intimidated by "heavy" relational formats.', whatToExpect: 'Games, micro-circles, laughter, genuine contact.', attending: ['p23', 'p45', 'p56', 'p89', 'p90'], suggested: ['ed'], relevanceLabels: ['Accessible circling', 'Good entry point', 'Bridges CS and CR'] },
    { id: 'e29', title: 'Ecstatic Solstice Dance', host: 'f2', communities: ['ed'], venue: 'v7', date: dateFromNow(18, 11), duration: '4h', price: 120, priceLabel: '120 DKK', tags: ['ecstatic', 'special', 'seasonal', 'ritual'], beginnerFriendly: true, description: 'Seasonal ecstatic dance marking the solstice. Extra attention to ritual opening and closing.', whoFor: 'Everyone. Community gathering.', whatToExpect: 'Extended ritual, curated music journey, community closing.', attending: ['p2', 'p3', 'p6', 'p9', 'p15', 'p22', 'p45', 'p56', 'p78', 'p90', 'p102'], suggested: ['ci', 'mc', 'cr'], relevanceLabels: ['Community gathering', 'Seasonal ritual', 'High attendance expected'] },
    { id: 'e30', title: 'AcroYoga Intermediate Jam', host: 'f13', communities: ['ac', 'ci'], venue: 'v1', date: dateFromNow(6, 14), duration: '2.5h', price: 80, priceLabel: '80 DKK', tags: ['acro', 'intermediate', 'skills', 'playful'], beginnerFriendly: false, description: 'Intermediate AcroYoga jam with skill-sharing focus. Good for people past the absolute beginner stage.', whoFor: 'People who\'ve done at least 3 beginner sessions.', whatToExpect: 'Technical sharing, partner work, jam.', attending: ['p45', 'p12', 'p5'], suggested: [], relevanceLabels: ['Acro Jam event', 'Same venue as CI Aarhus'] },
    { id: 'e31', title: 'Contact & Conversation Lab', host: 'f3', communities: ['ci', 'cr'], venue: 'v4', date: dateFromNow(19, 18, 30), duration: '2.5h', price: 130, priceLabel: '130 DKK', tags: ['CI', 'conversation', 'blended', 'crossover'], beginnerFriendly: true, description: 'Move, pause, talk about it. Weaving CI with spoken reflection.', whoFor: 'People curious about how movement and language can meet.', whatToExpect: 'Alternating movement and conversation. No performance needed.', attending: ['p1', 'p8', 'p78', 'p34'], suggested: ['cs'], relevanceLabels: ['Bridges CI and Circling', 'Emma Dahl teaching'] },
    { id: 'e32', title: 'Consent in Motion Workshop', host: 'f15', communities: ['qe'], venue: 'v8', date: dateFromNow(16, 13), duration: '3h', price: 150, priceLabel: '150 DKK', tags: ['consent', 'workshop', 'embodied', 'education'], beginnerFriendly: true, description: 'Workshop exploring consent as a somatic, felt experience — not just rules.', whoFor: 'Open to all. Especially valuable for people working in embodied or facilitated spaces.', whatToExpect: 'Experiential exercises, discussion, integration.', attending: ['p102', 'p3', 'p22', 'p12', 'p45'], suggested: ['ci', 'ac'], relevanceLabels: ['Consent workshop', 'High value for CI and Acro communities'] },
    { id: 'e33', title: 'Advanced Circling Lab', host: 'f4', communities: ['cr'], venue: 'v6', date: dateFromNow(12, 19), duration: '3h', price: 180, priceLabel: '180 DKK', tags: ['circling', 'advanced', 'deep'], beginnerFriendly: false, description: 'For people with a solid circling foundation. Magnus works with more subtle dimensions of relational presence.', whoFor: 'Experienced circlers.', whatToExpect: 'One or two deep circles, debrief, advanced inquiry.', attending: ['p8', 'p78', 'p23', 'p34'], suggested: [], relevanceLabels: ['Advanced track', 'Deep format'] },
    { id: 'e34', title: 'Trauma-Informed Somatic Practice Day', host: 'f6', communities: ['sp', 'cr'], venue: 'v9', date: dateFromNow(25, 10), duration: '6h', price: 450, priceLabel: '450 DKK (sliding 380–580)', tags: ['trauma-informed', 'somatic', 'day-long', 'professional'], beginnerFriendly: false, description: 'Study day for practitioners and advanced students in trauma-informed somatic work.', whoFor: 'Practitioners, therapists, advanced students.', whatToExpect: 'Short input, case reflection (anonymized), experiential labs, peer supervision.', attending: ['p67', 'p34', 'p78', 'p90'], suggested: ['mc'], relevanceLabels: ['Somatic Network event', 'Practitioner level'] },
    { id: 'e35', title: 'Conversation Salon', host: 'f17', communities: ['cs'], venue: 'v4', date: dateFromNow(16, 19, 30), duration: '2h', price: 60, priceLabel: '60 DKK', tags: ['conversation', 'salon', 'social', 'sober'], beginnerFriendly: true, description: 'Monthly salon-style gathering around a theme. Good conversation, good company, no drinks.', whoFor: 'Anyone interested in thoughtful conversation.', whatToExpect: 'Opening question, small groups, full group sharing, open mingling.', attending: ['p89', 'p45', 'p90', 'p23', 'p56'], suggested: ['cr', 'mc'], relevanceLabels: ['Conscious Socials event', 'Good for newcomers'], recurring: true },
    { id: 'e36', title: 'African & Diaspora Dance Workshop', host: 'f5', communities: ['ed', 'qe'], venue: 'v7', date: dateFromNow(22, 10), duration: '3h', price: 200, priceLabel: '200 DKK', tags: ['African dance', 'diaspora', 'embodied culture', 'workshop'], beginnerFriendly: true, description: 'Workshop in West African and diaspora-rooted dance traditions. Cultural context included.', whoFor: 'Everyone. BIPOC community especially welcomed.', whatToExpect: 'Cultural intro, technique work, expressive movement.', attending: ['p3', 'p6', 'p22', 'p56', 'p102'], suggested: ['ci', 'cs'], relevanceLabels: ['Yasmin Osei workshop', 'Cultural depth'] },
    { id: 'e37', title: 'Embodied Grief Circle', host: 'f9', communities: ['sp', 'ed'], venue: 'v12', date: dateFromNow(14, 16), duration: '3h', price: 160, priceLabel: '160 DKK (sliding 100–200)', tags: ['grief', 'therapeutic', 'movement', 'somatic'], beginnerFriendly: true, description: 'A slow somatic space for moving with grief and loss. Facilitated, safe, gently held.', whoFor: 'People going through grief or loss. Those accompanying others through it.', whatToExpect: 'Ritual opening, somatic movement, group sharing.', attending: ['p22', 'p67', 'p78', 'p90'], suggested: ['mc', 'cr'], relevanceLabels: ['Therapeutic depth', 'Adjacent to your communities'] },
    { id: 'e38', title: 'Meditation and Inquiry Evening', host: 'f8', communities: ['mc'], venue: 'v5', date: dateFromNow(20, 19), duration: '1.5h', price: 0, priceLabel: 'Dana', tags: ['meditation', 'inquiry', 'dharma', 'community'], beginnerFriendly: true, description: 'Sitting meditation followed by dharma inquiry. What is this moment asking of us?', whoFor: 'All practitioners. Questions more welcome than answers.', whatToExpect: 'Sit, dharma talk, small group inquiry, sharing.', attending: ['p90', 'p67', 'p45', 'p15'], suggested: ['cs', 'cr'], relevanceLabels: ['Meditation Collective event'] },
    { id: 'e39', title: 'Body & Psyche: Introduction', host: 'f10', communities: ['sp', 'mc'], venue: 'v6', date: dateFromNow(18, 18, 30), duration: '2.5h', price: 180, priceLabel: '180 DKK', tags: ['psychotherapy', 'somatic', 'introduction', 'body-mind'], beginnerFriendly: true, description: 'An accessible introduction to body psychotherapy principles. Theory with experiential elements.', whoFor: 'Therapists in training, curious practitioners, people wanting to understand somatic psychology.', whatToExpect: 'Short input, body-based exercises, Q&A.', attending: ['p67', 'p78', 'p45', 'p90'], suggested: ['cr'], relevanceLabels: ['Somatic Network event', 'Nanna Kjeldsen teaching'] },
    { id: 'e40', title: 'Impro & Circling Mashup', host: 'f11', communities: ['cr', 'cs'], venue: 'v12', date: dateFromNow(23, 19), duration: '2h', price: 80, priceLabel: '80 DKK', tags: ['impro', 'circling', 'theater', 'playful'], beginnerFriendly: true, description: 'What if Circling and improv theater met? Ida finds out. Expect to laugh.', whoFor: 'People who take themselves a little too seriously. (Or not at all.)', whatToExpect: 'Games, presence exercises, actual fun.', attending: ['p23', 'p45', 'p89', 'p56'], suggested: ['ed', 'ci'], relevanceLabels: ['Accessible and playful', 'Ida Markussen hosting'] },
    { id: 'e41', title: 'Queer Somatic Practice', host: 'f12', communities: ['qe', 'sp'], venue: 'v8', date: dateFromNow(24, 14), duration: '2h', price: 90, priceLabel: '90 DKK', tags: ['queer', 'somatic', 'embodiment', 'community'], beginnerFriendly: true, description: 'Somatic movement practice held within a queer-affirming frame.', whoFor: 'Queer people interested in somatic practice.', whatToExpect: 'Guided somatic movement, sharing, community.', attending: ['p102', 'p3', 'p22'], suggested: ['ci', 'mc'], relevanceLabels: ['Queer Embodiment event', 'Somatic + Queer overlap'] },
    { id: 'e42', title: 'Consent Pedagogy for Facilitators', host: 'f15', communities: ['qe', 'sp', 'ci'], venue: 'v12', date: dateFromNow(28, 10), duration: '4h', price: 250, priceLabel: '250 DKK', tags: ['consent', 'pedagogy', 'facilitators', 'professional'], beginnerFriendly: false, description: 'For people who facilitate embodied spaces. How to embed consent literacy into your facilitation.', whoFor: 'Facilitators, teachers, embodied practitioners who hold space for others.', whatToExpect: 'Methodology, experiential, peer practice, case discussion.', attending: ['p1', 'p12', 'p45', 'p67', 'p34'], suggested: ['cr', 'ac'], relevanceLabels: ['Professional development', 'Consent pedagogy'] },
    { id: 'e43', title: 'Beginner Acro Session', host: 'f16', communities: ['ac'], venue: 'v1', date: dateFromNow(5, 11), duration: '2h', price: 80, priceLabel: '80 DKK', tags: ['acro', 'beginner', 'structured', 'safe'], beginnerFriendly: true, description: 'Very structured beginner session. Step-by-step introduction to acrobatic partner work.', whoFor: 'Complete beginners. No fitness prerequisite.', whatToExpect: 'Step-by-step progressions. Spotting always present.', attending: ['p23', 'p56', 'p89'], suggested: ['ci'], relevanceLabels: ['Beginner entry point', 'Mikkel Friis teaching'], recurring: true },
    { id: 'e44', title: 'Spring Tea Ceremony', host: 'f14', communities: ['cs', 'mc'], venue: 'v10', date: dateFromNow(13, 16), duration: '2h', price: 120, priceLabel: '120 DKK', tags: ['tea ceremony', 'seasonal', 'contemplative', 'slow'], beginnerFriendly: true, description: 'A formal tea ceremony marking spring. Slow, sensory, meditative.', whoFor: 'Anyone. No knowledge of tea ceremony required.', whatToExpect: 'Ceremonial practice, silence, beauty, good tea.', attending: ['p89', 'p45', 'p90', 'p15'], suggested: ['mc', 'cr'], relevanceLabels: ['Camille Roux hosting', 'Seasonal ritual', 'Contemplative mood'] },
    { id: 'e45', title: 'Acro Flow: Partner Balance', host: 'f16', communities: ['ac', 'ci'], venue: 'v1', date: dateFromNow(19, 14), duration: '2h', price: 100, priceLabel: '100 DKK', tags: ['acro', 'balance', 'CI-adjacent', 'flow'], beginnerFriendly: false, description: 'Intermediate session exploring balance, weight-sharing and flow between partners. CI practitioners will find familiar territory.', whoFor: 'Intermediate acro or CI practitioners.', whatToExpect: 'Skill work, partner play, open jam.', attending: ['p45', 'p12', 'p5', 'p1'], suggested: [], relevanceLabels: ['CI-adjacent', 'Same venue as open jam'] },
    { id: 'e46', title: 'Connection Salon: On Belonging', host: 'f17', communities: ['cs', 'cr'], venue: 'v4', date: dateFromNow(30, 19, 30), duration: '2.5h', price: 60, priceLabel: '60 DKK', tags: ['conversation', 'belonging', 'community', 'salon'], beginnerFriendly: true, description: 'This month\'s salon: What does it mean to truly belong somewhere? An honest conversation.', whoFor: 'Everyone. Especially newcomers to the city.', whatToExpect: 'Opening question, facilitated small groups, full group, open mingling.', attending: ['p89', 'p23', 'p56', 'p45', 'p90'], suggested: ['ci', 'ed', 'mc'], relevanceLabels: ['Conscious Socials event', 'Theme: Belonging'] },
    { id: 'e47', title: 'Breathwork Morning', host: 'f18', communities: ['mc', 'sp'], venue: 'v5', date: dateFromNow(7, 8), duration: '1.5h', price: 100, priceLabel: '100 DKK', tags: ['breathwork', 'morning', 'energy', 'somatic'], beginnerFriendly: true, description: 'Morning breathwork session. Accessible techniques for vitality and clarity.', whoFor: 'Anyone. Beginners especially welcome.', whatToExpect: 'Grounding breath, active breathing, integration.', attending: ['p90', 'p67', 'p45', 'p15'], suggested: ['cr', 'ed'], relevanceLabels: ['Morning energy', 'Beginner friendly', 'Mia Thorsen facilitating'] },
    { id: 'e48', title: 'Contact Jam: New Faces', host: 'f1', communities: ['ci'], venue: 'v7', date: dateFromNow(24, 19), duration: '3h', price: 0, priceLabel: 'Free / donation', tags: ['CI', 'newcomers', 'open', 'all levels'], beginnerFriendly: true, description: 'Special jam with extra space and attention for people coming for the first time.', whoFor: 'Newcomers to CI. Also regulars who want a gentle atmosphere.', whatToExpect: 'Extended intro, slow warm-up, open jam.', attending: ['p23', 'p56', 'p89', 'p5', 'p12'], suggested: ['ac', 'sp'], relevanceLabels: ['Newcomer-focused', 'Free', 'Sofie Lundgren hosting'] },
    { id: 'e49', title: 'Somatic Study Day', host: 'f10', communities: ['sp'], venue: 'v9', date: dateFromNow(35, 10), duration: '6h', price: 500, priceLabel: '500 DKK (practitioners only)', tags: ['somatic', 'study day', 'professional', 'CPD'], beginnerFriendly: false, description: 'Quarterly study day for somatic practitioners. Theme: Working with the window of tolerance in groups.', whoFor: 'Certified or advanced student somatic practitioners.', whatToExpect: 'Input, case study, peer practice, supervision slots.', attending: ['p67', 'p34', 'p78'], suggested: [], relevanceLabels: ['Somatic Network quarterly event', 'CPD hours available'] },
    { id: 'e50', title: 'Breathwork & Sound Bath', host: 'f18', communities: ['mc', 'ed'], venue: 'v7', date: dateFromNow(27, 15), duration: '2.5h', price: 180, priceLabel: '180 DKK', tags: ['breathwork', 'sound', 'ceremonial', 'journey'], beginnerFriendly: true, description: 'Guided breathwork followed by a sound bath. A deep rest for the nervous system.', whoFor: 'Open to all. Good for people going through stress or transition.', whatToExpect: 'Active breathing phase, sound bath, long integration.', attending: ['p90', 'p45', 'p15', 'p22', 'p56', 'p67'], suggested: ['ci', 'cr', 'cs'], relevanceLabels: ['Mia Thorsen event', 'Ecstatic Dance crowd often attends', 'Sound bath!'] }
  ];

  // ─── Participants / personas ───
  const personas = [
    {
      id: 'persona-maya',
      personId: 'p1',
      name: 'Maya Eriksen',
      initials: 'ME',
      color: '#4a7c59',
      role: 'Regular CI practitioner',
      description: 'Has been in the CI scene for 2 years. Also attends some Authentic Relating events. Lives near Movement Lab.',
      communities: ['ci', 'cr'],
      savedEvents: ['e1', 'e5', 'e8', 'e17'],
      attendingEvents: ['e1', 'e8'],
      followedFacilitators: ['f1', 'f3'],
      participationHistory: ['e1', 'e5', 'e11', 'e8', 'e22'],
      defaultRole: 'participant'
    },
    {
      id: 'persona-alex',
      personId: 'p23',
      name: 'Alex Petersen',
      initials: 'AP',
      color: '#7b5ea7',
      role: 'Newcomer to city',
      description: 'Just moved to Aarhus. Interested in meditation and maybe movement. Doesn\'t know the scene yet.',
      communities: [],
      savedEvents: ['e9', 'e15'],
      attendingEvents: [],
      followedFacilitators: [],
      participationHistory: [],
      defaultRole: 'participant'
    },
    {
      id: 'persona-sofie',
      personId: 'p12',
      name: 'Sofie Lundgren',
      initials: 'SL',
      color: '#4a7c59',
      role: 'Facilitator',
      description: 'CI facilitator and community steward for CI Aarhus. Deep in the local scene.',
      communities: ['ci', 'sp'],
      savedEvents: ['e7', 'e10', 'e34'],
      attendingEvents: ['e7', 'e34'],
      followedFacilitators: ['f7', 'f3', 'f6'],
      participationHistory: ['e1', 'e8', 'e11', 'e22', 'e25', 'e45'],
      defaultRole: 'facilitator',
      facilitatorId: 'f1'
    },
    {
      id: 'persona-magnus',
      personId: 'p78',
      name: 'Magnus Christoffersen',
      initials: 'MC',
      color: '#3aaa7a',
      role: 'Community Steward',
      description: 'Steward for Circling Aarhus. Deep in the relational scene. Also attends ecstatic dance occasionally.',
      communities: ['cr', 'cs', 'ed'],
      savedEvents: ['e18', 'e34', 'e37'],
      attendingEvents: ['e6', 'e33'],
      followedFacilitators: ['f6', 'f11', 'f9'],
      participationHistory: ['e6', 'e7', 'e18', 'e19', 'e33'],
      defaultRole: 'steward',
      stewardFor: 'cr',
      facilitatorId: 'f4'
    }
  ];

  // ─── Suggested events queue (for steward mode) ───
  const suggestedEventsQueue = {
    'cr': [
      { eventId: 'e10', suggestedBy: 'p45', note: 'Thought this breathwork session might be relevant — lot of people from our circles are going and it seems aligned with what we do', timestamp: dateFromNow(-2) },
      { eventId: 'e26', suggestedBy: 'p34', note: 'Nervous system work feels very close to what we explore in circles. Might be a good crossover event to feature.', timestamp: dateFromNow(-1) },
      { eventId: 'e28', suggestedBy: 'p89', note: 'I know Ida, she\'s great. The playful circling format might be good for people nervous about the regular circle.', timestamp: dateFromNow(-3) }
    ],
    'ci': [
      { eventId: 'e32', suggestedBy: 'p5', note: 'Consent in Motion feels very relevant to our jam culture. Would love to feature it.', timestamp: dateFromNow(-1) },
      { eventId: 'e5', suggestedBy: 'p34', note: 'Relational Movement Lab bridges what we do with circling — great for members curious about both.', timestamp: dateFromNow(-2) }
    ],
    'ed': [
      { eventId: 'e50', suggestedBy: 'p56', note: 'Breathwork and sound bath — very much the same energy as what we do Sunday mornings.', timestamp: dateFromNow(-1) },
      { eventId: 'e4', suggestedBy: 'p22', note: 'Yasmin\'s queer dance event is perfectly aligned with our community values and many of us will be there.', timestamp: dateFromNow(-3) }
    ]
  };

  // ─── Fake analytics for steward dashboard ───
  const communityAnalytics = {
    'cr': {
      participationTrend: [12, 14, 11, 16, 15, 18, 20],
      newVsReturning: { new: 30, returning: 70 },
      topEvents: ['e6', 'e19', 'e7'],
      underservedSlots: ['Monday evening', 'Weekend mornings'],
      crossoverStrength: [
        { communityId: 'cs', percent: 65 },
        { communityId: 'mc', percent: 60 },
        { communityId: 'sp', percent: 55 }
      ],
      opportunities: [
        { type: 'overlap', text: 'Strong crossover with Conscious Socials this month', detail: '65% of your regulars also attend CS events', variant: 'info' },
        { type: 'retention', text: 'Many newcomers attend once but do not return', detail: 'Only 40% of first-timers come to a second circle. Consider a follow-up welcome.', variant: 'warning' },
        { type: 'slot', text: 'Monday evenings show demand, low supply', detail: '12 people from your community have saved Monday events from other communities.', variant: 'info' },
        { type: 'suggestion', text: '3 member-suggested events awaiting review', detail: 'Events suggested by your members are in the queue.', variant: 'purple' },
        { type: 'facilitator', text: 'Anne Vestergaard is drawing strong interest', detail: 'Her trauma-informed circle had a 90% attendance rate last month.', variant: 'info' }
      ]
    },
    'ci': {
      participationTrend: [22, 24, 20, 25, 28, 26, 30],
      newVsReturning: { new: 20, returning: 80 },
      topEvents: ['e1', 'e8', 'e17'],
      underservedSlots: ['Wednesday evening', 'Saturday afternoon'],
      crossoverStrength: [
        { communityId: 'sp', percent: 80 },
        { communityId: 'ed', percent: 70 },
        { communityId: 'ac', percent: 50 }
      ],
      opportunities: [
        { type: 'overlap', text: 'Acro Jam crossover is growing', detail: '50% shared members — coordinate on venues?', variant: 'info' },
        { type: 'slot', text: 'Wednesday evenings are underserved', detail: 'CI events on Wednesdays get 35% higher attendance than average.', variant: 'info' },
        { type: 'suggestion', text: '2 member-suggested events awaiting review', detail: 'Members have flagged relevant events.', variant: 'purple' },
        { type: 'retention', text: 'Strong returning rate — 80% retention', detail: 'Your regulars are very sticky. Focus energy on newcomer onboarding.', variant: 'info' }
      ]
    }
  };

  // ─── Current persona state ───
  let currentPersonaId = 'persona-maya';
  let currentRole = 'participant';
  let currentView = 'home';

  function getCurrentPersona() {
    return personas.find(p => p.id === currentPersonaId);
  }

  function getCommunityById(id) {
    return communities.find(c => c.id === id);
  }

  function getEventById(id) {
    return events.find(e => e.id === id);
  }

  function getFacilitatorById(id) {
    return facilitators.find(f => f.id === id);
  }

  function getVenueById(id) {
    return venues.find(v => v.id === id);
  }

  function getEventsForCommunity(communityId) {
    return events.filter(e => e.communities.includes(communityId));
  }

  function getUpcomingEvents(limit = 10) {
    const now = new Date(2026, 3, 23);
    return events
      .filter(e => e.date >= now)
      .sort((a, b) => a.date - b.date)
      .slice(0, limit);
  }

  function getRelevantEventsForPersona(persona, limit = 8) {
    if (!persona || persona.communities.length === 0) {
      return getUpcomingEvents(limit);
    }
    const communitySet = new Set(persona.communities);
    const scored = events.map(e => {
      let score = 0;
      const communityOverlap = e.communities.filter(c => communitySet.has(c)).length;
      if (communityOverlap > 0) score += 10 * communityOverlap;
      const saved = persona.savedEvents.includes(e.id);
      if (saved) score += 5;
      const facilitatorFollowed = persona.followedFacilitators.includes(e.host);
      if (facilitatorFollowed) score += 8;
      score += Math.random() * 2; // slight randomization
      return { event: e, score };
    });
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(x => x.event);
  }

  function formatDate(d) {
    return fmt(d);
  }

  function formatTime(d) {
    return fmtTime(d);
  }

  function formatPrice(event) {
    return event.priceLabel || (event.price === 0 ? 'Free' : `${event.price} DKK`);
  }

  return {
    communities, venues, facilitators, events, personas,
    suggestedEventsQueue, communityAnalytics,
    get currentPersonaId() { return currentPersonaId; },
    set currentPersonaId(v) { currentPersonaId = v; },
    get currentRole() { return currentRole; },
    set currentRole(v) { currentRole = v; },
    get currentView() { return currentView; },
    set currentView(v) { currentView = v; },
    getCurrentPersona,
    getCommunityById,
    getEventById,
    getFacilitatorById,
    getVenueById,
    getEventsForCommunity,
    getUpcomingEvents,
    getRelevantEventsForPersona,
    formatDate,
    formatTime,
    formatPrice
  };
})();
