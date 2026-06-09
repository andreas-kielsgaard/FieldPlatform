# Tool: Map Routes

Tool ID: `map-routes`

Script: `tools/agent/map-routes.ts`

## Purpose

Generate or inspect route, page, layout shell, route-param, and route-family structural data.

## Expected Invocation

```powershell
npx tsx tools/agent/map-routes.ts
```

Optional parameters:

- `--check`: report stale route index output.
- `--json`: emit machine-readable output.

## Output

Expected output includes route paths, params, owners, page shells, and likely routing-map updates.

## Does Not

This tool does not decide product route language or visibility rules.
