# Source Maintenance Behavior Map

This map tells agents when to ingest and use each source-maintenance behavior file.

Behavior files define how to reason once selected. This map owns initial behavior selection and alternate-behavior routing.

## Behavior Selection Flow

1. Identify whether the task changes source structure.
2. Locate the smallest matching behavior row below.
3. Select one primary behavior before loading behavior files.
4. Check the alternate-behavior guidance to avoid selecting the wrong primary behavior.
5. Add secondary behaviors only when the primary behavior or implementation evidence reveals another structural decision.
6. Read only the selected behavior file or files.
7. Use tool IDs, indexes, maps, and memory surfaces from this map only after behavior selection.
8. Update memory surfaces only when the selected behavior changes durable structure.

## Tool Evidence Rule

Tool IDs named here are evidence categories while deterministic tools are placeholder-only. Use available local inspection now. Do not claim tool-backed evidence unless the tool is implemented and actually used.

Behavior files should not name script paths or require tool execution directly. Use this map and `docs/agent/tooling-map.md` to resolve logical tool IDs when selected behavior files need stronger evidence.

## Scope And Entry

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Implementation scope | A task could be local, cross-surface, exploratory, or architectural; structural implication is unclear; a local-looking change may touch shared source elements, naming, routes, accessors, state, schema, policies, mocks, or maps. | The change is clearly tiny and local; a more specific structural decision is already obvious; the question is only task-mode selection. | `behavior/scope-and-entry/implementation-scope.instructions.md` | `map-affected-surfaces`, `summarize-change` | `technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, `decision-log.md` |
| Technology or standard choice | A task may introduce a new library, framework, runtime, package, convention, generated artifact, build tool, test tool, lint rule, project tool, or Agent OS tool/convention. | The task only uses an approved technology; the question is where a subsystem lives; the question is how source elements relate; the dependency is local and disposable during explicit exploration. | `behavior/scope-and-entry/technology-or-standard-choice.instructions.md` | `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `technology-architecture-map.md`, `decision-log.md`, `known-debt.md` |

## Placement And Boundaries

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| New source element placement | A new durable file, folder, export, object, component, service, accessor, schema object, utility, route, tool, or precedent-setting source element is needed; multiple owners or locations are plausible. | The element is a tiny local detail; the real decision is extending an owner, branching from a near match, or creating a platform component. | `behavior/placement-and-boundaries/new-source-element-placement.instructions.md` | `symbol-search`, `find-term`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `structural-indexes/symbols.json`, `structural-indexes/deps.json` | `technology-architecture-map.md`, area-specific maps, `decision-log.md`, `experiments.md` |
| Platform component placement | A new app, package, tool subsystem, data/access/UI/schema layer, integration boundary, platform component, or Agent OS subsystem may need durable ownership and a canonical directory. | The change is only a file/module inside an existing component; the decision is only technology choice; the issue is a boundary between existing components. | `behavior/placement-and-boundaries/platform-component-placement.instructions.md` | `map-deps`, `map-affected-surfaces`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `technology-architecture-map.md`, `decision-log.md`, `known-debt.md` |
| Interface boundary definition | A source area needs controlled consumption by another; direct dependency may bypass an approved interface; UI, tools, mocks, schema, accessors, policy, or data layers are becoming coupled. | The issue is only file placement; the whole source element belongs elsewhere; the change only uses an already-approved interface. | `behavior/placement-and-boundaries/interface-boundary-definition.instructions.md` | `accessor-usage`, `symbol-search`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `accessor-map.md`, `schema-map.md`, `state-management-map.md` | `technology-architecture-map.md`, `accessor-map.md`, `schema-map.md`, `state-management-map.md`, `decision-log.md`, `known-debt.md` |

