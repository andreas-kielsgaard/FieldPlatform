# Review Checklist

## Before Merge

- Task mode stated.
- Affected surfaces listed.
- Checks run.
- Docs or maps updated.
- Debt logged if introduced.
- Experiment logged if provisional.
- Naming impacts considered.
- Policy impacts considered.
- Schema and accessor impacts considered.
- Component and design-system impacts considered.
- Mock and fixture impacts considered.

## Reviewer Prompts

- Did this create a new pattern unnecessarily?
- Did naming drift?
- Did a concept change without its maps changing?
- Did local state absorb a shared concern?
- Did mock data become a hidden contract?
- Did a permission or visibility rule move into local UI logic?
- Did the change introduce unlogged debt or provisional code?

## Post-Change Report Fields

| Field | Notes |
|---|---|
| Primary task mode |  |
| Secondary task modes |  |
| Files changed |  |
| Affected surfaces |  |
| Checks run |  |
| Docs/maps updated |  |
| Debt introduced or removed |  |
| Experiments introduced, promoted, or retired |  |
| Decisions recorded |  |
| Remaining risks or assumptions |  |

## Update Rules

- Update when review process changes.
- Update when repeated review feedback reveals a missing prompt.
- Keep the checklist focused on review behavior, not implementation detail.
