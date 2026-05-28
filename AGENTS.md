# AGENTS.md

Guidance for AI coding agents, planning agents, and review agents working in this repository.

## First Principle

FieldPlatform is guided by `General context/`. Treat those documents as the designer-controlled source of truth.

Mockups, code, data-layer work, and agent convenience are expressions of that source of truth. They do not automatically update it.

The canonical context now lives as a wiki under `General context/`. Start at `General context/README.md`, then use `General context/Maintenance/Context maintenance for agents.md` for update rules. The local app under `Tools/context-wiki/` only renders/reviews/edits those Markdown files; it is not a separate documentation source.

This file is a bootstrap guide for agents. It tells agents how to enter the project; it does not replace `General context/` as product/design authority.

## Worktree Safety

Before editing, run:

```powershell
git status --short --branch
```

If there are existing modified files, assume they are user-owned. Do not overwrite, reformat, revert, or commit them unless the user explicitly asks. Be especially careful with files under `General context/`.

## Before Work

Before product, mockup, UI, data-model, or design work, read:

- `General context/README.md`
- `General context/Principles/What FieldPlatform is for.md`
- `General context/Principles/What FieldPlatform should not become.md`
- `General context/Maintenance/Context maintenance for agents.md`
- `General context/Maintenance/Design process and wayfinding.md`

Then read task-specific docs as needed:

- object surfaces: `General context/Frontend/Surface grammar.md`
- language/copy: `General context/Frontend/Language and copy rules.md`
- data/model work: `General context/Architecture/Data layer overview.md`, `General context/Data layer/`, and `Platform data layer/README.md`
- access/middle-layer work: `General context/Architecture/Access layer overview.md` and `General context/Access layer/`
- flows/features: `General context/User stories/`, `General context/Frontend/Views overview.md`, and `General context/Frontend/Modules overview.md`
- dev/debug tools: `General context/Architecture/Development tools.md`
- conviviality/pilot work: `General context/Parked/Conviviality and pilot hypotheses.md`

## Authority

When sources conflict:

1. Current user instruction for the immediate task.
2. Current `General context/` documents as design authority.
3. `Platform data layer/` docs and implementation for current interface truth.
4. Mockup-local README/docs for the artifact being edited.
5. `Archive/` only when explicitly requested.

Treat `generated/unreviewed` and `needs-human-review` as review workflow states, not as reasons to ignore current General context. Agents can trust current wiki pages unless a page is explicitly parked, stale/deprecated, or framed as an open question.

If the current task conflicts with General context, surface the conflict. Do not silently rewrite General context.

## Context Change Gate

Do not update, commit, merge, or push files under `General context/` unless:

- the user explicitly requested the context change, or
- user feedback changes a durable principle and the proposed document change has been summarized for review.

Treat approval to build a mockup as approval to follow existing context, not approval to rewrite it.

Before committing, merging, or pushing context-document changes, summarize the meaning of the changes and ask for explicit user review.

When context changes are requested, update the most specific canonical wiki page, keep frontmatter/backlinks/traceability current, and avoid duplicate summaries. Use the context wiki dashboard to find missing metadata, changed-since-approval pages, parked material, and implementation/spec mismatches.

## Repository Map

Use `REPOSITORY_MAP.md` for source structure, edit boundaries, generated-output guidance, and verification commands.

High-level areas:

- `General context/`: designer-controlled product/design authority.
- `Tools/context-wiki/`: local renderer/reviewer/editor over `General context/` Markdown.
- `Platform data layer/`: shared model, calculations, data access, browser bundle, and dev tool.
- `Mockups/`: exploratory HTML/CSS/JS surfaces.
- `Archive/`: historical/generated reference only.

## Core Guardrails

FieldPlatform is not primarily an event marketplace, resource catalogue, CRM, productivity dashboard, social feed, or organizer funnel.

It supports self-resourcing through field awareness.

Do not digitize the living field. Digitize the thresholds where the living field becomes illegible.

Use plain user-facing language. Do not leak internal principles or data-model terms into ordinary UI.

Everyone is a participant first.

When unsure, ask whether the work helps people return to contact with life, or asks life to serve the app.

## Verification And Reporting

Before reporting completion, inspect local docs, package files, README files, or existing scripts for relevant verification commands.

Do not invent commands.

Completion reports should include:

- branch used
- files or areas changed
- whether changes were committed or pushed
- whether `main` was touched
- what changed functionally
- what was verified
- whether manual review is still needed
