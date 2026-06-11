# Audience Lens

## Purpose

Keep maintained content in the right surface for its intended reader or executor.

## Activates When

- A change affects agent instructions, human documentation, product copy, developer notes, migration notes, tests, examples, maps, or tool output.
- Guidance may be useful but may belong to a different audience.
- Agent-critical behavior is being written in human-facing prose.
- Human explanation risks becoming runtime prompt burden.

## Core Distinction

Useful to know is not the same as useful to load during execution.

## Questions

- Who is the intended audience: agent, human maintainer, product user, developer, tool, test, or future migration reviewer?
- Should this content be runtime instruction, human explanation, example, contract, generated output, or temporary note?
- Does an agent need this before acting, only when selected by a mode/behavior, or only during review?
- Does the text introduce prompt burden without changing behavior?
- Should human-facing docs point to agent-facing authority instead of carrying rules themselves?

## Evidence To Consider

- README files, migration notes, `AGENTS.md`, task-mode files, structural-maintenance behavior files, maps, ledgers, tool instruction files, tests, examples, and product copy.
- Tool evidence from `audience-surface-check` when the audience boundary is unclear or content appears misplaced.
- Current loading chain and selected task modes or behaviors.
- Whether the content is needed for ordinary execution, deeper review, or human onboarding.

## Decision Outputs

- Agent-facing instruction.
- Human-facing documentation.
- Product-facing copy.
- Developer note.
- Migration-only note.
- Tool output or generated artifact.
- Example or test fixture.

## Stop Or Escalate When

- Agent-critical behavior would exist only in README or informal notes.
- Human-facing explanation is being added to active runtime prompts without operational need.
- Product copy, developer guidance, and agent instruction are being mixed.
- The intended audience cannot be stated.

## Cheap Pass

The artifact audience is already clear and the edit does not change who should consume, execute, or maintain the content.

## Memory Implication

Update memory when content moves between audience surfaces, agent-critical guidance is promoted out of human prose, or a new audience boundary becomes a durable convention.
