# Field Platform Pinned Consumption Acceptance

Date: 2026-07-07

## Scope

Slice 5 records Field Platform's accepted stable Agent OS pinned-consumption state. This is a stabilization marker for the local install, not a redesign of the Agent OS contract, a reusable package boundary, or an install into any other target repository.

## Acceptance Summary

| Check | Accepted state |
| --- | --- |
| Agent OS upstream commit pinned | `.agent-os/upstream` is pinned to `9e7223f8cf91cf1e145fb8120af788f28647ebc0`, published on Agent OS `origin/main` with commit subject `Document Convivial Medicine dry-run evidence`. |
| Local adapter files present | `.agent-os/adapter/adapter.md`, `.agent-os/adapter/install-state.md`, `.agent-os/adapter/project-setup-map.md`, and `.agent-os/adapter/tool-map.md` are present and routed as Field-owned adapter surfaces. |
| Root `AGENTS.md` route verified | `AGENTS.md` routes non-trivial work to `.agent-os/upstream/core/agent-os-bootloader.md`, then `.agent-os/adapter/adapter.md`, and uses `.agent-os/adapter/project-setup-map.md` for Field project context. |
| Project-control map verified | `.agent-os/adapter/project-setup-map.md` routes upstream snapshot, adapter, install state, active tool map, project decisions, local source/config, generated evidence, archive, and migration evidence surfaces. |
| Active tool map verified | `.agent-os/adapter/tool-map.md` declares the supported Field-local evidence tools and their validation commands, including change surface, test relation, verification, repository health, dependency boundary, and context tooling. |
| Old `Agent OS/` route retired | The legacy root `Agent OS/` path is absent from the active checkout and remains retired by `AGENTS.md`, `.agent-os/adapter/adapter.md`, and `.agent-os/adapter/install-state.md`. |
| `.agent-os/upstream` protected from local edits | `.agent-os/upstream/**` is documented as upstream-owned and read-only from Field Platform tasks; pin changes require explicit pin-maintenance work. |
| Context tooling excludes upstream from active source | `tools/agent-tools/src/context/adapters/field-platform-adapter-config.mjs` excludes `.agent-os/upstream/**/*` from project guidance and does not include upstream Agent OS in active Field source groups. |
| Field Platform validation commands | Slice 5 validation passed for the commands listed below. |

## Validation

| Command | Result |
| --- | --- |
| `git submodule status` | Passed; gitlink is `9e7223f8cf91cf1e145fb8120af788f28647ebc0 .agent-os/upstream`. The submodule checkout still displays local branch description `(heads/codex/agent-os-pinned-consumption-contract)`, while `.gitmodules` tracks `main`. |
| `corepack pnpm check` | Passed; lint, typecheck, tests, dependency-cruiser, and boundary validation completed successfully. |
| `corepack pnpm boundary:validate` | Passed; 19 boundary cases. |
| `corepack pnpm agent-os context manifest --json` | Passed; manifest status was `ok`, the new acceptance report is included as project guidance, and `.agent-os/upstream/**/*` entries are excluded from project guidance. |
| `git diff --check` | Passed with no whitespace errors. Git emitted a line-ending normalization warning for the prior accepted `.github/copilot-instructions.md` working-tree change: CRLF will be replaced by LF the next time Git touches it. |
| `git diff --check origin/main...HEAD` | Passed. Because accepted changes remain uncommitted in this worker checkout, this command covers only the committed branch range, not the uncommitted Slice 2, Slice 4, or Slice 5 working-tree changes. `git diff --check` is the whitespace check that covers the uncommitted working tree. |

## Known Remaining Gaps

- `tools/agent-tools` remains Field-local evidence tooling, not reusable Agent OS tooling.
- The dependency-cruiser implementation and configuration remain Field-local.
- Agent OS has no npm or package-runtime distribution yet.
- There is no real Convivial Medicine install yet; current Convivial Medicine evidence is a dry run only.
- The `.agent-os/upstream` submodule checkout branch description still names the historical local branch even though the accepted pin is published on `origin/main` and `.gitmodules` tracks `main`.

## Acceptance Conclusion

Field Platform has reached a stable pinned-consumption state for the accepted upstream Agent OS commit `9e7223f8cf91cf1e145fb8120af788f28647ebc0`. The active local routing, adapter files, project-control map, tool map, retired-route boundary, upstream protection, and context-source exclusion are all present. Remaining gaps are recorded above and do not block accepting this pinned-consumption stabilization marker.
