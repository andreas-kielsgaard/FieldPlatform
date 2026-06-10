# Git Maintenance Instructions

## Purpose

Use this routine when asked to protect the repository as a working ledger and backup system.

The goal is to avoid losing useful work by turning coherent local progress into descriptive commits and pushing the active work branch to `origin`.

This is not a merge, release, or cleanup routine. It is a daily maintenance routine for a project where the user is currently the only active developer and git is serving as both project history and remote backup.

## Project History Basis

The current migration is coordinated from the repository root on `codex/development-readiness`, which tracks `origin/codex/development-readiness`.

Existing project history shows focused branches for substantial streams of work, including mockups, context-wiki work, data-layer work, and the agent operating system migration. Commit messages are short imperative summaries such as "Add source maintenance decision layer" and "Prepare agent OS migration scaffold".

Current root instructions require branch verification, user-owned file protection, no broad promotion of migration folders without explicit request, and reporting branch, changed areas, commit/push status, whether `main` was touched, and deferred migration notes.

Pre-migration maintenance guidance also established the habit of running `git status --short --branch` before edits, treating existing changes as user-owned, and reporting branch, commit hash, push status, conflicts, uncommitted files, verification, and manual-review needs.

## Daily Routine

1. Read the active repository instructions first:
   - root `AGENTS.md`
   - any nearest nested instruction file for paths that may be edited
   - this file
2. Run `git status --short --branch`.
3. Confirm the current branch and upstream.
4. Do not commit directly on `main`.
5. If local changes are on `main`, create or switch to a focused `codex/` branch before committing.
6. Leave explicitly user-owned local files alone unless the user has asked to track them. In this repository, `App.code-workspace` is user-owned and should stay untracked.
7. Inspect changed files with `git diff --stat`, `git diff --name-status`, and focused diffs before staging.
8. Group changes into coherent commits by intent, not by timestamp.
9. Run relevant lightweight checks when the changed area has an obvious check. For doc-only migration notes, `git diff --check` is usually sufficient.
10. Push the branch after committing, setting upstream when needed.
11. If there are no committable changes, still check whether the current branch has unpushed commits and push them.
12. Report what happened clearly.

## Commit Granularity

Prefer one commit per coherent progress unit:

- root migration coordination notes
- target scaffold instruction or map changes
- pre-migration source/context changes
- implementation changes
- generated or tool-maintained artifacts

Split commits when changes are independent enough that reverting one should not revert the other.

Keep related documentation and source changes together when they explain the same change.

Avoid vague "backup" commits unless the worktree is only a temporary checkpoint and no clearer intent can be recovered. Even then, prefer a message such as "Checkpoint migration documentation updates" over "backup".

## Branch Policy

Use the existing active branch when it is already appropriate for the work.

For this migration root, the expected active branch is:

```powershell
codex/development-readiness
```

If a daily maintenance run finds work on `main`, move the work to a `codex/` branch before committing:

```powershell
git switch -c codex/<short-purpose>
```

Do not merge into `main`, rebase public history, delete branches, or collapse worktrees as part of daily maintenance unless the user explicitly asks.

## Staging Rules

Stage intentionally with pathspecs.

Before staging, identify:

- files clearly changed by the current task or previous agent work
- files that are user-owned or local-only
- generated files that belong with a source change
- unrelated changes that should remain unstaged

Use multiple commits when changed paths represent different purposes.

Never use broad staging if the worktree contains known user-owned files or unrelated changes.

## Push Rules

Push only after the commit set is coherent enough to preserve.

Use:

```powershell
git push
```

If the branch has no upstream:

```powershell
git push -u origin <branch>
```

If fetch shows the branch has diverged from the remote, stop and report the divergence instead of forcing history.

Never force-push during daily maintenance unless the user explicitly asks.

## Stop Conditions

Stop and report instead of committing or pushing when:

- the worktree has merge conflicts
- the current branch is unclear or detached
- changes span unrelated projects and cannot be safely grouped
- diffs reveal secrets, credentials, private keys, tokens, or accidental large files
- a nested instruction file forbids committing the changed content without explicit review
- the remote rejects a push for reasons that require human judgment

## Required Report

Include:

- branch used
- commits created, with hashes
- files or areas changed
- checks run
- files intentionally left uncommitted
- push result
- whether `main` was touched
- deferred questions or risks
