---
title: Review And Approval Model
layer: architecture
status: generated/unreviewed
maturity: buildable spec
provenance: agent-generated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - review model
  - approval metadata
related:
  - Traceability model.md
  - ../Maintenance/Context maintenance for agents.md
depends_on:
  - Product architecture overview.md
consumed_by:
  - ../../Tools/context-wiki
implemented_by:
  - ../../Tools/context-wiki/server.js
  - ../../Tools/context-wiki/public/app.js
---

# Review And Approval Model

Review metadata tells future agents what can be trusted, what is draft, and what needs human attention before build work relies on it.

The model is lightweight. Git remains the source for history and diffs. The wiki tool stores only metadata in Markdown frontmatter, not snapshots or a parallel version-control system.

## Status Values

Use a small set:

- `generated/unreviewed`: agent migrated or generated content that needs human review.
- `human-reviewed`: a human has reviewed it, but it is not formally approved as current spec.
- `human-approved`: a human has approved this page as current authority.
- `buildable spec`: concrete enough to implement from.
- `implemented`: implementation exists or mostly exists.
- `parked`: not current product authority, but useful to preserve.
- `stale/deprecated`: preserved as a pointer, retired idea, or historical route.

`maturity` can add a softer shape, such as `conceptual`, `design target`, `buildable spec`, `implemented but needs review`, `parked`, or `deprecated`.

`review_state` should usually be one of:

- `unreviewed`
- `needs-human-review`
- `human-reviewed`
- `human-approved`
- `stale`

## Approval Fields

When a human approves a page, record:

- `approved_by`
- `approved_at`
- `approved_commit`
- `approved_file_hash`

The file hash is used to detect changed-since-approval pages. The current wiki tool can stamp this metadata locally, but human judgment remains external to the tool.

## Dashboard Needs

The review dashboard should show:

- needs human review
- generated or migrated content not yet approved
- changed since approval
- pages missing metadata
- open questions
- buildable specs not implemented
- implemented pages needing spec review
- views without access-layer contracts
- features/modules without parent views
- user stories without linked views
- access methods without linked data entities
- data entities with no access methods
- parked exploration
- business hypotheses
- stale/deprecated pages
- git diff for context/wiki changes where practical

The point is not bureaucracy. The point is to make trust and uncertainty visible.
