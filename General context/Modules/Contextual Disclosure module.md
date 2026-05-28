---
title: Contextual Disclosure Module
layer: frontend
status: generated/unreviewed
maturity: conceptual
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - Contextual Disclosure module
related:
  - ../Access layer/Contextual visibility and disclosure.md
  - ../Frontend/Language and copy rules.md
depends_on:
  - ../Doctrine/Non-goals and guardrails.md
consumed_by:
  - ../Views/Public Event View.md
  - ../Views/Community Overview View.md
implemented_by:
---

# Contextual Disclosure Module

The Contextual Disclosure module asks how someone wants to show up in a specific context after a real interaction, or before participation when logistical information is required.

## Parent Views

- Public Event View after attend or mark interested
- Community Overview View after related participation
- future facilitator, venue, care, ask, and field-board surfaces

## Prompts

- "How do you want to show up here?"
- "Because you've participated here..."
- "Keep this private."
- "Share with facilitator."
- "Let stewards know I am around."
- "Visible to attendees."
- "Carry this into tomorrow."
- "Let this disappear."

## Rules

- Usually show after the primary action completes.
- If information is required before participation, state who receives it and why.
- Separate internal app use, logistical requirements, and social visibility.
- Do not convert attendance, interest, or logistical sharing into public identity exposure.
- Choices should be scoped and revocable where the model supports it.

## Data Status

Current implementation does not yet have full DataShareRequest or VisibilityGrant support. Treat this module as design target and future access-layer pressure.
