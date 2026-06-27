# Structural Maintenance Behavior Map

This map tells agents when to ingest and use each structural-maintenance behavior file.

Behavior files define how to reason once selected. This map owns initial behavior selection and alternate-behavior routing.

In this layer, a Maintained Element means any maintained repository element that carries behavior, meaning, structure, or authority. That includes internal logic inside an artifact as well as files, folders, maps, instructions, fixtures, schemas, tests, examples, tool contracts, and generated structural indexes.

Paths in this map that start with `behavior/` are relative to `prompt-files/agent-attention-system/`.

Legacy tool notes are historical only. The broad generated index/query catalogue is retired from ordinary development; use human-maintained maps, selected source reads, `rg`, standard project checks, and the replacement development tools instead: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

## Scope And Entry

Behavior: Implementation scope
Behavior details: `behavior/scope-and-entry/implementation-scope.instructions.md`
Proposed for: A task could be local, cross-surface, exploratory, or architectural; structural implication is unclear; a local-looking change may touch shared maintained elements, naming, routes, accessors, state, schema, policies, mocks, maps, instructions, or tool contracts.
Legacy tool notes (inactive): `affected-surface-mapping`, `change-report-assembly`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`, `known-debt.md`, `experiments.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, `known-debt.md`, `experiments.md`

Behavior: Technology or standard choice
Behavior details: `behavior/scope-and-entry/technology-or-standard-choice.instructions.md`
Proposed for: A task may introduce a new library, framework, runtime, package, convention, generated artifact, build tool, test tool, lint rule, project tool, or Agent OS tool/convention.
Legacy tool notes (inactive): `dependency-query`, `boundary-verification`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`

## Placement And Boundaries

Behavior: New Maintained Element placement
Behavior details: `behavior/placement-and-boundaries/new-maintained-element-placement.instructions.md`
Proposed for: A new durable internal logic block, helper, section, file, folder, export, object, component, service, accessor, schema object, utility, route, instruction, map entry, tool contract, or precedent-setting Maintained Element is needed; multiple owners or locations are plausible.
Legacy tool notes (inactive): `symbol-query`, `term-query`, `dependency-query`, `boundary-verification`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/symbol-index.json`, `tool-maintained-files/indexes/dependency-index.json`
Proposed semantic context: `project-control-files/technology-architecture-map.md`

Behavior: Platform component placement
Behavior details: `behavior/placement-and-boundaries/platform-component-placement.instructions.md`
Proposed for: A new app, package, tool subsystem, data/access/UI/schema layer, integration boundary, platform component, or Agent OS subsystem may need durable ownership and a canonical directory.
Legacy tool notes (inactive): `dependency-query`, `affected-surface-mapping`, `boundary-verification`
Evidence notes (legacy generated indexes inactive):
Proposed semantic context: `project-control-files/technology-architecture-map.md`

Behavior: Interface boundary definition
Behavior details: `behavior/placement-and-boundaries/interface-boundary-definition.instructions.md`
Proposed for: A maintained area needs controlled consumption by another; direct dependency may bypass an approved interface; UI, tools, mocks, schema, accessors, policy, or data layers are becoming coupled.
Legacy tool notes (inactive): `accessor-query`, `symbol-query`, `dependency-query`, `schema-query`, `boundary-verification`, `consumer-impact-preview`, `test-relation-scan`, `state-impact-scan`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/accessor-index.json`, `tool-maintained-files/indexes/schema-shape-index.json`, `tool-maintained-files/indexes/dependency-index.json`
Proposed semantic context: `project-control-files/technology-architecture-map.md`

## Reuse And Extension

Behavior: Reuse existing functionality
Behavior details: `behavior/reuse-and-extension/reuse-existing-functionality.instructions.md`
Proposed for: Existing behavior appears to cover part or all of the needed capability; the agent is choosing between creating and reusing; components, accessors, services, utilities, examples, tools, or patterns may apply.
Legacy tool notes (inactive): `symbol-query`, `component-query`, `accessor-query`, `pattern-candidate-query`, `consumer-impact-preview`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/component-index.json`, `tool-maintained-files/indexes/accessor-index.json`, `tool-maintained-files/indexes/symbol-index.json`
Proposed semantic context: area-specific maps

Behavior: Extend existing owner
Behavior details: `behavior/reuse-and-extension/extend-existing-owner.instructions.md`
Proposed for: A current object, module, component, service, accessor, map, instruction file, tool contract, document, or maintained area may be the rightful owner and would be modified rather than only consumed.
Legacy tool notes (inactive): `symbol-query`, `component-query`, `accessor-query`, `dependency-query`, `consumer-impact-preview`, `test-relation-scan`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, area-specific maps, `known-debt.md`

