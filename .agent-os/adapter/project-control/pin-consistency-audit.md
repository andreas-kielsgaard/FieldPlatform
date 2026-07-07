# Field Platform Pin Consistency Audit

Date: 2026-07-07

## Scope

Slice 2 audited Field Platform's pinned Agent OS consumption state across:

- `.gitmodules`
- `AGENTS.md`
- `README.md`
- `.agent-os/adapter/install-state.md`
- `.agent-os/adapter/adapter.md`
- `.agent-os/adapter/project-setup-map.md`
- `.agent-os/adapter/tool-map.md`
- `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs`
- `git submodule status`

The accepted upstream baseline for this audit is `9e7223f8cf91cf1e145fb8120af788f28647ebc0` from Agent OS `origin/main`, commit subject `Document Convivial Medicine dry-run evidence`.

## Findings

| Question | Conclusion |
| --- | --- |
| `.gitmodules` branch | Updated from stale `codex/agent-os-pinned-consumption-contract` to `main`. The old remote branch was not returned by `git ls-remote` during this audit, while `refs/heads/main` resolved to the accepted baseline commit. |
| Install-state pin | Correctly pins `9e7223f8cf91cf1e145fb8120af788f28647ebc0`. |
| Pin on Agent OS `main` | Confirmed. `git merge-base --is-ancestor 9e7223f8cf91cf1e145fb8120af788f28647ebc0 origin/main` passed in `C:\Users\user\Documents\Code Projects\Agent-OS`. |
| Publication pending wording | Removed as stale. Agent OS `origin/main` is now the durable publication ref for the installed pin. |
| Root agent entry | `AGENTS.md` points agents to the pinned upstream bootloader and Field adapter, and does not route through the retired `Agent OS/` path. |
| README layout | `README.md` matches the installed `.agent-os/upstream` and `.agent-os/adapter` layout. |
| Context tooling source policy | `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs` excludes `.agent-os/upstream/**/*` from project guidance and does not include upstream Agent OS as active Field source. |
| Local tool routing | `.agent-os/adapter/tool-map.md` remains the active routing surface for local tools, and adapter/project setup docs point to it. |

## Submodule State

`git submodule status` reports the superproject gitlink at:

```text
9e7223f8cf91cf1e145fb8120af788f28647ebc0 .agent-os/upstream
```

The status command displayed `(heads/codex/agent-os-pinned-consumption-contract)` from the submodule checkout's local branch description, but `.gitmodules` now tracks `main` and the accepted commit is on Agent OS `origin/main`.

## Changes Made

- Updated `.gitmodules` to track `main` for `.agent-os/upstream`.
- Updated `.agent-os/adapter/install-state.md` to treat `origin/main` as the durable remote ref and remove stale main-publication-pending wording.
- Added this audit record.

## Validation

| Command | Result |
| --- | --- |
| `git submodule status` | Passed; gitlink is `9e7223f8cf91cf1e145fb8120af788f28647ebc0`. |
| `git fetch origin main:refs/remotes/origin/main` in Agent OS repo | Passed. |
| `git merge-base --is-ancestor 9e7223f8cf91cf1e145fb8120af788f28647ebc0 origin/main` in Agent OS repo | Passed. |
| `git ls-remote https://github.com/andreas-kielsgaard/Agent-OS refs/heads/main refs/heads/codex/agent-os-pinned-consumption-contract` | Passed; `refs/heads/main` resolved to `9e7223f8cf91cf1e145fb8120af788f28647ebc0`. |
| `corepack pnpm check` | Passed. |
| `corepack pnpm boundary:validate` | Passed; 19 boundary cases. |
| `corepack pnpm depcruise:active-source` | Passed; 167 modules, 265 dependencies, no violations. |
| `corepack pnpm agent-os context manifest --json` | Passed; manifest excludes `.agent-os/upstream/**/*` from project guidance. |
| `corepack pnpm agent-os context evidence --json` | Passed; dependency-cruiser evidence reports 0 violations. |
| `git diff --check` | Passed. |
| `git diff --check origin/main...HEAD` | Passed; branch diff is empty because this worker did not commit. |

## Conclusion

Field Platform's installed Agent OS gitlink already matches the accepted baseline commit, and that commit is published on Agent OS `origin/main`. Slice 3 is not needed for a submodule pin update unless the root coordinator wants an additional cleanup of the submodule checkout's local branch description.

No Agent OS contract redesign, target-repo installation, tool extraction, package-runtime work, archive churn, or Field product work was performed.
