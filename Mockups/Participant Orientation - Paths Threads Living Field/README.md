# Participant Orientation - Paths, Threads, and Living Field

This exploratory mockup slice tests one product question:

How can the app help a participant understand what is alive around them, what is already connected to their life, and what unfamiliar possibilities are reachable from where they are?

It is intentionally separate from the FieldRelation loop mockups. It uses fake seeded data and fake calculations so the product grammar can move quickly without implying production correctness.

## What This First Pass Tests

- A persona switcher that changes the ordering and relevance of opportunities.
- A participant orientation home titled "What's alive around you".
- Mixed object cards for events, communities, venues, facilitators, and generated practice fields.
- Contextual opportunity cards that show familiarity, entry/path type, why the item appears, and one thread summary.
- A thread inspector called "How this connects to you".
- A contextual list view that keeps list usefulness while adding situated context.
- Small fake actions: save, mark interested, follow, reactivate thread.
- A reset button that restores persona and demo interaction state.
- A lightweight debug/data panel for scores, classifications, threads, and relevant participation edges.

## What It Is Exploring

The point is not to prove that event lists are bad. The point is to show the difference between:

- disconnected listings: "Here are events"
- situated opportunities: "Here is something available to you, and here are the threads that make it familiar, adjacent, re-enterable, or meaningfully new"

The app should feel like an orientation companion. It should help a participant see continuities, dormant threads, adjacent openings, and unfamiliar but reachable paths without sounding like ad targeting or a system that knows better than the participant.

## Seeded Demo World

The fake world is an Aarhus-like ecosystem with:

- people and facilitators
- five participant personas
- eight communities
- nine events
- eight venues
- five generated practice fields
- participation edges
- typed object relations

Example patterns included:

- CI class followed by harbor sauna.
- Ecstatic Dance followed by Post-Dance Harbor Tea.
- Familiar venue hosting an unfamiliar practice.
- Facilitators bridging communities.
- Dormant Circling participant shown low-threshold re-entry.
- Newcomer shown beginner-friendly and soft social paths.
- Overcommitted regular shown rest, continuity, and integration rather than only novelty.

## How To Open

Open `index.html` directly in a browser from this folder.

No backend, build step, or local server is required.

## Manual Review Clickthrough

1. Switch between all five personas and watch section order, cards, explanations, and list ordering change.
2. In the orientation home, compare mixed cards across events, communities, venues, facilitators, and fields.
3. Open threads for:
   - Post-Dance Harbor Tea
   - Wednesday Open CI Class
   - Open Circling Evening
   - Harbor Sauna
   - Tea & Connection Socials
4. Check that the thread drawer uses language like "one possible thread" and "this may be approachable because..." rather than certainty or targeting language.
5. Use small actions such as Save, Mark interested, Follow, and Reactivate thread.
6. Confirm that the card labels update and the debug panel reflects the changed demo state.
7. Compare the home view with the Contextual list view.
8. Use Reset demo data and confirm the selected persona and fake interaction states return to the initial state.

## Fake Calculation Functions

The calculations are deliberately readable and tweakable:

- `computeFamiliarity(persona, object, data)`
- `computeAdjacency(persona, object, data)`
- `computeDormantThreadRelevance(persona, object, data)`
- `computeContinuityFit(persona, object, data)`
- `computeExplorationFit(persona, object, data)`
- `generateConnectionThreads(persona, object, data)`
- `classifyOpportunity(persona, object, data)`
- `scoreOpportunity(persona, object, data)`

They are not production recommendations. They are there so the design can be inspected and adjusted.

## Intentional Non-Goals

- No backend.
- No real auth.
- No real messaging.
- No payment or ticketing.
- No steward dashboard.
- No facilitator distribution flow.
- No full map or timeline explorer.
- No production access-control model.

## Known Limitations

- The seeded world is small and hand-authored.
- Generated fields are fake patterns, not data-layer generated fields.
- Thread confidence is a soft prototype indicator, not a real score.
- Actions only update local demo state in memory.
- The list and home use the same opportunity pool; later versions may need more specific surface grammars.
