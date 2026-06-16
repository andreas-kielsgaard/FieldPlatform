# Testing Rails

## Baseline

Use:

- Vitest for policy, domain, contract, fixture, and pure service behavior
- Playwright for a small number of critical browser flows
- Storybook for recurring semantic UI primitives and state vocabulary
- dependency-cruiser and boundary validation for import rules
- Biome and TypeScript for formatting/lint/type evidence

## Bias

Keep browser tests narrow early. Prefer unit and contract tests for domain rules such as visibility, review transitions, relation-claim validation, ways-in consistency, profile visibility, stewardship authority, and fixture validity.

Do not treat passing tests as proof that product authority or domain placement is correct; use project-control rails and structural-maintenance behavior for those decisions.
