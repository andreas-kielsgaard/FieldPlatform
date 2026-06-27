# Testing Rails

## Baseline

Use:

- Vitest for policy, domain, contract, fixture, and pure service behavior
- Playwright for a small number of critical browser flows
- Storybook for recurring semantic UI primitives and state vocabulary
- dependency-cruiser and boundary validation for import rules
- Biome and TypeScript for formatting/lint/type evidence
- `change-surface` for changed and affected active source surfaces
- `test-selection` for runner-discovered test relations
- `change-verification` for per-change verification planning
- `repo-health` for whole-repository health summaries
- `depcruise:active-source` for active app and development-tool dependency checks

## Bias

Keep browser tests narrow early. Prefer unit and contract tests for domain rules such as visibility, review transitions, relation-claim validation, ways-in consistency, profile visibility, stewardship authority, and fixture validity.

Do not treat passing tests as proof that product authority or domain placement is correct; use project-control rails and structural-maintenance behavior for those decisions.
