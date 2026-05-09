# Design Process And Project Wayfinding

FieldPlatform is still unfolding. The philosophical and product orientation is strong, but the concrete app surface is being discovered through cycles of framing, prototyping, feedback, and distillation.

This process is a guide, not a rulebook. It should help recover orientation and protect the project's learning, not prevent judgment. Planning agents may skip, reorder, or reinterpret steps when the project state calls for it.

Creative leaps are allowed when they are grounded in the current product philosophy and then tested through context updates, data-layer work, or mockups. The point is not to mechanically follow a process, but to preserve the project's unfolding intelligence.

This document helps future agents and future conversations understand:

- how to orient in the repo
- how to decide what layer to touch next
- how to process feedback
- how to avoid over-specifying too early
- how to capture insights without turning every idea into immediate implementation
- how to keep mockups exploratory while General context remains the design source of truth

It is not a fixed roadmap. It describes how to navigate the work while staying sensitive to design pressure.

## Advisor Agent, Code Agent, And Document Authority

FieldPlatform supports a split workflow.

Advisor/planning agent responsibilities:

- review repo state
- read General context as the current source of truth
- use this process document as wayfinding support, not a rigid recipe
- interpret the current design pressure
- think creatively when needed
- decide whether the next useful step is a context update, data-layer work, mockup, review pass, or new product framing
- prepare focused prompts for the code/execution agent
- surface uncertainty instead of over-specifying

Code/execution agent responsibilities:

- treat the supplied prompt as the immediate task
- consult only the relevant General context, data-layer, and mockup docs needed for execution
- avoid independently re-planning the product philosophy unless asked
- avoid treating older generated Design Instructions as binding
- apply concrete changes
- report changes functionally, in terms of objects, flows, and behaviors rather than mostly file names

Document authority, when sources conflict:

1. Explicit user instruction in the current task.
2. Current General context docs.
3. Recent mockup review findings captured in General context.
4. Platform data layer docs for implementation interface truth.
5. Current mockup README for that mockup's intent.
6. Archived/generated Design Instructions as optional reference only.

If conflict remains, preserve the uncertainty and report it instead of silently choosing.

## Three-Layer Project Model

### General Context

General context is the living product/design target.

It stores durable insights, distinctions, guardrails, design principles, language rules, UX stories, open questions, and process lessons. Update it when an insight should survive beyond one mockup.

### Platform Data Layer

The Platform data layer is the shared model/access layer.

It stores stable product objects, calculations, and interfaces future mockups should consume. Update it when the app needs a stable concept, behavior, calculation, or access method that multiple surfaces or mockups should share.

### Mockups

Mockups are temporary explorations.

They test how an idea feels as an app surface. They should not become the source of truth. Their job is to reveal ambiguities, cognitive load, language problems, interaction questions, and model leakage. Findings should feed back into General context when they should persist.

## Core Design Cycle As A Support Pattern

The cycle below is a support pattern. Use it to recover orientation, not as a mandatory sequence. A planning agent may begin with review, jump straight to distillation, or recommend a creative reframe when the project state asks for it.

### Orient

- Inspect the current General context.
- Inspect the Platform data layer when implementation or shared model behavior is relevant.
- Inspect the most recent mockup and its README.
- Identify the current unresolved ambiguity or design pressure before proposing changes.

### Frame

- Name the question the next artifact should answer.
- Keep the scope small enough that the result can be judged.
- Decide whether the artifact is a context update, data-layer change, mockup, or review pass.

### Context Update

- If an insight changes the product grammar, update General context before implementation.
- If an insight changes shared concepts, calculations, or interfaces, update the data layer before a mockup depends on local reinterpretation.
- If an idea is exploratory and not yet stable, let a mockup test it first.

### Prototype

- Build the smallest surface that tests the question.
- Avoid trying to build the whole platform.
- Consume the shared data layer when the model already exists.
- Keep mockup-specific view models thin: translate domain objects into display objects, but do not duplicate formulas or seed data.

### Review

