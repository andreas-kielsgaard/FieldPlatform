---
title: What FieldPlatform Should Not Become
layer: principles
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
  - What FieldPlatform is for.md
  - Living field principles.md
  - ../Frontend/Language and copy rules.md
depends_on:
  - What FieldPlatform is for.md
consumed_by:
  - ../Architecture/Review and approval model.md
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
---

# What FieldPlatform Should Not Become

This page names the boundaries. It should help builders notice when a useful feature idea starts pulling FieldPlatform toward the wrong kind of product.

FieldPlatform is not primarily:

- an [event](../Data%20layer/Event%20offering%20entity.md) marketplace
- a resource catalogue
- a CRM
- a productivity dashboard
- a social feed
- an organizer funnel
- a behavioral-data project
- a universal map of a [living field](Living%20field%20principles.md)

## Core Guardrails

- Do not digitize the [living field](Living%20field%20principles.md). Digitize thresholds where it becomes illegible.
- Do not build a catalogue of everything alive merely because it can be represented.
- Do not ask [people](../Data%20layer/Person%20entity.md) to complete profiles, resource maps, or social graphs before the platform can create value.
- Do not keep [people](../Data%20layer/Person%20entity.md) in the app when asking a nearby human, walking, resting, joining the room, or doing the project directly would serve better.
- Do not make the [living field](Living%20field%20principles.md) more administrative in the name of legibility.
- Do not make [community](../Data%20layer/Community%20entity.md) belonging a binary member/non-member truth.
- Do not make attending, following, requesting access, or connecting with a [person](../Data%20layer/Person%20entity.md) reveal identity, history, contact details, opinions, or participation graph by default.
- Do not make steward or [community](../Data%20layer/Community%20entity.md) management tools feel like surveillance or CRM.
- Do not make [event](../Data%20layer/Event%20offering%20entity.md) creation or sharing feel like ad targeting.
- Do not treat generated fields as managed [communities](../Data%20layer/Community%20entity.md).
- Do not hide why something is recommended, calculated, related, or waiting for review.
- Do not make suggested relations feel like ownership, automatic publication, marketing reach, or social pressure.
- Do not let calculated relations override consent, boundaries, capacity, or steward authority.

## Drift Checks

Use these questions before adding a feature, data field, or UI surface.

- Does this help [people](../Data%20layer/Person%20entity.md) return to contact with life?
- Is this a threshold where the field has become hard to read?
- Does the input change what becomes possible for the [person](../Data%20layer/Person%20entity.md) or field?
- Is the input feasible and worth the effort?
- Is this visibility in service of movement, or visibility for metrics, performance, capture, or control?
- Can this be handled better by proximity, direct conversation, rest, walking, a meal, or doing the work?
- Are we keeping access, cost, audience, experience, entry support, requirements, evidence, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, and action target separate enough?

If the answer is unclear, mark the point in [Open questions](../Current%20direction/Open%20questions.md) instead of hardening it into schema or UI.
