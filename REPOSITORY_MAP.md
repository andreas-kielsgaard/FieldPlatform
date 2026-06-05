# Repository Map

Operational source map for FieldPlatform agents and maintainers.

This document explains where things live and where edits should happen. It is repo-navigation guidance, not product/design authority. For product intent, use `General context/`.

## Top-Level Layout

- `AGENTS.md`
  - Bootstrap instructions for AI agents.
  - Keep short and operational. It should route agents to the right project documents, not duplicate the full design context.
- `General context/`
  - Designer-controlled source of truth for product/design/spec direction.
  - Canonical Markdown wiki; start with `General context/README.md`.
  - Edit only when explicitly requested or after a surfaced design-principle review.
  - Do not commit, merge, or push without explicit user review.
- `Tools/context-wiki/`
  - Local Node/static tool that reads, renders, searches, reviews, and can edit `General context/` Markdown.
  - Tool state is regenerable from Markdown and git. It must not become a second documentation source.
- `Platform data layer/`
  - Shared data/model/access layer used by mockups and future product surfaces.
- `Mockups/`
  - Static exploratory HTML/CSS/JS artifacts.
  - Temporary expressions of current design pressure, not design authority.
- `Archive/`
  - Historical/generated material.
  - Reference only unless explicitly requested.

## General Context

`General context/` is now structured as a canonical Markdown wiki/spec. Each page should use lightweight frontmatter for title, layer, status, maturity, provenance, review state, ownership, related pages, dependencies, consumers, and implementation links.

Start with:

- `General context/README.md`
- `General context/Doctrine/Core product thesis.md`
- `General context/Doctrine/Non-goals and guardrails.md`
- `General context/Maintenance/Context maintenance for agents.md`

The former long root documents are legacy pointer files only. Update the most specific canonical wiki page instead of adding duplicate summaries.

## Context Wiki Tool

Run the local context wiki tool:

```powershell
cd Tools/context-wiki
npm start
```

Check parsing/dashboard data without starting the server:

```powershell
cd Tools/context-wiki
npm run check
```

The tool provides navigation, Markdown rendering, search/filtering, backlinks, traceability, review dashboard, git diff display, approval metadata stamping, and optional local Markdown write-back.

## Platform Data Layer

Read `Platform data layer/README.md` first for data-layer orientation and commands.

Important areas:

- `Platform data layer/source/`
  - Source code and source documentation.
  - Edit source files here.
- `Platform data layer/source/access-layer/`
  - Managed object-oriented domain layer, models, repositories, services, and platform domain entry points.
  - Mockups and frontend behavior should prefer this layer.
- `Platform data layer/source/database-definition/`
  - Schema notes and resettable seed snapshot.
- `Platform data layer/source/database-engine/`
  - Low-level JSON snapshot database engine, adapters, query API, calculation API, and generic CRUD orchestration.
  - Touch only when changing storage/query mechanics.
- `Platform data layer/source/calculation-layer/`
  - Shared calculated signals, recommendations, generated fields, relation calculations, and community health logic.
- `Platform data layer/dev-tool/`
  - Development/debug UI.
  - Not participant-facing product.
- `Platform data layer/docs/`
  - Architecture and managed interface documentation.
- `Platform data layer/tests/`
  - Smoke tests for storage and managed access behavior.
- `Platform data layer/build/`
  - Generated build output for Node and browser use.
  - Do not manually edit unless the task explicitly concerns generated artifacts.

Common data-layer verification:

```powershell
npx -p typescript -p esbuild npm --prefix "Platform data layer" run build
node "Platform data layer/tests/storage-engine-smoke-test.js"
node "Platform data layer/tests/managed-access-smoke-test.js"
```

Or from `Platform data layer/`:

```powershell
npm run build
npm test
```

## Mockups

Mockups are mostly static folders with:

- `index.html`
- `css/styles.css`
- `js/app.js`
- optional `js/data.js`, `js/calculations.js`, `js/view-model.js`, or `js/copy-map.js`
- optional `README.md` describing the mockup's design question

Before editing a mockup:

- read its local `README.md` if present
- read relevant `General context/` docs
- use the shared Platform data layer where the concept already exists there
- avoid turning mockup-local ideas into product authority without a General context review

When creating a new mockup, include a local `README.md` that names the design question, consulted context docs, and known limitations.

## Archive

`Archive/` contains historical/generated material.

Do not treat archive files as current instructions. If an archived idea becomes useful, distill it into the appropriate current `General context/` document after user review.

## Updating This Map

Update this document when:

- a new top-level area is added
- source/generated boundaries change
- build or test commands change
- mockup conventions change
- a new recurring repo-navigation rule is needed

If the change affects how agents should enter the project, update `AGENTS.md` too.
