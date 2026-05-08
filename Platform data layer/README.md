# Platform Data Layer

This folder contains the prototype's database definition, database engine, calculation layer, and managed object-oriented access layer.

The code is organized by responsibility rather than by language. `source/` contains source code and source documentation. `build/` contains generated runtime output. Do not edit files in `build/` by hand.

## Where To Look First

1. [docs/architecture.md](docs/architecture.md): folder map and mental model.
2. [source/database-definition/schema.md](source/database-definition/schema.md): table-like collections and view-like outputs.
3. [docs/OO domain interfaces.md](docs/OO%20domain%20interfaces.md): managed object and method interface map.
4. [source/access-layer/models](source/access-layer/models): frontend-facing objects such as `User`, `Event`, and `Community`.

## Folder Map

- `source/database-definition/`: database schema notes and resettable seed snapshot.
- `source/database-engine/`: lightweight JSON snapshot database engine, split into adapters, collection config, normalization, query API, calculation API, and generic CRUD orchestration.
- `source/calculation-layer/`: calculated signals and view-like outputs, split by signal area so formulas can be tuned without reopening one large file.
- `source/access-layer/`: managed OO domain layer for frontend features.
- `dev-tool/`: browser-based database and access-layer testing aid.
- `build/node/`: generated CommonJS runtime for tests and Node tooling.
- `build/browser/`: generated browser bundle for static mockups.
- `tests/`: smoke tests.
- `docs/`: human-readable documentation.

## Is This SQL?

No. The current database engine is a JSON snapshot store with memory and browser `localStorage` adapters. That is intentional for now because the data concepts are expected to change strongly.

The design keeps concerns separate so this engine can later be replaced by SQLite, Postgres, an API backend, or another persistence layer without rewriting frontend feature code.

## Main Rule

Frontend feature code should use the managed access layer:

```js
const platform = FieldPlatformDomain.createPlatformDomain();
const user = platform.users.get("p_casey");
const event = platform.events.get("e_ci_jam");

event.registerUser(user);
event.addTag("integration");
```

Avoid direct CRUD in feature code:

```js
platform.database.update("events", "e_ci_jam", patch);
```

Direct database access is for dev tools, tests, migrations, and internal implementation work.

## Browser Usage

Load the source database scripts and the browser bundle:

```html
<script src="../Platform data layer/source/database-definition/seed.js"></script>
<script src="../Platform data layer/source/calculation-layer/shared.js"></script>
<script src="../Platform data layer/source/calculation-layer/overlap.js"></script>
<script src="../Platform data layer/source/calculation-layer/generatedFields.js"></script>
<script src="../Platform data layer/source/calculation-layer/fieldRelations.js"></script>
<script src="../Platform data layer/source/calculation-layer/communityHealth.js"></script>
<script src="../Platform data layer/source/calculation-layer/recommendations.js"></script>
<script src="../Platform data layer/source/calculation-layer/calculations.js"></script>
<script src="../Platform data layer/source/database-engine/utils.js"></script>
<script src="../Platform data layer/source/database-engine/collectionConfig.js"></script>
<script src="../Platform data layer/source/database-engine/adapters.js"></script>
<script src="../Platform data layer/source/database-engine/recordFactory.js"></script>
<script src="../Platform data layer/source/database-engine/snapshotNormalizer.js"></script>
<script src="../Platform data layer/source/database-engine/queryApi.js"></script>
<script src="../Platform data layer/source/database-engine/calculationApi.js"></script>
<script src="../Platform data layer/source/database-engine/database.js"></script>
<script src="../Platform data layer/build/browser/platform-domain.bundle.js"></script>
<script>
  const platform = FieldPlatformDomain.createPlatformDomain();
  const user = platform.users.get("p_casey");
  const recommendations = user.events.recommended();
</script>
```

By default, browser usage persists to `localStorage` under `field_platform_database_v1`.

## Node Usage

Build first, then use the generated Node runtime:

```js
const { database } = require("./build/node");
const { createPlatformDomain } = require("./build/node/access-layer/domain");

const platform = createPlatformDomain({
  adapter: database.createMemoryAdapter()
});

const user = platform.users.get("p_casey");
const event = platform.events.get("e_ci_jam");

event.registerUser(user);
const health = platform.communities.get("ci").health();
```

## Resetting Data

Use:

```js
platform.resetDatabase();
```

This restores the database to the initial seed snapshot in `source/database-definition/seed.js`.

## Dev Tool

Open [dev-tool/index.html](dev-tool/index.html) in a browser to inspect and test the data layer.

The tool includes:

- Access-layer object test scripts with automatic snapshot rollback after each execution.
- Direct table browsing for the raw database collections.
- Relation exploration for users, events, communities, venues, and generated fields.
- FieldRelation and RelationReview inspection, including review state, provenance, hold types, and movement options.
- Calculation and managed-access function execution with value-help dropdowns for valid object IDs.

The access-layer scripts live in `dev-tool/js/access-tests/`, with one file per tested access-layer object or access-layer service group.

## Build And Test

```powershell
npx -p typescript -p esbuild npm --prefix "Platform data layer" run build
node "Platform data layer/tests/storage-engine-smoke-test.js"
node "Platform data layer/tests/managed-access-smoke-test.js"
```

Or from this folder after installing dependencies:

```powershell
npm run build
npm test
```

## Calculation Philosophy

Calculations currently live in `source/calculation-layer/` because they behave like calculated views or helper signals between raw storage and managed access objects. The public entry point is still `calculations.js`; the neighboring files hold the actual formula groups.

The managed objects expose those calculations through methods and services. For example, frontend code should call `event.relevanceFor(user)`, `user.events.recommended()`, `community.health()`, or `platform.generatedFields.generateFields()`, not call formulas directly.

The exact formula balancing is not final. These functions exist to provide stable access points while the model is tuned later.

## FieldRelation Support

`fieldRelations` are the shared data-layer representation for broader connections between objects and contexts. `ParticipationEdge` remains the high-resolution person-to-community relationship object. `SuggestedEventShare` remains for compatibility with older mockups and narrow event-to-community suggestions; `EventSuggestionService.suggest()` now also creates a matching FieldRelation.

Use the managed access layer for future mockups:

```js
const relation = platform.fieldRelations.get("fr_ci_jam_good_first_step_ci");
const eventConnections = platform.fieldRelations.forObject("event", "e_ci_jam");
const pending = platform.fieldRelations.pendingForCommunity("ecstatic");
const movement = relation.movementOptions();
```

Movement options are domain-level `MovementType` values such as `attend`, `follow`, `request_access`, or `ask_steward`. User-facing mockups should translate those values through the language register into plain labels such as "Ways in" or "First step".

Refined relations count as reviewed/active connections. The low-level calculation API exposes both `acceptedRelationsForObject(...)` for reviewed accepted/refined relations and `activeRelationsForObject(...)` for accepted/refined/computed relations.
