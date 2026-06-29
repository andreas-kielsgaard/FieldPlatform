# Review Checklist

## Before Merge

- Task mode considered; state only if useful.
- Affected surfaces listed when meaningful.
- Checks run or skipped with reason.
- Durable context updated only when required.
- Real scoped compromises reported if introduced.
- Provisional work or uncertainty reported when relevant.
- Naming, policy, schema, accessor, component, mock, and fixture impacts considered when in scope.

## Reviewer Prompts

- Did this create a new pattern unnecessarily?
- Did naming drift?
- Did a concept change without its owning source/config/test surfaces changing?
- Did local state absorb a shared concern?
- Did mock data become a hidden contract?
- Did a permission or visibility rule move into local UI logic?
- Did the change introduce unacknowledged compromise or provisional code?

## Compact Completion Summary Fields

Use only fields that help the final response.

| Field | Notes |
|---|---|
| Files changed |  |
| Affected surfaces |  |
| Checks run |  |
| Durable context updated |  |
| Scoped compromises |  |
| Provisional work or uncertainty |  |
| Remaining risks or assumptions |  |

## Update Rules

- Update when review process changes.
- Update when repeated review feedback reveals a missing prompt.
- Keep the checklist focused on review behavior, not implementation detail.
