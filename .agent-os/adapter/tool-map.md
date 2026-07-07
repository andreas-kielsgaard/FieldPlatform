# Field Platform Active Tool Map

Tools provide bounded evidence for agent reasoning. They do not decide semantic authority, ownership, product intent, architecture quality, or whether a change is correct.

Run commands from the repository root unless a task-specific instruction says otherwise.

| Logical Tool ID | Command Or Callable | Use | Expected Evidence | Limitations | Disabled Or Unavailable Behavior | Validation Check |
| --- | --- | --- | --- | --- | --- | --- |
| `affected-surface` | `corepack pnpm change-surface` | Identify changed files and dependency-cruiser-derived affected active source surfaces. | Changed files and affected active source surfaces. | Depends on local git state and dependency-cruiser inputs. | Use `git diff --name-only`, source reads, and `rg`. | `corepack pnpm change-surface` |
| `test-relation` | `corepack pnpm test-selection` | Identify runner-discovered Vitest and Playwright test relations for changed or affected files. | Related tests and runner hints. | Advisory; not a proof of complete coverage. | Select tests from source/config inspection. | `corepack pnpm test-selection` |
| `verification` | `corepack pnpm change-verification` | Produce a concise per-change verification plan without executing broad checks. | Suggested checks for the current diff. | Planner only; does not replace running required validation. | Use package scripts and source/config inspection. | `corepack pnpm change-verification` |
| `repository-health` | `corepack pnpm repo-health` | Summarize whole-repository technical health independent of a specific diff. | Health summary and visible risks. | May be broader than a small task needs. | Use targeted checks. | `corepack pnpm repo-health` |
| `dependency-boundary` | `corepack pnpm depcruise:active-source` | Inspect dependency direction and import boundaries over active app and tool source. | Dependency-cruiser boundary evidence. | Uses Field-owned config only; not an upstream universal rule. | Report unavailable and inspect imports manually. | `corepack pnpm depcruise:active-source` |
| `context-bundle` | `corepack pnpm agent-os context bundle --path=<path> --json` | Gather bounded context for a selected file or area. | JSON context bundle from the Field adapter. | Bounded by the local context adapter and selected path. | Use selected source reads and `rg`. | `corepack pnpm agent-os context --help` |
| `context-manifest` | `corepack pnpm agent-os context manifest --json` | Inspect adapter-bounded source policy and manifest entries. | JSON manifest with source groups and flags. | Evidence only; not semantic authority. | Use adapter config and source reads. | `corepack pnpm agent-os context manifest --json` |
| `context-evidence` | `corepack pnpm agent-os context evidence --json` | Inspect active evidence producers and capability metadata. | JSON evidence envelope. | Depends on local adapter producer enablement. | Use package/config inspection. | `corepack pnpm agent-os context evidence --json` |

Exact script definitions and package versions live in `package.json`, package manifests, lockfiles, and tool source.
