---
title: How Tools Like This Go Wrong
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
  - what FieldPlatform should not become
related:
  - What FieldPlatform is for.md
  - Living field principles.md
  - ../Maintenance/Product guardrails for agents.md
  - ../Frontend/Language and copy rules.md
depends_on:
  - What FieldPlatform is for.md
  - Living field principles.md
consumed_by:
  - ../Architecture/Review and approval model.md
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
---

# How Tools Like This Go Wrong

Tools that help people find events, communities, resources, or connections tend to fail in familiar ways.

They begin with a real human need, then slide toward a product shape that is easier to measure, sell, administer, or automate than it is to inhabit.

This page names those traps so FieldPlatform can avoid them.

## Marketplace Drift

The easy failure is to treat every gathering, practice, venue, and community as a listing.

Then the product starts optimizing for discovery, conversion, reach, popularity, and promotion.

FieldPlatform should instead ask: what helps someone understand whether this is a possible way in, and what step is appropriate now?

Avoid:

- ranking community life by popularity
- making event creation feel like ad targeting
- making attendance the main proof of value
- turning entry guidance into sales copy

## Catalogue Drift

Another failure is to build a complete directory of everything alive.

This looks helpful, but it quickly becomes stale, bureaucratic, and misleading. It also asks people to maintain a digital version of life that is larger than the value they get back.

FieldPlatform should not catalogue the [living field](Living%20field%20principles.md) merely because something can be represented.

It should capture limited traces that help at specific thresholds: arrival, entry, review, consent, capacity, handoff, memory, digestion, and next action.

## CRM And Admin Drift

A platform for communities can easily become a work system for managing people.

Stewards then become operators. Community care becomes record maintenance. Participation becomes status management. The person using the product becomes a contact, lead, member, segment, or task.

FieldPlatform should avoid this by keeping roles contextual, review surfaces contained, and human authority clear.

It should not make steward or community tools feel like surveillance, funnel management, or customer operations.

## Social Feed Drift

When participation becomes a feed, people learn to perform for attention.

The product starts rewarding visibility, reaction, update frequency, and social comparison. The field becomes content.

FieldPlatform should not make community life into a public stream. It should make relevant context visible when it helps someone understand where they are, what is possible, or what needs care.

## Productivity Drift

Tools often turn life into tasks, progress, goals, and completion pressure.

That can make rest, uncertainty, waiting, digestion, and quiet participation look like failure.

FieldPlatform should make movement possible without making constant movement mandatory. Rest, non-action, leaving, waiting, and soft participation must remain legitimate outcomes.

## Surveillance And Prediction Drift

Any platform that sees relationships can start acting as if more data is always better.

That path leads toward behavioral prediction, hidden scoring, unclear recommendations, and visibility that people did not meaningfully choose.

FieldPlatform should keep access, consent, boundaries, capacity, [review state](../Architecture/Review%20and%20approval%20model.md), visibility, and action target distinct.

It should not make attending, following, requesting access, or connecting with someone reveal identity, history, contact details, opinions, or a participation graph by default.

## Universal Map Drift

The most seductive failure is to believe the platform can map the whole field.

It cannot.

Generated fields are patterns, not managed communities. Suggested relations are invitations to review, not ownership. Calculated relations must not override consent, boundaries, capacity, or steward authority.

When the product is uncertain, it should say so. If a decision is not ready to become schema or UI, mark it in [Open questions](../Current%20direction/Open%20questions.md) instead of hardening it too early.

## Drift Checks

Use these questions before adding a feature, data field, or UI surface:

- Does this help people return to contact with life?
- Is this a threshold where the field has become hard to read?
- Does the input change what becomes possible for the person or field?
- Is the input feasible and worth the effort?
- Is this visibility in service of movement, or visibility for metrics, performance, capture, or control?
- Can this be handled better by proximity, direct conversation, rest, walking, a meal, or doing the work?
- Are we keeping access, cost, audience, experience, entry support, requirements, evidence, review state, visibility, and action target separate enough?

---

For stricter agent-facing rules, see [Product guardrails for agents](../Maintenance/Product%20guardrails%20for%20agents.md).
