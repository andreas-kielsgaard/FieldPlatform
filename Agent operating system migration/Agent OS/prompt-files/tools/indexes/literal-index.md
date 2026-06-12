
# Index: literal-index

Stratum: 1 generated or maintained substrate.

## Capability

Quoted strings, policy-like values, status-like values, token-like values, and arbitrary style-like values.

## Use When

Use when repeated literal, policy, status, or design-token drift evidence is needed.

## Responsible Object

- Builder: `build-literal-index`
- Script: `tool-implementations/indexes/build-literal-index.ts`
- Artifact: `tool-maintained-files/indexes/literal-index.json`

## Execution

```powershell
npx --yes tsx tool-implementations/indexes/build-literal-index.ts --json
npx --yes tsx tool-implementations/indexes/build-literal-index.ts --check --json
```

## Output Boundary

It cannot tell whether a literal is product copy, test data, or implementation detail without context. The index is evidence, not semantic authority.
