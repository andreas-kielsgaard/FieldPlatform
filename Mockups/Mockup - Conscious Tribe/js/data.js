(function () {
  function createDemoState() {
    return {
      currentPerson: {
        id: "casey",
        name: "Casey Holm",
        season: "arriving with some old threads, one strong practice, and a wish to bridge gently",
        note: "This is one person's living field. It is not a community roster and it is not meant to own any relation."
      },

      stances: [
        {
          id: "arrive",
          label: "Arrive",
          question: "I want a clear, gentle place to land.",
          copy: "Soft landings, hosted thresholds, and newcomer-safe fires rise first."
        },
        {
          id: "explore",
          label: "Explore",
          question: "I am curious about adjacent worlds.",
          copy: "Bridges, visible edges, and nearby groves become easier to see."
        },
        {
          id: "deepen",
          label: "Deepen",
          question: "I want continuity and repeated practice.",
          copy: "Recurring rooms, trusted stewards, and roots receive more weight."
        },
        {
          id: "tend",
          label: "Tend",
          question: "I have capacity to help hold something.",
          copy: "Calls for support, stewarded openings, and contribution paths come forward."
        },
        {
          id: "rest",
          label: "Rest",
          question: "I need low-demand contact or quiet continuity.",
          copy: "Quiet rooms, tea, watching, and dormant threads are kept visible."
        }
      ],

      groves: [
        {
          id: "grove_ecstatic",
          title: "Ecstatic Dance Aarhus",
          kind: "grove",
          color: "#c46f32",
          summary: "A sober music-led movement field with a large public fire and a quieter integration edge.",
          carrier: "Noa Vang and the dance steward circle",
          rhythm: "Biweekly Sunday dance",
          visibility: "Public fire, trusted facilitator layer",
          threshold: "Arrive before opening circle, respect the no-talking floor, stay sober.",
          whyVisible: "You have a dormant dance thread and several nearby people still cross this fire.",
          heldBack: "The platform does not show who danced with whom, intensity, or private integration notes.",
          actions: [
            action("followGrove", "Follow this grove", "Keep its public fires and soft landings visible without joining a member layer."),
            action("returnDormant", "Return to a dormant thread", "Mark that this old dance relation may be ready for a gentle next contact."),
            action("keepWatching", "Keep watching", "Let this stay at the edge without turning curiosity into a commitment.")
          ]
        },
        {
          id: "grove_tea",
          title: "Tea & Connection Socials",
          kind: "grove",
          color: "#98724a",
          summary: "Low-threshold hosted social rooms with tea, gentle prompts, and permission to arrive slowly.",
          carrier: "Freja Lind, Alma Weiss, and rotating hosts",
          rhythm: "Friday late tea, newcomer table, post-event integration",
          visibility: "Public rooms, trusted host layer",
          threshold: "Opt in to prompts, no networking pressure, leave when complete.",
          whyVisible: "This grove is acting as a bridge between dance, circling, and newcomer arrival.",
          heldBack: "Conversation content and individual check-ins stay private to the room.",
          actions: [
            action("sitFire", "Sit by this fire", "Show the next hosted tea room as a possible landing point."),
            action("helpTend", "Help tend the fire", "Offer to pour tea, welcome late arrivals, or reset the room after a larger event."),
            action("namePath", "Name a path", "Make a bridge from dance to tea to relational practice visible for others.", "path_tea_circling")
          ]
        },
        {
          id: "grove_circling",
          title: "Circling / Authentic Relating Aarhus",
          kind: "grove",
          color: "#735fa4",
          summary: "Relational practice for presence, truthful contact, and careful group attention.",
          carrier: "Rune Iversen and the intro circle hosts",
          rhythm: "Wednesday open circle, monthly intro evening",
          visibility: "Public intro, member-visible ongoing labs",
          threshold: "Intro evenings are public. Deeper labs ask for requested access and confidentiality.",
          whyVisible: "Tea socials are a steward-marked softer entry before deeper relational practice.",
          heldBack: "Membership, personal shares, and lab attendance are not exposed as public social proof.",
          actions: [
            action("askEdge", "Ask at the edge", "Send a small question to a steward before entering deeper relational practice."),
            action("followGrove", "Follow this grove", "Keep public intros and stewarded openings in view."),
            action("comeSupport", "Come with support", "Look for a bridge person or softer event before entering a deeper room.")
          ]
        },
        {
          id: "grove_ci",
          title: "Contact Improvisation Aarhus",
          kind: "grove",
          color: "#3f7597",
          summary: "A movement field for touch, weight sharing, consent, improvisation, and playful presence.",
          carrier: "Ella Strand and the Friday jam hosts",
          rhythm: "Friday open jam, Sunday practice, monthly workshop",
          visibility: "Public jams, trusted holding layer",
          threshold: "Beginner landing at 18:45, consent can change at any time, pause is always allowed.",
          whyVisible: "You have a strong practice root here and it bridges into somatics and partner movement.",
          heldBack: "Touch preferences, partner histories, and private feedback are not mapped.",
          actions: [
            action("sitFire", "Sit by this fire", "Show the next beginner landing and practical arrival details."),
            action("helpTend", "Help tend the fire", "Offer beginner support, floor care, or opening-circle help."),
            action("namePath", "Name a path", "Clarify the path from contact practice into somatic peer learning.", "path_ci_somatic")
          ]
        },
        {
          id: "grove_somatic",
          title: "Somatic Practitioners Network",
          kind: "grove",
          color: "#278578",
          summary: "A loose professional and peer learning network for bodyworkers, movers, and trauma-aware practitioners.",
          carrier: "Kai Sol and rotating peer lab stewards",
          rhythm: "Monthly peer lab, quarterly case clinic, public talks",
          visibility: "Public talks, requested access for peer labs",
          threshold: "Name scope of practice, consent before touch, resource before depth.",
          whyVisible: "Shared consent language links this grove with CI, queer embodiment, and circling.",
          heldBack: "Client material, practitioner referrals, and lab membership are carefully held.",
          actions: [
            action("askEdge", "Ask at the edge", "Request whether the next peer lab fits your background and capacity."),
            action("keepWatching", "Keep watching", "Follow public talks without entering practitioner-only rooms."),
            action("helpTend", "Help tend the fire", "Offer support for setup, notes, or a public bridge evening.")
          ]
        },
        {
          id: "grove_queer",
          title: "Queer Embodiment Circle",
          kind: "grove",
          color: "#bd4f72",
          summary: "Embodiment, movement, and social practice centered on queer and trans experience.",
          carrier: "Amal Hadi and the safer-space holders",
          rhythm: "Biweekly movement circle, monthly shared meal",
          visibility: "Visible public outline, agreement-gated details",
          threshold: "Read the safer-space agreement. Some doors are for members or invited allies.",
          whyVisible: "A bridge person you trust carries invitations here, but the grove keeps a clear boundary.",
          heldBack: "Member identities, attendance, and personal belonging are not used as public evidence.",
          actions: [
            action("askEdge", "Ask at the edge", "Ask a steward what is appropriate before stepping closer."),
            action("comeSupport", "Come with support", "Enter through a named public doorway or with an invited bridge person."),
            action("keepWatching", "Keep watching", "Let the grove remain visible without asking it to open everything.")
          ]
        },
        {
          id: "grove_meditation",
          title: "Meditation Collective",
          kind: "grove",
          color: "#55735d",
          summary: "A quiet, non-dogmatic rhythm for sitting, breath, inquiry, and spacious attention.",
          carrier: "Isha Berg, Henrik Dahl, and morning sit holders",
          rhythm: "Tuesday and Thursday morning sits",
          visibility: "Public sits, quiet trusted inquiry layer",
          threshold: "Arrive before the bell, silence during practice, dana is optional.",
          whyVisible: "This is a resting branch in your forest, not a novelty recommendation.",
          heldBack: "The app keeps quiet regulars quiet unless they choose to be named.",
          actions: [
            action("sitFire", "Sit by this fire", "Show the next morning sit as a low-demand way to be near the field."),
            action("keepWatching", "Keep watching", "Let morning practice stay as a quiet possibility."),
            action("followGrove", "Follow this grove", "Keep recurring sits visible in the forest layer.")
          ]
        }
      ],

      invitations: [
        {
          id: "inv_ecstatic_sunday",
          title: "Sunday Ecstatic Dance",
          kind: "large public campfire",
          time: "Sun 10:30",
          venue: "Godsbanen Hall",
          groveIds: ["grove_ecstatic"],
          carrier: "Noa Vang",
          summary: "A large sober dance fire with opening circle, free movement, and a quieter tea landing afterward.",
          whyMatters: "Many parts of the local movement forest cross here, but the room still has a clear floor boundary.",
          participation: "Arrive before the opening circle, dance or rest at the edge, then choose whether tea feels right.",
          visibility: "Public",
          visibilityTone: "public",
          threshold: "No talking on the dance floor. Integration stays with the people who choose it.",
          whatVisible: "Time, place, norms, steward, and the soft landing after the dance.",
          whatHeld: "Who came with whom, what happened on the floor, and private integration are not shown.",
          stanceFit: fit(4, 4, 3, 2, 1),
          pathIds: ["path_ecstatic_tea"],
          actions: [
            action("sitFire", "Sit by this fire", "Mark this as an intended landing point and keep practical arrival details close."),
            action("inviteFriend", "Invite a friend through this path", "Share the public fire and its tea landing, not private attendance traces."),
            action("returnDormant", "Return to a dormant thread", "Let your old dance relation become gently visible to you again.")
          ]
        },
        {
          id: "inv_post_dance_tea",
          title: "Post-Dance Harbor Tea",
          kind: "soft landing",
          time: "Sun 15:00",
          venue: "Harbor Sauna Commons",
          groveIds: ["grove_tea", "grove_ecstatic"],
          carrier: "Freja Lind and Noa Vang",
          summary: "A kettle, benches by the water, and a hosted decompression point after the bigger dance fire.",
          whyMatters: "This makes the path after intensity visible without turning the dance into a social obligation.",
          participation: "Come for tea, sit quietly, name one thing you are carrying, or leave without explaining.",
          visibility: "Public, steward-noted",
          visibilityTone: "public",
          threshold: "Hosts hold the room. No one is asked to process publicly.",
          whatVisible: "The tea landing, hosts, relation to the dance, and the option to arrive quietly.",
          whatHeld: "Personal shares and who needed support remain inside the hosted room.",
          stanceFit: fit(5, 5, 3, 3, 5),
          pathIds: ["path_ecstatic_tea", "path_tea_circling"],
          actions: [
            action("sitFire", "Sit by this fire", "Use this as the next warm fire after dance or as a standalone soft social room."),
            action("namePath", "Name a path", "Open the visible bridge from dance to tea to authentic relating.", "path_tea_circling"),
            action("helpTend", "Help tend the fire", "Offer to pour tea, welcome newcomers, or help people leave well.")
          ]
        },
        {
          id: "inv_contact_jam",
          title: "Friday Contact Jam with Beginner Landing",
          kind: "practice doorway",
          time: "Fri 19:00",
          venue: "Dome Studio",
          groveIds: ["grove_ci"],
          carrier: "Ella Strand",
          summary: "A public contact jam with a named beginner landing before the room opens into free practice.",
          whyMatters: "The first step is visible, so the threshold is not hidden inside insider confidence.",
          participation: "Arrive at 18:45 for the landing, wear soft clothes, practice consent, and take pauses.",
          visibility: "Public",
          visibilityTone: "public",
          threshold: "Touch and weight sharing need live consent. Beginner support is part of the fire.",
          whatVisible: "Entry time, norms, steward, and the path into the jam.",
          whatHeld: "Partner choices, touch boundaries, and private learning edges are not exposed.",
          stanceFit: fit(4, 3, 5, 4, 2),
          pathIds: ["path_ci_somatic"],
          actions: [
            action("sitFire", "Sit by this fire", "Show the beginner landing as the actual doorway, not only the jam time."),
            action("comeSupport", "Come with support", "Look for the named beginner holder before joining the open floor."),
            action("helpTend", "Help tend the fire", "Offer beginner support or closing-circle cleanup.")
          ]
        },
        {
          id: "inv_tea_newcomer",
          title: "Tea and Connection: Newcomer Table",
          kind: "village-square invitation",
          time: "Fri 20:30",
          venue: "Teahouse Back Room",
          groveIds: ["grove_tea"],
          carrier: "Freja Lind and Alma Weiss",
          summary: "A low-pressure table for people who want human contact before they know which practice world is theirs.",
          whyMatters: "This is a shared entry point for strangers, returning people, and curious regulars from other groves.",
          participation: "Drink tea, answer optional prompts, ask what else is warm in the field, or simply sit near others.",
          visibility: "Public",
          visibilityTone: "public",
          threshold: "Prompts are opt-in and leaving early is welcome.",
          whatVisible: "The host, room tone, accessibility of the first step, and nearby paths.",
          whatHeld: "Newcomer identities and personal reasons for coming are not displayed.",
          stanceFit: fit(5, 4, 2, 3, 5),
          pathIds: ["path_tea_circling"],
          actions: [
            action("sitFire", "Sit by this fire", "Treat the table as a standalone warm room, not a funnel."),
            action("followGrove", "Follow this grove", "Keep soft social rooms visible as a repeating support."),
            action("inviteFriend", "Invite a friend through this path", "Share the public table and its opt-in threshold.")
          ]
        },
        {
          id: "inv_circling_intro",
          title: "Intro to Authentic Relating",
          kind: "bridge into depth",
          time: "Tue 18:30",
          venue: "Attune Rooms",
          groveIds: ["grove_circling"],
          carrier: "Rune Iversen",
          summary: "A public intro evening for people curious about relational practice before entering deeper circles.",
          whyMatters: "It gives a clear first step into a grove that protects confidentiality and depth.",
          participation: "Come for structured exercises, speak from I, pass when needed, and ask about the next layer.",
          visibility: "Public intro, deeper labs stewarded",
          visibilityTone: "stewarded",
          threshold: "Confidentiality and consent are part of entry, not an afterthought.",
          whatVisible: "Intro date, steward, norms, and why tea may be a softer path before or after.",
          whatHeld: "Ongoing lab membership, personal shares, and private circle dynamics remain held.",
          stanceFit: fit(3, 5, 5, 2, 2),
          pathIds: ["path_tea_circling"],
          actions: [
            action("askEdge", "Ask at the edge", "Ask a steward whether this intro is the right first room."),
            action("comeSupport", "Come with support", "Arrive through the newcomer table or with a trusted bridge person."),
            action("keepWatching", "Keep watching", "Let the intro remain visible while you gather context.")
          ]
        },
        {
          id: "inv_somatic_lab",
          title: "Somatic Peer Lab: Boundaries in Touch",
          kind: "stewarded doorway",
          time: "Sat 13:00",
          venue: "Attune Rooms",
          groveIds: ["grove_somatic"],
          carrier: "Kai Sol",
          summary: "A peer learning lab for practitioners and experienced participants working with touch and boundaries.",
          whyMatters: "This should be findable by the right people without becoming a public drop-in room.",
          participation: "Read the scope note, name your background, and wait for a stewarded yes before arriving.",
          visibility: "Visible outline, requested access",
          visibilityTone: "stewarded",
          threshold: "Experience, consent literacy, and scope of practice matter here.",
          whatVisible: "Topic, steward, request path, and why this is not a casual first step.",
          whatHeld: "Participant list, case material, and practitioner details stay private.",
          stanceFit: fit(1, 3, 5, 5, 1),
          pathIds: ["path_ci_somatic", "path_somatic_queer"],
          thresholdId: "th_somatic_lab",
          actions: [
            action("askEdge", "Ask at the edge", "Request whether this lab fits your experience and current capacity."),
            action("keepWatching", "Keep watching", "Follow public somatic talks instead of entering a closed lab."),
            action("helpTend", "Help tend the fire", "Offer non-sensitive support around setup or public orientation.")
          ]
        },
        {
          id: "inv_queer_embodiment",
          title: "Queer Embodiment: Slow Strength",
          kind: "visible but boundaried grove fire",
          time: "Sat 14:00",
          venue: "Rainbow House",
          groveIds: ["grove_queer"],
          carrier: "Amal Hadi",
          summary: "A slow movement and strength circle centered on queer and trans experience.",
          whyMatters: "The doorway can be visible while the protected interior remains protected.",
          participation: "Read the safer-space agreement and enter through the public signup or an invited bridge.",
          visibility: "Public outline, agreement-gated details",
          visibilityTone: "member",
          threshold: "The boundary is part of the welcome. It clarifies who the room is for and how to arrive.",
          whatVisible: "Purpose, steward, agreement, and public signup path.",
          whatHeld: "Member identities, attendance, and private affinity ties are not surfaced.",
          stanceFit: fit(2, 4, 4, 3, 2),
          pathIds: ["path_somatic_queer"],
          thresholdId: "th_queer_embodiment",
          actions: [
            action("askEdge", "Ask at the edge", "Ask what is appropriate before stepping through a boundaried door."),
            action("comeSupport", "Come with support", "Arrive through a named public doorway or trusted bridge."),
            action("keepWatching", "Keep watching", "Respect the edge while keeping the public outline in view.")
          ]
        },
        {
          id: "inv_returning_dancers",
          title: "A quiet dance thread is reappearing",
          kind: "field note",
          time: "This week",
          venue: "Across dance and tea rooms",
          groveIds: ["grove_ecstatic", "grove_tea"],
          carrier: "Tea hosts and dance stewards",
          summary: "A few returning dancers are asking for gentler re-entry after time away.",
          whyMatters: "Dormant belonging can become quiet without disappearing. The field can make a general landing visible without naming people.",
          participation: "Offer a softer after-room, name the beginner-friendly edge, or simply keep the path warm.",
          visibility: "Public pattern, individual details private",
          visibilityTone: "held",
          threshold: "No individual return is exposed. This is an aggregate field note.",
          whatVisible: "A general need for gentle re-entry and the public rooms that can receive it.",
          whatHeld: "Names, reasons for absence, and personal readiness stay private.",
          stanceFit: fit(4, 2, 2, 5, 5),
          pathIds: ["path_dormant_ecstatic"],
          actions: [
            action("returnDormant", "Return to a dormant thread", "For your own field, mark an old relation as gently reappearing."),
            action("helpTend", "Help tend the fire", "Offer a soft landing without asking anyone to explain their absence."),
            action("keepWatching", "Keep watching", "Let the pattern remain visible without turning it into outreach pressure.")
          ]
        }
      ],

      paths: [
        {
          id: "path_ecstatic_tea",
          title: "Dance fire to harbor tea",
          kind: "soft landing path",
          fromNodeId: "node_ecstatic",
          toNodeId: "node_tea",
          source: "Ecstatic Dance Aarhus",
          target: "Tea & Connection Socials",
          status: "open",
          visibility: "Public path, room content held",
          visibilityTone: "public",
          summary: "After a large expressive room, tea gives people somewhere warm to arrive without needing to perform sociability.",
          whyVisible: "The two groves intentionally share hosts, venue rhythm, and a post-dance landing.",
          care: "Do not expose who needed integration or what was shared after dance.",
          openFromHere: ["Post-Dance Harbor Tea", "Tea and Connection: Newcomer Table"],
          actions: [
            action("sitFire", "Sit by this fire", "Choose the next tea room as the embodied step on this path."),
            action("inviteFriend", "Invite a friend through this path", "Share the public path and its care note."),
            action("helpTend", "Help tend the fire", "Support the after-room without turning it into an event funnel.")
          ]
        },
        {
          id: "path_tea_circling",
          title: "Tea table toward authentic relating",
          suggestedName: "From tea table to first circle",
          kind: "adjacent-world path",
          fromNodeId: "node_tea",
          toNodeId: "node_circling",
          source: "Tea & Connection Socials",
          target: "Circling / Authentic Relating Aarhus",
          status: "suggested",
          visibility: "Visible as a possible bridge, waiting to be named",
          visibilityTone: "stewarded",
          summary: "A low-pressure tea room can help strangers become ready for more direct relational practice.",
          whyVisible: "Shared hosts, shared venue, and steward notes say people often arrive at circling more easily after tea.",
          care: "Do not imply tea is a prerequisite or that everyone at tea wants deeper practice.",
          openFromHere: ["Tea and Connection: Newcomer Table", "Intro to Authentic Relating"],
          actions: [
            action("namePath", "Name a path", "Make this bridge legible as one possible route, not the only route.", "path_tea_circling"),
            action("askEdge", "Ask at the edge", "Let circling stewards clarify the first circle threshold."),
            action("keepWatching", "Keep watching", "Leave the bridge visible but not active yet.")
          ]
        },
        {
          id: "path_ci_somatic",
          title: "Contact practice into somatic learning",
          suggestedName: "Consent practice to somatic peer learning",
          kind: "practice-depth path",
          fromNodeId: "node_ci",
          toNodeId: "node_somatic",
          source: "Contact Improvisation Aarhus",
          target: "Somatic Practitioners Network",
          status: "stewarded",
          visibility: "Member-visible with public hints",
          visibilityTone: "member",
          summary: "People with a stable consent practice may find a deeper learning edge in somatic peer work.",
          whyVisible: "Shared touch literacy, repeated co-attendance, and Kai's public bridge language.",
          care: "A public contact jam is not the same as practitioner readiness.",
          openFromHere: ["Friday Contact Jam", "Public somatic talks", "Somatic Peer Lab by request"],
          actions: [
            action("namePath", "Name a path", "Clarify the public-facing bridge without opening the practitioner lab to everyone.", "path_ci_somatic"),
            action("askEdge", "Ask at the edge", "Ask whether peer lab access fits your background."),
            action("keepWatching", "Keep watching", "Stay with public talks and contact jams for now.")
          ]
        },
        {
          id: "path_somatic_queer",
          title: "Boundaries in touch toward queer embodiment",
          kind: "threshold path",
          fromNodeId: "node_somatic",
          toNodeId: "node_queer",
          source: "Somatic Practitioners Network",
          target: "Queer Embodiment Circle",
          status: "threshold",
          visibility: "Visible outline, stewarded edge",
          visibilityTone: "stewarded",
          summary: "Shared care around consent and body literacy connects the worlds, but the queer grove keeps its own boundary.",
          whyVisible: "Amal and Kai have named a public affinity without exposing member ties.",
          care: "The bridge must not turn a safer-space room into a general recommendation.",
          openFromHere: ["Public agreement", "Slow Strength signup", "Ask Amal before entering a deeper layer"],
          actions: [
            action("askEdge", "Ask at the edge", "Ask the queer embodiment steward what doorway is appropriate."),
            action("comeSupport", "Come with support", "Enter only through a named public doorway or invited bridge."),
            action("keepWatching", "Keep watching", "Respect the boundary while the path remains visible.")
          ]
        },
        {
          id: "path_dormant_ecstatic",
          title: "Dormant dance thread",
          kind: "returning relation",
          fromNodeId: "node_self",
          toNodeId: "node_ecstatic",
          source: "Casey's field",
          target: "Ecstatic Dance Aarhus",
          status: "dormant",
          visibility: "Private to you, aggregate pattern visible to stewards",
          visibilityTone: "held",
          summary: "The relation has gone quiet, but it has not disappeared.",
          whyVisible: "Past participation, saved tea landing, and a returning-season signal make a gentle path relevant.",
          care: "No one is notified unless you choose to ask or show up.",
          openFromHere: ["Post-Dance Harbor Tea", "Sunday Ecstatic Dance", "Keep watching"],
          actions: [
            action("returnDormant", "Return to a dormant thread", "Move this from quiet memory into a gentle maybe."),
            action("sitFire", "Sit by this fire", "Choose the tea landing before the larger dance."),
            action("keepWatching", "Keep watching", "Leave the old relation quiet without deleting it.")
          ]
        }
      ],

      mapNodes: [
        { id: "node_self", type: "self", label: "My field", refType: "fieldItem", refId: "field_self", x: 50, y: 51 },
        { id: "node_ecstatic", type: "grove", label: "Ecstatic", refType: "grove", refId: "grove_ecstatic", x: 24, y: 23 },
        { id: "node_sunday", type: "campfire", label: "Sunday Dance", refType: "invitation", refId: "inv_ecstatic_sunday", x: 17, y: 40 },
        { id: "node_tea", type: "grove", label: "Tea", refType: "grove", refId: "grove_tea", x: 44, y: 34 },
        { id: "node_harbor_tea", type: "campfire", label: "Harbor Tea", refType: "invitation", refId: "inv_post_dance_tea", x: 35, y: 49 },
        { id: "node_circling", type: "grove", label: "Circling", refType: "grove", refId: "grove_circling", x: 68, y: 25 },
        { id: "node_intro", type: "campfire", label: "Intro Circle", refType: "invitation", refId: "inv_circling_intro", x: 76, y: 40 },
        { id: "node_ci", type: "grove", label: "Contact", refType: "grove", refId: "grove_ci", x: 22, y: 76 },
        { id: "node_jam", type: "campfire", label: "Friday Jam", refType: "invitation", refId: "inv_contact_jam", x: 14, y: 65 },
        { id: "node_somatic", type: "grove", label: "Somatics", refType: "grove", refId: "grove_somatic", x: 55, y: 74 },
        { id: "node_lab", type: "threshold", label: "Peer Lab", refType: "invitation", refId: "inv_somatic_lab", x: 66, y: 64 },
        { id: "node_queer", type: "grove", label: "Queer Embodiment", refType: "grove", refId: "grove_queer", x: 81, y: 74 },
        { id: "node_meditation", type: "grove", label: "Meditation", refType: "grove", refId: "grove_meditation", x: 56, y: 12 }
      ],

      mapLinks: [
        { from: "node_ecstatic", to: "node_sunday", type: "root", label: "hosts" },
        { from: "node_ecstatic", to: "node_harbor_tea", type: "open", pathId: "path_ecstatic_tea", label: "soft landing" },
        { from: "node_harbor_tea", to: "node_tea", type: "open", pathId: "path_ecstatic_tea", label: "tea fire" },
        { from: "node_tea", to: "node_circling", type: "suggested", pathId: "path_tea_circling", label: "possible bridge" },
        { from: "node_circling", to: "node_intro", type: "threshold", label: "intro door" },
        { from: "node_ci", to: "node_jam", type: "root", label: "beginner landing" },
        { from: "node_ci", to: "node_somatic", type: "mycelium", pathId: "path_ci_somatic", label: "consent language" },
        { from: "node_somatic", to: "node_lab", type: "threshold", label: "requested access" },
        { from: "node_somatic", to: "node_queer", type: "threshold", pathId: "path_somatic_queer", label: "careful affinity" },
        { from: "node_self", to: "node_ecstatic", type: "dormant", pathId: "path_dormant_ecstatic", label: "quiet thread" },
        { from: "node_self", to: "node_ci", type: "root", label: "strong practice" },
        { from: "node_self", to: "node_circling", type: "root", label: "recurring" },
        { from: "node_self", to: "node_meditation", type: "mycelium", label: "rest branch" },
        { from: "node_meditation", to: "node_circling", type: "mycelium", label: "presence" },
        { from: "node_queer", to: "node_tea", type: "mycelium", label: "shared hosts" }
      ],

      myField: {
        layers: [
          {
            id: "field_roots",
            title: "Roots",
            tone: "close trust",
            summary: "The few people and rooms that can hold vulnerable weather.",
            items: [
              "Noa as bridge person and old dance witness",
              "Ella and Friday jam beginner support",
              "Casey's somatic bridge practice circle"
            ],
            visibleTo: "Private to Casey unless each relation is named by the people inside it.",
            actions: [
              action("keepWatching", "Keep watching", "Do not turn roots into public profile material."),
              action("helpTend", "Help tend the fire", "Offer care in rooms where you already have responsibility.")
            ]
          },
          {
            id: "field_grove",
            title: "Grove",
            tone: "repeated belonging",
            summary: "Recurring resonance in contact improvisation, circling, and somatic practice.",
            items: [
              "Contact Improvisation Aarhus",
              "Circling / Authentic Relating Aarhus",
              "Somatic Practitioners Network"
            ],
            visibleTo: "Some member-visible context, never a full roster.",
            actions: [
              action("followGrove", "Follow this grove", "Keep repeated rooms visible without needing to intensify."),
              action("namePath", "Name a path", "Clarify one bridge that already feels real.", "path_ci_somatic")
            ]
          },
          {
            id: "field_forest",
            title: "Forest",
            tone: "broader trusted field",
            summary: "Rooms where Casey may not be central, but still knows how to be held.",
            items: [
              "Tea & Connection Socials",
              "Meditation Collective",
              "Ecstatic Dance Aarhus"
            ],
            visibleTo: "Mostly visible through public fires, hosts, and rhythms.",
            actions: [
              action("sitFire", "Sit by this fire", "Choose a warm public room from the broader forest."),
              action("keepWatching", "Keep watching", "Stay connected without increasing demand.")
            ]
          },
          {
            id: "field_edges",
            title: "Edges",
            tone: "visible adjacent worlds",
            summary: "Places that can be seen without being claimed: queer embodiment, acro, deeper practitioner labs.",
            items: [
              "Queer Embodiment Circle",
              "Acro / Partner Movement Jam",
              "Somatic Peer Lab"
            ],
            visibleTo: "Public outlines and stewarded doors, not intimate interiors.",
            actions: [
              action("askEdge", "Ask at the edge", "Ask the right steward before stepping through a boundaried doorway."),
              action("comeSupport", "Come with support", "Find a bridge person or softer public door.")
            ]
          }
        ],
        nourishment: [
          { label: "Receive", value: 74, detail: "Tea, morning sit, beginner landing, and hosted integration." },
          { label: "Contribute", value: 62, detail: "Somatic bridge practice and occasional room tending." },
          { label: "Rest", value: 48, detail: "Quiet watching and low-demand contact stay legitimate." },
          { label: "Bridge", value: 81, detail: "Casey carries threads between body practice, tea, and relational rooms." }
        ],
        dormantThread: {
          id: "field_dormant_dance",
          title: "Dormant but not gone: Ecstatic Dance",
          summary: "The relation is quiet this season. It can reappear through tea before the larger dance fire.",
          visibility: "Private to Casey",
          status: "quiet",
          actions: [
            action("returnDormant", "Return to a dormant thread", "Move this old relation into a gentle maybe, visible only to you."),
            action("sitFire", "Sit by this fire", "Use Post-Dance Harbor Tea as the softest re-entry point."),
            action("keepWatching", "Keep watching", "Let the thread stay quiet without treating it as lost.")
          ]
        }
      },

      thresholds: [
        {
          id: "th_somatic_lab",
          title: "Somatic Peer Lab: Boundaries in Touch",
          relatedType: "invitation",
          relatedId: "inv_somatic_lab",
          steward: "Kai Sol",
          status: "Waiting at the edge",
          visibilityChoice: "Visible outline, requested access",
          whoCanSee: "Public can see the topic and request path. Stewards can see requests. Participant list is hidden.",
          whatProtected: "Practice background, client material, and touch-related learning edges.",
          careQuestion: "Can this be visible without making it feel like a public drop-in room?",
          options: [
            "Keep the public outline and request path",
            "Open a separate public talk",
            "Do not show lab details outside the member layer"
          ],
          actions: [
            action("askEdge", "Ask at the edge", "Send a careful question to Kai before requesting access."),
            action("openToMembers", "Open to members", "Make the path clearer for trusted members while keeping public copy bounded."),
            action("keepHeld", "Keep held", "Keep details steward-visible until the doorway is ready.")
          ]
        },
        {
          id: "th_queer_embodiment",
          title: "Queer Embodiment: Slow Strength",
          relatedType: "invitation",
          relatedId: "inv_queer_embodiment",
          steward: "Amal Hadi",
          status: "Visible with a boundary",
          visibilityChoice: "Public outline, agreement-gated details",
          whoCanSee: "Anyone can see the public doorway. Members and approved participants see the fuller rhythm.",
          whatProtected: "Member identity, attendance, affinity ties, and safer-space interior.",
          careQuestion: "How can a grove be findable without being made available to everyone?",
          options: [
            "Show the safer-space agreement before any next step",
            "Name public doors separately from member doors",
            "Never use private member overlap as a recommendation reason"
          ],
          actions: [
            action("askEdge", "Ask at the edge", "Ask Amal what doorway is appropriate."),
            action("comeSupport", "Come with support", "Arrive through a named public door or invited bridge person."),
            action("keepHeld", "Keep held", "Respect the boundary and leave private details hidden.")
          ]
        },
        {
          id: "th_harbor_tea",
          title: "Post-Dance Harbor Tea as a dance landing",
          relatedType: "invitation",
          relatedId: "inv_post_dance_tea",
          steward: "Noa Vang and Freja Lind",
          status: "Soft opening",
          visibilityChoice: "Public event, relation steward-noted",
          whoCanSee: "Everyone can see the tea. Stewards see the care note about post-dance integration.",
          whatProtected: "What people share after the dance and whether they needed support.",
          careQuestion: "Can a soft landing be named without making the previous event feel incomplete?",
          options: [
            "Name it as optional and complete in itself",
            "Keep integration language gentle",
            "Do not display attendance overlap"
          ],
          actions: [
            action("namePath", "Name a path", "Name the bridge as optional and soft, not as a required next step.", "path_ecstatic_tea"),
            action("helpTend", "Help tend the fire", "Offer hosting support for the landing."),
            action("keepHeld", "Keep held", "Keep individual post-dance needs private.")
          ]
        },
        {
          id: "th_private_queer_edge",
          title: "Private queer embodiment curiosity",
          relatedType: "grove",
          relatedId: "grove_queer",
          steward: "Only Casey unless Casey asks",
          status: "Private to self",
          visibilityChoice: "Hidden from public field",
          whoCanSee: "Only Casey. A steward sees it only if Casey asks at the edge.",
          whatProtected: "Identity salience, personal readiness, and the meaning of belonging.",
          careQuestion: "How can the app support discovery without capturing identity?",
          options: [
            "Keep watching privately",
            "Ask a steward without exposing why",
            "Use public agreement as the first doorway"
          ],
          actions: [
            action("askEdge", "Ask at the edge", "Ask a steward a practical question without exposing private identity context."),
            action("keepWatching", "Keep watching", "Keep the grove in the private edge layer."),
            action("keepHeld", "Keep held", "Do not turn private curiosity into a public signal.")
          ]
        },
        {
          id: "th_dormant_pattern",
          title: "Returning dancers as an aggregate field note",
          relatedType: "invitation",
          relatedId: "inv_returning_dancers",
          steward: "Tea hosts and dance stewards",
          status: "Pattern visible, names hidden",
          visibilityChoice: "Public pattern, individual details private",
          whoCanSee: "Everyone can see the general need for softer re-entry. Individual people are not shown.",
          whatProtected: "Names, absence reasons, readiness, and prior participation history.",
          careQuestion: "Can dormant belonging be honored without individual targeting?",
          options: [
            "Name soft landings instead of naming people",
            "Let people return without explanation",
            "Show aggregate patterns only when useful for care"
          ],
          actions: [
            action("returnDormant", "Return to a dormant thread", "Privately mark your own thread as gently reappearing."),
            action("helpTend", "Help tend the fire", "Offer rooms that receive return without pressure."),
            action("keepHeld", "Keep held", "Do not expose individual dormancy.")
          ]
        }
      ],

      fieldItems: [
        {
          id: "field_self",
          title: "Casey's living field",
          kind: "personal ecology",
          summary: "Roots, groves, forest, edges, and paths are individual and dynamic here.",
          visibility: "Private orientation view",
          whyVisible: "This view helps Casey sense where nourishment, contribution, rest, and bridges are moving.",
          heldBack: "It does not claim ownership over people or turn belonging into a fixed identity.",
          actions: [
            action("keepWatching", "Keep watching", "Let the whole field remain perceivable without forcing a next move."),
            action("sitFire", "Sit by this fire", "Pick one warm public room from the field."),
            action("namePath", "Name a path", "Clarify one bridge that can help others arrive.", "path_tea_circling")
          ]
        }
      ],

      activity: []
    };
  }

  function fit(arrive, explore, deepen, tend, rest) {
    return { arrive, explore, deepen, tend, rest };
  }

  function action(actionId, label, detail, pathId) {
    return { actionId, label, detail, pathId: pathId || "" };
  }

  window.ConsciousTribeSeed = { createDemoState };
})();
