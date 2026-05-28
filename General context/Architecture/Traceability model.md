---
title: Traceability Model
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
  - traceability
related:
  - Product architecture overview.md
  - Review and approval model.md
depends_on:
  - Product architecture overview.md
consumed_by:
  - ../../Tools/context-wiki
implemented_by:
  - ../../Tools/context-wiki/server.js
  - ../../Tools/context-wiki/public/app.js
---

# Traceability Model

Traceability is how the wiki stays useful as a buildable spec instead of becoming prose piled on prose.

Forward traceability:

`user story -> views -> modules -> access methods -> data entities/calculations -> implementation files`

Reverse traceability:

`data entity -> access methods -> modules/views -> user stories -> implementation files`

## Metadata Fields

Pages should use these fields where useful:

- `canonical_for`: concepts or contracts the page owns.
- `related`: nearby pages that should be read together.
- `depends_on`: pages this page relies on.
- `consumed_by`: pages, views, modules, or tools that consume this page.
- `implemented_by`: source files, mockups, tests, or docs that currently implement or pressure-test the page.

The wiki tool also derives backlinks by scanning Markdown links and frontmatter references.

## Page-Level Expectations

User story pages should name the views involved.

View pages should name modules included, access methods consumed, write commands available, permissions, empty states, and related stories.

Module pages should name parent views, displayed data, user actions, access dependencies, resulting commands/writes, copy rules, visibility conditions, and empty/error states.

Access-layer pages should name methods, inputs, outputs, entities read/written, invariants, permission behavior, and consuming views/modules.

Data-layer pages should name entities, purpose, properties, relationships, invariants, lifecycle/status fields, privacy/visibility concerns, access methods, consuming views/features, and implementation links.

## Practical Rule

When implementation changes because of user feedback, update the relevant spec pages or mark the mismatch in [Open questions](../Current%20direction/Open%20questions.md).

Do not create a summary page that restates another page. Link to the canonical page and add traceability metadata instead.
