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

A module is a functional visible or interactive unit inside a [view](Views%20overview.md). Modules consume access-layer data or commands and present them in user-facing language.

Initial canonical modules:

- [Ways In module](../Modules/Ways%20In%20module.md)
- [Suggested Connections Review module](../Modules/Suggested%20Connections%20Review%20module.md)
- [Contextual Disclosure module](../Modules/Contextual%20Disclosure%20module.md)
- [Self-resourcing Entry module](../Modules/Self-resourcing%20Entry%20module.md)

Other likely modules include known members, upcoming [community](../Data%20layer/Community%20entity.md) [events](../Data%20layer/Event%20offering%20entity.md), entry guidance, relationship summary, related [communities](../Data%20layer/Community%20entity.md), [generated field](../Data%20layer/GeneratedField.md) evidence, [event](../Data%20layer/Event%20offering%20entity.md) facts, recommendation explanation, creator fit, and ask-a-steward surfaces.

## Module Spec Template

Each module should define:

- feature/module name
- parent [views](Views%20overview.md)
- purpose
- displayed data
- access-layer dependencies
- [user](../Data%20layer/Person%20entity.md) actions
- resulting commands/writes
- [copy rules](Language%20and%20copy%20rules.md)
- visibility/permission conditions
- empty/error states
- related [user stories](../User%20stories/User%20stories%20overview.md)
- maturity

Modules should not duplicate calculations. They should render access-layer [view](Views%20overview.md) models or invoke safe commands.
