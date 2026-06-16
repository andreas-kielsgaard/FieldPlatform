# Technology Architecture Map

## Purpose

Describe the project-specific technology architecture spine: top-level responsibility areas, intended directory ownership, allowed dependency directions, and source/generated boundaries.

This file is the accepted Phase 1 setup map for the Field Platform staging scaffold. It is not the structural-maintenance decision layer and should not decide every local placement or refactor.

For product and domain rails, also read:

- `project-control-files/field-platform-product-rails.md`
- `project-control-files/field-platform-domain-rails.md`
- `project-control-files/pre-development-readiness.md`

## Architecture Stance

Start as an application-owned modular monolith in a TypeScript/Node workspace.

Use React Router framework mode for the web app, PostgreSQL as the system of record, Drizzle as the default data-access layer, Zod at runtime boundaries, Auth.js behind an app-owned auth boundary, and pnpm workspaces without Turborepo or Nx initially.

Prefer folders-first module boundaries over early package splits. Split runtime code into physical packages only after an area earns independent release, test, dependency, or ownership cadence.

## Accepted Phase 1 Stack

| Concern | Accepted direction |
|---|---|
| Runtime and language | TypeScript on Node 24. |
| Package manager | pnpm workspaces, pinned with `packageManager`. |
| Monorepo orchestration | None initially. Add Turborepo or Nx only when real package/task complexity appears. |
| Web app | React Router framework mode with explicit `app/routes.ts` route config. |
| Product architecture | Application-owned modular monolith. |
| Database | PostgreSQL from day one, including local Docker development. |
| Data access | Drizzle by default; raw SQL allowed for complex queries. |
| Validation and contracts | Zod at params, forms, DTOs, fixtures, persisted JSON, and other boundary crossings. |
| Auth | Auth.js behind `shared/auth`; provider identity is not product authority. |
| Styling and UI primitives | Tailwind, CSS variables, Radix primitives, and named product components. |
| UI workshop | Narrow Storybook later for recurring semantic primitives and states. |
| Unit and integration tests | Vitest. |
| Browser checks | Playwright for a small set of critical flows. |
| Formatting and linting | Biome. |
| Boundary enforcement | dependency-cruiser blocking once source substrate exists. |
| Unused/dead code checks | Knip advisory first. |
| Deployment target | Local first; Render/Railway compatible later. |
| Semantic/vector/graph | Deferred until real content and user evidence justify them. |

## Rejected Or Deferred Defaults

Do not start with:

- Next.js unless React Router proves unsuitable during the first vertical slice.
- A separate frontend/backend split.
- Supabase-first or BaaS-first architecture.
- Prisma as the default ORM.
- SQLite as the real application database.
- GraphQL or OpenAPI-first generation.
- Vector DB, graph DB, PostGIS, or engineered recommendations.
- Turborepo, Nx, or many physical packages.
- Chat, feed, notification, payment, governance, or organization-role architecture as MVP defaults.

## Top-Level Partitions

| Area | Intended responsibility | Notes |
|---|---|---|
| `apps/web/` | The only Phase 1 runtime application. | React Router framework mode; participant and steward web surfaces live here initially. |
| `apps/web/app/` | React Router delivery layer. | Route modules, root, route config, framework entries, and route-only concerns. |
| `apps/web/src/modules/` | Product/application modules. | Feature-owned application behavior, domain concepts, persistence adapters, contracts, and module UI. |
| `apps/web/src/shared/` | Shared runtime infrastructure and primitives. | Auth boundary, config, contracts, db client boundary, errors, policy, UI primitives, utilities. |
| `apps/web/drizzle/` | Drizzle migration output and database tooling artifacts. | Stage 5 adds real schema and migrations. |
| `tools/` | Project scripts and agent-support tooling outside runtime code. | Tool output must not become product runtime dependency. |
| `infra/` | Docker, CI, deployment, and environment infrastructure. | Runtime infrastructure ownership belongs here rather than inside app modules. |
| `Agent OS/` | Agent operating-system prompt, tool, skill, and generated-index scaffold. | Agent OS surfaces remain separate from product runtime source. |
| `Agent OS/tool-maintained-files/` | Generated Agent OS evidence artifacts. | Evidence only; never semantic authority for product code. |
| `docs/adr/` | Durable architecture decision records after the app scaffold exists. | Do not use ADRs before the source substrate exists unless a decision is truly durable. |
| `docs/context/` | Future human-maintained product/design context. | Product truth should not live only in code comments, mocks, or generated indexes. |

