# Visibility, Publication, And Review

## Rule

Do not collapse visibility, publication, and review into one boolean or one overloaded enum.

## Minimum Axes

`visibility_scope`:

- `private`
- `steward_visible`
- `community_visible`
- `link_visible`
- `public`

`publication_status`:

- `draft`
- `published`
- `archived`

`review_state`:

- `not_required`
- `pending_review`
- `accepted`
- `rejected`
- `superseded`

## Placement

These axes should appear consistently in schema, contracts, policy helpers, fixtures, tests, and semantic UI primitives.
