# Mockup 6 - Gradual Contextual Disclosure

This focused prototype explores how gradual contextual disclosure can feel as an object interaction pattern rather than a global privacy settings page.

## Design Question

When a real interaction occurs, how can the app surface connection potential without turning participation into automatic exposure or a consent toll gate?

The mockup tests:

- event attendance with logistical information separated from social visibility
- a post-action prompt using "How do you want to show up here?"
- a community follow-up section using "Because you've participated here..."
- a person-to-person standing sharing choice that can satisfy later requests without interrupting the user
- a data-context tab that shows the `DataShareRequest` and `VisibilityGrant` records created through the shared access layer

## Shared Data Layer Use

This mockup loads the shared Platform data layer browser scripts and uses managed access methods such as:

- `platform.events.get(...)`
- `platform.communities.get(...)`
- `platform.users.get(...)`
- `platform.dataShareRequests.create(...)`
- `platform.dataShareRequests.accept(...)`
- `platform.visibilityGrants.create(...)`
- `platform.visibilityGrants.revoke(...)`
- `platform.dataShares.coverageForContext(...)`
- `platform.dataShares.coverageForRequest(...)`
- `platform.visibilityGrants.canSee(...)`

The mockup creates a few temporary data-share requests at runtime after resetting storage. It does not add mockup-only data arrays for visibility state.

## Consulted Context

- `General context/Design target - features and UX flows.md`
- `General context/Context maintenance instructions.md`
- `General context/Design intent.md`
- `General context/Design process and project wayfinding.md`
- `General context/Data concepts and logic.md`
- `General context/Features and functionalities.md`
- `General context/UX stories and user flows.md`
- `General context/Object page and connection UX principles.md`
- `General context/Language and copy register.md`
- `General context/Conviviality and pilot hypotheses.md`
- `Platform data layer/README.md`
- `Mockups/Mockup 5.1 - Object-First Event Surfaces/README.md`

## How To Open

Open `index.html` directly in a browser from this folder.

The page resets demo storage on load so each review begins from the seeded data plus the mockup's temporary requests.

## Manual Review Clickthrough

1. Open `Event threshold` and confirm attending is framed around Friday Contact Jam, not a global profile permission.
2. Check that required event logistics are separate from optional social visibility.
3. Click `Attend` and confirm the contextual prompt appears after attendance completes.
4. Try sharing with attendees or existing connections and watch the data-context counters update.
5. Open `Community follow-up` and use `Let stewards know I am around`.
6. Confirm member visibility remains separate from steward visibility.
7. Open `Connection choices` and inspect the standing sharing choice with Maya.
8. Revoke the standing contact grant and confirm the later request is no longer quietly covered.
9. Open `Data context` and confirm requests and grants reflect the choices made.

## Known Limitations

- This is a static prototype, not a final permissions UI.
- It tests one user, Casey, around one event, one community, and one existing connection.
- It does not implement facilitator-change notifications, material-change review, or output-cleaning rules for recommendations.
- It does not decide final product presentation. The data layer exposes context; the frontend chooses how to present it.
- It does not change General Context or any prior mockup.
