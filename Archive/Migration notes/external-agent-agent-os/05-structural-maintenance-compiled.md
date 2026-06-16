# Structural Maintenance Compiled

## Purpose

Structural maintenance is the Agent OS layer for durable decisions about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, and authority.

It applies to code, components, functions, hooks, schemas, accessors, fixtures, examples, tests, maps, ledgers, agent instructions, tool contracts, generated indexes, and documentation when those artifacts carry maintained meaning.

## Entry Cue

Enter structural maintenance when the work raises a concrete question about:

- where behavior, state, effects, responsibilities, concepts, names, examples, checks, source-of-truth statements, contracts, or authority should live
- whether something should be reused, extended, branched, extracted, centralized, moved, split, promoted, deprecated, retired, or renamed
- whether a generated, indexed, or tool-maintained artifact needs source updates, regeneration, or a manual exception

Select one primary behavior and read only that behavior file, unless it reveals another structural decision.

## Structural Decision Declaration

```text
Structural maintenance decision:
Primary behavior file:
Secondary behavior files:
Skill support:
Tool or index support:
Memory surfaces affected:
```

## Granularity

- Internal placement: where logic, examples, prose authority, effects, or checks belong inside an existing element.
- Element placement: whether to create, extend, split, rename, retire, or move a file, component, accessor, map, instruction, test, tool contract, or generated index entry.
- Area placement: ownership across folders, packages, feature areas, task-mode groups, tool areas, or map families.
- Platform placement: durable technology, runtime, product/tooling, source/generated, or platform-component boundaries.

## Lenses

Use lenses to narrow attention, not to expand every task.

- Intent: classify what the change is trying to make true.
- Ownership: find the narrowest rightful owner with the same reason to change.
- Boundary: protect dependency direction and interface clarity.
- Reuse: decide whether to reuse, compose, extend, or avoid existing functionality.
- Near-match: handle almost-right similarities without corrupting scope.
- Duplication: distinguish duplicated semantics from similar shape.
- Naming/Ontology: treat vocabulary as architecture.
- Data/State/Effect: clarify ownership of data, state, derivation, side effects, and flow.
- Contract: protect promised inputs, outputs, behavior, side effects, compatibility, and tests.
- Authority: decide which artifact may define, explain, reference, implement, or derive a rule.
- Audience: keep content in the right surface for its reader, executor, or maintainer.
- Blast Radius: preview affected surfaces beyond directly touched files.
- Lifecycle: distinguish local, provisional, shared, stable, deprecated, and retired elements.
- Memory: decide whether durable project memory should change.

Full lens files are reference surfaces. Use them only when compact behavior prompts are insufficient, a stop rule depends on them, the lens itself is being edited, or a deeper review requires them.

## Scope And Entry Behaviors

### Implementation Scope

Use when a task could be local, cross-surface, exploratory, or architectural and structural implication is unclear.

Prefer local handling when the change is clearly tiny. Escalate when a local-looking change touches shared elements, naming, routes, accessors, state, schema, policies, mocks, maps, instructions, or tool contracts.

### Technology Or Standard Choice

Use when a task may introduce a new library, framework, runtime, package, convention, generated artifact, build tool, test tool, lint rule, project tool, or Agent OS tool/convention.

Update the technology architecture map or deferred logging strategy only when a durable technology or standard decision changes.

## Placement And Boundaries

### New Maintained Element Placement

Use when adding a durable internal logic block, helper, section, file, folder, export, component, service, accessor, schema object, utility, route, instruction, map entry, tool contract, or precedent-setting element.

Prefer local placement when specific, unstable, speculative, or easy to delete. Prefer an existing owner when lifecycle, dependencies, consumers, and abstraction level match. Prefer a new shared owner when a stable responsibility has multiple consumers and centralization reduces drift.

### Platform Component Placement

Use when a new app, package, tool subsystem, data/access/UI/schema layer, integration boundary, platform component, or Agent OS subsystem needs durable ownership and a canonical directory.

Escalate if the task creates a new top-level architectural area or changes dependency direction.

### Interface Boundary Definition

Use when one maintained area needs controlled consumption by another or direct dependency bypasses an approved interface.

Watch routes, modules, UI, tools, mocks, schema, accessors, policy, and data layers for coupling across boundaries.

## Reuse And Extension

### Reuse Existing Functionality

Use when existing behavior appears to cover part or all of the needed capability.

Evidence should identify candidate definitions, consumers, contracts, and whether reuse preserves rightful ownership.

### Extend Existing Owner

Use when a current object, module, component, service, accessor, map, instruction file, tool contract, document, or maintained area may be the rightful owner and would be modified.