## Web App Boundary Shape

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

Other modules and routes may import from `src/modules/<module>/index.ts`. They must not deep-import another module's internals.

## Dependency Direction

| Producer or owner | May depend on | Must not depend on |
|---|---|---|
| `apps/web/app/routes/` | Module public entrypoints, `shared/auth`, `shared/contracts`, `shared/config`, `shared/ui`. | `shared/db`, module persistence internals, Agent OS generated artifacts. |
| `apps/web/src/modules/*/application/` | Same module domain, contracts, persistence interfaces, shared contracts/errors/policy. | Route modules, React Router request/response primitives, React components unless explicitly inside module UI. |
| `apps/web/src/modules/*/domain/` | Same module domain helpers and stable contracts. | UI, persistence implementations, framework runtime, provider SDKs. |
| `apps/web/src/modules/*/persistence/` | `shared/db`, same module domain/contracts, Drizzle schema. | UI components, route modules, product presentation logic. |
| `apps/web/src/modules/*/ui/` | Shared UI primitives, same module view contracts. | Database clients, persistence internals, server auth internals, policy engines. |
| `apps/web/src/shared/ui/` | Design tokens, UI utilities, accessible primitives. | Domain persistence, application orchestration, auth server internals, policy engines. |
| `apps/web/src/shared/auth/` | Auth provider libraries and app-owned actor/session mapping. | Product authority, stewardship rules, visibility rules, or publishing rights. |
| `apps/web/src/shared/policy/` | App-owned authorization, visibility, review, and publishing decisions. | Route components or UI presentation. |
| `tools/` | Repository files, scripts, generated indexes, project metadata. | Product runtime code as a required runtime dependency. |
| Runtime source | Runtime source and approved generated types. | `Agent OS/tool-maintained-files/` generated evidence artifacts. |

## Source And Generated Boundaries

| Source | Generated or derived output | Rule |
|---|---|---|
| Drizzle schema and migrations | SQL migrations, schema indexes, generated DB evidence | Update source and regenerate; do not hand-edit generated output. |
| Route and component source | Route, component, dependency, symbol, and test indexes | Refresh through Agent OS tools when the substrate exists. |
| Tool semantic files and scripts | Tool-maintained indexes or reports | Treat outputs as evidence, not semantic authority. |
| Product context docs | Rendered or indexed context views | Product context remains authoritative; rendered/indexed views are derived. |
| Project-control files | Agent-facing setup and architecture memory | Update directly when a durable setup decision changes. |

## Revisit Triggers

| Decision | Revisit when |
|---|---|
| React Router vs Next.js | React Router framework ergonomics block the first vertical slice or Vercel-native requirements dominate. |
| Drizzle vs Prisma/Kysely | Drizzle makes real persistence workflows materially worse, or Prisma Next settles enough to improve the actual workflow. |
| Auth.js vs Clerk | Auth setup blocks MVP velocity or turnkey identity/org management becomes more important than provider neutrality. |
| Folders-first modules | A module earns independent release, test, dependency, or ownership cadence. |
| App-level policy first | Sensitive multi-tenant access patterns stabilize enough to add targeted RLS as defense in depth. |
| Storybook scope | Recurring semantic UI primitives exist and need state visibility. |
| CodeQL/Semgrep | First public deployment, auth exposure, or wider contributor surface. |
| Semantic/vector/graph support | Real content and users show lexical Postgres search or relational traversal is insufficient. |
