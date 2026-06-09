# Tool: Check Permission Literals

Tool ID: `check-permission-literals`

Script: `tools/agent/check-permission-literals.ts`

## Purpose

Find raw role, capability, policy, permission, and visibility literals outside approved policy or map locations.

## Expected Invocation

```powershell
npx tsx tools/agent/check-permission-literals.ts
```

Optional parameters:

- `--scope "<path>"`: restrict search scope.
- `--json`: emit machine-readable output.

## Output

Expected output includes suspicious literals, file locations, and likely policy/control-surface owners.

## Does Not

This tool does not prove authorization is correct. It helps locate scattered permission logic.
