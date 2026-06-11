# Logging Strategy Review

## Status

Deferred.

## Note

`decision-log.md` was deleted from the root agent folder in this pass.

Future migration work should decide how the Agent OS handles durable logging. Open options include:

- no standing decision log
- lightweight architecture decision records under project setup
- task-mode-specific history files
- generated summaries from commits or PRs
- issue/PR-based logging outside the repo instruction scaffold
- a tool-maintained log that records only durable decisions and not ordinary activity

The review should clarify what deserves logging, who maintains it, whether agents should read it directly, and how logs avoid becoming stale narrative context.
