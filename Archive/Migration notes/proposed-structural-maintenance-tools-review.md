# Structural-Maintenance Tool Placeholder Review

## Status

Placeholder contracts added; implementation still pending.

The tool IDs below have instruction files under grouped subfolders of `Agent operating system migration/docs/agent/tools/` and empty script placeholders under matching grouped subfolders of `Agent operating system migration/tools/agent/`.

Implementation notes for this pass live under `Agent operating system migration/tools/implementation-notes/authority-and-contracts/`.

`Agent operating system migration/docs/agent/tools/tooling-map.md` is the logical tool registry. Logical tool IDs should resolve through that map before reaching grouped tool instruction files.

## Purpose

The structural-maintenance layer should rely on bounded tool outputs where possible instead of asking agents to ingest broad repository context for every structural decision.

These tools are proposed to support contract, authority, audience, and maintenance-path reasoning without making those concerns heavy prompt-only rules.

## Placeholder Tool: `contract-impact`

### Intended Use

Identify likely consumers, tests, fixtures, examples, docs, maps, and instructions affected by a change to a maintained element's promised behavior.

### Inputs

- Target maintained element path, symbol, route, map entry, instruction file, tool ID, schema object, fixture, or generated index.
- Optional change description.
- Optional contract dimensions to check: inputs, outputs, errors, side effects, ordering, timing, compatibility, public behavior, or supported examples.

### Expected Output

- Direct consumers.
- Likely indirect consumers.
- Existing tests and fixtures covering the target.
- Documentation, maps, or instructions that state expected behavior.
- Contract dimensions that appear affected.
- Gaps where consumer or test evidence is uncertain.

### Does Not Achieve

- It does not decide whether the contract should change.
- It does not guarantee complete dynamic usage discovery.
- It does not replace human or agent judgment about intended behavior.

## Placeholder Tool: `contract-test-coverage`

### Intended Use

Check whether existing tests cover changed internal processing and consumer-visible I/O relations for a maintained element.

### Inputs

- Target maintained element.
- Optional changed paths, methods, functions, schema fields, fixture keys, instruction sections, or tool outputs.
- Optional expected behavior summary.

### Expected Output

- Relevant unit tests.
- Relevant contract, integration, fixture, scenario, or tool-output tests.
- Covered contract dimensions.
- Uncovered or weakly covered contract dimensions.
- Candidate test surfaces to update or add.

### Does Not Achieve

- It does not assert tests are sufficient for product correctness.
- It does not weaken tests or update tests automatically.
- It does not infer intended behavior when requirements are ambiguous.

## Placeholder Tool: `authority-surface-search`

### Intended Use

Find and classify where a rule, convention, source-of-truth statement, or expectation appears across maintained artifacts.

### Inputs

- Term, concept, rule summary, file path, or tool ID.
- Optional surface filters: instructions, maps, README files, migration notes, tests, schemas, fixtures, generated indexes, tool instructions, product docs, or implementation artifacts.

### Expected Output

- Matching surfaces grouped by likely role: authoritative, explanatory, implementation, generated/derived, test expectation, provisional, stale, or unclear.
- Conflicts or duplicated authority candidates.
- Suggested authoritative surface candidates for review.

### Does Not Achieve

- It does not make an authority decision.
- It does not resolve conflicting active instructions.
- It does not prove provenance or ownership when artifacts do not encode that metadata.

## Placeholder Tool: `audience-surface-check`

### Intended Use

Identify whether maintained content belongs in agent-facing instructions, human-facing documentation, product copy, developer notes, tests, examples, generated output, or migration-only notes.

### Inputs

- File path or text range.
- Optional intended audience.
- Optional loading context, such as task mode, structural-maintenance behavior, README, migration note, or tool instruction.

### Expected Output

- Likely audience classification.
- Agent-critical guidance found in human-facing surfaces.
- Human-only explanation found in runtime prompt surfaces.
- Suggested target surface type for moved or restated content.

### Does Not Achieve

- It does not rewrite the content.
- It does not decide product copy.
- It does not override active instruction hierarchy.

## Placeholder Tool: `artifact-maintenance-path`

### Intended Use

Identify whether an artifact appears manually authoritative, generated, indexed, derived, tool-maintained, stale, or unknown, then suggest the appropriate maintenance path.

This tool captures the operable part of the provenance concern without requiring a broad provenance lens.

### Inputs

- Artifact path.
- Optional known producer, tool ID, source map, index directory, or expected output shape.

### Expected Output

- Maintenance classification: manual, generated, indexed, derived, tool-maintained, stale, unknown.
- Likely source or producer when discoverable.
- Whether direct editing appears safe.
- Suggested maintenance path: edit source, run tool, update tool contract, update map, mark stale, or request review.
- Downstream consumers that may rely on freshness.

### Does Not Achieve

- It does not prove authorship or project ownership.
- It does not prevent manual override when a maintainer explicitly chooses it.
- It does not replace the authority lens; generated artifacts can report authoritative data without owning semantic authority.

## Review Questions

- Are these placeholder tool contracts correctly scoped before implementation begins?
- Should `contract-impact` and `contract-test-coverage` be separate tools, or one contract-review tool with two output sections?
- Should `artifact-maintenance-path` be named around maintenance path rather than provenance to avoid overclaiming?
- Which placeholder tools should become mandatory for specific structural-maintenance behaviors once implemented?
- What minimum output schema would make these tools useful without forcing large prompt ingestion?