## Reuse And Extension

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Reuse existing functionality | Existing behavior appears to cover part or all of the needed capability; the agent is choosing between creating and reusing; components, accessors, services, utilities, examples, tools, or patterns may apply. | The existing element only almost fits; the decision is specifically to modify an owner; repetition across multiple places is the primary signal. | `behavior/reuse-and-extension/reuse-existing-functionality.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `find-similar-pattern` | `component-registry.md`, `accessor-map.md`, `structural-indexes/symbols.json` | Area-specific maps, `decision-log.md` |
| Extend existing owner | A current object, module, component, service, accessor, tool, or source area may be the rightful owner and would be modified rather than only consumed. | The existing element only almost fits; the whole element belongs elsewhere; the existing owner is already overloaded; repetition is the main signal. | `behavior/reuse-and-extension/extend-existing-owner.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `map-deps` | `technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |
| Branch from near match | A similar source element appears close to the need; reuse, extension, branching, or extraction are all plausible; similarity may be visual, structural, behavioral, semantic, lifecycle-related, data-related, or boundary-related. | Existing functionality clearly fits; the owner clearly should be extended; the issue is already a broad false abstraction; multiple local implementations express the same durable meaning. | `behavior/reuse-and-extension/branch-from-near-match.instructions.md` | `find-similar-pattern`, `symbol-search`, `map-affected-surfaces` | `technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, `decision-log.md` |
| Composition, inheritance, or adaptation strategy | A source element can be built by wrapping, composing, extending, inheriting, parameterizing, adapting, or defining from scratch; reuse is desirable but relationship form is unclear. | The central question is whether reuse is appropriate at all; whether an existing owner should be modified; or whether a near match should branch. | `behavior/reuse-and-extension/composition-or-inheritance.instructions.md` | `symbol-search`, `map-deps`, `check-boundaries` | `technology-architecture-map.md`, `decision-log.md` | `decision-log.md`, area-specific maps |

## Extraction And Centralization

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Extract shared responsibility | Repeated or mixed code appears ready to move into a shared owner; a file/module/component/service/accessor contains a separable responsibility; a candidate pattern is becoming stable. | The repeated behavior is similar shape but different meaning; different shapes encode the same semantic rule; a shared abstraction is too broad; the existing element is overloaded and needs splitting first. | `behavior/extraction-and-centralization/extract-shared-responsibility.instructions.md` | `find-similar-pattern`, `component-usage`, `map-deps`, `check-boundaries` | `component-registry.md`, `technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |
| Centralize duplicated semantics | Multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, status, role, capability, label mapping, relation rule, or domain interpretation. | The overlap is only presentational or structural; the concept is exploratory and centralization would freeze it too early; a shared abstraction already exists but is too broad. | `behavior/extraction-and-centralization/centralize-duplicated-semantics.instructions.md` | `find-term`, `find-similar-pattern`, `symbol-search`, `rename-impact` | `domain-glossary.md`, `naming-index.md`, area-specific maps | `domain-glossary.md`, `naming-index.md`, `decision-log.md` |
| Demote overgeneralized abstraction | A shared abstraction has too many options, flags, variants, unrelated consumers, vague naming, or hides important domain distinctions; local use pressures it to broaden. | A near match is being evaluated before broad abstraction exists; the issue is unused code; the issue is full retirement or replacement. | `behavior/extraction-and-centralization/demote-overgeneralized-abstraction.instructions.md` | `component-usage`, `symbol-search`, `map-deps`, `map-affected-surfaces` | `component-registry.md`, `technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |

