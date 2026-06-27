# Structural Maintenance Lens Map

Paths in this map are relative to `prompt-files/agent-attention-system/`.

## Lens Inventory

| Lens | File | Core concern |
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
