## Start of turn

1. Re-evaluate and state primary and secondary task-modes

2. Re-evaluate and state relevant behaviors

3. Re-evalutate and state relevant lenses

## Throughout task execution

- Leverage the provided tools when they can achieve an action

- Leverage the provided skills when they correspond to an action

- Use human-maintained maps, selected source reads, `rg`, the replacement development tools (`change-surface`, `test-selection`, `change-verification`, `repo-health`, `depcruise:active-source`), and standard project checks to orient in the workspace. Do not use the retired broad Agent OS index/query system for ordinary development.

## Reporting And Logging

- Keep mode, behavior, and lens selection as working context during normal tasks.
- Do not create per-task attention logs by default.
- Do not create handoff or report files by default.
- Use a compact final summary in chat for normal task completion: changed surfaces, checks run, skipped checks or failures, and important unresolved risk.
- Create a persistent report, handoff, or log only when the user explicitly asks for one or the task genuinely requires a durable artifact.
- Treat task-mode report cues as optional prompts for the final summary, not as a requirement to fill every field or write a file.

# Re-evaluation cues

Especially consider revisiti mode, behavior and lens selection when:

- the implementation reveals a different root cause
- a local change starts touching shared components, routes, schema, accessors, permissions, state, mocks, or naming
- a task grows from a narrow edit into cross-surface work
- review-before-commit reveals missing affected surfaces
- the work reveals a decision about placement, ownership, boundary, lifecycle, naming, reuse, duplication, contract, audience, maintenance path, or authority of a durable maintained element.
