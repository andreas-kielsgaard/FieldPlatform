# Mockup - Conscious Tribe

This mockup explores what FieldPlatform might feel like if field visibility became the central participant-facing product principle:

> Field visibility means making the living paths of nourishment in a social ecosystem perceptible at the right depth, to the right people, in the right context.

It uses the Aarhus somatic, movement, tea, circling, meditation, and queer embodiment demo world already present in the repository, but keeps its own local demo data so the prototype can move in a more poetic village/mycelium direction without changing shared platform data.

## What It Tests

- A participant-facing app shell organized around Village Square, My Field, Field Map, and Stewarded Edges.
- Invitations as situated campfires rather than generic event cards.
- "Ways in" reimagined as paths into belonging: sit by this fire, follow this grove, ask at the edge, help tend the fire, return to a dormant thread, name a path.
- Field visibility as partial and careful: public, member-visible, stewarded, private, and held signals are shown differently.
- A personal ecology model inspired by roots, grove, forest, edges, paths, campfires, and mycelium.
- A visual abstract field map where campfires, groves, thresholds, mycelial traces, open paths, and dormant threads can be selected.
- Small stateful interactions that make the field change:
  - Name/open a suggested path, such as Tea table toward Authentic Relating.
  - Ask at a stewarded edge or open a threshold to members.
  - Return to a dormant dance thread without exposing it publicly.

## What It Intentionally Does Not Solve

- Real permissions, consent enforcement, or privacy infrastructure.
- Real recommendation logic.
- A production map, event calendar, membership model, or steward workflow.
- The complete ethics of representing social fields.
- Whether "tribe" should become durable user-facing language. This mockup treats it as a conceptual source and uses it carefully.

## How To Open

Open `index.html` directly in a browser from this folder.

No build step, backend, package install, or local server is required.

## Repo Context It Builds On

- `Mockups/Mockup 5 - Field Relations Loop`
  - Especially the loop from object -> connection -> suggestion -> steward review -> ways in.
  - This mockup broadens that loop into a whole participant-facing orientation.
- `Mockups/Participant Orientation - Paths Threads Living Field`
  - Especially situated opportunities and humble "why this appears" explanations.
- `Platform data layer/source/database-definition/seed.js`
  - Names, communities, events, venues, people, dormant participants, bridge people, field relations, and threshold examples.
- `General context/Design intent.md`
  - Field relations, holds, pathways, stewardship, movement, and orientation without identity capture.
- `General context/Language and copy register.md`
  - The UI avoids raw domain terms such as FieldRelation, ParticipationEdge, provenance, movementUnlocked, and reviewAuthority.

## How The Conscious Tribe Informed It

The included `The Conscious Tribe.md` shaped the information architecture more than the surface copy.

- Roots become close/private trust and are not made into public social graph content.
- Grove becomes repeated belonging and local resonance.
- Forest becomes a broader trusted field where a person can find shelter and discovery.
- Edges become visible adjacent worlds that may require consent, stewardship, or membership.
- Meetings are treated as nourishment, so the UI foregrounds campfires, soft landings, warm rooms, and recurring rhythms.
- Boundaries are modeled as connecting interfaces, not walls.
- The line "nobody should have to walk through the world without knowing where the next warm fire is" becomes the product promise behind the Village Square and Paths panel.

## Suggested Review Clickthrough

1. Start in Village Square and change the stance selector between Arrive, Explore, Deepen, Tend, and Rest.
2. Select `Post-Dance Harbor Tea` and use `Name a path` to open the bridge toward Authentic Relating.
3. Move to Field Map and confirm that the named path appears differently in the visual field.
4. Open My Field and use `Return to thread` on the dormant Ecstatic Dance relation.
5. Open Stewarded Edges, select `Somatic Peer Lab`, then try `Ask at the edge` or `Open to members`.
6. Watch the right panel after each selection. It should explain why something appears, what is visible, what stays held, and what paths are open.

## What To Look For

- Does the app feel like a living village/forest rather than an event calendar?
- Do invitations feel carried by people and groves rather than advertised?
- Do the path actions feel warm while still having concrete meaning?
- Does visibility feel careful and contextual rather than total transparency?
- Can a reviewer sense where nourishment, entry, rest, contribution, and deeper practice are moving?
- Does the metaphor clarify the product structure, or does it become too much lore?
