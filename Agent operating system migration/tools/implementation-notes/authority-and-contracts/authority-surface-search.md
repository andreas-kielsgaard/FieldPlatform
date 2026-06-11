# Tool Implementation Note: Authority Surface Search

## Intended Functionality

Find and classify repository surfaces that mention or define a rule, convention, expectation, term, or source-of-truth statement.

The tool should provide evidence for authority reasoning without deciding authority itself.

## Suggested I/O

Input:

- term, rule summary, file path, or tool ID
- optional surface filter
- optional path filter
- optional `--json`

Output:

- matches grouped by likely role
- file path, line, heading, and excerpt
- role classification: authoritative, explanatory, implementation, generated/derived, test expectation, provisional, stale, conflicting, unclear
- duplicate or conflicting authority candidates

## Feasibility Reasoning

High feasibility for finding occurrences and classifying by path conventions, headings, filenames, and artifact type.

Medium feasibility for semantic role classification. The tool should expose evidence and confidence rather than making final authority decisions.

## Proposed Implementation Path

1. Search text with `rg` or equivalent library calls.
2. Parse nearby headings and frontmatter when available.
3. Classify surfaces by path patterns: `AGENTS.md`, `docs/agent`, tests, schemas, README files, migration notes, generated indexes, tool instructions.
4. Detect conflict candidates by repeated normative verbs or divergent definitions near the same term.
5. Emit grouped findings with confidence and suggested review surfaces.
