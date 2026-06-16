# Recursive Map Maintenance Review

## Status

Deferred until the full operating-system review.

## Note

The report partially covers recursive maintenance through update triggers, docs freshness checks, generated map refreshes, and repeated-correction capture.

After the initial setup is complete, perform a more thorough review of the operating system and decide how agents should maintain living maps, generated structural indexes, scoped instructions, and review checklists over time.

## Critical Reflection From Prompt

Autonomous recursive maintenance should not be the default operating model. It risks collapsing three different activities into one: noticing that the Agent OS could improve, deciding that the improvement is valid, and changing the active instruction system future agents will obey.

A safer default is diagnostic reflection with a proposal boundary. Agents may identify stale maps, conflicting authority, missing tool contracts, recurring review misses, overgrown scaffolding, or task-mode/lens gaps, but those observations should normally be written as migration notes or review proposals. The actual Agent OS change process should be explicitly initiated by a human.

Useful reflective scenarios still exist:

- prompt-end documentation reflection required by the migration control layer
- repeated-correction capture after the same agent mistake recurs
- review-before-commit checks that reveal stale or conflicting guidance
- generated or indexed artifact freshness review
- authority conflicts between human-facing docs, agent instructions, generated indexes, and tool contracts
- context-loading or task-mode friction that suggests the scaffold itself needs adjustment

Recommended review question for the later operating-system pass: should there be a dedicated Agent OS reflection or maintenance-proposal mode whose default output is a note, not an active scaffold edit, and whose promotion path requires a human-started maintenance task?
