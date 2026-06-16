# Project Context Rails Compiled

## Field Platform Product Identity

Field Platform is a field-orientation and participation platform.

It is not:

- a generic social network
- a chat app
- a feed
- a simple event directory
- a community operating system
- a recommendation engine

The MVP proves orientation, entry, light continuity, stewarded representation, reviewable nudges and relation claims, and controlled visibility, publishing, and review basics.

The MVP does not prove governance, sophisticated recommendations, a social graph, full notifications, payments, federation, or complex community operations.

First slice bias: avoid starting with events CRUD. Prefer a public community orientation page that exercises community representation, visibility/publication/review state, ways-in content, steward attribution, one linked event or offering, one field signal, save/follow/track behind auth, and a relation or nudge proposal path.

Avoid starter patterns, UI kits, provider features, or seed data that silently imply feed/follow/DM mechanics, direct user edits to stewarded representations, event listing as core product, provider-owned organization roles as product authority, recommendation engines before evidence, or hidden ontology decisions in mock data.

## Field Platform Domain Rails

Keep these concepts separate:

- authentication
- account
- profile
- contributor attribution
- steward
- publisher
- stewardship authority
- review authority
- visibility policy
- publishing status
- representation ownership or stewardship

Hard rule:

```text
createdBy is never owner, steward, contributor authority, review authority, or publishing authority by default.
```

An account may exist without a public profile. A public profile may expose only a subset of account-held information. Private/local data and public/shared data must be modeled separately.

Do not collapse visibility, publishing, and review into one boolean or overloaded enum. Keep separate axes for visibility scope, publication status, and review state.

Minimum visibility values:

```text
private
steward_visible
community_visible
link_visible
public
```

Minimum publication values:

```text
draft
published
archived
```

Minimum review values:

```text
not_required
pending_review
accepted
rejected
superseded
```

Stewardship is a relationship to a representation or artifact, not authorship or creation. Accepted contributions, proposed changes, and relation claims should preserve attribution to the proposing individual.

User nudges and relation suggestions must be stored as reviewable claims or proposals, not direct edits.

Ways-in content is first-class product structure. Model who something is for, threshold, access, price, experience level, and concrete entry suggestions. Do not hide durable ways-in semantics inside loose JSON or copy once schema work begins.

Do not start with one generic mega-entity table. Use explicit artifact tables for communities, events, offerings, field signals, and other stable artifact types. A thin representation spine is allowed for cross-cutting visibility, publishing, review, stewardship, attribution, and relation claims.

## Technology Architecture Stance

Start as an application-owned modular monolith in a TypeScript/Node workspace.

Accepted Phase 1 defaults:

- TypeScript on Node 24
- pnpm workspaces
- no Turborepo or Nx initially
- React Router framework mode with explicit `app/routes.ts`
- PostgreSQL as system of record
- Drizzle by default, raw SQL allowed for complex queries
- Zod at runtime boundaries
- Auth.js behind an app-owned auth boundary
- Tailwind, CSS variables, Radix primitives, named product components
- Vitest for unit/integration tests
- Playwright for a small set of critical flows
- Biome for formatting/linting
- dependency-cruiser after source substrate exists
- Knip advisory first
- local first, Render/Railway compatible later
- semantic/vector/graph deferred until real content and user evidence justify them

Deferred or rejected defaults:

- Next.js unless React Router proves unsuitable
- separate frontend/backend split
- Supabase-first or BaaS-first
- Prisma default
- SQLite as real app database
- GraphQL or OpenAPI-first generation
- vector DB, graph DB, PostGIS, engineered recommendations
- Turborepo, Nx, many physical packages
- chat, feed, notification, payment, governance, or organization-role architecture as MVP defaults

## Intended Runtime Layout

```text
apps/web/
  app/
  src/modules/
  src/shared/
  drizzle/
tools/
infra/
Agent OS/
docs/adr/
docs/context/
```

`apps/web/` is the only Phase 1 runtime application.

Use thin React Router route modules:

```text
route module
  -> validate params and action/input boundaries
  -> call module application service
  -> return response or view model
```

Route modules must not own SQL, domain invariants, visibility policy, review-state transitions, stewardship authority, relation-claim resolution, or product ontology.

Preferred module shape:

```text
src/modules/<module>/
  index.ts
  application/
  contracts/
  domain/
  persistence/
  ui/
```

Other modules and routes may import from a module public `index.ts`; they must not deep-import another module's internals.

## Dependency Direction

- Routes may depend on module public entrypoints, shared auth, contracts, config, and UI.
- Routes must not depend on shared DB, module persistence internals, or Agent OS generated artifacts.
- Module application code may depend on same-module domain/contracts/persistence interfaces and shared contracts/errors/policy.
- Module domain code must not depend on UI, persistence implementations, framework runtime, or provider SDKs.
- Module persistence code may depend on shared DB, same-module domain/contracts, and Drizzle schema.
- Module UI may depend on shared UI primitives and same-module view contracts, not DB clients or server auth internals.
- Shared UI must not depend on domain persistence, application orchestration, auth server internals, or policy engines.
- Shared auth must not own product authority, stewardship rules, visibility rules, or publishing rights.
- Tools must not become product runtime dependencies.
- Runtime source must not depend on Agent OS generated evidence artifacts.

## Pre-Development Readiness

Run deterministic checks when the substrate exists and cost is reasonable:

```powershell
git status --short --branch
npx --yes tsx tool-implementations/checks/check-agent-os-contracts.ts --json
npx --yes tsx tool-implementations/indexes/build-all-indexes.ts --check --json
npx --yes tsx tool-implementations/semantic/build-semantic-chunk-index.ts --check --json
```

Generated artifacts are locally authoritative for local state. For commits, generated artifacts included in history should reflect the source structure being committed. Use commit-view mode for `change-index` when local dirtiness would otherwise be captured.

Generated artifacts should use Agent OS root-relative paths. Avoid machine-specific absolute paths.

Before product development begins, set up only environment pieces that support accepted pre-decisions: Node/package manager policy, TypeScript workspace, formatting/linting/typecheck, test runner, app scaffold after web direction is accepted, persistence tooling after DB/ORM direction is accepted, and env/secret conventions before integrations or auth.

Embeddings and vector stores remain deferred until provider/model, local vs remote execution, storage lifecycle, privacy/source-retention, cache/commit policy, refresh cost, stale-result warnings, and measurable retrieval failure are defined.

## Memory Surfaces

`domain-glossary.md` is currently empty scaffolding for canonical terms, unresolved language, and rename history.

`design-system-map.md` is currently empty scaffolding for token sources, approved primitives, status language, and visual changes.

`known-debt.md` is currently empty scaffolding for accepted shortcuts, containment, and removal triggers.

`experiments.md` is currently empty scaffolding for provisional work, promotion triggers, and retirement triggers.

`change-impact-checklists.md` gives short review lists for domain concept, shared component, permission, route/page, mock data, and refactor changes.

`review-checklist.md` cues pre-merge review: selected task mode, affected surfaces, checks, docs/maps, debt, experiments, naming, policy, schema/accessor, component/design, mock/fixture impacts, and remaining risk.
