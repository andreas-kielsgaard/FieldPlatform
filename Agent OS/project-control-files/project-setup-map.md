# Project Setup Map

## Purpose

Route agents to Field Platform project setup guidance without turning this map into a long decision document.

Load this map for architecture-shaping, schema, feature, boundary, testing, deployment, or structural-maintenance tasks. Then load only the `project-setup/` rail or existing project-control file that matches the task.

## Lookup

| Need | Load |
|---|---|
| How the base Agent OS is woven into this project | `project-setup/project-weaving.md` |
| Accepted stack and app architecture | `project-setup/stack-architecture.md` and `technology-architecture-map.md` |
| Product identity and MVP guardrails | `project-setup/product-rails.md` and `field-platform-product-rails.md` |
| Domain separations and authority rules | `project-setup/domain-rails.md` and `field-platform-domain-rails.md` |
| Visibility, publication, and review states | `project-setup/visibility-review-publication-model.md` |
| Relation claims and nudges | `project-setup/relation-claims-model.md` |
| Database and data-model rails | `project-setup/data-model-rails.md` |
| Testing expectations | `project-setup/testing-rails.md` |
| Local and deployable environment rails | `project-setup/deployment-rails.md` |
| Generated project evidence and freshness | `project-setup/generated-evidence-rules.md` |

## Rules

- This map routes; `project-setup/` files carry the project-specific content.
- Existing project-control files remain valid setup memory until a later human-initiated maintenance task retires or promotes them.
- Generated project indexes are evidence. They do not replace source files, project-control rails, task modes, structural-maintenance behavior, or human decisions.
