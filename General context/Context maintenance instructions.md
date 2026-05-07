# Context Maintenance Instructions

Keep the `General context` folder as the living design target for the app. Mockups are temporary expressions of it.

Use the document split intentionally:

- Update `Design intent.md` when the product philosophy, guardrails, role framing, or navigational intent changes.
- Update `Data concepts and logic.md` when a storage object, represented relationship, data provenance question, calculated signal, formula, or usage of data changes.
- Update `Features and functionalities.md` when a user-visible platform feature, page, pane, panel, control, navigation surface, or contextual capability changes.
- Update `UX stories and user flows.md` when a user intention, click path, object flow, feature sequence, or arrangement of UI elements changes.
- Update `Dev tools.md` when a development-only inspection/debugging capability changes.
- Keep `Design target - features and UX flows.md` as the document map and high-level framing.

When a new feature idea, UX distinction, data concept, role, permission, calculation, or flow is introduced in conversation:

- Add it to the most specific document above.
- Add the idea even if it is not implemented in every mockup.
- Mark the idea as current target, open question, or expansion space when its status is unclear.
- Prefer design-target language over mockup-specific language.
- Mention mockups only as current evidence or implementation examples, not as the source of truth.
- Keep feature descriptions connected to participation edges, communities, events, fields, creators, stewards, contextual management, and participant orientation.
- Keep UX stories focused on user intention and outcome, not just screen order.
- If a mockup implements something new before the design target is updated, update the design target in the same work session.
- If a feature is removed or reconsidered, preserve the reasoning briefly instead of silently deleting it.

Important framing:

- Everyone is a participant first.
- Creator, steward, facilitator, host, volunteer, and bridge person are design lenses and contextual roles, not necessarily separate base UIs.
- Event creation and community creation are platform features.
- Event management and community management appear when the user's relationship to the object grants the relevant contextual capability.
- Dev tools, including the Data Model Explorer, should remain separate from intended end-user product features.
- Mockups should use `Platform data layer/` for data storage, management operations, reset-to-seed behavior, and calculated values instead of managing data or formulas directly.
- Frontend feature code should prefer the managed OO domain layer in `Platform data layer/src/domain.ts` / `Platform data layer/js/domain.js`. Generic CRUD access is for dev tools, tests, and internal implementation work.
