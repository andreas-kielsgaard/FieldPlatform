# Language And Copy Register

FieldPlatform has a strong internal philosophy. Keep it. The product also needs ordinary, practical copy for an average curious participant, creator, or steward.

This document separates language registers so future work can preserve the deep model without leaking abstract doctrine into normal app screens.

## Register 1: Internal Philosophy / Design Doctrine

Used in conceptual docs, design reasoning, product strategy, and conversations where the team is protecting the deeper orientation.

Allowed terms:

- essence
- expression through context
- distributed perception
- latent relation
- field
- movement
- holds
- pathways
- stewardship
- field becoming visible

Purpose:

- Helps designers preserve the deep product orientation.
- Keeps the project from collapsing into a generic event marketplace.
- Supports architectural reasoning about FieldRelations, holds, pathways, stewardship, movement, and expression-through-context.

Not appropriate for normal UI copy. If these terms appear in app screens, they usually create distance, confusion, or a sense that the app is asking the user to adopt a worldview.

## Register 2: Domain / Data Model Language

Used in code, data-layer docs, dev tools, tests, schema notes, architecture docs, and implementation discussions.

Allowed terms:

- FieldRelation
- ParticipationEdge
- HoldType
- MovementType
- RelationReview
- GeneratedField
- provenance
- reviewAuthority
- movementUnlocked
- relationKind
- relationStatus

Purpose:

- Precise implementation vocabulary.
- Stable names for records, types, services, tests, formulas, and dev inspection.
- May be technical because it is not primary end-user language.

Domain language may appear in dev tools, but dev tools should include plain-language explanations where useful.

## Register 3: Product / Feature Language

Used in product docs, feature descriptions, UX flows, prompts for mockups, planning notes, and product-facing design targets.

Preferred terms:

- connection
- suggested connection
- related to
- belongs with
- community context
- ways in
- entry path
- first step
- next step
- review queue
- waiting for review
- accepted connection
- related communities
- bridge event
- soft entry
- clearer pathway
- why this appears

Purpose:

- Bridges internal architecture to real product behavior.
- Lets designers talk about the product without forcing users to learn implementation terms.
- Keeps future mockup prompts pointed toward usable surfaces.

## Register 4: User-Facing UI Copy

Used in actual app screens, buttons, cards, empty states, help text, labels, confirmation messages, onboarding, and participant/creator/steward flows.

Preferred wording:

- "Suggest connection"
- "Why am I seeing this?"
- "Related communities"
- "Ways in"
- "First step"
- "Ask a steward"
- "Waiting for review"
- "Accepted by stewards"
- "This may be a good entry point"
- "This event is connected to..."
- "People often arrive here through..."
- "This connection is private"
- "This connection is only visible to stewards"
- "This looks related, but has not been reviewed yet"

Avoid in UI copy:

- essence
- manifestation
- latent expression
- distributed perception
- FieldRelation
- holds
- movementUnlocked
- relation provenance
- stewardship authority
- field relation
- expression through context
- "the field wants"
- "where participation is held" unless carefully rewritten

## Translation Table

