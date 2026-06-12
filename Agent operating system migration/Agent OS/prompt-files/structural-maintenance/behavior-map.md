# Structural Maintenance Behavior Map

This map tells agents when to ingest and use each structural-maintenance behavior file.

Behavior files define how to reason once selected. This map owns initial behavior selection and alternate-behavior routing.

In this layer, a Maintained Element means any maintained repository element that carries behavior, meaning, structure, or authority. That includes internal logic inside an artifact as well as files, folders, maps, instructions, fixtures, schemas, tests, examples, tool contracts, and generated structural indexes.

## Behavior Selection Flow

1. Identify whether the task raises a placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance-path, or authority decision.
2. Locate the smallest matching behavior row below.
3. Select one primary behavior before loading behavior files.
4. Check the alternate-behavior guidance to avoid selecting the wrong primary behavior.
5. Add secondary behaviors only when the primary behavior or implementation evidence reveals another structural decision.
6. Read only the selected behavior file or files.
7. Use skill IDs, tool IDs, indexes, maps, and memory surfaces from this map only after behavior selection.
8. Update memory surfaces only when the selected behavior changes durable structure.

## Structural Granularity

Use the smallest level that fits the decision:

| Level | Use when |
|---|---|
| Internal placement | Deciding where logic, state, effects, helper behavior, prose authority, examples, or checks belong inside an existing maintained element. |
| Element placement | Deciding whether to create, extend, split, rename, or retire a file, component, accessor, fixture, map, instruction file, test, tool contract, or generated index entry. |
| Area placement | Deciding ownership across folders, packages, feature areas, task-mode groups, tool areas, or map families. |
| Platform placement | Deciding durable technology, runtime, source/generated, product/tooling, or platform-component boundaries. |

## Skill And Tool Evidence Rule

Support IDs named here are evidence categories. Some are Stratum 3 or 4 skills and some are Stratum 2 deterministic tools. Only claim tool-backed evidence when the relevant script is implemented and actually used.

Behavior files should not name script paths or require tool execution directly. Resolve skill IDs through `prompt-files/skills/skill-map.md` and deterministic tool IDs through `prompt-files/tools/tool-map.md` when selected behavior files need stronger evidence.

