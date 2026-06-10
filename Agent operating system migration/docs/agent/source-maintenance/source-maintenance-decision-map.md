# Source Maintenance Decision Map

This map routes structural decision points to source-maintenance behavior files.

Use the smallest matching decision point first. Add additional behavior files only when tool output or implementation work reveals a broader structural concern.

## Decision Flow

1. Identify whether the task changes source structure.
2. Locate the first matching decision point below.
3. Consult the named tools or indexes when available.
4. Read the referenced behavior file when it contains guidance.
5. Update memory surfaces only when the decision changes durable structure.

## Scope And Entry

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Define implementation scope | The task could be local, cross-surface, exploratory, or architectural. | `scope-and-entry/implementation-scope.instructions.md` | `map-affected-surfaces`, `summarize-change` | `technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, `decision-log.md` |
| Choose technology or standard | The task may introduce or depend on a technology, library, runtime, convention, or project tool. | `scope-and-entry/technology-or-standard-choice.instructions.md` | `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `technology-architecture-map.md`, `decision-log.md` |

## Placement And Boundaries

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Place a new source element | A new file, folder, export, module, object, component, service, accessor, schema object, utility, route, or tool is needed. | `placement-and-boundaries/new-source-element-placement.instructions.md` | `symbol-search`, `find-term`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `structural-indexes/symbols.json`, `structural-indexes/deps.json` | `technology-architecture-map.md`, area-specific maps, `decision-log.md` |
| Place a platform component | A new technology area, tool, app surface, service boundary, or platform component may need its own directory or ownership boundary. | `placement-and-boundaries/platform-component-placement.instructions.md` | `map-deps`, `map-affected-surfaces`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `technology-architecture-map.md`, `decision-log.md`, `known-debt.md` |
| Define an interface boundary | A layer, tool, app, service, or platform component needs a controlled way to be consumed by another. | `placement-and-boundaries/interface-boundary-definition.instructions.md` | `accessor-usage`, `symbol-search`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `accessor-map.md`, `schema-map.md`, `state-management-map.md` | `technology-architecture-map.md`, `accessor-map.md`, `decision-log.md` |

## Reuse And Extension

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Reuse existing functionality | Existing behavior appears to cover part or all of the needed capability. | `reuse-and-extension/reuse-existing-functionality.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `find-similar-pattern` | `component-registry.md`, `accessor-map.md`, `structural-indexes/symbols.json` | Area-specific maps when reuse establishes a convention |
| Extend an existing owner | A current object, module, component, service, accessor, or tool may be the rightful owner for added behavior. | `reuse-and-extension/extend-existing-owner.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `map-deps` | `technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |
| Branch from a near match | A similar existing element almost fits, but reuse or extension may overload its scope. | `reuse-and-extension/branch-from-near-match.instructions.md` | `find-similar-pattern`, `symbol-search`, `map-affected-surfaces` | `technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, `decision-log.md` |
| Choose composition or inheritance | A source element can be built by wrapping, composing, extending, inheriting, or defining from scratch. | `reuse-and-extension/composition-or-inheritance.instructions.md` | `symbol-search`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `decision-log.md` when a reusable convention is established |

## Extraction And Centralization

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Extract shared responsibility | Repeated or mixed code appears ready to move into a narrower, named owner. | `extraction-and-centralization/extract-shared-responsibility.instructions.md` | `find-similar-pattern`, `component-usage`, `map-deps`, `check-boundaries` | `component-registry.md`, `technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |
| Centralize duplicated semantics | Multiple local implementations express the same meaning, rule, term, calculation, policy, or transformation. | `extraction-and-centralization/centralize-duplicated-semantics.instructions.md` | `find-term`, `find-similar-pattern`, `symbol-search`, `rename-impact` | `domain-glossary.md`, `naming-index.md`, area-specific maps | `domain-glossary.md`, `naming-index.md`, `decision-log.md` |
| Demote overgeneralized abstraction | A shared abstraction is too broad, premature, or better owned locally. | `extraction-and-centralization/demote-overgeneralized-abstraction.instructions.md` | `component-usage`, `symbol-search`, `map-deps`, `map-affected-surfaces` | `component-registry.md`, `technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |

## Movement And Splitting

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Move between boundaries | Existing code belongs in another layer, technology area, tool, platform component, or ownership boundary. | `movement-and-splitting/move-between-boundaries.instructions.md` | `map-deps`, `map-affected-surfaces`, `check-boundaries`, `symbol-search` | `technology-architecture-map.md`, `structural-indexes/deps.json` | `technology-architecture-map.md`, area-specific maps, `decision-log.md` |
| Split overloaded source element | A file, module, object, component, service, accessor, or tool has multiple independent responsibilities. | `movement-and-splitting/split-overloaded-source-element.instructions.md` | `map-deps`, `symbol-search`, `component-usage`, `check-boundaries` | `technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |

## Naming And Concepts

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Name a new source element | A new durable source element needs a name that should align with nearby architecture and domain language. | `naming-and-concepts/name-new-source-element.instructions.md` | `find-term`, `symbol-search`, `find-similar-pattern` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `domain-glossary.md` |
| Rename a source concept | A code concept, symbol, type, label family, route, component, service, accessor, or file is being renamed. | `naming-and-concepts/rename-source-concept.instructions.md` | `rename-impact`, `find-term`, `symbol-search`, `check-docs` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `domain-glossary.md`, `decision-log.md` |
| Align adjacent naming | Similar or related source elements use inconsistent names, but a full rename may not be appropriate. | `naming-and-concepts/align-adjacent-naming.instructions.md` | `find-term`, `symbol-search`, `find-similar-pattern` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `known-debt.md` |

## Lifecycle And Pruning

| Decision point | Use when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|
| Promote provisional code | Exploratory code, mockup code, local helper behavior, or a candidate pattern becomes durable architecture. | `lifecycle-and-pruning/promote-provisional-code.instructions.md` | `map-affected-surfaces`, `symbol-search`, `map-deps`, `check-boundaries` | `experiments.md`, `known-debt.md`, `technology-architecture-map.md` | `experiments.md`, `known-debt.md`, `technology-architecture-map.md`, `decision-log.md` |
| Deprecate or retire code | An element should remain temporarily available, be marked no longer preferred, or be replaced by a new owner. | `lifecycle-and-pruning/deprecate-or-retire-code.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `map-affected-surfaces` | `known-debt.md`, area-specific maps, `structural-indexes/symbols.json` | `known-debt.md`, area-specific maps, `decision-log.md` |
| Trim unused code | Tool output or inspection indicates obsolete, unused, abandoned, or unreachable code. | `lifecycle-and-pruning/trim-unused-code.instructions.md` | `symbol-search`, `map-deps`, `map-affected-surfaces`, `check-docs` | `known-debt.md`, area-specific maps, structural indexes | `known-debt.md`, area-specific maps |

## Update Rules

- Add a decision point when repeated work needs the same structural choice.
- Remove or merge decision points that create duplicate routing.
- Keep behavior files focused on behavior, not initial selection.
- Keep tool execution details in `docs/agent/tools`.