| Internal/domain term | Product-language term | UI wording | Notes / risk |
| --- | --- | --- | --- |
| FieldRelation | connection / represented connection | "Connected to...", "Suggest connection" | Avoid exposing `FieldRelation` outside dev tools and technical docs. |
| Hold | friction / unclear part / thing that needs clarification | "What may be unclear" | "Hold" can sound mystical or diagnostic in UI. |
| Pathway | way in / next step / entry path | "Ways in", "First step" | "Pathway" is acceptable in product docs, but "ways in" is warmer in UI. |
| Stewardship | review / community care / steward review | "Waiting for review", "Accepted by stewards" | Use "steward" when addressing actual community stewards; otherwise prefer review/care. |
| Distributed perception | people helping clarify the map | "Help others find the right context" | Do not ask users to participate in "distributed perception." |
| Movement unlocked | available next step | "You can now..." | Avoid mechanistic or game-like language around participation. |
| Provenance | source / why this appears | "Suggested by...", "Calculated from...", "Accepted by..." | Always make source legible without making it feel like audit jargon. |
| GeneratedField | pattern / related cluster / computed field | "Pattern found from shared tags/venues" | Do not imply a generated field speaks for a community. |
| ParticipationEdge | relationship to a community | "Your connection to this community" | Keep `ParticipationEdge` for code/dev tools; UI should describe the relationship plainly. |
| RelationKind | connection type | "Good first step", "Soft landing", "Shares venue", "Bridge into" | Prefer meaning over taxonomy labels. |
| relationStatus | review state / connection state | "Waiting for review", "Accepted", "Not reviewed yet" | Avoid making status feel like personal evaluation. |
| reviewAuthority | who can review | "A community steward can review this" | "Authority" sounds bureaucratic or coercive in UI. |
| Review queue | suggestions to review / steward review surface | "Suggestions to review", "Suggested connections" | Avoid "Review queue" as unexplained UI language. Only show this to users with relevant responsibility. |
| Suggest connection | suggest context / suggest a related object | "Suggest related community", "Suggest where this belongs", "Add context", "Suggest related event", "Suggest community here" | The generic product concept should often become object-specific UI copy. |
| relatedHoldTypes | what may need clarification | "Needs clearer first step" | Use as explanation, not as a label applied to people. |
| relationStrength | strength of connection / how closely related | "Strong connection", "Light connection" | Explain with reasons, not just a score. |

## UX Copy Rules

- Prefer verbs over abstractions.
- Prefer "connection" over "relation" in UI.
- Prefer "ways in" over "pathway" in UI.
- Prefer "what may be unclear" over "hold" in UI.
- Prefer "review" over "stewardship" unless specifically addressing community stewards.
- Always explain why something appears.
- Distinguish suggested, calculated, and accepted connections.
- Do not imply that a suggested connection creates ownership, permission, invitation, or social obligation.
- Do not imply that a generated field speaks for a community.
- Do not imply that someone should participate more deeply.
- Make privacy and visibility clear in plain language.
- Use "may" when a relation is suggested or calculated: "This may be a good fit."
- Use concrete evidence before scores: "shared venue and tags" before "78% fit."
- Name review state plainly: "waiting for review", "accepted by stewards", "not reviewed yet."
- Preserve enough native object identity that the user can tell what they are looking at.
- Let role, entry point, surrounding context, and surface type determine whether object basics, connection evidence, review consequences, recommendation reasons, creator fit, or ways in are emphasized first.
- Group "Ways in" actions by the object they act on, such as "For this event" or "For Contact Improvisation Aarhus".
- Use context-specific suggestion labels when possible rather than defaulting to "Suggest connection" everywhere.
- Prefer "Suggestions to review" over "Review queue" in steward-facing UI.
- Use progressive disclosure for explanations that are useful to designers but too heavy for the main UI.
- Keep personalization humble: "may fit", "people often arrive through", or "because this shares..." rather than "you should".
- Leave room for continuity and rest. Do not make every empty state or next step imply more participation.

## Copy Examples

### 1. Event To Community Connection

Bad / too abstract:

> This FieldRelation unlocks movement through a context hold.

Better UI copy:

> This event may be a good first step into Contact Improvisation Aarhus.

### 2. Suggested Relation Waiting For Review

Bad / too abstract:

> Stewardship hold: relation awaiting authority.

Better UI copy:

> Suggested connection - waiting for a community steward to review.

### 3. Generated Field

Bad / too abstract:

> Emergent field generated from distributed perception.

Better UI copy:

> Pattern found: several communities share this venue and movement practice tags.

### 4. Person-To-Community Participation Edge

Bad / too abstract:

> Your ParticipationEdge has moderate engagement strength.

Better UI copy:

