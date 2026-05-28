---
title: Frontend Layer Overview
layer: frontend
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - frontend layer
related:
  - ../Frontend/Views overview.md
  - ../Frontend/Modules overview.md
  - ../Frontend/Surface grammar.md
depends_on:
  - Access layer overview.md
consumed_by:
  - ../Views/My Orientation View.md
  - ../Views/Community Overview View.md
implemented_by:
  - ../../Mockups
---

# Frontend Layer Overview

The frontend layer owns user-facing views, navigation between views, UI modules inside views, states, copy, and the way access-layer data packages are rendered or invoked.

## Terms

- User story or flow: a user intention over time, often across several views.
- View: a navigable screen, page, panel, dashboard, drawer, or mode.
- Feature or UI module: a functional visible unit inside a view.
- Access method: the safe read/write/calculation boundary a module consumes.
- Data entity: a persistent represented object.

## Frontend Responsibilities

Frontend surfaces should:

- preserve enough native object identity that the user knows what they are seeing
- make viewer stance legible
- translate domain/data language into ordinary user-facing copy
- separate similar-looking meanings such as access, cost, audience, experience needed, entry support, requirements, evidence, review state, visibility, and action target
- group ways-in actions by the object they act on
- invoke access-layer commands rather than raw writes
- avoid leaking steward-only or private context onto public pages

## Current View Set

Initial canonical views:

- [My Orientation View](../Views/My%20Orientation%20View.md)
- [Community Overview View](../Views/Community%20Overview%20View.md)
- [Public Event View](../Views/Public%20Event%20View.md)
- [Generated Field View](../Views/Generated%20Field%20View.md)
- [Steward Suggested Connections View](../Views/Steward%20Suggested%20Connections%20View.md)

Initial module families:

- [Ways In module](../Modules/Ways%20In%20module.md)
- [Suggested Connections Review module](../Modules/Suggested%20Connections%20Review%20module.md)
- [Contextual Disclosure module](../Modules/Contextual%20Disclosure%20module.md)

These pages are draft specs. Some current mockups pressure-test parts of them, but mockups do not become authority by themselves.
