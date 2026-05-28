---
title: Product Architecture Overview
layer: architecture
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - product architecture
  - wiki layer model
related:
  - Data layer overview.md
  - Access layer overview.md
  - Frontend layer overview.md
  - Traceability model.md
depends_on:
  - ../Doctrine/Core product thesis.md
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
---

# Product Architecture Overview

The context wiki is a living specification system. It should become clear enough that an agent can generate or update implementation from the spec, and then reverse-update the spec when implementation feedback changes product meaning.

The layers are:

- Doctrine and guardrails: why the platform exists, what it refuses, and how to judge ambiguous choices.
- Ontology/domain concepts: what the main product concepts mean and what they must not become.
- Data layer: persistent entities, properties, relationships, invariants, visibility concerns, and current implementation files.
- Access/middle layer: safe reads, writes, calculations, permissions, lifecycle transitions, consistency rules, and view-model packages.
- Frontend layer: navigable views, UI modules, states, copy, interaction behavior, and how views consume access-layer outputs.
- User stories and flows: intentions over time, often crossing several views.
- Implementation links: current source files, mockups, tests, and docs that implement or pressure-test a spec.
- Review state: what is generated, reviewed, approved, stale, buildable, implemented, parked, or deprecated.

## Layer Boundaries

General context is design authority, but it is not literal implementation syntax. A concept may materialize as doctrine, UI copy, surface behavior, query/view filtering, lifecycle state, visibility rule, calculation, permission behavior, stored record, dev-tool inspection, future exploration, or no implementation yet.

The question is: what kind of materialization has this concept earned right now?

## Current Implementation Shape

The current repo has three main implementation areas:

- `General context/`: canonical product/design/spec Markdown.
- `Platform data layer/`: JSON snapshot database, calculation layer, managed OO access layer, browser bundle, tests, and dev tool.
- `Mockups/`: exploratory static UI surfaces that test product pressure but do not become authority by themselves.

Frontend code should prefer the managed access layer in `Platform data layer/source/access-layer/`. Direct storage access is for dev tools, tests, migrations, and internal implementation work.

## Buildable Direction

The wiki should progressively support traceability:

`user story -> views -> modules -> access methods -> data entities/calculations -> implementation files`

and reverse traceability:

`data entity -> access methods -> modules/views -> user stories -> implementation files`

The first migration creates the pages and metadata needed for this. Many pages are intentionally marked `generated/unreviewed` or `conceptual` until a human reviews them and the implementation catches up.
