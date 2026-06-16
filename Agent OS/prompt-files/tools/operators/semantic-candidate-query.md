# semantic-candidate-query

Stratum 2 candidate operator over `semantic-chunk-index`.

Use this when a task needs fuzzy recall or near-match leads and exact operators such as `path-query`, `term-query`, `symbol-query`, `component-query`, or `doc-ref-query` are too narrow.

Run:

```powershell
npx --yes tsx tool-implementations/operators/semantic-candidate-query.ts "query terms" --limit 20 --json
```

Output cues:

- observed candidate chunks with file, line, score, matched terms, and chunk hash
- warnings when the semantic chunk artifact is missing, stale against local Agent OS changes, or contract-shaped incorrectly
- reminders that embeddings and vector stores are not active
- suggested follow-up checks such as `retrieve-slice`

Boundaries:

- This operator returns lexical candidate chunks only.
- It does not decide whether a candidate is the right owner, abstraction, authority, audience, or concept match.
- It treats stale or malformed semantic artifacts as uncertainty, not as absence evidence.
- No file mutation happens through this operator.