- Browse like a real user, not only as a model author.
- Notice confusion, cognitive load, language problems, unclear actions, role confusion, and model leakage.
- Distinguish "this mockup is rough" from "this principle is wrong."
- Ask whether the surface feels like orientation or like metadata.

### Distill

- Convert review feedback into design principles, constraints, and open questions.
- Update General context when the insight should persist.
- Preserve uncertainty as an open question instead of prematurely hardening it into implementation.

### Decide

- Choose whether to refine the mockup, update the data layer, update docs, or start a new focused mockup.
- Do not add complexity unless it resolves a repeated or current ambiguity.
- Prefer the smallest next artifact that can answer the active question.

## How To Decide What Layer To Touch Next

Update General context when:

- feedback reveals a durable design principle
- language/register needs clarification
- object/page grammar changes
- a user flow needs reframing
- a concept should guide future mockups but does not yet need code

Update Platform data layer when:

- multiple mockups need the same object, relation, calculation, or access method
- local mockup data would cause repeated reinterpretation
- the concept needs stable behavior or a shared interface
- a surface should consume the same model as future surfaces

Build or revise a mockup when:

- the concept is understood enough to test as an interaction
- the question is about feel, hierarchy, comprehension, or flow
- the previous mockup revealed confusion that needs visual or interaction pressure

Do not build yet when:

- the question is still philosophical or conceptual
- the concept needs a clearer language register
- the data model is missing a required shared primitive
- the scope would force too many speculative decisions at once

## When Creative Divergence Is Appropriate

Creative divergence is appropriate when:

- a mockup reveals a deeper product misunderstanding
- the current frame produces repetitive disappointment
- a new conceptual distinction makes the existing plan feel too narrow
- the user explicitly asks for higher-level synthesis
- the product seems to be overfitting to previous artifacts
- the next useful step is reframing rather than implementing

Creative divergence should still leave a trail. Name the pressure, explain the reframe, and decide whether the insight belongs in General context, the data layer, a mockup, or future exploration.

## When To Warn That The Process May Need Revision

The current discovery process may eventually serve its purpose. Treat these signals as a checkpoint, not a hard stop:

- the primary product wedge becomes clear
- core surfaces stabilize
- feedback becomes mostly polish/detail rather than product grammar
- the data model stops changing and supports new surfaces well
- the next useful work is MVP definition, production architecture, user validation, or implementation execution rather than exploratory mockups

When these signals appear, the agent should say something like:

> The current discovery process may have served its purpose; consider revising this document toward a more concrete MVP/specification/execution process.

This does not mean stop building. It means the wayfinding document may need to become more execution-oriented.

## Complexity Timing

Do not specify every possible context just because the model can express it. Add precision when repeated ambiguity or a concrete surface demands it.

Examples:

- Do not build a full event/community/venue/person x newcomer/member/steward/creator matrix too early.
- First prototype the contexts that are currently confusing.
- If the same ambiguity appears repeatedly, then define a more precise matrix or surface grammar.
- Start with one object type, often events, before expanding to all object types.

Useful distinctions:

- Design pressure: a recurring issue or ambiguity worth tracking.
- Design principle: a durable rule or orientation.
- Design specification: a more exact definition that should guide implementation.
- Implementation: code, mockup, or data-layer changes.

## Current Process Lessons To Preserve

- FieldRelation is a powerful data/domain primitive, but it should not become the primary UI object.
- Users first relate to the event, community, venue, person, or other object they are viewing; connections should support orientation and action.
- Object type gives default affordances, but user role, entry point, surrounding context, and surface type determine priority.
- Mockups should reveal whether the app feels like orientation or like metadata.
- Language must be translated from internal philosophy/domain terms into ordinary UI.
- Steward review should be role-gated and contained.
- Ways-in actions should be grouped by the object they act on.
- Suggestion flows should not feel like tagging, marketing, claiming, ownership, or social pressure.
- Tooltips and progressive disclosure should carry explanations that are useful to designers but too heavy for main UI.

