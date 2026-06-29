# Change Impact Checklists

Use these as quick prompts, not exhaustive requirements. Prefer source/config/tooling, `rg`, active replacement tools, and targeted checks over broad documentation churn.

## Domain Concept Change

- Source/config/test surfaces that encode the concept.
- Schema, contracts, validators, fixtures, and persistence source.
- Routes, UI labels, copy, mocks, and tests.
- Advisory project decisions only when mature human-owned context is directly relevant.

## Shared Component Change

- Shared UI source, styles, primitives, stories, examples, and consumers found with `rg`.
- `change-surface` for affected source.
- `test-selection` and `change-verification` for verification planning.
- Final response notes for scoped compromises or provisional status.

## Permission Change

- Policy predicates, server guards, guarded screens/components, fixtures, and tests.
- Source literals and call sites found with `rg`.
- Dependency boundaries when policy ownership or UI access changes.

## Route Or Page Change

- Route config, route modules, page shell, module public entrypoints, policy/source checks, URL state, and tests.
- `change-surface` for affected source.
- `change-verification` for final check selection.

## Mock Data Change

- Fixture/mock source, schema/contracts, validators, stories, examples, and tests.
- Source occurrences found with `rg`.
- Known realism caveats reported in the final response when relevant.

## Refactor

- Imports and consumers found with `rg`.
- `change-surface` and dependency-cruiser output.
- Tests and `change-verification`.
- Project decisions only when a mature human-owned convention changed.
- Final response if staying in scope leaves a real compromise.

## Update Rules

- Update when a recurring review miss appears.
- Update when a new task family needs explicit impact checks.
- Keep each checklist short enough to use during real work.
