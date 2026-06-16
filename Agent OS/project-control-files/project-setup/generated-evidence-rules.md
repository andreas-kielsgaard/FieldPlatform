# Generated Evidence Rules

## Purpose

Generated project indexes make the Field Platform scaffold cheap to inspect. They are evidence, not semantic authority.

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

## Maintenance

Refresh with:

```powershell
corepack pnpm agent:index
```

Check freshness with:

```powershell
corepack pnpm agent:index:check
```

Do not hand-edit generated project indexes. Change the source or generator, then refresh.
