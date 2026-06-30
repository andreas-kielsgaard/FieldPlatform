# Agent OS Context Usage

The `agent-os context` commands emit read-only JSON evidence for bounded source inspection. They are deterministic helpers for selecting files, declarations, literal matches, and related structural evidence before editing.

## `schemas`

For: inspecting registered context schemas and capability state.

Use when: you need the machine-readable contract shape for context command envelopes.

Does not: inspect repository source, write schema artifacts, or prove project behavior.

```powershell
corepack pnpm agent-os context schemas --json
```

## `manifest`

For: listing files considered by the Field Platform context adapter and their source policy metadata.

Use when: you need to confirm whether a path is included, excluded, generated, archived, source, test, config, or documentation.

Does not: create a persistent manifest, override source policy, or make excluded files active evidence.

```powershell
corepack pnpm agent-os context manifest --json
corepack pnpm agent-os context manifest --json --with-freshness
```

## `evidence`

For: composing the current structural evidence snapshot from the manifest, TypeScript/TSX declarations, chunks, and dependency edges.

Use when: you need broad, current context-tool evidence before choosing narrower selectors.

Does not: rank relevance, perform search, weave prompts, or write an evidence artifact.

```powershell
corepack pnpm agent-os context evidence --json
corepack pnpm agent-os context evidence --json --with-freshness
```

## `inspect`

For: inspecting composed evidence for one repo-relative path.

Use when: you already know the file you need to evaluate.

Does not: infer related intent, search nearby files, or include excluded source as active source evidence.

```powershell
corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json
corepack pnpm agent-os context inspect --path=apps/web/app/root.tsx --json --with-freshness
```

## `symbols`

For: looking up exact TypeScript/TSX declaration names.

Use when: you know the declaration name and need its defining file, kind, visibility, chunks, or direct evidence.

Does not: perform fuzzy, semantic, ranked, or cross-language symbol search.

```powershell
corepack pnpm agent-os context symbols --name=Layout --json
corepack pnpm agent-os context symbols --name=Layout --path=apps/web/app/root.tsx --json
corepack pnpm agent-os context symbols --name=Layout --json --with-freshness
```

## `search`

For: literal text search over manifest-included local files.

Use when: you know an exact term, label, string, or identifier fragment.

Does not: support regex, fuzzy matching, semantic search, ranking, vector retrieval, or a persistent search index.

```powershell
corepack pnpm agent-os context search --query=visibility --json
corepack pnpm agent-os context search --query=Visibility --case-sensitive --json
corepack pnpm agent-os context search --query=visibility --json --with-freshness
```

## `bundle`

For: composing a bounded evidence bundle from selected paths, exact symbols, and literal queries.

Use when: you need a compact evidence set before editing or reviewing a specific change.

Does not: discover semantic neighbors, rank evidence, traverse dependency graphs beyond direct selected evidence, weave prompts, or write bundle artifacts.

```powershell
corepack pnpm agent-os context bundle --path=apps/web/app/root.tsx --json
corepack pnpm agent-os context bundle --symbol=Layout --json
corepack pnpm agent-os context bundle --query=visibility --json
corepack pnpm agent-os context bundle --path=apps/web/app/root.tsx --symbol=Layout --query=visibility --json --with-freshness
```

## Recommended Agent Workflow

1. Start with `inspect` for known files.
2. Use `symbols` for known declarations.
3. Use `search` for literal terms.
4. Use `bundle` to collect bounded evidence before editing.

## Boundary Notes

The context tooling does not provide semantic search, ranking, vector retrieval, prompt weaving, or a persistent index.

Generated, archive, and excluded files remain governed by manifest source policy. Their presence in output is source-policy evidence, not permission to treat them as active source.
