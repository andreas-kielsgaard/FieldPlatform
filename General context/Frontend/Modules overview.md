---
title: Modules Overview
layer: frontend
status: generated/unreviewed
maturity: design target
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - modules
  - feature modules
related:
  - Views overview.md
  - Surface grammar.md
  - ../Modules/Ways In module.md
depends_on:
  - Views overview.md
consumed_by:
  - ../Architecture/Traceability model.md
implemented_by:
---

# Modules Overview

A module is a functional visible or interactive unit inside a view. Modules consume access-layer data or commands and present them in user-facing language.

Initial canonical modules:

- [Ways In module](../Modules/Ways%20In%20module.md)
- [Suggested Connections Review module](../Modules/Suggested%20Connections%20Review%20module.md)
- [Contextual Disclosure module](../Modules/Contextual%20Disclosure%20module.md)

Other likely modules include known members, upcoming community events, entry guidance, relationship summary, related communities, generated field evidence, event facts, recommendation explanation, creator fit, ask a steward, care needs, field board items, and digestion/carry-forward prompts.

## Module Spec Template

Each module should define:

- feature/module name
- parent views
- purpose
- displayed data
- access-layer dependencies
- user actions
- resulting commands/writes
- copy rules
- visibility/permission conditions
- empty/error states
- related user stories
- maturity

Modules should not duplicate calculations. They should render access-layer view models or invoke safe commands.
