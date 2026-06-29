# Project Decision Map

## Purpose

This directory is the human-owned home for mature Field Platform project decisions that source, config, or tools do not already answer.

These files are human-owned advisory context. They may be incomplete, provisional, stale, or lag source/config/tools. They are not Agent OS operating instructions. Agent OS may route agents here, but Agent OS does not own these decisions.

## How To Use

- Do not load every decision file by default.
- First check source, config, package scripts, dependency rules, schemas, migrations, and tests when they directly answer the question.
- Load only the decision file that matches the task.
- If no decision file exists for a product, business, domain, data-model, or deployment question, do not infer an accepted decision from old Agent OS project-control files. Inspect current source/config and report the uncertainty or scoped compromise.

## Decisions

| Need | Load | Notes |
|---|---|---|
| Stack, application architecture, source/generated boundaries, and dependency-boundary intent | `project-decisions/architecture.md` | Exact versions, executable commands, dependency packages, and enforced dependency rules live in source/config/tooling. |
| Testing policy, verification priorities, and check-selection philosophy | `project-decisions/testing-policy.md` | Exact scripts and runner commands live in `package.json` and package-level config. |

## Not Currently Centralized Here

Product, business, domain ontology, data-model, and deployment-provider decisions are intentionally not centralized here yet unless a future human prompt adds mature accepted content.
