---
title: Design Process And Wayfinding
layer: process
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - design process
  - agent workflow
  - git reporting
related:
  - Context maintenance for agents.md
  - ../Architecture/Product architecture overview.md
  - ../Current direction/Open questions.md
depends_on:
  - ../README.md
consumed_by:
  - ../../AGENTS.md
implemented_by:
---

# Design Process And Wayfinding

FieldPlatform uses a split workflow between planning/advisory thinking and code/execution work. This page preserves the operational process guidance in a wiki-native form.

## Authority Order

1. Current user instruction.
2. Current `General context/` wiki pages.
3. Platform data layer docs and implementation for current interface truth.
4. Mockup-local README/docs for that artifact.
5. Archive only when explicitly requested.

If conflict remains, preserve the uncertainty and report it instead of silently choosing.

## Design Cycle

- Orient: inspect current context, implementation, and unresolved design pressure.
- Frame: name the question and smallest useful artifact.
- Context update: if a durable principle changes, update the most specific canonical page.
- Prototype: build the smallest surface that tests the question.
- Review: browse like a real user; look for confusion, language problems, role confusion, model leakage, and whether the surface feels like orientation or metadata.
- Distill: convert feedback into principles, constraints, and open questions.
- Decide: refine, update data/access, update specs, or start a new focused artifact.

## Choosing A Layer

Update context when durable product grammar, language, data meaning, view behavior, or process guidance changes.

Update the Platform data layer when multiple surfaces need the same entity, relation, calculation, access method, permission, or lifecycle behavior.

Build or revise a mockup when the question is about feel, hierarchy, comprehension, or flow.

Do not build yet when the concept is still philosophical, the input burden is not justified, the platform would need to pretend it knows too much, or proximity/direct action already solves the need better.

## Git Reporting

Completion reports should include branch, commit hash, push status, whether main was touched, conflicts, uncommitted files, functional summary, verification, and whether manual review is still needed.

General context changes require explicit user request or review before commit, merge, or push. This wiki migration was explicitly requested as a context change and should still be reported clearly.
