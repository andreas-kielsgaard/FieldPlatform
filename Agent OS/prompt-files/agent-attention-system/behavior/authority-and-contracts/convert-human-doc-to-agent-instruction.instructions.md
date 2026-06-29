# Structural Maintenance Behavior: Convert Human Doc To Agent Instruction

## Purpose

Decide whether human-facing documentation contains guidance that agents may need as operating guidance and, if so, restate that guidance in the proper agent-facing instruction surface.

This behavior protects against README files, migration notes, explanatory docs, or prose summaries silently becoming runtime policy.

## Lens Prompts

- Audience: decide whether the content is for humans, agents, product users, maintainers, tools, or tests.
- Authority: human documentation can explain an instruction but should not be the only owner of agent-critical behavior.
- Contract: if the guidance promises behavior, outputs, compatibility, or test expectations, preserve that contract in the agent-facing surface.
- Lifecycle: distinguish stable operating-system rules from migration-only notes or provisional review points.
- Memory: update only the note, map, or instruction surface that future agents should consult.

## Procedure

1. Identify the human-facing content and the agent behavior it appears to require.
2. Decide whether the behavior is agent-critical, explanatory only, provisional, or migration-only.
3. Use source reads, `rg`, and current loading chains when the intended audience or loading surface is unclear.
4. Use source reads and `rg` when the same rule may already exist in an agent-facing surface.
5. Choose the narrowest agent-facing surface that should own the rule.
6. Restate the rule there without importing human-only context or broad background.
7. Leave or revise the human-facing document so it remains explanatory rather than authoritative.
8. Add secondary authority, naming, or lifecycle behavior when the owning surface is unclear.

## Conversion Outcomes

Choose one:

- Leave human-facing only.
- Restate in an agent instruction file.
- Route into a task-mode, behavior, map, checklist, skill, or active tool guidance.
- Convert to migration note or deferred review item.
- Defer because authority or audience is unclear.

## Stop Or Escalate When

- Conversion would change active agent behavior across the repository.
- The guidance conflicts with existing active instructions.
- The content is product-authoritative, security-sensitive, or contractual.
- The human-facing document is the only evidence for a broad architectural rule.

## Memory Updates

Update agent-facing instruction files when a rule becomes operational.

Update documentation notes when README or human documentation needs explanatory coverage.

Update relevant durable memory when the conversion establishes a durable documentation or instruction convention.

## Completion Output

```text
Human-facing source:
Agent-critical rule:
Chosen agent surface:
Human documentation role:
Authority impact:
Memory updated:
Remaining uncertainty:
```
