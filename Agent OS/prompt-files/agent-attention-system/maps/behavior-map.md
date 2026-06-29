# Structural Maintenance Behavior Map

This map tells agents when to ingest and use each structural-maintenance behavior file.

Behavior files define how to reason once selected. This map owns initial behavior selection and alternate-behavior routing.

A Maintained Element means any repository element whose meaning, behavior, ownership, or future use matters.

Paths in this map that start with `behavior/` are relative to `prompt-files/agent-attention-system/`.

Use source reads, `rg`, package scripts, dependency-cruiser, active replacement tools, standard checks, and reasoning for evidence. Load advisory project decisions only when mature project context is directly relevant.

## Scope And Entry

Behavior: Implementation scope
Behavior details: `behavior/scope-and-entry/implementation-scope.instructions.md`
Use when: A task could be local, cross-surface, exploratory, or architectural; structural implication is unclear.

Behavior: Technology or standard choice
Behavior details: `behavior/scope-and-entry/technology-or-standard-choice.instructions.md`
Use when: A task may introduce a library, runtime, package, convention, generated artifact, build tool, test tool, lint rule, project tool, or Agent OS tool/convention.

## Placement And Boundaries

Behavior: New Maintained Element placement
Behavior details: `behavior/placement-and-boundaries/new-maintained-element-placement.instructions.md`
Use when: A new durable helper, section, file, folder, export, object, component, service, accessor, schema object, utility, route, instruction, map entry, tool contract, or precedent-setting element needs a rightful owner.

Behavior: Platform component placement
Behavior details: `behavior/placement-and-boundaries/platform-component-placement.instructions.md`
Use when: A new app, package, tool subsystem, data/access/UI/schema layer, integration boundary, platform component, or Agent OS subsystem may need durable ownership and a canonical directory.

Behavior: Interface boundary definition
Behavior details: `behavior/placement-and-boundaries/interface-boundary-definition.instructions.md`
Use when: A maintained area needs controlled consumption by another, or direct dependency may bypass the intended interface.

## Reuse And Extension

Behavior: Reuse existing functionality
Behavior details: `behavior/reuse-and-extension/reuse-existing-functionality.instructions.md`
Use when: Existing behavior appears to cover part or all of the needed capability, and the agent is choosing between creating and reusing.

Behavior: Extend existing owner
Behavior details: `behavior/reuse-and-extension/extend-existing-owner.instructions.md`
Use when: A current object, module, component, service, accessor, map, instruction file, tool contract, document, or maintained area may be the rightful owner to modify.

Behavior: Branch from near match
Behavior details: `behavior/reuse-and-extension/branch-from-near-match.instructions.md`
Use when: A similar element appears close to the need, but reuse, extension, branching, or extraction are all plausible.

Behavior: Composition, inheritance, or adaptation strategy
Behavior details: `behavior/reuse-and-extension/composition-or-inheritance.instructions.md`
Use when: A maintained element can be built by wrapping, composing, extending, inheriting, parameterizing, adapting, or defining from scratch.

## Extraction And Centralization

Behavior: Extract shared responsibility
Behavior details: `behavior/extraction-and-centralization/extract-shared-responsibility.instructions.md`
Use when: Repeated or mixed maintained behavior appears ready to move into a shared owner.

Behavior: Centralize duplicated semantics
Behavior details: `behavior/extraction-and-centralization/centralize-duplicated-semantics.instructions.md`
Use when: Multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, status, role, capability, label mapping, relation rule, or domain interpretation.

Behavior: Demote overgeneralized abstraction
Behavior details: `behavior/extraction-and-centralization/demote-overgeneralized-abstraction.instructions.md`
Use when: A shared abstraction has too many options, flags, variants, unrelated consumers, vague naming, or hides important distinctions.

## Movement And Splitting

Behavior: Move between boundaries
Behavior details: `behavior/movement-and-splitting/move-between-boundaries.instructions.md`
Use when: An existing maintained element appears to belong in another layer, package, tool area, source/generated boundary, platform component, or architectural owner.

Behavior: Split overloaded Maintained Element
Behavior details: `behavior/movement-and-splitting/split-overloaded-maintained-element.instructions.md`
Use when: A maintained element has multiple independent responsibilities, conflicting dependencies, unrelated tests, or a vague name.

## Naming And Concepts

Behavior: Name new Maintained Element
Behavior details: `behavior/naming-and-concepts/name-new-maintained-element.instructions.md`
Use when: A new durable maintained element needs a name aligned with ownership, responsibility, scope, abstraction level, domain language, architecture, routes, components, accessors, schema, fixtures, tests, or tools.

Behavior: Rename Maintained Concept
Behavior details: `behavior/naming-and-concepts/rename-maintained-concept.instructions.md`
Use when: A maintained concept, term, symbol, route, component, accessor, schema object, fixture key, test name, file name, or domain-relevant element is being renamed.

Behavior: Align adjacent naming
Behavior details: `behavior/naming-and-concepts/align-adjacent-naming.instructions.md`
Use when: Similar or related maintained elements use inconsistent names, near-synonyms, plural/singular drift, suffix/prefix drift, or unclear naming families.

## Lifecycle And Pruning

Behavior: Promote provisional element
Behavior details: `behavior/lifecycle-and-pruning/promote-provisional-element.instructions.md`
Use when: A provisional maintained element is about to become precedent, shared, or stable architecture.

Behavior: Deprecate or retire element
Behavior details: `behavior/lifecycle-and-pruning/deprecate-or-retire-element.instructions.md`
Use when: A maintained element should no longer be preferred, has a replacement, is being phased out, or future agents need to know not to use it as precedent.

Behavior: Trim unused element
Behavior details: `behavior/lifecycle-and-pruning/trim-unused-element.instructions.md`
Use when: Source inspection or tool output indicates an obsolete, abandoned, unreachable, or unused maintained element may be removed.

## Authority And Contracts

Behavior: Define authoritative surface
Behavior details: `behavior/authority-and-contracts/define-authoritative-surface.instructions.md`
Use when: A rule, expectation, source-of-truth statement, map entry, instruction, schema, test, tool contract, or documentation claim needs an authoritative home.

Behavior: Convert human doc to agent instruction
Behavior details: `behavior/authority-and-contracts/convert-human-doc-to-agent-instruction.instructions.md`
Use when: Human-facing documentation contains guidance that agents may need as operating guidance, or README/prose material is becoming runtime policy.

Behavior: Maintain tool contract
Behavior details: `behavior/authority-and-contracts/maintain-tool-contract.instructions.md`
Use when: A logical tool ID, tool-map row, script, expected invocation, output, parameter, or limitation changes.

Behavior: Maintain generated or tool-maintained artifact
Behavior details: `behavior/authority-and-contracts/maintain-generated-or-tool-maintained-artifact.instructions.md`
Use when: A generated, derived, or tool-maintained artifact may need updating, regenerating, retiring, or manual exception handling.

## Update Rules

- Add a decision point when repeated work needs the same structural choice.
- Remove or merge decision points that create duplicate routing.
- Keep behavior files focused on behavior, not initial selection.
- Keep active evidence sources in `prompt-files/agent-attention-system/maps/tool-map.md`.
