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

The frontend layer owns user-facing [views](../Frontend/Views%20overview.md), navigation between [views](../Frontend/Views%20overview.md), UI [modules](../Frontend/Modules%20overview.md) inside [views](../Frontend/Views%20overview.md), states, copy, and the way access-layer data packages are rendered or invoked.

## Terms

- [User story](../User%20stories/User%20stories%20overview.md) or flow: a [user](../Data%20layer/Person%20entity.md) intention over time, often across several [views](../Frontend/Views%20overview.md).
- [View](../Frontend/Views%20overview.md): a navigable screen, page, panel, dashboard, drawer, or mode.
- Feature or UI [module](../Frontend/Modules%20overview.md): a functional visible unit inside a [view](../Frontend/Views%20overview.md).
- Access method: the safe read/write/calculation boundary a [module](../Frontend/Modules%20overview.md) consumes.
- Data entity: a persistent represented object.

## Frontend Responsibilities

Frontend surfaces should:

- preserve enough native object identity that the [user](../Data%20layer/Person%20entity.md) knows what they are seeing
- make viewer stance legible
- translate domain/data language into ordinary user-facing copy
- separate similar-looking meanings such as access, cost, audience, experience needed, entry support, requirements, evidence, [review state](Review%20and%20approval%20model.md), visibility, and action target
- [group](../Data%20layer/Community%20entity.md) ways-in actions by the object they act on
- invoke access-layer commands rather than raw writes
- avoid leaking steward-only or private context onto public pages

## Current View Set

Initial canonical [views](../Frontend/Views%20overview.md):

- [My Orientation View](../Views/My%20Orientation%20View.md)
- [Community Overview View](../Views/Community%20Overview%20View.md)
- [Public Event View](../Views/Public%20Event%20View.md)
- [Generated Field View](../Views/Generated%20Field%20View.md)
- [Steward Suggested Connections View](../Views/Steward%20Suggested%20Connections%20View.md)

Initial [module](../Frontend/Modules%20overview.md) families:

- [Ways In module](../Modules/Ways%20In%20module.md)
- [Suggested Connections Review module](../Modules/Suggested%20Connections%20Review%20module.md)
- [Contextual Disclosure module](../Modules/Contextual%20Disclosure%20module.md)
- [Self-resourcing Entry module](../Modules/Self-resourcing%20Entry%20module.md)

These pages are draft specs. Some current mockups pressure-test parts of them, but mockups do not become authority by themselves.