## Movement And Splitting

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Move between boundaries | Existing code belongs in another layer, package, tool area, source/generated boundary, platform component, or architectural owner; a source element imports from the wrong direction because it lives in the wrong place. | The code should be split into multiple owners; a new boundary must be defined first; the issue is only local organization within the same owner. | `behavior/movement-and-splitting/move-between-boundaries.instructions.md` | `map-deps`, `map-affected-surfaces`, `check-boundaries`, `symbol-search` | `technology-architecture-map.md`, `structural-indexes/deps.json` | `technology-architecture-map.md`, area-specific maps, `decision-log.md`, `known-debt.md` |
| Split overloaded source element | A source element has multiple independent responsibilities; edits repeatedly touch unrelated parts; tests require unrelated setup; imports point in conflicting architectural directions; the name has become vague. | The whole element simply belongs elsewhere; repetition across local elements should be extracted; the issue is only naming. | `behavior/movement-and-splitting/split-overloaded-source-element.instructions.md` | `map-deps`, `symbol-search`, `component-usage`, `check-boundaries` | `technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, `decision-log.md` |

## Naming And Concepts

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Name new source element | A new durable source element needs a name aligned with ownership, responsibility, scope, abstraction level, domain language, architecture, routes, components, accessors, schema, fixtures, tests, or tools. | The task is only local UI copy; an existing concept is being renamed; adjacent names are inconsistent but no new element is being named. | `behavior/naming-and-concepts/name-new-source-element.instructions.md` | `find-term`, `symbol-search`, `find-similar-pattern` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `domain-glossary.md`, area-specific maps |
| Rename source concept | A source concept, term, symbol, route, component, accessor, schema object, fixture key, test name, file name, or domain-relevant element is being renamed; old and new names may coexist. | Naming inconsistency exists but full rename may be premature; a new element needs a name; the change is only local UI copy. | `behavior/naming-and-concepts/rename-source-concept.instructions.md` | `rename-impact`, `find-term`, `symbol-search`, `check-docs` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `domain-glossary.md`, `decision-log.md` |
| Align adjacent naming | Similar or related source elements use inconsistent names, near-synonyms, plural/singular drift, suffix/prefix drift, or unclear naming families; full rename may be too broad, premature, or product-authoritative. | A full old-to-new rename has already been chosen; a new durable element needs its first name; inconsistency is purely local and harmless. | `behavior/naming-and-concepts/align-adjacent-naming.instructions.md` | `find-term`, `symbol-search`, `find-similar-pattern` | `naming-index.md`, `domain-glossary.md`, area-specific maps | `naming-index.md`, `domain-glossary.md`, `known-debt.md` |

## Lifecycle And Pruning

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Promote provisional code | Provisional code is about to be reused as precedent; a local one-off or candidate pattern becomes shared; mockup/exploratory code enters the main path; a helper, component, accessor, route, fixture, tool, or pattern should become stable architecture. | The code remains local/provisional and is not precedent; a shared abstraction is being narrowed or demoted; code is being removed. | `behavior/lifecycle-and-pruning/promote-provisional-code.instructions.md` | `map-affected-surfaces`, `symbol-search`, `map-deps`, `check-boundaries` | `experiments.md`, `known-debt.md`, `technology-architecture-map.md` | `experiments.md`, `known-debt.md`, `technology-architecture-map.md`, `decision-log.md` |
| Deprecate or retire code | An element should no longer be preferred, has a replacement, is being phased out, or future agents need to know not to use it as precedent. | Code is definitely unused and removal is the only question; a shared abstraction should be narrowed rather than retired; provisional code is becoming durable. | `behavior/lifecycle-and-pruning/deprecate-or-retire-code.instructions.md` | `symbol-search`, `component-usage`, `accessor-usage`, `map-affected-surfaces` | `known-debt.md`, area-specific maps, `structural-indexes/symbols.json` | `known-debt.md`, area-specific maps, `decision-log.md` |
| Trim unused code | Tool output or inspection indicates obsolete, abandoned, unreachable, or unused code; debt cleanup identifies obsolete code; a deprecated element reached removal trigger. | The element should remain temporarily available; it is overgeneralized but still used; the code is being moved or split, not removed. | `behavior/lifecycle-and-pruning/trim-unused-code.instructions.md` | `symbol-search`, `map-deps`, `map-affected-surfaces`, `check-docs` | `known-debt.md`, area-specific maps, structural indexes | `known-debt.md`, `experiments.md`, area-specific maps |

## Update Rules

- Add a decision point when repeated work needs the same structural choice.
- Remove or merge decision points that create duplicate routing.
- Keep behavior files focused on behavior, not initial selection.
- Keep tool execution details in tool instruction files.
