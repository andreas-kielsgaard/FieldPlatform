# Technology Architecture Map

## Purpose

Describe the project-specific technology architecture spine: top-level responsibility areas, intended directory ownership, allowed dependency directions, and source/generated boundaries.

This file is a setup map for the project architecture. It is not the structural-maintenance decision layer and should not decide every local placement or refactor.

## Architecture Stance

Start as a modular monolith in a TypeScript workspace monorepo.

Prefer explicit internal boundaries over early service extraction. Split into independently deployed services only after durable runtime boundaries, ownership, scaling needs, and operational requirements are clear.

Use boring, machine-friendly path names for runtime code and tools.

## Proposed Top-Level Partitions

| Area | Intended responsibility | Notes |
|---|---|---|
| `docs/context/` | Product and design authority that humans maintain as canonical project context. | Product truth should not live only in code comments, mocks, or generated indexes. |
| `docs/adr/` | Architecture decision records and durable project decisions. | Use when a decision affects future project shape. |
| `apps/web/` | Participant-facing Next.js application. | Main deployable web surface. |
| `apps/storybook/` | Component workshop and visual inspection surface. | Supports shared UI development and review. |
| `apps/admin/` | Optional administrative surface. | Add only when it becomes a real deployable surface. |
| `packages/domain/` | Entities, value objects, invariants, lifecycle rules, and meaning-bearing calculations. | Must not depend on UI or persistence implementation. |
| `packages/application/` | Use cases, command handlers, query services, and ports. | Coordinates domain work and boundary interactions. |
| `packages/persistence/` | Database schema, migrations, ORM models, repository implementations, and persistence adapters. | Implements persistence behind application/domain ports. |
| `packages/contracts/` | DTOs, validation schemas, API contracts, event contracts, and boundary types. | Prefer Zod or equivalent runtime validation for untrusted boundaries. |
| `packages/ui/` | Design tokens, primitives, reusable components, and shared presentation patterns. | Product-specific pages should not become the source of shared primitives by accident. |
| `packages/integrations/` | External services, webhooks, adapters, and provider-specific code. | Keep external dependency behavior out of domain code. |
| `packages/config/` | Shared TypeScript, lint, test, build, and workspace configuration. | Keeps tooling configuration explicit and reusable. |
| `tools/` | Project scripts, codemods, structural analysis, and agent-support tooling. | Tool output should not become product runtime dependency unless explicitly designed. |
| `infra/` | Deployment, observability, and environment infrastructure. | Runtime infrastructure ownership belongs here rather than in app code. |

## Dependency Direction

| Producer or owner | May depend on | Must not depend on |
|---|---|---|
| `apps/web/` | `packages/application/`, `packages/contracts/`, `packages/ui/`, approved server-side persistence access where framework conventions allow it. | Tool internals, generated indexes as product authority, unrelated app surfaces. |
| `packages/ui/` | Design tokens, local UI utilities, stable public contracts. | Domain persistence, application orchestration, external service adapters. |
| `packages/application/` | `packages/domain/`, `packages/contracts/`, ports, approved infrastructure interfaces. | UI components, concrete persistence details when a port should exist. |
| `packages/domain/` | Other domain primitives and stable contracts. | UI, persistence implementations, framework runtime, external service adapters. |
| `packages/persistence/` | Database clients, migrations, schema tooling, domain/application ports. | UI components or product presentation logic. |
| `packages/integrations/` | External SDKs, adapter contracts, application ports. | Domain rules that should remain provider-independent. |
| `tools/` | Repository files, generated indexes, scripts, project metadata. | Product runtime code as a required runtime dependency. |

## Source And Generated Boundaries

| Source | Generated or derived output | Rule |
|---|---|---|
| Schema definitions and migrations | ORM clients, generated types, schema indexes | Update source and regenerate; do not hand-edit generated output. |
| Component and route source | Component, route, and dependency indexes | Refresh through tools when implemented. |
| Tool semantic files and scripts | Tool-maintained indexes or reports | Treat outputs as evidence, not semantic authority. |
| Product context docs | Rendered or indexed context views | Product context remains authoritative; rendered/indexed views are derived. |

## Framework Defaults

| Concern | Default direction |
|---|---|
| Web app | Next.js App Router with TypeScript. |
| Persistence | PostgreSQL. |
| ORM/default database toolkit | Prisma by default; Drizzle remains the thinner SQL-shaped alternative. |
| Boundary validation | Zod or equivalent runtime validation for contracts and untrusted input. |
| UI workshop | Storybook or equivalent isolated component surface. |
| Unit and package tests | Vitest or equivalent TypeScript-native runner. |
| Browser-level checks | Playwright or equivalent E2E/browser runner. |
| Authentication | Dedicated auth boundary; provider choice remains open. |

## Open Architecture Choices

| Choice | Current direction | Revisit when |
|---|---|---|
| Prisma vs Drizzle | Prisma is the lower-entropy default for central schema and generated types. | Persistence requirements demand a thinner SQL-first layer or Prisma creates too much framework pressure. |
| Auth.js vs Clerk or another provider | Keep auth behind a dedicated boundary until provider choice is made. | Organization, user-management, hosting, or compliance requirements are clearer. |
| Admin app | Keep optional. | Administrative workflows become real product scope. |
| Service extraction | Modular monolith first. | Runtime boundaries become durable enough to justify operational cost. |

