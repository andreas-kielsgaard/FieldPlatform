---
title: Open Questions
layer: process
status: generated/unreviewed
maturity: conceptual
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - open questions
related:
  - ../Architecture/Review and approval model.md
  - ../Architecture/Traceability model.md
depends_on:
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../../Tools/context-wiki
implemented_by:
---

# Open Questions

Use this page for unresolved points that should not silently become implementation.

## Current Modeling Questions

- Ways-in actions may need explicit action targets. "Attend" can target the current [event](../Data%20layer/Event%20offering%20entity.md), a prerequisite intro class, or a related [event](../Data%20layer/Event%20offering%20entity.md); "Follow" targets a [community](../Data%20layer/Community%20entity.md); "See other [events](../Data%20layer/Event%20offering%20entity.md) here" targets a [venue](../Data%20layer/Venue%20entity.md); "Ask facilitator" targets a [person](../Data%20layer/Person%20entity.md) or role.
- [Event](../Data%20layer/Event%20offering%20entity.md) surfaces likely need more separated data fields for access, cost, audience, experience needed, entry support, practical expectations, and requirements when multiple surfaces depend on those distinctions.
- Contextual visibility likely needs DataShareRequest and VisibilityGrant or equivalent access-layer behavior, but the stable schema should wait for repeated surface pressure.
- Output cleaning needs more explicit rules so private participation is not leaked through recommendation explanations, counts, overlap hints, or aggregate signals.
- [Self-resourcing](../Modules/Self-resourcing%20Entry%20module.md) [concepts](../Ontology/Product%20ontology.md) such as FieldNeed, SupportRequest, FieldBoardItem, Nugget, and CareNeed are not yet stable collections.
- Ask facilitator / ask steward / ask before joining paths are useful future expansions, but their access and [visibility model](../Access%20layer/Contextual%20visibility%20and%20disclosure.md) is not yet specified.

## Review Questions

- Which migrated pages should a human approve first as durable principle?
- Which [view](../Frontend/Views%20overview.md) pages should become buildable specs next?
- Which implemented data/access pages are accurate to current code and which need correction?
- Which parked conviviality/pilot hypotheses should stay planning reference, and which should be adopted into active principle, product definition, or implementation specs?

When an implementation or mockup reveals a mismatch with the spec, either update the most specific page or add the mismatch here with links.