## How To Process Feedback

Sort feedback before implementing it.

Immediate usability issue:

- Example: "I do not understand what Review queue means."
- Usually belongs in copy, interaction, or mockup refinement.

Durable product principle:

- Example: "Steward review should not appear on ordinary object pages."
- Usually belongs in General context.

Language/register issue:

- Example: "Suggest connection is too abstract unless context-specific."
- Usually belongs in Language and copy register, and often in UX stories or feature guidance.

Information hierarchy issue:

- Example: "When viewing an event, I need event basics before relations."
- Usually belongs in Object page and connection UX principles or UX stories.

Data/model issue:

- Example: "Ways in needs to know what object each action acts on."
- May require General context first, then Platform data layer if shared behavior is needed.

Future expansion:

- Example: "Ask facilitator / ask community before joining."
- Usually belongs in General context as expansion space until a mockup or data-layer need becomes concrete.

Do not immediately implement all feedback. First decide whether it belongs in:

- General context
- Platform data layer
- current mockup refinement
- future mockup
- expansion space

## How To Choose Next Mockups

A good next mockup should:

- answer one main design question
- be narrow enough to evaluate
- use real shared data-layer concepts where available
- produce clear feedback
- avoid broad generic platform screens unless the question is navigation architecture

Examples of good mockup questions:

- How should a public event page reveal community context without being dominated by connections?
- How should the same event appear in a steward's community review surface?
- How should "Ways in" be grouped by target object?
- How should a user suggest a related community without seeing an overwhelming universal list?
- How should a generated pattern be shown without pretending to be a community?

Examples of poor mockup questions:

- Build the full platform.
- Show all roles at once.
- Make all object types work the same way.
- Add every possible connection type.
- Design final UI copy before the surface is understood.

## Agent Prompt And Reporting Norm

Future coding/design agents should explain completed work in functional language.

Agents should report:

- what was added
- what changed in product behavior or understanding
- how objectives were achieved
- what was intentionally left out
- what was verified
- known limitations

Explain in terms of objects and flows, not mostly file names or technical implementation details.

Good:

> I added a steward-facing review surface where suggested connections can be accepted, refined, redirected, or declined. Accepting a connection makes it appear as visible context on the relevant object page.

Less useful:

> I modified app.js and added relation action handlers.

Include meaningful verification results tied to new or changed behavior, not only generic test statements.

Examples:

- Confirmed that suggesting a connection adds it to the steward review surface.
- Confirmed that accepting a connection changes what appears on the object page.
- Confirmed that Ways in update from relation movement options.
- Confirmed that participant-facing UI avoids raw domain terms.
- Confirmed that Mockup 4 was not touched.

## Documentation Classes

These classes are guidance, not rigid separation.

Human-readable / project overview material:

- Design intent
- Design target document map
- Business and pilot hypotheses
- Future exploration notes

Advisor/planning-agent material:

- Design process and project wayfinding
- Context maintenance instructions
- Object page and connection UX principles
- Language and copy register
- Future exploration notes
- latest mockup README and review findings

Code/execution-agent material:

- current prompt
- relevant General context docs for the task
- Platform data layer README and OO docs when touching data/model/access
- mockup README when modifying a mockup
- Language and copy register when writing UI copy
- Object page and connection UX principles when designing object surfaces

Cross-section material:

- Data concepts and logic
- Features and functionalities
- UX stories and user flows
- Dev tools

Archived/generated Design Instructions are reference material only. Code agents should not consult them unless explicitly instructed or the task is about archive/reference material.

## Restarting From Repo Context

When restarting without prior chat context:

1. Read the document map first.
2. Read Design intent.
3. Read Language and copy register.
4. Read Object page and connection UX principles.
5. Read this Design process and project wayfinding document.
6. Inspect the latest mockup README.
7. Inspect the data-layer README if implementation work is planned.
8. Identify the current unresolved design pressure before proposing changes.

The point is not to recreate old conversation history. The point is to recover the current product grammar and choose the next useful pressure test.
