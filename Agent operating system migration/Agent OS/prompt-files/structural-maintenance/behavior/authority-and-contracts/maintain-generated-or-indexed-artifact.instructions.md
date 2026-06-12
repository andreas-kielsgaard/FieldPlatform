# Structural Maintenance Behavior: Maintain Generated Or Indexed Artifact

## Purpose

Decide how to update a generated, derived, indexed, or tool-maintained artifact without mistaking derived output for the primary source of meaning.

This behavior covers the operable part of provenance: not who "owns" the codebase, but whether an artifact should be maintained directly or through its producing tool, map, source input, or contract.

## Lens Prompts

- Authority: a generated or indexed artifact may report authority without being the authority.
- Contract: generated outputs and indexes still promise shape, freshness, and consumer expectations.
- Lifecycle: classify the artifact as active, stale, provisional, deprecated, retired, or tool-maintained.
- Audience: distinguish machine-consumed indexes from human explanations and agent-facing maps.
- Memory: record freshness, maintenance path, or known staleness only when future agents need it.

## Procedure

1. State the artifact and why it may need maintenance.
2. Identify whether it appears manual, generated, indexed, derived, tool-maintained, or unknown.
3. Use `artifact-query` when repository evidence is needed for generated markers, producer scripts, tool contracts, freshness, or direct-edit safety.
4. Find the producing source, tool contract, map, or instruction surface when available.
5. Use `consumer-impact-preview` when generated or indexed output has consumers that may rely on shape, freshness, or compatibility.
6. Prefer updating the source or tool path before editing derived output directly.
7. If tool execution is unavailable or out of scope, record the expected maintenance path and any staleness.
8. Add secondary tool-contract or authority behavior if the maintenance path itself is unclear.

## Maintenance Outcomes

Choose one:

- Edit directly because the artifact is manually authoritative.
- Update the source and regenerate or refresh the artifact.
- Update the tool contract or instruction file first.
- Mark stale or deferred because the tool path is unavailable.
- Retire the artifact or remove its authority.

## Stop Or Escalate When

- A generated or indexed artifact is being edited as if it owns semantic authority.
- The tool-maintained path is unknown but downstream consumers depend on freshness.
- Manual edits would be overwritten by regeneration.
- The artifact feeds tests, schemas, permissions, public APIs, maps, or agent instructions.

## Memory Updates

Update `prompt-files/tools/tool-map.md` or tool semantic files when the maintenance path changes tool routing or execution expectations.

Update relevant maps when generated/indexed outputs change durable routing or authority.

Update `known-debt.md` when an artifact is knowingly stale or a generation path is missing.

## Completion Output

```text
Artifact:
Maintenance classification:
Producer/tool path:
Direct edit allowed? yes/no/uncertain
Contract/freshness impact:
Memory updated:
Remaining uncertainty:
```


