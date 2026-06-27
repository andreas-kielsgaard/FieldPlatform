# Structural Maintenance Usage Instructions

## Purpose

Task modes classify modalities for approaching a given task. The mode encapsualtes an approach a developer might take to solve a task. Guding behavior and persepctival lenses. The appropriate modes, behaviors and lenses may change as you come to understand the task better.

A prompt may involve performing many actions, and the appropriate modes of orientation may shift throughout. The task-mode, beahavior and lens framwork offers guidance in how to scope your considerations throughout the task.

These usage instructions propose how you should use that framework.

Before selecting modes, behaviors or lenses, understand the selection offered through the provided map files.

You may-re-ingest any of the files in the agent-attention-system folder and sub folders throughout prompt execution to reinforce their relevance at the current moment of the operation.

## Lightweight Context Loading

Avoid loading all behavior files, lens files, maps, ledgers, skill files, or tool semantic files up front. Evaluate the map files critically and select only what you are sure that you need at any given time. If your selection turns out inadequate, expand.

Tasks moode selection should sometimes be re-evaluate when your understanding of the task significantly changes.

Behaviors usually apply to any sub-task that involve affecting a change to the repo.

Lenses apply to any exploration of context related to a task or behavior.

Skills guide actions that are supported by active project practice, but also require reasoning.

The old broad Agent OS generated index/query tools are retired from ordinary development. Prefer human-maintained maps, selected source reads, `rg`, standard project checks, and the replacement development tools: `change-surface`, `test-selection`, `change-verification`, `repo-health`, and `depcruise:active-source`.

Maps and ledgers are memory surfaces.

Use the compact lens prompts inside selected behavior files for relatively simple contexts.

Use the full lens prompts for operations relevant to a broder contexts.
