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
depends_on:
  - ../Doctrine/Non-goals and guardrails.md
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
4. Read [General Context Wiki](../README.md), [Core product thesis](../Doctrine/Core%20product%20thesis.md), [Non-goals and guardrails](../Doctrine/Non-goals%20and%20guardrails.md), and the most specific task pages.
5. If a change affects product meaning, use the most specific canonical page. Do not create a duplicate summary.

## Updating Context

- Update the most specific canonical page.
- Link outward instead of redefining another page's concept.
- Keep frontmatter current: `title`, `layer`, `status`, `maturity`, `provenance`, `review_state`, `canonical_for`, `related`, `depends_on`, `consumed_by`, and `implemented_by`.
- Keep specs and implementation aligned. If implementation changes, update affected entity, access, view, module, user-story, or language pages.
- If implementation changes without enough certainty to update the spec, record the mismatch in [Open questions](../Current%20direction/Open%20questions.md).
- Keep UI language separate from internal doctrine and data-model language.
- Mark uncertainty honestly instead of converting it into a buildable contract.
- Keep parked exploration and business hypotheses out of current product direction unless explicitly adopted.

## Reverse-Update Workflow

When a user gives implementation feedback, ask:

- Did a data entity change?
- Did an access method, calculation, permission, or view model change?
- Did a view contract change?
- Did a module or feature change?
- Did a user story change?
- Did copy or language register change?
- Did the implementation reveal a missing concept or broken assumption?

Update the relevant page or add an open question. The goal is that the platform can be generated from the spec, and the spec can be corrected from implementation feedback.

## Guardrails To Preserve

- FieldPlatform supports self-resourcing through field awareness.
- Do not digitize the living field; digitize thresholds where it becomes illegible.
- Help people return to contact with life instead of feeding a digital double.
- Avoid catalogue drift, CRM/surveillance drift, metaphysical UI leakage, and omniscient-platform fantasy.
- FieldRelation is a data/domain primitive, not the primary ordinary UI object.
- ParticipationEdge is person-community belonging.
- Generated fields are computed patterns, not communities.
- Holds explain unclear movement; they are not shame labels.
- Pathways/ways in are grouped next actions.
- Steward review is role-gated and contained.
- Suggestions are contextual clarification, not ownership, marketing, publication, or social pressure.

## Review And Approval

Context pages changed by agents should usually remain `generated/unreviewed` or `needs-human-review` until a human reviews them. Use the local wiki dashboard to find missing metadata, changed-since-approval pages, open questions, parked material, and implementation/spec gaps.

Before committing, merging, or pushing General context changes, make sure the user explicitly requested the context change or has reviewed the proposed meaning. This wiki migration was explicitly requested as a context change.
