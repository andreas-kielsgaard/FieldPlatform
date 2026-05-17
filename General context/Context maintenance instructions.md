# Context Maintenance Instructions

Keep the `General context` folder as the living design target for the app. Mockups are temporary expressions of it.

Use the document split intentionally:

- Update `Design intent.md` when the product philosophy, guardrails, role framing, or navigational intent changes.
- Update `Data concepts and logic.md` when a storage object, represented relationship, data provenance question, calculated signal, formula, or usage of data changes.
- Update `Features and functionalities.md` when a user-visible platform feature, page, pane, panel, control, navigation surface, or contextual capability changes.
- Update `UX stories and user flows.md` when a user intention, click path, object flow, feature sequence, or arrangement of UI elements changes.
- Update `Dev tools.md` when a development-only inspection/debugging capability changes.
- Update `Language and copy register.md` when internal philosophy, data-model vocabulary, product-language terms, or user-facing copy guidance changes.
- Update `Object page and connection UX principles.md` when object surface priority, native affordances, connection presentation, role-gated review, ways-in grouping, suggestion filtering, relation-type constraints, or page/surface grammar changes.
- Update `Design process and project wayfinding.md` when the project's advisor/code-agent workflow, design process, prototyping rhythm, feedback-processing method, document authority, git strategy, planner visibility rules, decision criteria, complexity timing, or guidance for what to do next changes.
- Update `Future exploration notes.md` when a promising idea should be preserved as exploratory but is not current implementation direction.
- Update `Business and pilot hypotheses.md` when business, pilot, validation, go-to-market, or funding hypotheses change. Treat these as unvalidated planning notes unless future research adopts them.
- Keep `Design target - features and UX flows.md` as the document map and high-level framing.

When a new feature idea, UX distinction, data concept, role, permission, calculation, or flow is introduced in conversation:

- Add it to the most specific document above.
- When a conversation introduces a living-field insight, decide whether it is about philosophy, data, features, UX stories, copy, process, pilot hypotheses, or future exploration. Preserve it in the most specific document.
- Add the idea even if it is not implemented in every mockup.
- Mark the idea as current target, open question, or expansion space when its status is unclear.
- Mark the likely materialization level when useful: design wisdom, UI copy, interaction behavior, query/view behavior, lifecycle state, calculation, permission/access rule, stored data object, dev-tool support, or future exploration.
- Prefer design-target language over mockup-specific language.
- Use `Language and copy register.md` to decide whether a term belongs in internal philosophy, data-model docs, product descriptions, or user-facing UI.
- Translate internal/domain terms into ordinary UI language when describing actual screens, buttons, cards, empty states, or help text.
- Mention mockups only as current evidence or implementation examples, not as the source of truth.
- Keep feature descriptions connected to participation edges, communities, events, fields, creators, stewards, contextual management, and participant orientation.
- Keep UX stories focused on user intention and outcome, not just screen order.
- If a mockup implements something new before the design target is updated, update the design target in the same work session.
- If a feature is removed or reconsidered, preserve the reasoning briefly instead of silently deleting it.
- Do not update older generated Design Instructions as active product docs. If an older idea becomes relevant, distill it into the appropriate General context document instead.
- Be especially careful with resource/resource-catalogue ideas. Distinguish resources as objects from support as relational, situational, human, temporal, and practice-based.
- When adding new features, check whether the feature serves a threshold where the living field becomes illegible.
- Do not turn every alive thing into an object, feed item, profile field, or catalogue entry merely because it can be represented.
- Treat every digital representation of a living field as a partial trace, not the field itself.
- Watch for anti-convivial drift: a design that begins as support can become a demand to administer, maintain, perform, or obey the digital representation.
- Distinguish "nice if the platform knew this" from "realistic and convivial for the platform to be informed about this."
- When a feature requires user input, record the input bargain: what effort is asked, what value returns, how soon it returns, and why the app is the right medium.
- Do not automatically literalize General Context nouns into data objects, components, buttons, or pages. First ask what behavior the concept needs to produce.
- Do not overcorrect in the other direction either. Some design wisdom has direct product consequences, and some product consequences require shared data-layer support.
- Prefer ephemeral-first declarations for daily state, availability, needs, offers, and field signals. Preserve only selected nuggets, support patterns, or intentionally reviewed relations.
- For living-space, residency, or high-proximity concepts, check whether direct human interaction, proximity, walking, meals, room presence, or shared practice already solves the need better than software.

Important framing:

- Everyone is a participant first.
- FieldPlatform supports self-resourcing through field awareness: helping people and communities resource themselves from the living field around them by making needs, impulses, possible supports, relations, and next steps visible enough to move.
- A field-aware platform assumes the world is alive, partial, local, relational, and emergent. Avoid catalogue designs that imply the platform already knows the whole field.
- Do not digitize the living field. Digitize the thresholds where the living field becomes illegible.
- The platform should be convivial: it should help people return to contact with life, not make life serve a digital double.
- User input is not free. Do not ask for information merely because it would improve the model; ask only where the exchange helps the person or field move.
- General Context is design authority, not literal implementation syntax. Preserve the wisdom, then translate it carefully into the appropriate layer.
- Creator, steward, facilitator, host, volunteer, and bridge person are design lenses and contextual roles, not necessarily separate base UIs.
- Event creation and community creation are platform features.
- Event management and community management appear when the user's relationship to the object grants the relevant contextual capability.
- Dev tools, including the Data Model Explorer, should remain separate from intended end-user product features.
- Mockups should use `Platform data layer/` for data storage, management operations, reset-to-seed behavior, and calculated values instead of managing data or formulas directly.
- Frontend feature code should prefer the managed OO domain layer in `Platform data layer/source/access-layer/domain.ts`, `Platform data layer/source/access-layer/platformDomain.ts`, or the browser bundle at `Platform data layer/build/browser/platform-domain.bundle.js`. Generic CRUD access is for dev tools, tests, and internal implementation work.
- User-facing UI should prefer plain language such as "connection", "ways in", "first step", "waiting for review", and "why this appears" over internal terms such as FieldRelation, holds, movementUnlocked, provenance, or distributed perception.
- Future mockups should not make FieldRelation or connection review the first thing an ordinary user has to understand by default. Every object surface should preserve enough native identity to avoid disorientation, while user role, entry point, surrounding context, and surface type determine whether object basics, connection evidence, review consequences, recommendation reasons, creator fit, or ways in are emphasized first.
- Archived/generated Design Instructions are reference material only. They are not current product-design authority and should not be consulted by code/execution agents unless explicitly requested.
