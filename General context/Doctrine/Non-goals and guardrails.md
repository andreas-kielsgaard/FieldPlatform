---
title: Non-goals And Guardrails
layer: doctrine
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - product guardrails
  - anti-drift rules
related:
  - Core product thesis.md
  - Living field doctrine.md
  - ../Frontend/Language and copy rules.md
depends_on:
  - Core product thesis.md
consumed_by:
  - ../Architecture/Review and approval model.md
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
---

# Non-goals And Guardrails

FieldPlatform is not primarily:

- an event marketplace
- a resource catalogue
- a CRM
- a productivity dashboard
- a social feed
- an organizer funnel
- a behavioral-data project
- a universal map of a living field

## Core Guardrails

- Do not digitize the living field. Digitize thresholds where it becomes illegible.
- Do not build a catalogue of everything alive merely because it can be represented.
- Do not ask people to complete profiles, resource maps, or social graphs before the platform can create value.
- Do not keep people in the app when asking a nearby human, walking, resting, joining the room, or doing the project directly would serve better.
- Do not make the living field more administrative in the name of legibility.
- Do not make community belonging a binary member/non-member truth.
- Do not make attending, following, requesting access, or connecting with a person reveal identity, history, contact details, opinions, or participation graph by default.
- Do not make steward or community management tools feel like surveillance or CRM.
- Do not make event creation or sharing feel like ad targeting.
- Do not treat generated fields as managed communities.
- Do not hide why something is recommended, calculated, related, or waiting for review.
- Do not make suggested relations feel like ownership, automatic publication, marketing reach, or social pressure.
- Do not let calculated relations override consent, boundaries, capacity, or steward authority.

## Drift Checks

Use these questions before adding a feature, data field, or UI surface:

- Does this help people return to contact with life?
- Is this a threshold where the field has become hard to read?
- Does the input change what becomes possible for the person or field?
- Is the input feasible and worth the effort?
- Is this visibility in service of movement, or visibility for metrics, performance, capture, or control?
- Can this be handled better by proximity, direct conversation, rest, walking, a meal, or doing the work?
- Are we preserving semantic separation between access, cost, audience, experience, entry support, requirements, evidence, review state, visibility, and action target?

If the answer is unclear, mark the point in [Open questions](../Current%20direction/Open%20questions.md) instead of hardening it into schema or UI.
