# Testing Policy

## Purpose

Record verification priorities for Field Platform work without duplicating executable commands.

Exact commands, package scripts, runner configuration, and dependency versions live in `package.json` and package-level config.

## Policy

Prefer focused Vitest coverage for policy, domain, contract, fixture, and pure service behavior. Use Playwright for a small number of critical browser flows rather than broad early UI automation.

Use Storybook when recurring semantic UI primitives or state vocabulary need visual review. Do not create Storybook work just to satisfy this policy when the substrate is not present or the task does not touch UI primitives.

Use dependency-cruiser and the boundary validation scripts to verify dependency direction when architecture, module boundaries, route imports, persistence access, or shared UI boundaries are affected.

Use the replacement Agent OS support tools to scope verification: `change-surface` for changed and affected active source surfaces, `test-selection` for runner-discovered test relations, `change-verification` for check planning, `repo-health` for broad health, and `depcruise:active-source` for active dependency-boundary checks.

Passing tests do not prove product authority, domain placement, naming, ownership, or architectural fit. Use project decisions, source/config, and structural reasoning for those questions.

When the requested scope leaves a real compromise, do not hide it in a ledger. State it in the final response so the human can choose the next task.