> You have a light connection here through two events and one saved community.

### 5. Hold / Friction

Bad / too abstract:

> Threshold hold detected.

Better UI copy:

> The first step into this community may be unclear.

### 6. Creator Fit

Bad / too abstract:

> Creator-group FieldRelation has contextual relevance.

Better UI copy:

> This offering may fit this community because the tags, venue, and audience overlap.

### 7. Steward Queue

Bad / too abstract:

> Review relation provenance and movementUnlocked.

Better UI copy:

> Review suggested connections and decide what should become visible.

### 8. Pathway

Bad / too abstract:

> Movement unlocked.

Better UI copy:

> Available next step: attend the beginner-friendly event.

## Repo Language Audit Notes

Reviewed areas:

- `General context/Design intent.md`
- `General context/Data concepts and logic.md`
- `General context/Features and functionalities.md`
- `General context/UX stories and user flows.md`
- `General context/Dev tools.md`
- `General context/Context maintenance instructions.md`
- `Platform data layer/README.md`
- `Platform data layer/docs/OO domain interfaces.md`
- `Platform data layer/source/access-layer/types.ts`
- `Platform data layer/source/database-definition/schema.md`
- `Platform data layer/source/database-definition/seed.js`
- `Platform data layer/dev-tool/`
- `Mockups/Mockup 4/`

Classification:

- Okay internal/domain language: `Design intent.md` and `Data concepts and logic.md` use FieldRelation, holds, pathways, distributed perception, essence, and movement as conceptual or data-model language. This is appropriate when paired with this register guidance.
- Okay dev-tool language: the data-layer dev tool uses "Relations", "Generated Field", table names, object IDs, `participationEdges`, and `suggestedEventShares`. This is acceptable because the tool is explicitly developer-facing. Add plain-language explanations when dev tools become design-review surfaces.
- Acceptable product-doc language: `Features and functionalities.md` and `UX stories and user flows.md` currently mix product and domain terms because they bridge concept and behavior. Future additions should add UI-label examples in the UI register when a feature is meant for app screens.
- Should not appear in user-facing UI: `FieldRelation`, `ParticipationEdge`, `movementUnlocked`, `provenance`, `reviewAuthority`, "distributed perception", "essence", "expression through context", "stewardship authority", and raw hold names like "threshold hold".
- Needs clearer mapping: Mockup 4 contains prototype labels such as "Participation edge model", "Generated field page", "Generated fields around me", "Suggested event shares", "Expansion edge", "Generated field confidence", and "Actively helping hold". Do not refactor Mockup 4 in this change, but treat these as historical/prototype evidence. Future mockups should translate them to UI-register labels such as "Your community connections", "Patterns around me", "Suggested connections", "New possibilities", "Why this pattern appears", and "Helping host or support".

## Mockup Guidance

Mockups may use internal labels in hidden comments, dev-only panels, or flow rails when they are explicitly design/debug aids. Participant-facing mockup surfaces should use the UI register.

For future mockups:

- Use "Suggest connection" instead of "Suggest relation" or "Suggest FieldRelation", but prefer context-specific labels on object pages such as "Suggest related community", "Suggest where this belongs", "Add context", "Suggest related event", or "Suggest community here".
- Use "Related communities" instead of "relevant groups" when the user is browsing.
- Use "Ways in" instead of "pathways".
- Group "Ways in" by target object rather than listing actions from different objects together.
- Use "Waiting for review" instead of "stewardship hold".
- Use "Suggestions to review" instead of "Review queue" when addressing stewards.
- Use "Why this appears" instead of "provenance" or "evidence model".
- Use "Pattern found" instead of "GeneratedField" unless the surface is dev-only.
- Keep review actions out of ordinary participant-facing pages unless the current user has steward, manager, host, or creator responsibility.
- For embedded cards, recommendation panels, steward surfaces, and creator-fit views, foreground why the object appears in that context while keeping compact object identity visible.
