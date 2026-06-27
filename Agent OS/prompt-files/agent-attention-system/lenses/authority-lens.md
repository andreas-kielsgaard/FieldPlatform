# Authority Lens

## Purpose

Decide whether a maintained element is allowed to define a rule, merely explain it, reference it, summarize it, or implement it.

## Activates When

- A rule, convention, constraint, or source-of-truth statement is added, moved, duplicated, or removed.
- README prose, migration notes, maps, instructions, tests, tool contracts, schemas, or implementation artifacts appear to disagree.
- Agent-critical behavior may be hidden in human-facing documentation.
- A local artifact is being treated as precedent.

## Core Distinction

Mentioning a rule is not the same as owning the rule.

## Questions

- Which artifact has authority to define this rule or expectation?
- Is this artifact normative, explanatory, generated, illustrative, provisional, or historical?
- Are multiple artifacts defining the same rule differently?
- Should this rule live in instructions, a map, a checklist, a tool contract, tests, schema, implementation artifact, or human documentation?
- Will future agents know where to look for the authoritative version?

## Evidence To Consider

- `AGENTS.md`, task-mode files, structural-maintenance files, maps, ledgers, tool semantic files, tests, schemas, README files, and migration notes.
- Existing references to the rule or concept.
- Tool evidence from `authority-resolution` when rule ownership or duplicated authority needs a bounded search.
- Tool evidence from `artifact-query` when generated or tool-maintained artifacts appear to report authority.
- Prior decisions in relevant durable memory.
- Whether the artifact is active runtime guidance, human-facing explanation, generated output, or temporary migration context.

## Decision Outputs

- Artifact is authoritative.
- Artifact is explanatory only.
- Artifact implements authority defined elsewhere.
- Authority should move to another surface.
- Duplicate authority should be centralized.
- Authority is provisional or unresolved.

## Stop Or Escalate When

- A human-facing document would become the only source of agent-critical behavior.
- Two active instruction surfaces conflict.
- A generated or tool-maintained artifact is being edited as if it were semantic authority.
- Moving authority would affect future routing, safety, product behavior, or tool contracts.

## Cheap Pass

The change only clarifies wording in a non-authoritative artifact and does not change rules, routing, expectations, contracts, or future agent behavior.

## Memory Implication

Consider memory updates when authority moves, duplicates are resolved, a rule becomes canonical, or an explanatory artifact should point to an authoritative source.


