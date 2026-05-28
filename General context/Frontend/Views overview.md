---
title: Views Overview
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
  - views
related:
  - Modules overview.md
  - Surface grammar.md
  - ../Architecture/Frontend layer overview.md
depends_on:
  - ../Architecture/Access layer overview.md
consumed_by:
  - ../Architecture/Traceability model.md
implemented_by:
  - ../../Mockups
---

# Views Overview

A view is a navigable screen, page, panel, dashboard, drawer, or mode that the [user](../Data%20layer/Person%20entity.md) can open or act through.

Views are not [user stories](../User%20stories/User%20stories%20overview.md). A [user story](../User%20stories/User%20stories%20overview.md) is an intention over time and may move through several views.

Initial canonical views:

- [My Orientation View](../Views/My%20Orientation%20View.md)
- [Community Overview View](../Views/Community%20Overview%20View.md)
- [Public Event View](../Views/Public%20Event%20View.md)
- [Generated Field View](../Views/Generated%20Field%20View.md)
- [Steward Suggested Connections View](../Views/Steward%20Suggested%20Connections%20View.md)

Future likely views include [venue](../Data%20layer/Venue%20entity.md) pages, [person](../Data%20layer/Person%20entity.md)/facilitator pages, [event](../Data%20layer/Event%20offering%20entity.md) management, [community](../Data%20layer/Community%20entity.md) management, creator fit, ask facilitator/[community](../Data%20layer/Community%20entity.md), field board, digestion, and care-for-the-space surfaces.

## View Spec Template

Each view should define:

- view name
- purpose
- primary viewer stance
- [user](../Data%20layer/Person%20entity.md) questions answered
- features/[modules](Modules%20overview.md) included
- access-layer methods consumed
- write commands available
- visible states
- empty states
- permissions
- related [user stories](../User%20stories/User%20stories%20overview.md)
- relevant domain [concepts](../Ontology/Product%20ontology.md)
- implementation links
- maturity

## Current Design Rule

Default public object pages should preserve native object identity before relation context. Embedded cards, recommendations, creator-fit surfaces, relation review, and management surfaces may foreground connection evidence earlier because that is why the object appears there.
