# Structural Maintenance Lens Map

## Purpose

Define the portable reasoning lenses available to the structural-maintenance layer.

A lens is not a task mode, checklist, behavior, map, or tool. A lens is a reusable reasoning frame that helps an agent decide what kind of distinction matters during a structural decision.

## Lens Use

Use lenses to narrow attention, not to expand every task into full architectural review.

This file is an inventory and maintenance map, not a lens decision map. Structural-maintenance behavior files should refer to relevant lenses directly when that wiring is reviewed.

Lens files are full reference definitions and maintenance surfaces, not default runtime context. During ordinary structural-maintenance work, use the compact lens prompts inside selected behavior files.

Open full lens files only when a compact lens prompt is insufficient, a stop or escalation rule depends on fuller lens guidance, lens guidance itself is being edited, or a deeper review explicitly depends on the full lens definition.

Each lens should help the agent:

- notice a relevant distinction
- seek the right kind of evidence
- avoid a known structural-maintenance failure mode
- produce a bounded decision output
- decide whether durable project memory may need updating

## Lens Inventory

| Lens | File | Core concern |
|---|---|---|
| Intent | `lenses/intent-lens.md` | Classify what the change is actually trying to make true. |
| Ownership | `lenses/ownership-lens.md` | Find the narrowest rightful owner of behavior. |
| Boundary | `lenses/boundary-lens.md` | Protect dependency direction and interface clarity. |
| Reuse | `lenses/reuse-lens.md` | Decide whether existing functionality should be reused, composed, extended, or avoided. |
| Near-Match | `lenses/near-match-lens.md` | Handle almost-right similarities without corrupting scope. |
| Duplication | `lenses/duplication-lens.md` | Distinguish duplicated semantics from similar shape. |
| Naming/Ontology | `lenses/naming-ontology-lens.md` | Treat vocabulary as architecture. |
| Data/State/Effect | `lenses/data-state-effect-lens.md` | Clarify ownership of data, state, derivation, side effects, and flow. |
| Contract | `lenses/contract-lens.md` | Protect promised inputs, outputs, behavior, side effects, compatibility, and tests for consumers. |
| Authority | `lenses/authority-lens.md` | Decide which artifact is allowed to define, explain, reference, or implement a rule. |
| Audience | `lenses/audience-lens.md` | Keep content in the right surface for its reader, executor, or maintainer. |
| Blast Radius | `lenses/blast-radius-lens.md` | Preview affected surfaces beyond directly touched files. |
| Lifecycle | `lenses/lifecycle-lens.md` | Distinguish local, provisional, shared, stable, deprecated, and retired Maintained Elements. |
| Memory | `lenses/memory-lens.md` | Decide whether durable project memory should change. |

## Lens Discipline

- Do not apply every lens to every task.
- Do not use lenses as replacement task modes.
- Do not use lenses as replacement tools.
- Do not treat a lens concern as a mandate to edit project memory.
- Use cheap-pass rules to keep local work local.
- Use stop rules when a local edit reveals broader structural risk.

## Lens Interactions

Some decisions become clearer when lenses are combined:

| Combination | Useful distinction |
|---|---|
| Ownership + Reuse | Reuse only when it preserves rightful ownership. |
| Near-Match + Duplication | Extract only when similarity reflects shared semantics, not just similar shape. |
| Naming/Ontology + Memory | Record terms only when they become durable, canonical, deprecated, or intentionally provisional. |
| Boundary + Data/State/Effect | Do not let convenient imports leak data ownership or policy knowledge across layers. |
| Contract + Blast Radius | If promised behavior changes, find consumers and tests before editing broadly. |
| Authority + Audience | Agent-critical rules belong in agent-facing authority, not only human-facing explanation. |
| Authority + Memory | Record source-of-truth changes only in the memory surface that owns them. |
| Lifecycle + Blast Radius | Treat local/provisional elements differently from shared/stable elements because their consumers differ. |

## Update Rules

- Add a lens only when a recurring distinction is not covered by the existing set.
- Retire or merge a lens if it becomes decorative or duplicates another lens.
- Keep each lens procedural: evidence, decision outputs, stop rules, cheap pass, and memory implication are required.
- Behavior files own compact runtime lens prompts. Full lens files remain reference and maintenance surfaces; add or revise behavior lens prompts only when the behavior file itself is being maintained, and add `migration_agents.md` references only when global routing is explicitly reviewed.
