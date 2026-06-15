# Field Platform Domain Rails

## Purpose

Define the domain separations that implementation agents must preserve before schema, auth, route, and module work begins.

These rails are project-control guidance. They should be reflected in schema, contracts, policies, fixtures, tests, and product context as those surfaces become real.

## Identity And Authority Separation

Keep these concepts separate:

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
- representation ownership or stewardship

Hard rule:

```text
createdBy is never owner, steward, contributor authority, review authority, or publishing authority by default.
```

An account may exist without a public profile. A public profile may expose only a subset of account-held information. Private/local data and public/shared data must be modeled separately.

## Visibility, Publication, And Review

Do not collapse visibility, publishing, and review into one boolean or one overloaded enum.

Minimum separate axes:

```text
visibility_scope:
  private
  steward_visible
  community_visible
  link_visible
  public

publication_status:
  draft
  published
  archived

review_state:
  not_required
  pending_review
  accepted
  rejected
  superseded
```

The names may change, but the separation should not.

## Stewarded Representations

Stewardship is a relationship to a representation or artifact, not an implication of authorship or creation.

Every accepted contribution, proposed change, and relation claim should preserve attribution to the proposing individual even when the stewarded representation is owned or maintained elsewhere.

## Relation Claims And Nudges

User nudges and relation suggestions must be stored as reviewable claims or proposals, not direct edits.

Minimum relation-claim concepts:

- source representation
- target representation
- relation type
- proposer
- rationale
- review state
- reviewer or resolution
- timestamps

## Ways In

Ways-in content is first-class product structure, not garnish.

Model it with real fields such as who something is for, threshold, access, price, experience level, and concrete entry suggestions. Do not hide ways-in semantics inside loose JSON or plain copy once schema work begins.

## Representation Spine

Do not start with one generic mega-entity table.

Use explicit artifact tables for communities, events, offerings, field signals, and other stable artifact types. A thin representation spine is allowed for cross-cutting concerns:

- visibility
- publishing
- review
- stewardship
- attribution
- relation claims

Use JSONB only for genuinely unstable metadata or extension points, not for core visibility, review, publication, stewardship, attribution, relation claims, or ways-in.