Prefer this only when the owner name remains precise and no boundary leakage is introduced.

### Branch From Near Match

Use when a similar element is close but reuse, extension, branching, or extraction are all plausible.

Avoid corrupting an existing abstraction just because it is nearby. Record debt or experiment status when the distinction is provisional.

### Composition, Inheritance, Or Adaptation Strategy

Use when a maintained element can be built by wrapping, composing, extending, inheriting, parameterizing, adapting, or defining from scratch.

Choose the relationship that preserves contract clarity and rightful ownership.

## Extraction And Centralization

### Extract Shared Responsibility

Use when repeated or mixed maintained behavior is ready to move into a shared owner.

Extract only when shared ownership, stable meaning, and consumer needs justify it.

### Centralize Duplicated Semantics

Use when multiple local implementations express the same durable meaning, rule, term, calculation, policy, transformation, status, role, capability, label mapping, relation rule, or domain interpretation.

Do not centralize when overlap is only presentational shape or when centralization would freeze exploratory concepts too early.

### Demote Overgeneralized Abstraction

Use when a shared abstraction has too many options, flags, variants, unrelated consumers, or vague naming.

Prefer narrower local owners or clearer split responsibilities over continuing to broaden the abstraction.

## Movement And Splitting

### Move Between Boundaries

Use when an existing element belongs in another layer, package, tool area, source/generated boundary, platform component, or architectural owner.

Preview import direction, dependent consumers, generated references, and map updates before moving.

### Split Overloaded Maintained Element

Use when one element has multiple independent responsibilities, unrelated edits, conflicting imports, or a vague name.

Split by reason to change, boundary, contract, lifecycle, and consumer expectations.

## Naming And Concepts

### Name New Maintained Element

Use when a new durable element needs a name aligned with ownership, responsibility, scope, abstraction level, domain language, architecture, routes, components, accessors, schema, fixtures, tests, or tools.

Choose a narrow name that does not hide uncertainty. Update glossary or maps only when the name becomes durable.

### Rename Maintained Concept

Use when a concept, symbol, route, component, accessor, schema object, fixture key, test name, file name, or domain-relevant element is being renamed.

Distinguish pure rename, semantic rename, alias, split, merge, and deprecation. Preview references before broad changes.

### Align Adjacent Naming

Use when similar or related elements use inconsistent names, near-synonyms, plural/singular drift, suffix/prefix drift, or unclear naming families.

Do not force a full rename when inconsistency is local and harmless.

## Lifecycle And Pruning

### Promote Provisional Element

Use when local one-off or exploratory work is about to become shared precedent.

Promotion requires ownership, contracts, examples, tests, memory updates, and retirement of provisional caveats where appropriate.

### Deprecate Or Retire Element

Use when an element should no longer be preferred, has a replacement, is being phased out, or future agents need to know not to use it as precedent.

Record replacement, consumer migration, and removal trigger.

### Trim Unused Element

Use when inspection indicates obsolete, abandoned, unreachable, or unused maintained elements.

Confirm consumers, docs, generated references, tests, and debt/experiment ledgers before deletion.

## Authority And Contracts

### Define Authoritative Surface

Use when a rule, expectation, source-of-truth statement, map entry, schema promise, test expectation, tool contract, or documentation claim needs an authoritative home.

Classify mentions as defining, explaining, referencing, implementing, generated, provisional, or stale. Keep agent-critical behavior in agent-facing surfaces and human explanation in human-facing surfaces.

### Convert Human Doc To Agent Instruction

Use when human-facing documentation contains guidance agents need as operating guidance.

Promote or restate the agent-critical part into an agent-facing instruction, map, mode, behavior, skill, or tool contract. Leave human docs explanatory.

### Maintain Tool Contract

Use when a logical tool ID, tool-map row, tool semantic file, script, expected invocation, output, parameter, or limitation changes.

Update map, semantic file, script, generated artifacts, and checks together when the user explicitly asks for Agent OS maintenance.

### Maintain Generated Or Indexed Artifact

Use when a generated, derived, indexed, or tool-maintained artifact may need updating, regenerating, retiring, or manual exception handling.

Do not hand-edit generated metadata. Update source or regenerate through the builder unless documenting an intentional exception.

## Memory Updates

Update memory only when durable structure changes. Likely surfaces:

- `project-control-files/technology-architecture-map.md`
- `prompt-files/domain-glossary.md`
- `prompt-files/design-system-map.md`
- `prompt-files/known-debt.md`
- `prompt-files/experiments.md`
- relevant maps, mode files, behavior files, skill files, or tool contracts when the user has opened Agent OS maintenance
- migration notes when the issue is deferred or migration-only
