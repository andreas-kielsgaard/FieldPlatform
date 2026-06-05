---
title: Access Layer Overview
layer: access
status: implemented
maturity: implemented but needs review
provenance: migrated
review_state: needs-human-review
approved_by:
approved_at:
approved_commit:
approved_file_hash:
canonical_for:
  - access layer
  - middle layer boundary
related:
  - Data layer overview.md
  - Frontend layer overview.md
  - ../Access layer/Access methods and calculations.md
depends_on:
  - Data layer overview.md
consumed_by:
  - Frontend layer overview.md
implemented_by:
  - ../../Platform data layer/source/access-layer/domain.ts
  - ../../Platform data layer/source/access-layer/platformDomain.ts
  - ../../Platform data layer/docs/OO domain interfaces.md
---

# Access Layer Overview

The access layer is the consistency boundary between stored data and frontend behavior.

It owns:

- domain [access methods](../Access%20layer/Access%20methods%20and%20calculations.md)
- write commands
- read/query methods
- calculated [views](../Frontend/Views%20overview.md)
- recommendation, fit, and explanation calculations
- permission checks
- lifecycle transitions
- consistency rules
- view-specific data packages

The frontend should not duplicate database consistency rules, [calculation logic](../Access%20layer/Access%20methods%20and%20calculations.md), or raw write structures. It should ask for coherent packages and invoke safe commands.

The current implementation is an in-process managed OO access layer, not a separate server. That is acceptable. The responsibility boundary matters more than the deployment shape.

## Current Managed Layer

The managed access layer lives under `Platform data layer/source/access-layer/`.

Main entry points include:

- `createPlatformDomain(...)`
- `platform.users`, `platform.events`, `platform.communities`, `platform.venues`
- `platform.fieldRelations`
- `platform.generatedFields`
- `platform.recommendations`
- `platform.communityHealth`
- `platform.participation`
- `platform.memberships`
- `platform.eventRegistration`
- `platform.eventSuggestions`
- `platform.eventManagement`
- `platform.communityManagement`

Frontend feature code should prefer these managed objects and services. Direct database CRUD is reserved for [dev tools](Development%20tools.md), tests, migrations, and internal implementation work.

## Contract Shape

Each access-layer method or [view](../Frontend/Views%20overview.md) model should define:

- purpose
- input parameters
- returned data shape
- entities read
- entities written
- invariants enforced
- permission and visibility behavior
- errors and empty states
- [user stories](../User%20stories/User%20stories%20overview.md) and [views](../Frontend/Views%20overview.md) that consume it
- implementation links
- maturity

The initial contracts are gathered in [Access methods and calculations](../Access%20layer/Access%20methods%20and%20calculations.md).