Behavior: Branch from near match
Behavior details: `behavior/reuse-and-extension/branch-from-near-match.instructions.md`
Proposed for: A similar Maintained Element appears close to the need; reuse, extension, branching, or extraction are all plausible; similarity may be visual, structural, behavioral, semantic, lifecycle-related, data-related, or boundary-related.
Legacy tool notes (inactive): `pattern-candidate-query`, `symbol-query`, `affected-surface-mapping`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, `known-debt.md`, `experiments.md`

Behavior: Composition, inheritance, or adaptation strategy
Behavior details: `behavior/reuse-and-extension/composition-or-inheritance.instructions.md`
Proposed for: A Maintained Element can be built by wrapping, composing, extending, inheriting, parameterizing, adapting, or defining from scratch; reuse is desirable but relationship form is unclear.
Legacy tool notes (inactive): `symbol-query`, `dependency-query`, `boundary-verification`, `consumer-impact-preview`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, area-specific maps

## Extraction And Centralization

Behavior: Extract shared responsibility
Behavior details: `behavior/extraction-and-centralization/extract-shared-responsibility.instructions.md`
Proposed for: Repeated or mixed maintained behavior appears ready to move into a shared owner; a file/module/component/service/accessor/instruction/map contains a separable responsibility; a candidate pattern is becoming stable.
Legacy tool notes (inactive): `pattern-candidate-query`, `component-query`, `dependency-query`, `boundary-verification`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/component-index.json`, `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, area-specific maps, `known-debt.md`

Behavior: Centralize duplicated semantics
Behavior details: `behavior/extraction-and-centralization/centralize-duplicated-semantics.instructions.md`
Proposed for: Multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, status, role, capability, label mapping, relation rule, or domain interpretation.
Legacy tool notes (inactive): `term-query`, `pattern-candidate-query`, `symbol-query`, `rename-impact-preview`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/term-index.json`
Proposed semantic context: `domain-glossary.md`, area-specific maps

Behavior: Demote overgeneralized abstraction
Behavior details: `behavior/extraction-and-centralization/demote-overgeneralized-abstraction.instructions.md`
Proposed for: A shared abstraction has too many options, flags, variants, unrelated consumers, vague naming, or hides important domain distinctions; local use pressures it to broaden.
Legacy tool notes (inactive): `component-query`, `symbol-query`, `dependency-query`, `affected-surface-mapping`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/component-index.json`, `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, `known-debt.md`

## Movement And Splitting

Behavior: Move between boundaries
Behavior details: `behavior/movement-and-splitting/move-between-boundaries.instructions.md`
Proposed for: An existing maintained element belongs in another layer, package, tool area, source/generated boundary, platform component, or architectural owner; a Maintained Element imports or references from the wrong direction because it lives in the wrong place.
Legacy tool notes (inactive): `dependency-query`, `affected-surface-mapping`, `boundary-verification`, `symbol-query`, `artifact-query`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`, `tool-maintained-files/indexes/dependency-index.json`
Proposed semantic context: `project-control-files/technology-architecture-map.md`

Behavior: Split overloaded Maintained Element
Behavior details: `behavior/movement-and-splitting/split-overloaded-maintained-element.instructions.md`
Proposed for: A Maintained Element has multiple independent responsibilities; edits repeatedly touch unrelated parts; tests require unrelated setup; imports point in conflicting architectural directions; the name has become vague.
Legacy tool notes (inactive): `dependency-query`, `symbol-query`, `component-query`, `boundary-verification`
Evidence notes (legacy generated indexes inactive): `project-control-files/technology-architecture-map.md`
Proposed semantic context: `project-control-files/technology-architecture-map.md`, area-specific maps, `known-debt.md`

## Naming And Concepts

Behavior: Name new Maintained Element
Behavior details: `behavior/naming-and-concepts/name-new-maintained-element.instructions.md`
Proposed for: A new durable Maintained Element needs a name aligned with ownership, responsibility, scope, abstraction level, domain language, architecture, routes, components, accessors, schema, fixtures, tests, or tools.
Legacy tool notes (inactive): `term-query`, `symbol-query`, `pattern-candidate-query`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/term-index.json`
Proposed semantic context: `domain-glossary.md`, area-specific maps

Behavior: Rename Maintained Concept
Behavior details: `behavior/naming-and-concepts/rename-maintained-concept.instructions.md`
Proposed for: A Maintained Concept, term, symbol, route, component, accessor, schema object, fixture key, test name, file name, or domain-relevant element is being renamed; old and new names may coexist.
Legacy tool notes (inactive): `rename-impact-preview`, `term-query`, `symbol-query`, `docs-reference-drift-scan`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/term-index.json`
Proposed semantic context: `domain-glossary.md`, area-specific maps

