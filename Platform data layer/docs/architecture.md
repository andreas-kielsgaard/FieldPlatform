# Platform Data Layer Architecture

This folder is organized by responsibility, not by programming language.

## Folder Map

- `source/database-definition/`
  - Defines the snapshot "tables" and seed data.
  - Start with `schema.md` to understand the collections.
  - `seed.js` creates the resettable initial database snapshot.

- `source/database-engine/`
  - Implements the lightweight database engine.
  - This is not SQL. It is a JSON snapshot store with adapters for memory and browser `localStorage`.
  - It owns generic CRUD, persistence, transactions, and reset-to-seed behavior.
  - Business verbs such as membership requests, event registration, and community creation are intentionally not here.
  - The implementation is split into adapter, config, normalization, query, calculation facade, record factory, and CRUD orchestration files.

- `source/calculation-layer/`
  - Implements tunable calculated signals and view-like computed outputs.
  - Examples: engagement strength, event relevance, group overlap, generated fields, community health.
  - These functions are intentionally practical and easy to tune later.
  - `calculations.js` is the public facade; the formula groups live in smaller neighboring files.

- `source/access-layer/`
  - Implements the managed OO access layer.
  - This is the default surface for frontend feature code.
  - It contains models, repositories, services, and the root `PlatformDomain`.
  - Services contain domain actions such as `MembershipService.request`, `EventRegistrationService.register`, and `CommunityManagementService.create`.

- `build/node/`
  - Generated CommonJS output from TypeScript and copied JavaScript source.
  - Used by Node tests and tooling.
  - Do not edit this by hand.

- `build/browser/`
  - Browser bundle for static mockups.
  - Do not edit this by hand.

- `dev-tool/`
  - Static browser tool for database inspection, relation exploration, calculation execution, and managed access-layer test scripts.
  - It is a development aid and not part of the intended product UI.

- `tests/`
  - Smoke tests for storage/database behavior and managed access behavior.

- `docs/`
  - Human-readable architecture and interface documents.

## SAP Mental Model

This is closer to an in-memory/application-server prototype than a real database-backed SAP-style system.

- Database definition: `source/database-definition/`
- Database engine: `source/database-engine/`
- Calculated views / helper functions: `source/calculation-layer/`
- Managed business objects and services: `source/access-layer/`
- Generated runtime artifacts: `build/`

## Access Rule

Frontend feature code should use the managed access layer:

```js
const platform = FieldPlatformDomain.createPlatformDomain();
const user = platform.users.get("p_casey");
const event = platform.events.get("e_ci_jam");

event.registerUser(user);
```

Direct database CRUD is reserved for dev tools, tests, and internal implementation work.