## Scope And Entry

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Implementation scope | A task could be local, cross-surface, exploratory, or architectural; structural implication is unclear; a local-looking change may touch shared maintained elements, naming, routes, accessors, state, schema, policies, mocks, maps, instructions, or tool contracts. | The change is clearly tiny and local; a more specific structural decision is already obvious; the question is only task-mode selection. | `behavior/scope-and-entry/implementation-scope.instructions.md` | `affected-surface-mapping`, `change-report-assembly` | `project-control-files/technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, the deferred logging strategy |
| Technology or standard choice | A task may introduce a new library, framework, runtime, package, convention, generated artifact, build tool, test tool, lint rule, project tool, or Agent OS tool/convention. | The task only uses an approved technology; the question is where a subsystem lives; the question is how Maintained Elements relate; the dependency is local and disposable during explicit exploration. | `behavior/scope-and-entry/technology-or-standard-choice.instructions.md` | `dependency-query`, `boundary-verification` | `project-control-files/technology-architecture-map.md`, the deferred logging strategy | `project-control-files/technology-architecture-map.md`, the deferred logging strategy, `known-debt.md` |

## Placement And Boundaries

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| New Maintained Element placement | A new durable internal logic block, helper, section, file, folder, export, object, component, service, accessor, schema object, utility, route, instruction, map entry, tool contract, or precedent-setting Maintained Element is needed; multiple owners or locations are plausible. | The element is a tiny local detail; the real decision is extending an owner, branching from a near match, or creating a platform component. | `behavior/placement-and-boundaries/new-maintained-element-placement.instructions.md` | `symbol-query`, `term-query`, `dependency-query`, `boundary-verification` | `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/symbol-index.json`, `tool-maintained-files/indexes/dependency-index.json` | `project-control-files/technology-architecture-map.md`, area-specific maps, the deferred logging strategy, `experiments.md` |
| Platform component placement | A new app, package, tool subsystem, data/access/UI/schema layer, integration boundary, platform component, or Agent OS subsystem may need durable ownership and a canonical directory. | The change is only a file/module inside an existing component; the decision is only technology choice; the issue is a boundary between existing components. | `behavior/placement-and-boundaries/platform-component-placement.instructions.md` | `dependency-query`, `affected-surface-mapping`, `boundary-verification` | `project-control-files/technology-architecture-map.md`, the deferred logging strategy | `project-control-files/technology-architecture-map.md`, the deferred logging strategy, `known-debt.md` |
| Interface boundary definition | A maintained area needs controlled consumption by another; direct dependency may bypass an approved interface; UI, tools, mocks, schema, accessors, policy, or data layers are becoming coupled. | The issue is only file placement; the whole Maintained Element belongs elsewhere; the change only uses an already-approved interface. | `behavior/placement-and-boundaries/interface-boundary-definition.instructions.md` | `accessor-query`, `symbol-query`, `dependency-query`, `schema-query`, `boundary-verification`, `consumer-impact-preview`, `test-relation-scan`, `state-impact-scan` | `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/accessor-index.json`, `tool-maintained-files/indexes/schema-shape-index.json`, `tool-maintained-files/indexes/dependency-index.json` | `project-control-files/technology-architecture-map.md`, relevant prompt maps, the deferred logging strategy, `known-debt.md` |

## Reuse And Extension

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Reuse existing functionality | Existing behavior appears to cover part or all of the needed capability; the agent is choosing between creating and reusing; components, accessors, services, utilities, examples, tools, or patterns may apply. | The existing element only almost fits; the decision is specifically to modify an owner; repetition across multiple places is the primary signal. | `behavior/reuse-and-extension/reuse-existing-functionality.instructions.md` | `symbol-query`, `component-query`, `accessor-query`, `pattern-candidate-query`, `consumer-impact-preview` | `tool-maintained-files/indexes/component-index.json`, `tool-maintained-files/indexes/accessor-index.json`, `tool-maintained-files/indexes/symbol-index.json` | Area-specific maps, the deferred logging strategy |
| Extend existing owner | A current object, module, component, service, accessor, map, instruction file, tool contract, document, or maintained area may be the rightful owner and would be modified rather than only consumed. | The existing element only almost fits; the whole element belongs elsewhere; the existing owner is already overloaded; repetition is the main signal. | `behavior/reuse-and-extension/extend-existing-owner.instructions.md` | `symbol-query`, `component-query`, `accessor-query`, `dependency-query`, `consumer-impact-preview`, `test-relation-scan` | `project-control-files/technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, the deferred logging strategy |
| Branch from near match | A similar Maintained Element appears close to the need; reuse, extension, branching, or extraction are all plausible; similarity may be visual, structural, behavioral, semantic, lifecycle-related, data-related, or boundary-related. | Existing functionality clearly fits; the owner clearly should be extended; the issue is already a broad false abstraction; multiple local implementations express the same durable meaning. | `behavior/reuse-and-extension/branch-from-near-match.instructions.md` | `pattern-candidate-query`, `symbol-query`, `affected-surface-mapping` | `project-control-files/technology-architecture-map.md`, `known-debt.md`, `experiments.md` | `known-debt.md`, `experiments.md`, the deferred logging strategy |
| Composition, inheritance, or adaptation strategy | A Maintained Element can be built by wrapping, composing, extending, inheriting, parameterizing, adapting, or defining from scratch; reuse is desirable but relationship form is unclear. | The central question is whether reuse is appropriate at all; whether an existing owner should be modified; or whether a near match should branch. | `behavior/reuse-and-extension/composition-or-inheritance.instructions.md` | `symbol-query`, `dependency-query`, `boundary-verification`, `consumer-impact-preview` | `project-control-files/technology-architecture-map.md`, the deferred logging strategy | the deferred logging strategy, area-specific maps |

