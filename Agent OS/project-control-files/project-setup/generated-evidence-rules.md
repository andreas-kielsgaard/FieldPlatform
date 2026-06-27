# Generated Evidence Rules

## Purpose

Generated project indexes are legacy evidence from the retired broad index pipeline. They are not semantic authority and are not part of ordinary development orientation, testing, or verification. Ordinary development uses the replacement tool surface instead: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

## Active Project Indexes

Project structural indexes live under:

```text
tool-maintained-files/project-indexes/
```

They describe the active repository root with paths relative to `.`.

Expected artifacts include:

- `project-index-manifest.json`
- `source-directory-map.json`
- `route-map.json`
- `module-map.json`
- `dependency-map.json`
- `schema-map.json`
- `migration-map.json`
- `component-story-map.json`
- `test-map.json`
- `env-config-map.json`

## Legacy Maintenance

Do not refresh generated project indexes during ordinary development. Refresh only when a human explicitly asks for legacy Agent OS index maintenance:

```powershell
corepack pnpm --filter agent-tools legacy:index
```

Check freshness only for explicit legacy Agent OS index-maintenance tasks:

```powershell
corepack pnpm --filter agent-tools legacy:index:check
```

Do not hand-edit generated project indexes. Change the source or generator, then intentionally run the approved refresh command when that update is in scope.
