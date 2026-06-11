# Tool: Component Usage

Tool ID: `component-usage`

Script: `tools/agent/discovery-and-usage/component-usage.ts`

## Purpose

Find component imports, consumers, examples, stories, tests, and nearby similar components.

## Expected Invocation

```powershell
npx tsx tools/agent/discovery-and-usage/component-usage.ts "<component-name-or-pattern>"
```

Optional parameters:

- `--json`: emit machine-readable output.
- `--paths "<glob-or-path>"`: restrict search scope.

## Output

Expected output includes consumer files, import paths, usage counts, example/story references, and likely related components.

## Does Not

This tool does not decide whether a component should be shared. Use structural-maintenance behavior, mode instructions, and relevant slices of `generated-indexes/component-registry.md` for that judgment.
