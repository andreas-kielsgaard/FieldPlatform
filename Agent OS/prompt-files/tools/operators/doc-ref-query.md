
# Operator: doc-ref-query

Stratum: 2 deterministic query handle.

## Capability

Query docs links, headings, file references, inline IDs, and broken local references.

## Use When

Use when documentation drift, authority mentions, or reference freshness evidence is needed.

## Substrate

doc-reference-index

## Handles

path refs, headings, inline IDs, broken links

## Execution

```powershell
npx --yes tsx tool-implementations/operators/doc-ref-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
