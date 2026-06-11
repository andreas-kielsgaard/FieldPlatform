# Test Behavior Selection And Maintenance Review

## Status

Deferred.

## Review Prompt

Review whether the Agent OS reinforces good test behavior, test selection, and test maintenance.

## Current State Reflection

The migrated Agent OS already has several useful test-related surfaces:

- `docs/agent/testing-map.md` has been deleted for now.
- Task modes no longer route work toward a testing map. They should continue to report coverage and verification implications until the test behavior component is designed.
- Bug-fix guidance asks agents to reproduce failures, run focused tests or manual checks, add or update regression coverage where practical, and explain missing tests.
- Refactor guidance asks agents to state no-behavior-change intent, establish current behavior through tests, examples, or manual description, and use relevant tests where available.
- Review-before-commit guidance asks for relevant tests when available, omitted-check explanations, and a checks-run report.
- Structural-maintenance contract reasoning treats tests, examples, fixtures, and consumers as evidence of promised behavior.
- The `contract-test-coverage` tool contract is present and asks for relevant tests, weak or missing coverage, and candidate test surfaces.

The prior testing map was an empty template with update rules, not yet a policy that helped agents choose the smallest credible verification set, decide when broader suites are warranted, or maintain tests as durable project artifacts. Test guidance is currently distributed across task modes and structural-maintenance contract reasoning, but there is not yet a single clear Agent OS expectation for test selection and test lifecycle decisions.

## Additional Reflection

Test behavior should probably separate three decisions that are currently easy to blur:

1. What could have regressed?
2. Which tests or checks cover those potentially regressed areas?
3. How much of that relevant set should be executed in this development pass?

The first two should be deterministic in most ordinary cases. Given the changed files and their diffs, the Agent OS should be able to calculate an over-approximation of potentially regressed areas by using imports, exports, routes, schemas, accessors, components, fixtures, contracts, generated indexes, and test references. From there, it should map those affected surfaces to relevant tests and commands. Agent reasoning should mainly handle gaps, stale indexes, ambiguous dynamic behavior, or cases where deterministic evidence is unavailable, not act as the primary way to guess which tests matter.

The third decision is different. Appropriate test exhaustivity depends on the development flow, resource cost, and human intent. Some checks are so cheap and well scoped that running them is probably cheaper than spending agent attention deciding whether to run them. Other checks are relevant but expensive, noisy, or strategically deferred during a large refactor. In those cases, the Agent OS should not pretend the agent can infer undisclosed human context. It should surface the relevant broader checks, explain the risk of deferring them, and let human policy or an explicit testing profile decide whether to run them now.

This suggests a useful split between deterministic test relevance and policy-governed test execution. A deterministic impact pass can say, "these areas and tests are potentially affected." A verification profile can say, "for this flow, run cheap local checks automatically, run moderate checks when they are directly mapped, and propose but do not automatically run broad regression suites." That would make the Agent OS more useful to humans because it exposes clear levers for speed, confidence, and cost instead of forcing every decision through ad hoc agent judgment.

## Human Leverage Considerations

The Agent OS should help humans steer verification without requiring them to restate testing strategy every prompt.

Possible human-facing levers:

- Verification profile: exploratory, narrow fix, default development, large refactor, release readiness, or CI-deferred.
- Exhaustivity budget: cheap/local only, mapped relevant checks, broad affected-area checks, or full regression.
- Broad-suite permission: run automatically, ask first, or only report as recommended.
- CI assumption: local agent checks only, CI will run broad regression, or no external safety net assumed.

The completion report should preserve the distinction:

- potentially regressed areas calculated
- tests/checks deterministically mapped
- checks run
- checks relevant but deferred
- reason for deferral or human policy used
- residual risk

## Review Questions

- Does the Agent OS require agents to identify intended behavior before changing tests?
- Does it distinguish adding a missing regression test, updating a test for intended behavior change, deleting an obsolete test, and weakening a test to make a change pass?
- Does it help agents choose unit, contract, integration, E2E, visual, smoke, fixture, scenario, or snapshot checks based on changed surfaces and risk?
- Does it separate deterministic relevance mapping from the resource-policy decision of which relevant tests to execute now?
- Does it let humans set or imply verification profiles so agents do not overrun broad suites during flows where broad regression is intentionally deferred?
- Does it make test maintenance part of maintained project memory, including fixtures, scenarios, snapshots, examples, and critical-flow records?
- Does it explain when focused verification is enough and when shared infrastructure, cross-boundary contracts, broad refactors, or uncertainty require broader suites?
- Does it ask agents to report unrun tests and residual risk without treating skipped checks as success?
- Does it avoid both undertesting local-looking risky changes and overtesting every change by default?

## Potential Gaps

- A future test behavior component may need fields that connect test surfaces to code, routes, components, schemas, accessors, fixtures, critical flows, command cost, reliability, and when-to-run guidance.
- The Agent OS may need a deterministic diff-to-regression-impact tool or generated test-impact index, rather than relying on agents to reason from changed files to tests.
- Test selection may need to model test cost, runtime, flakiness, confidence, and broad-suite policy separately from test relevance.
- Test maintenance rules may need an agent-facing policy surface rather than being implied by task-mode fragments.
- `contract-test-coverage` currently defines a useful evidence contract, but it does not prove sufficiency and appears to remain implementation-planning scaffolding.
- Structural-maintenance guidance recognizes tests as maintained elements, but the Agent OS may still need explicit lifecycle expectations for renaming, moving, pruning, replacing, or repairing tests.
- Human documentation should explain that good test behavior includes preserving behavioral signal, not simply increasing test count.

## Suggested Follow-Up

- Decide whether test behavior belongs in a generated index, a dedicated test-selection-and-maintenance instruction file, or both.
- Define a deterministic affected-test pipeline: changed files and diffs, affected maintained elements, potentially regressed areas, mapped test surfaces, then runnable commands.
- Define verification profiles or exhaustivity budgets that humans can choose or set as defaults for different development flows.
- Define a compact default rule for agents: choose tests from changed surfaces and risk, preserve or improve behavioral signal, update tests only when expectations changed or coverage was missing, and never weaken tests silently.
- Add examples for common cases: bug regression, refactor with no behavior change, API contract change, fixture rename, visual UI change, flaky test handling, and snapshot update.
- Clarify how `contract-test-coverage` output should inform judgment without replacing agent responsibility for behavior analysis.