## Extraction And Centralization

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Extract shared responsibility | Repeated or mixed maintained behavior appears ready to move into a shared owner; a file/module/component/service/accessor/instruction/map contains a separable responsibility; a candidate pattern is becoming stable. | The repeated behavior is similar shape but different meaning; different shapes encode the same semantic rule; a shared abstraction is too broad; the existing element is overloaded and needs splitting first. | `behavior/extraction-and-centralization/extract-shared-responsibility.instructions.md` | `pattern-candidate-query`, `component-query`, `dependency-query`, `boundary-verification` | `tool-maintained-files/indexes/component-index.json`, `project-control-files/technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, the deferred logging strategy |
| Centralize duplicated semantics | Multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, status, role, capability, label mapping, relation rule, or domain interpretation. | The overlap is only presentational or structural; the concept is exploratory and centralization would freeze it too early; a shared abstraction already exists but is too broad. | `behavior/extraction-and-centralization/centralize-duplicated-semantics.instructions.md` | `term-query`, `pattern-candidate-query`, `symbol-query`, `rename-impact-preview` | `domain-glossary.md`, `tool-maintained-files/indexes/term-index.json`, area-specific maps | `domain-glossary.md`, relevant prompt maps, the deferred logging strategy |
| Demote overgeneralized abstraction | A shared abstraction has too many options, flags, variants, unrelated consumers, vague naming, or hides important domain distinctions; local use pressures it to broaden. | A near match is being evaluated before broad abstraction exists; the issue is an unused maintained element; the issue is full retirement or replacement. | `behavior/extraction-and-centralization/demote-overgeneralized-abstraction.instructions.md` | `component-query`, `symbol-query`, `dependency-query`, `affected-surface-mapping` | `tool-maintained-files/indexes/component-index.json`, `project-control-files/technology-architecture-map.md`, `known-debt.md` | Area-specific maps, `known-debt.md`, the deferred logging strategy |

## Movement And Splitting

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Move between boundaries | An existing maintained element belongs in another layer, package, tool area, source/generated boundary, platform component, or architectural owner; a Maintained Element imports or references from the wrong direction because it lives in the wrong place. | The element should be split into multiple owners; a new boundary may need definition first; the issue is only local organization within the same owner. | `behavior/movement-and-splitting/move-between-boundaries.instructions.md` | `dependency-query`, `affected-surface-mapping`, `boundary-verification`, `symbol-query`, `artifact-query` | `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/dependency-index.json` | `project-control-files/technology-architecture-map.md`, area-specific maps, the deferred logging strategy, `known-debt.md` |
| Split overloaded Maintained Element | A Maintained Element has multiple independent responsibilities; edits repeatedly touch unrelated parts; tests require unrelated setup; imports point in conflicting architectural directions; the name has become vague. | The whole element simply belongs elsewhere; repetition across local elements should be extracted; the issue is only naming. | `behavior/movement-and-splitting/split-overloaded-maintained-element.instructions.md` | `dependency-query`, `symbol-query`, `component-query`, `boundary-verification` | `project-control-files/technology-architecture-map.md`, area-specific maps, `known-debt.md` | Area-specific maps, `known-debt.md`, the deferred logging strategy |

## Naming And Concepts

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Name new Maintained Element | A new durable Maintained Element needs a name aligned with ownership, responsibility, scope, abstraction level, domain language, architecture, routes, components, accessors, schema, fixtures, tests, or tools. | The task is only local UI copy; an existing concept is being renamed; adjacent names are inconsistent but no new element is being named. | `behavior/naming-and-concepts/name-new-maintained-element.instructions.md` | `term-query`, `symbol-query`, `pattern-candidate-query` | `tool-maintained-files/indexes/term-index.json`, `domain-glossary.md`, area-specific maps | `domain-glossary.md`, area-specific maps |
| Rename Maintained Concept | A Maintained Concept, term, symbol, route, component, accessor, schema object, fixture key, test name, file name, or domain-relevant element is being renamed; old and new names may coexist. | Naming inconsistency exists but full rename may be premature; a new element needs a name; the change is only local UI copy. | `behavior/naming-and-concepts/rename-maintained-concept.instructions.md` | `rename-impact-preview`, `term-query`, `symbol-query`, `docs-reference-drift-scan` | `tool-maintained-files/indexes/term-index.json`, `domain-glossary.md`, area-specific maps | `domain-glossary.md`, the deferred logging strategy |
| Align adjacent naming | Similar or related Maintained Elements use inconsistent names, near-synonyms, plural/singular drift, suffix/prefix drift, or unclear naming families; full rename may be too broad, premature, or product-authoritative. | A full old-to-new rename has already been chosen; a new durable element needs its first name; inconsistency is purely local and harmless. | `behavior/naming-and-concepts/align-adjacent-naming.instructions.md` | `term-query`, `symbol-query`, `pattern-candidate-query` | `tool-maintained-files/indexes/term-index.json`, `domain-glossary.md`, area-specific maps | `domain-glossary.md`, `known-debt.md` |

## Lifecycle And Pruning

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Promote provisional element | A provisional maintained element is about to be reused as precedent; a local one-off or candidate pattern becomes shared; mockup/exploratory content enters the main path; a helper, component, accessor, route, fixture, tool, instruction, map entry, or pattern should become stable architecture. | The element remains local/provisional and is not precedent; a shared abstraction is being narrowed or demoted; the element is being removed. | `behavior/lifecycle-and-pruning/promote-provisional-element.instructions.md` | `affected-surface-mapping`, `symbol-query`, `dependency-query`, `boundary-verification`, `consumer-impact-preview`, `test-relation-scan` | `experiments.md`, `known-debt.md`, `project-control-files/technology-architecture-map.md` | `experiments.md`, `known-debt.md`, `project-control-files/technology-architecture-map.md`, the deferred logging strategy |
| Deprecate or retire element | A maintained element should no longer be preferred, has a replacement, is being phased out, or future agents need to know not to use it as precedent. | The element is definitely unused and removal is the only question; a shared abstraction should be narrowed rather than retired; provisional content is becoming durable. | `behavior/lifecycle-and-pruning/deprecate-or-retire-element.instructions.md` | `symbol-query`, `component-query`, `accessor-query`, `affected-surface-mapping`, `consumer-impact-preview`, `test-relation-scan`, `artifact-query` | `known-debt.md`, area-specific maps, `tool-maintained-files/indexes/symbol-index.json` | `known-debt.md`, area-specific maps, the deferred logging strategy |
| Trim unused element | Tool output or inspection indicates an obsolete, abandoned, unreachable, or unused maintained element; debt cleanup identifies obsolete content; a deprecated element reached its removal trigger. | The element should remain temporarily available; it is overgeneralized but still used; the element is being moved or split, not removed. | `behavior/lifecycle-and-pruning/trim-unused-element.instructions.md` | `symbol-query`, `dependency-query`, `affected-surface-mapping`, `docs-reference-drift-scan`, `consumer-impact-preview`, `artifact-query` | `known-debt.md`, area-specific maps, structural indexes | `known-debt.md`, `experiments.md`, area-specific maps |

## Authority And Contracts

| Behavior | Ingest and use when | Prefer another behavior when | Behavior file | Skill/tool IDs | Indexes or maps | Likely memory updates |
|---|---|---|---|---|---|---|
| Define authoritative surface | A rule, expectation, source-of-truth statement, map entry, instruction, schema, test, tool contract, or documentation claim needs an authoritative home. | The task is only local wording with no authority change; the issue is purely naming; the issue is a tool contract specifically. | `behavior/authority-and-contracts/define-authoritative-surface.instructions.md` | `authority-resolution`, `audience-placement`, `docs-reference-drift-scan`, `term-query`, `affected-surface-mapping` | the deferred logging strategy, `known-debt.md`, relevant maps and instruction files | the deferred logging strategy, relevant maps, instruction files |
| Convert human doc to agent instruction | Human-facing documentation contains guidance that agents may need as operating guidance, or README/prose material is becoming runtime policy. | The text is only explanatory for humans; the issue is broader authority selection; the issue is ordinary documentation cleanup. | `behavior/authority-and-contracts/convert-human-doc-to-agent-instruction.instructions.md` | `audience-placement`, `authority-resolution`, `docs-reference-drift-scan`, `term-query` | `AGENTS.md`, task-mode files, structural-maintenance files, migration notes | Agent-facing instruction files, documentation notes |
| Maintain tool contract | A logical tool ID, tool-map row, tool semantic file, script, expected invocation, output, parameter, or limitation changes. | The task only uses a tool; the issue is implementation of the tool internals; the issue is generated output freshness. | `behavior/authority-and-contracts/maintain-tool-contract.instructions.md` | `authority-resolution`, `artifact-query`, `docs-reference-drift-scan`, `symbol-query`, `affected-surface-mapping` | `prompt-files/tools/tool-map.md`, grouped tool semantic files, migration notes | `prompt-files/tools/tool-map.md`, tool semantic files, logging strategy review |
| Maintain generated or indexed artifact | A generated, derived, indexed, or tool-maintained artifact may need updating, regenerating, retiring, or manual exception handling. | The artifact is manually authoritative; the issue is purely tool contract ownership; the issue is ordinary map editing. | `behavior/authority-and-contracts/maintain-generated-or-indexed-artifact.instructions.md` | `artifact-query`, `consumer-impact-preview`, `docs-reference-drift-scan`, `affected-surface-mapping`, `change-report-assembly` | `tool-maintained-files/indexes/`, `prompt-files/tools/tool-map.md`, tool semantic files, relevant maps and ledgers | Generated/index references, known debt, deferred logging strategy |

## Update Rules

- Add a decision point when repeated work needs the same structural choice.
- Remove or merge decision points that create duplicate routing.
- Keep behavior files focused on behavior, not initial selection.
- Keep tool discovery in `prompt-files/tools/tool-map.md` and tool execution details in grouped tool semantic files.






