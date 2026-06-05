---
title: Living Field Principles
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
  - living field principles
  - conviviality principle
  - threshold illegibility
related:
  - What FieldPlatform is.md
  - What FieldPlatform should not become.md
  - ../Maintenance/Product guardrails for agents.md
  - ../Parked/Conviviality and pilot hypotheses.md
depends_on:
  - What FieldPlatform is.md
consumed_by:
  - ../Ontology/Product ontology.md
  - ../Frontend/Surface grammar.md
implemented_by:
---

# Living Field Principles

This page translates the platform vision into design judgment.

The living field is the real life around the app: people, places, communities, practices, trust, needs, offers, rhythm, memory, care, and timing.

FieldPlatform should help people return to contact with that life. It should not make life serve the app.

A digital representation is only a partial trace. It can help at specific moments, but it is not the field itself.

## The Main Design Move

Do not digitize the living field. Digitize the thresholds where the living field becomes hard to read.

That means the product should avoid collecting a complete model of everything alive. It should focus on moments where a person, steward, facilitator, or community needs just enough shared context to move well.

Good digital traces are situated, useful, and limited:

- a person names what they are arriving with today
- a steward reviews a specific suggested connection
- a [community](../Data%20layer/Community%20entity.md) explains entry guidance
- a participant sees a first step
- a facilitator requests necessary logistical information for a specific [event](../Data%20layer/Event%20offering%20entity.md)
- a group carries forward one useful note and lets the rest disappear

## Convivial Tooling

A convivial tool increases people's ability to act with judgment, ask for support, join with care, rest, and understand what is around them.

It should not make people dependent on expert-controlled infrastructure in order to know themselves, participate, or care for a space.

In product terms, that means:

- every input needs a fair return
- the app should explain why it asks for information
- visibility should be scoped to the situation
- signals should expire when their usefulness expires
- suggested relations need review where authority and consequence matter
- recommendations should explain themselves
- consent, boundaries, capacity, and steward authority should not be overridden by calculation
- direct contact should win when direct contact is better

## Rhythm And Timing

The product should support contact rather than output alone.

It should protect activation without coercion, purpose without performance pressure, rest as participation, care for the space as participation, and body, need, relation, and emotion as part of the field.

Seasonal language can be a design lens, but it does not need to appear in the interface:

- spring: arrival, activation, orientation, state clarity, [self-resourcing](../Modules/Self-resourcing%20Entry%20module.md)
- summer: creation, focus, doing the thing
- fall: digestion, selection, carry-forward, memory
- winter: rest, landing, soft togetherness, letting traces dissolve

The app is likely most useful around spring and fall thresholds: arrival, orientation, transition, digestion, and carry-forward.

It should be quieter when proximity, conversation, meals, walks, room presence, rest, or doing the work already serves the movement better.

## Feasible Information Exchange

Do not design as if the platform can know every resource, capacity, contact, state, need, boundary, agreement, or readiness signal.

Useful information is information that can realistically and convivially enter the system:

- lightweight declarations people already want to make visible
- scoped asks and offers with immediate value
- signals that expire quickly
- relations reviewed where authority and consequence are clear
- selected nuggets from digestion
- support patterns intentionally carried forward

The product should be clear about what effort is asked, what value returns, how soon it returns, and why the app is the right medium.

## From Principle To Interface

These principles should show up in concrete interface choices:

- ask for less, but make the return clearer
- show why a connection or next step appears
- separate what is known, suggested, reviewed, private, and unresolved
- make review states visible where they affect action
- make leaving, resting, hiding, or waiting legitimate outcomes
- treat generated patterns as provisional, not as communities
- prefer short-lived signals over permanent identity claims
- use ordinary language in the interface, not internal principle language

The test is simple: after using FieldPlatform, does a person understand the living situation better and feel more able to act within it?

---

For stricter agent-facing rules, see [Product guardrails for agents](../Maintenance/Product%20guardrails%20for%20agents.md).
