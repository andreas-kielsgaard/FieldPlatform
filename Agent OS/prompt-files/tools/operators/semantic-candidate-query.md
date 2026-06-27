# semantic-candidate-query

Legacy inactive: retained for the retired Agent OS generated index/query pipeline. Do not use for ordinary development; use only when an explicit legacy Agent OS index/tool maintenance task calls for it.


Stratum 2 candidate operator over `semantic-chunk-index`.

Legacy use only: this was for tasks needing fuzzy recall or near-match leads when exact legacy operators such as `path-query`, `term-query`, `symbol-query`, `component-query`, or `doc-ref-query` were too narrow.

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