Behavior: Align adjacent naming
Behavior details: `behavior/naming-and-concepts/align-adjacent-naming.instructions.md`
Proposed for: Similar or related Maintained Elements use inconsistent names, near-synonyms, plural/singular drift, suffix/prefix drift, or unclear naming families; full rename may be too broad, premature, or product-authoritative.
Legacy tool notes (inactive): `term-query`, `symbol-query`, `pattern-candidate-query`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/term-index.json`
Proposed semantic context: `domain-glossary.md`, area-specific maps, `known-debt.md`

## Lifecycle And Pruning

Behavior: Promote provisional element
Behavior details: `behavior/lifecycle-and-pruning/promote-provisional-element.instructions.md`
Proposed for: A provisional maintained element is about to be reused as precedent; a local one-off or candidate pattern becomes shared; mockup/exploratory content enters the main path; a helper, component, accessor, route, fixture, tool, instruction, map entry, or pattern should become stable architecture.
Legacy tool notes (inactive): `affected-surface-mapping`, `symbol-query`, `dependency-query`, `boundary-verification`, `consumer-impact-preview`, `test-relation-scan`
Evidence notes (legacy generated indexes inactive):
Proposed semantic context: `experiments.md`, `known-debt.md`, `project-control-files/technology-architecture-map.md`

Behavior: Deprecate or retire element
Behavior details: `behavior/lifecycle-and-pruning/deprecate-or-retire-element.instructions.md`
Proposed for: A maintained element should no longer be preferred, has a replacement, is being phased out, or future agents need to know not to use it as precedent.
Legacy tool notes (inactive): `symbol-query`, `component-query`, `accessor-query`, `affected-surface-mapping`, `consumer-impact-preview`, `test-relation-scan`, `artifact-query`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/symbol-index.json`
Proposed semantic context: `known-debt.md`, area-specific maps

Behavior: Trim unused element
Behavior details: `behavior/lifecycle-and-pruning/trim-unused-element.instructions.md`
Proposed for: Tool output or inspection indicates an obsolete, abandoned, unreachable, or unused maintained element; debt cleanup identifies obsolete content; a deprecated element reached its removal trigger.
Legacy tool notes (inactive): `symbol-query`, `dependency-query`, `affected-surface-mapping`, `docs-reference-drift-scan`, `consumer-impact-preview`, `artifact-query`
Evidence notes (legacy generated indexes inactive): structural indexes
Proposed semantic context: `known-debt.md`, `experiments.md`, area-specific maps

## Authority And Contracts

Behavior: Define authoritative surface
Behavior details: `behavior/authority-and-contracts/define-authoritative-surface.instructions.md`
Proposed for: A rule, expectation, source-of-truth statement, map entry, instruction, schema, test, tool contract, or documentation claim needs an authoritative home.
Legacy tool notes (inactive): `authority-resolution`, `audience-placement`, `docs-reference-drift-scan`, `term-query`, `affected-surface-mapping`
Evidence notes (legacy generated indexes inactive):
Proposed semantic context: relevant durable memory, `known-debt.md`, relevant maps and instruction files

Behavior: Convert human doc to agent instruction
Behavior details: `behavior/authority-and-contracts/convert-human-doc-to-agent-instruction.instructions.md`
Proposed for: Human-facing documentation contains guidance that agents may need as operating guidance, or README/prose material is becoming runtime policy.
Legacy tool notes (inactive): `audience-placement`, `authority-resolution`, `docs-reference-drift-scan`, `term-query`
Evidence notes (legacy generated indexes inactive):
Proposed semantic context: `AGENTS.md`, task-mode files, structural-maintenance files, migration notes

Behavior: Maintain tool contract
Behavior details: `behavior/authority-and-contracts/maintain-tool-contract.instructions.md`
Proposed for: A logical tool ID, tool-map row, tool semantic file, script, expected invocation, output, parameter, or limitation changes.
Legacy tool notes (inactive): `authority-resolution`, `artifact-query`, `docs-reference-drift-scan`, `symbol-query`, `affected-surface-mapping`
Evidence notes (legacy generated indexes inactive):
Proposed semantic context: `prompt-files/agent-attention-system/maps/tool-map.md`, grouped tool semantic files, migration notes

Behavior: Maintain generated or indexed artifact
Behavior details: `behavior/authority-and-contracts/maintain-generated-or-indexed-artifact.instructions.md`
Proposed for: A generated, derived, indexed, or tool-maintained artifact may need updating, regenerating, retiring, or manual exception handling.
Legacy tool notes (inactive): `artifact-query`, `consumer-impact-preview`, `docs-reference-drift-scan`, `affected-surface-mapping`, `change-report-assembly`
Evidence notes (legacy generated indexes inactive): `tool-maintained-files/indexes/`
Proposed semantic context: `prompt-files/agent-attention-system/maps/tool-map.md`, tool semantic files, relevant maps and ledgers

## Update Rules

- Add a decision point when repeated work needs the same structural choice.
- Remove or merge decision points that create duplicate routing.
- Keep behavior files focused on behavior, not initial selection.
- Keep the active replacement tool surface in `prompt-files/agent-attention-system/maps/tool-map.md`; ordinary development should not use the retired generated index/query catalogue retained there as legacy reference.
