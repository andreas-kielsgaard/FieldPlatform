---
title: Context Maintenance For Agents
layer: process
status: generated/unreviewed
maturity: buildable spec
provenance: agent-generated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - agent maintenance
  - reverse-update workflow
related:
  - ../README.md
  - ../Architecture/Traceability model.md
  - ../Architecture/Review and approval model.md
  - Product guardrails for agents.md
depends_on:
  - ../Principles/What FieldPlatform should not become.md
consumed_by:
  - ../../AGENTS.md
  - ../../REPOSITORY_MAP.md
implemented_by:
  - ../../Tools/context-wiki
---

# Context Maintenance For Agents

`General context/` is the canonical design/product/spec source. The local context wiki app is a rendering, review, and editing tool over these Markdown files. It is not the source of truth.

## Before Editing

1. Run `git status --short --branch`.
2. Treat existing changes as user-owned.
3. Read `Wiki Goal Prompt` when the task concerns the context wiki or spec system.
4. Read [General Context Wiki](../README.md), [What FieldPlatform is](../Principles/What%20FieldPlatform%20is.md), [Living field principles](../Principles/Living%20field%20principles.md), [How tools like this go wrong](../Principles/What%20FieldPlatform%20should%20not%20become.md), [Product guardrails for agents](Product%20guardrails%20for%20agents.md), and the most specific task pages.
5. If a change affects product meaning, use the most specific canonical page. Do not create a duplicate summary.

## Updating Context

- Update the most specific canonical page.
- Link outward instead of redefining another page's [concept](../Ontology/Product%20ontology.md).
- Keep frontmatter current: `title`, `layer`, `status`, `maturity`, `provenance`, `review_state`, `canonical_for`, `related`, `depends_on`, `consumed_by`, and `implemented_by`.
- Keep specs and implementation aligned. If implementation changes, update affected entity, access, [view](../Frontend/Views%20overview.md), [module](../Frontend/Modules%20overview.md), user-story, or language pages.
- If implementation changes without enough certainty to update the spec, record the mismatch in [Open questions](../Current%20direction/Open%20questions.md).
- Keep UI language separate from internal [principles](../Principles/What%20FieldPlatform%20is.md) and data-model language.
- Mark uncertainty honestly instead of converting it into a buildable contract.
- Keep parked exploration and pilot/resourcing hypotheses out of current product direction unless explicitly adopted.

## Manual Tags

Use ordinary Markdown links as the manual tag format.

When a word or phrase intentionally refers to another wiki page, link that phrase to the page. The context wiki renders those internal links as in-text tags with previews.

Do not rely on reader-side auto-tagging. If a word is only ordinary language, leave it unlinked. Use editor suggestions as prompts to consider, not as authority.

Review comments use the inline form `{{comment: comment text | highlighted text}}`. The wiki renders them as blue highlights with hover previews. Resolve or remove these markers during human review.

## Reverse-Update Workflow

When a [user](../Data%20layer/Person%20entity.md) gives implementation feedback, ask:

- Did a data entity change?
- Did an access method, calculation, permission, or [view](../Frontend/Views%20overview.md) model change?
- Did a [view](../Frontend/Views%20overview.md) contract change?
- Did a [module](../Frontend/Modules%20overview.md) or feature change?
- Did a [user story](../User%20stories/User%20stories%20overview.md) change?
- Did copy or [language register](../Frontend/Language%20and%20copy%20rules.md) change?
- Did the implementation reveal a missing [concept](../Ontology/Product%20ontology.md) or broken assumption?

Update the relevant page or add an open question. The goal is that the platform can be generated from the spec, and the spec can be corrected from implementation feedback.

## Guardrails To Preserve

Use [Product guardrails for agents](Product%20guardrails%20for%20agents.md) when a change might affect product meaning, data representation, access behavior, review workflow, interface language, or product boundaries.

The short version: FieldPlatform supports [self-resourcing through field awareness](../Principles/What%20FieldPlatform%20is.md). Do not digitize the [living field](../Principles/Living%20field%20principles.md); digitize thresholds where it becomes hard to read. Avoid catalogue drift, CRM/surveillance drift, metaphysical UI leakage, and omniscient-platform fantasy.

## Review And Approval

Context pages changed by agents should usually remain `generated/unreviewed` or `needs-human-review` until a human reviews them. Agents should still treat current, non-parked, non-deprecated General context pages as trusted project context. Use the local wiki dashboard to find missing metadata, changed-since-approval pages, [open questions](../Current%20direction/Open%20questions.md), parked material, and implementation/spec gaps.

Before committing, merging, or pushing General context changes, make sure the [user](../Data%20layer/Person%20entity.md) explicitly requested the context change or has reviewed the proposed meaning. This wiki migration was explicitly requested as a context change.
