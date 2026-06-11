# Provenance Lens Review

## Status

Deferred. Do not implement a provenance lens yet.

## Current Reasoning

The provenance idea contains a useful maintenance signal, but it may not be operable as a full reasoning lens.

The Agent OS is intended to let agents take strong co-ownership of the codebase and maintained repository artifacts, with humans holding final responsibility. A broad provenance lens could accidentally imply that agents should treat artifacts as externally owned, off-limits, or categorically less maintainable because of who or what created them.

Many artifacts also do not encode whether they are human-authored, agent-authored, generated, tool-maintained, or manually patched after generation. Asking the agent to reason from provenance may therefore produce false confidence or unnecessary ceremony.

## Useful Part To Preserve

The operable concern is maintenance path:

- Is this artifact manually authoritative?
- Is it generated, indexed, derived, or tool-maintained?
- Would direct editing be overwritten or create drift?
- Is the source of truth somewhere else?
- Should maintenance happen through a tool, script, map, source input, or contract?

This concern is currently better represented by:

- `Authority` lens, for whether the artifact defines or merely reports a rule.
- `Contract` lens, for promised shape, outputs, consumers, and tests.
- `Lifecycle` lens, for active, stale, provisional, deprecated, or retired status.
- `Maintain Generated Or Indexed Artifact` behavior, for choosing the maintenance path.
- Placeholder `artifact-maintenance-path` tool, for bounded evidence about generated or tool-maintained artifacts.

## Deferred Review Question

Revisit a provenance lens only if recurring work shows that authority, contract, lifecycle, and `artifact-maintenance-path` evidence are insufficient.

A future provenance lens would need to avoid proving authorship. It should focus only on operational maintenance constraints that are visible from repository evidence.
