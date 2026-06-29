# Structural Maintenance Behavior: Maintain Generated Or Tool-Maintained Artifact

## Purpose

Decide how to update a generated, derived, or tool-maintained artifact without mistaking derived output for the primary source of meaning.

This behavior covers provenance: whether an artifact should be maintained directly or through its producing tool, map, source input, or contract.

## Lens Prompts

- Authority: a generated artifact may report authority without being the authority.
- Contract: generated outputs can still promise shape, freshness, and consumer expectations.
- Lifecycle: classify the artifact as active, stale, provisional, deprecated, retired, or tool-maintained.
- Audience: distinguish machine-consumed outputs from human explanations and agent-facing maps.
- Memory: record freshness, maintenance path, or known staleness only when future agents need it.

## Procedure

1. State the artifact and why it may need maintenance.
2. Identify whether it appears manual, generated, derived, tool-maintained, or unknown.
3. Find the producing source, tool contract, map, or instruction surface when available.
4. Use source reads and consumer mapping when generated output has consumers that may rely on shape, freshness, or compatibility.
5. Prefer updating the source or tool path before editing derived output directly.
6. If tool execution is unavailable or out of scope, report the expected maintenance path and any staleness.
7. Add secondary tool-contract or authority behavior if the maintenance path itself is unclear.

## Maintenance Outcomes

Choose one:

- Edit directly because the artifact is manually authoritative.
- Update the source and regenerate or refresh the artifact.
- Update the tool contract or instruction file first.
- Mark stale or deferred because the tool path is unavailable.
- Retire the artifact or remove its authority.

## Stop Or Escalate When

- A generated artifact is being edited as if it owns semantic authority.
- The tool-maintained path is unknown but downstream consumers depend on freshness.
- Manual edits would be overwritten by regeneration.
- The artifact feeds tests, schemas, permissions, public APIs, maps, or agent instructions.

## Memory Updates

Update `prompt-files/agent-attention-system/maps/tool-map.md` only when an explicit Agent OS maintenance task changes active tool routing or execution expectations.

Update relevant maps when generated outputs change durable routing or authority.

Report knowingly stale artifacts or missing generation paths in the final response.

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
