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
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../../Tools/context-wiki
implemented_by:
---

# Open Questions

Use this page for unresolved points that should not silently become implementation.

## Current Modeling Questions

- Ways-in actions may need explicit action targets. "Attend" can target the current event, a prerequisite intro class, or a related event; "Follow" targets a community; "See other events here" targets a venue; "Ask facilitator" targets a person or role.
- Event surfaces likely need more separated data fields for access, cost, audience, experience needed, entry support, practical expectations, and requirements when multiple surfaces depend on those distinctions.
- Contextual visibility likely needs DataShareRequest and VisibilityGrant or equivalent access-layer behavior, but the stable schema should wait for repeated surface pressure.
- Output cleaning needs more explicit rules so private participation is not leaked through recommendation explanations, counts, overlap hints, or aggregate signals.
- Self-resourcing concepts such as FieldNeed, SupportRequest, FieldBoardItem, Nugget, and CareNeed are not yet stable collections.
- Ask facilitator / ask steward / ask before joining paths are useful future expansions, but their access and visibility model is not yet specified.

## Review Questions

- Which migrated pages should a human approve first as durable doctrine?
- Which view pages should become buildable specs next?
- Which implemented data/access pages are accurate to current code and which need correction?
- Which parked pilot/business hypotheses should stay non-authoritative?

When an implementation or mockup reveals a mismatch with the spec, either update the most specific page or add the mismatch here with links.
