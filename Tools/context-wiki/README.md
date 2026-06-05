# FieldPlatform Context Wiki Tool

This local tool renders and maintains the canonical Markdown wiki in `General context/`.

It does not contain documentation content of its own, does not use a database, and does not create a non-regenerable cache. Markdown in `General context/` remains the source of truth.

## Run

```powershell
cd Tools/context-wiki
npm start
```

Then open the URL printed by the server, usually:

```text
http://localhost:4177
```

If the port is in use:

```powershell
$env:PORT=4180; npm start
```

## Check Without Starting A Long-Running Server

```powershell
cd Tools/context-wiki
npm run check
```

The check reads the wiki, parses frontmatter, builds backlinks, and prints dashboard counts.

## Features

- navigation tree with layer/status labels
- Markdown reader with metadata and source path
- search and layer/status filters
- backlinks and explicit related links
- traceability panel using `related`, `depends_on`, `consumed_by`, and `implemented_by`
- review dashboard for generated/unreviewed pages, missing metadata, changed-since-approval pages, open questions, buildable specs without implementation links, implemented pages needing review, orphan specs, parked/business/stale pages, and git working-tree changes
- git diff view for Markdown/tool files where available
- optional local Markdown editor that writes directly back to the selected file
- approval stamping that records reviewer, timestamp, commit, and a review hash in frontmatter

## Editing Safety

The editor writes the selected Markdown file in `General context/`. It does not write anywhere else.

Use it for local maintenance only. If a change alters product meaning, update the most specific canonical page and keep related metadata/backlinks aligned.
