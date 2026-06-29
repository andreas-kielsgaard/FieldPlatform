# Contract Lens

## Purpose

Protect the promises a maintained element makes to its consumers.

## Activates When

- A change alters internal processing, I/O shape, public behavior, error behavior, side effects, timing, ordering, caching, or compatibility.
- A module, component, accessor, schema, fixture, tool contract, instruction, map, or generated index has consumers that rely on its current behavior.
- Existing tests may or may not cover the promised behavior.
- A proposed change changes what downstream consumers should expect.

## Core Distinction

Internal implementation can change freely only while the promised contract still holds.

## Questions

- What does this maintained element promise to consumers?
- Are inputs, outputs, side effects, errors, ordering, or compatibility unchanged?
- Which consumers rely on the current contract?
- Do existing unit tests, contract tests, fixtures, examples, or tool checks cover the changed path?
- If the contract changes, what consumers, maps, tests, docs, or instructions should change with it?
- Is the contract explicit, inferred from tests/examples, or only implied by current usage?

## Evidence To Consider

- Public API, exports, types, schemas, accessors, tool semantic files, fixtures, examples, tests, and consumers.
- Unit tests and contract tests covering changed internal processing or I/O relations.
- Tool evidence from `change-surface`, `test-selection`, and `change-verification` when consumer, coverage, or verification evidence needs to be bounded.
- Generated indexes or maps that describe the maintained element.
- Current usage patterns and failure modes.
- Documentation or instruction files that state expected behavior.

## Decision Outputs

- Contract preserved.
- Contract changed intentionally.
- Contract unclear; define or document before changing.
- Consumers may need migration.
- Tests may need to be added or updated.
- Contract is implementation detail only.
- Temporary compatibility exception; report scoped compromise.

## Stop Or Escalate When

- A consumer-visible promise changes without a migration plan.
- Existing tests miss the changed internal processing or I/O relation and the risk is non-trivial.
- The maintained element has public, generated, cross-boundary, tool, schema, fixture, or instruction consumers.
- The current contract is inferred only from usage and changing it would require guessing.

## Cheap Pass

The change is internal, covered by existing tests or local verification, and inputs, outputs, errors, side effects, ordering, compatibility, and consumers remain unchanged.

## Memory Implication

Update memory when a durable contract is defined, changed, deprecated, made explicit, or when consumer migration expectations become mature project context. Report compatibility compromises in the final response.

