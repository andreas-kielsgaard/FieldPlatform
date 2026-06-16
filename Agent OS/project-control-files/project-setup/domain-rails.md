# Domain Rails

## Hard Separations

Keep these concepts separate in schema, contracts, policy, fixtures, tests, and UI language:

- authentication
- account
- profile
- contributor attribution
- steward
- publisher
- stewardship authority
- review authority
- visibility policy
- publishing status
- representation stewardship or ownership

`createdBy` is never owner, steward, contributor authority, review authority, or publishing authority by default.

An account may exist without a public profile. A public profile may expose only a subset of account-held information.

Use `../field-platform-domain-rails.md` for the fuller domain guardrails.
