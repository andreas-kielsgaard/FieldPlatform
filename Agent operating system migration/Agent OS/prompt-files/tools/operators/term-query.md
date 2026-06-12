
# Operator: term-query

Stratum: 2 deterministic query handle.

## Capability

Query terms across prose, identifiers, headings, UI-looking literals, and co-occurrence contexts.

## Use When

Use when naming, ontology, domain language, or copy drift evidence is needed.

## Substrate

term-index

## Handles

canonical, all, identifiers, ui-literals, cooccurs, drift, replace-preview

## Execution

```powershell
npx --yes tsx tool-implementations/operators/term-query.ts "<query>" --limit 20 --json
```

## Output Boundary

This operator returns bounded evidence, warnings, inferred risk, and suggested next checks. It does not edit files or decide ownership, audience, authority, contract meaning, or abstraction quality.
