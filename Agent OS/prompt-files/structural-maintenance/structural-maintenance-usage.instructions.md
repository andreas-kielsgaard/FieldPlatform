# Structural Maintenance Usage Instructions

## Purpose

Use this layer when a task raises a concrete structural decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority.

Task modes classify the kind of work and the affected control surfaces. Structural maintenance offers judgment frames for placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, and authority decisions inside that work.

This applies at any granularity: inside an existing artifact, across files, across folders, across platform components, or across agent operating-system surfaces.

## Entry Cue

Enter structural maintenance when selected task modes or working evidence raise a concrete question about any of these triggers:

- placement or ownership of a maintained element
- boundary or interface responsibility
- lifecycle, promotion, deprecation, or pruning
- naming, concept, or ontology authority
- reuse, near-match, duplication, extraction, or centralization
- consumer contract, audience, or maintenance path
- source-of-truth authority

Use this layer as a cue before deciding where behavior, state, effects, responsibilities, concepts, names, examples, checks, source-of-truth statements, contracts, audience-specific guidance, maintenance paths, or authority should live.

Use this layer when adding, moving, expanding, splitting, centralizing, renaming, promoting, demoting, deprecating, or trimming durable maintained elements could alter their long-term structure or meaning.

Maintained elements include code, components, functions, hooks, schemas, accessors, fixtures, examples, tests, maps, ledgers, agent instructions, tool contracts, and documentation when they carry source-of-truth meaning.

For small local edits, use only the behavior-map row that matches the structural question. Avoid loading unrelated behavior files.

## Lightweight Context Loading

Avoid loading all behavior files, lens files, maps, ledgers, skill files, or tool semantic files up front.

Behavior files are the runtime prompt surface for selected structural decisions. Lens files are reference definitions and maintenance surfaces. Skill files are optional operational drivers. Tool semantic files are deterministic evidence contracts. Maps and ledgers are memory surfaces.

Select one primary structural-maintenance behavior for the structural decision being made. Add secondary behaviors only when the selected behavior's procedure, stop/escalation rules, or implementation evidence reveals another structural decision.

Use the compact lens prompts inside selected behavior files for ordinary execution.

Open full lens files only when:

- the compact lens prompt is insufficient
- a stop or escalation rule depends on fuller lens guidance
- lens guidance itself is being edited
- a deeper review explicitly depends on the full lens definition

## Operating Chain

1. Select task modes through `prompt-files/task-modes/task-mode-usage.instructions.md`.
2. If the task raises a placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decision, read `behavior-map.md`.
3. Use the behavior map to select one primary structural-maintenance behavior.
4. Add secondary behaviors only when the primary behavior reveals another structural decision.
5. Read only selected behavior files.
6. Use maps, ledgers, skill files, tool semantic files, generated-index slices, and full lens files only when selected behavior files suggest deeper evidence, memory updates, or clarification.
7. Resolve skill IDs through `prompt-files/skills/skill-map.md` when operational choreography or reasoning workflow support is useful.
8. Resolve deterministic tool IDs through `prompt-files/tools/tool-map.md` when bounded evidence or index refresh is useful.
9. Update maps, ledgers, or structural indexes only when the behavior map or selected behavior indicates a durable memory need, subject to the Agent OS self-update gate.

## Decision Declaration

For non-trivial structural decisions, include:

```text
Structural maintenance decision:
Primary behavior file:
Secondary behavior files:
Skill support:
Tool or index support:
Memory surfaces affected:
```

## Boundary

This layer does not replace task modes, product authority, or technology architecture guidance.

Tool-maintained indexes under `tool-maintained-files/indexes/` should be accessed as bounded evidence surfaces, normally through skills, tools, or narrow slices, not full prompt ingestion.

It exists to keep maintained repository structure deliberate while allowing code, docs, maps, tools, and instructions to grow organically.
