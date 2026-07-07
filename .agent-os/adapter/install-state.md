# Field Platform Agent OS Install State

This Field-owned maintenance record describes the installed pinned Agent OS layout. It is not product, architecture, schema, or command authority.

## Installed Layout

| Surface | Path | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| Upstream Agent OS snapshot | `.agent-os/upstream/` | Agent OS upstream | available | Git submodule, read-only from Field Platform. |
| Field adapter | `.agent-os/adapter/` | Field Platform | available | Target-owned routes, source policy, tools, validation, and capability notes. |
| Root entry contract | `AGENTS.md` | Field Platform | available | Routes agents to upstream bootloader and local adapter. |
| Legacy Agent OS route | `Agent OS/` | retired | removed from active routing | Do not recreate as active Field guidance. |

## Upstream Pin

| Field | Value |
| --- | --- |
| Delivery mechanism | Git submodule |
| Pinned identifier | `9e7223f8cf91cf1e145fb8120af788f28647ebc0` |
| Upstream source | `https://github.com/andreas-kielsgaard/Agent-OS` |
| Durable remote ref | `origin/main` |
| Last verified | 2026-07-07 |
| Local update procedure | Explicit pin-maintenance slice: fetch the upstream remote, checkout the approved commit inside `.agent-os/upstream/`, then review and commit the superproject gitlink update. Do not track remote `HEAD` implicitly. |

## Adapter Status

| Field | Value |
| --- | --- |
| Adapter config | `.agent-os/adapter/adapter.md` |
| Project-control map | `.agent-os/adapter/project-setup-map.md` |
| Active tool map | `.agent-os/adapter/tool-map.md` |
| Legacy migration evidence | `.agent-os/adapter/project-control/agent-os-migration-map.md` |
| Reusable extraction handoff | `.agent-os/adapter/project-control/agent-os-reusable-extraction-handoff.md` |
| Pre-development readiness cues | `.agent-os/adapter/project-control/pre-development-readiness.md` |
| Validation profile | `.agent-os/adapter/tool-map.md` and repository scripts |
| Known gaps | None for the installed upstream pin; Field pins the full SHA and treats `origin/main` as the durable publication ref. |

## Missing Upstream Handling

If `.agent-os/upstream/` is missing, partial, or unreadable:

1. Check the upstream pin and delivery mechanism above.
2. Restore the submodule to `9e7223f8cf91cf1e145fb8120af788f28647ebc0` when the current task permits install maintenance.
3. If the snapshot cannot be restored, report Agent OS upstream guidance as unavailable.
4. Do not replace the missing snapshot with remote `HEAD`, another target repository copy, or local edits under `.agent-os/upstream/**`.

## Maintenance Notes

- The legacy `Agent OS/` active route was retired during the pinned install.
- Field-owned project-control and migration evidence moved into `.agent-os/adapter/project-control/`.
- Field-owned tool routing moved into `.agent-os/adapter/tool-map.md`.
- Optional upstream docs improvements from the Convivial dry run are now represented in the published upstream baseline.
