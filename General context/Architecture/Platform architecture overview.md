---
title: Platform Architecture Overview
layer: architecture
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - product architecture
related:
  - Data layer overview.md
  - Access layer overview.md
  - Frontend layer overview.md
  - Traceability model.md
depends_on:
  - ../Principles/What FieldPlatform is.md
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../Maintenance/Context maintenance for agents.md
implemented_by:
---

# Platform Architecture Overview

Platform architecture describes the product structure.

It covers the platform, not the documentation system.

## Overview

FieldPlatform translates its purpose into concrete product parts.

Purpose: help [people](../Data%20layer/Person%20entity.md) and [communities](../Data%20layer/Community%20entity.md) orient, join, ask, offer, care, and move when the surrounding field has become hard to read.

The product does this through a small set of [concepts](../Ontology/Product%20ontology.md), surfaces, [modules](../Frontend/Modules%20overview.md), [access methods](../Access%20layer/Access%20methods%20and%20calculations.md), data entities, and review rules.

## From Purpose To Product

Read the product structure in this order:

- [Principles](../Principles/What%20FieldPlatform%20is.md): what the platform is, the design philosophy behind it, and what it must not become.
- [Product concepts](../Ontology/Product%20ontology.md): [person](../Data%20layer/Person%20entity.md), [community](../Data%20layer/Community%20entity.md), [event](../Data%20layer/Event%20offering%20entity.md) or [offering](../Data%20layer/Event%20offering%20entity.md), [venue](../Data%20layer/Venue%20entity.md), relation, [generated field](../Data%20layer/GeneratedField.md), [hold](../Ontology/Hold%20unclear%20point.md), and [pathway](../Ontology/Pathway%20ways%20in.md).
- [User stories](../User%20stories/User%20stories%20overview.md): what someone is trying to understand or do.
- [Views](../Frontend/Views%20overview.md): the main surfaces where someone reads, decides, or acts.
- [Modules](../Frontend/Modules%20overview.md): reusable pieces inside [views](../Frontend/Views%20overview.md), such as [Ways In](../Ontology/Pathway%20ways%20in.md) or [Contextual Disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md).
- [Access layer](Access%20layer%20overview.md): safe reads, writes, calculations, permissions, lifecycle transitions, and filtered outputs for [views](../Frontend/Views%20overview.md).
- [Data layer](Data%20layer%20overview.md): persistent entities, relationships, invariants, visibility concerns, and implementation links.
- Implementation: source files, mockups, tests, and [dev tools](Development%20tools.md) that make the spec concrete.

## Platform Structure

Current product areas:

- Orientation: a [person](../Data%20layer/Person%20entity.md) sees what they are part of, what is near them, and what might be available next.
- [Ways in](../Ontology/Pathway%20ways%20in.md): the product shows appropriate next steps, such as follow, attend, ask, request access, or talk to a steward.
- Relation review: stewards can review suggested or calculated connections where [community](../Data%20layer/Community%20entity.md) care is needed.
- [Contextual disclosure](../Access%20layer/Contextual%20visibility%20and%20disclosure.md): information becomes visible only when it is useful, appropriate, and within scope.
- [Self-resourcing](../Modules/Self-resourcing%20Entry%20module.md) prompts: the product helps [people](../Data%20layer/Person%20entity.md) name what they arrive with, what they need, what they can offer, and what should disappear.
- Generated fields: the platform may calculate useful patterns, but these patterns do not speak for [communities](../Data%20layer/Community%20entity.md).

## From Concept To Implementation

General context is design authority, but it is not implementation syntax.

A [concept](../Ontology/Product%20ontology.md) may become UI copy, surface behavior, query or [view](../Frontend/Views%20overview.md) filtering, lifecycle state, visibility rule, calculation, permission behavior, stored record, dev-tool inspection, [future exploration](../Parked/Future%20exploration%20notes.md), or no implementation yet.

The question is: what form is useful and justified right now?

## Current Implementation

The current repo has three main implementation areas:

- `General context/`: canonical product/design/spec Markdown.
- `Platform data layer/`: JSON snapshot database, calculation layer, managed OO [access layer](Access%20layer%20overview.md), browser bundle, tests, and dev tool.
- `Mockups/`: exploratory static UI surfaces that test product pressure but do not become authority by themselves.

Frontend code should prefer the managed [access layer](Access%20layer%20overview.md) in `Platform data layer/source/access-layer/`. Direct storage access is for [dev tools](Development%20tools.md), tests, migrations, and internal implementation work.

## Buildable Direction

The product specs should progressively support [traceability](Traceability%20model.md):

`user story -> views -> modules -> access methods -> data entities/calculations -> implementation files`

and reverse [traceability](Traceability%20model.md):

`data entity -> access methods -> modules/views -> user stories -> implementation files`

Many pages are intentionally marked `generated/unreviewed` or `conceptual` until a human reviews them and the implementation catches up. Agents may still use the current context unless a page marks itself parked, stale, or explicitly uncertain.
