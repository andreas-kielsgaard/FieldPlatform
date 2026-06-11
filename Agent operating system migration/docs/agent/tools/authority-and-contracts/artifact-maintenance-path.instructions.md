# Tool: Artifact Maintenance Path

Tool ID: `artifact-maintenance-path`

Script: `tools/agent/authority-and-contracts/artifact-maintenance-path.ts`

## Purpose

Classify whether an artifact appears manually authoritative, generated, indexed, derived, tool-maintained, stale, or unknown, then suggest the safest maintenance path.

This tool covers the operable part of provenance. It gathers repository evidence about maintenance path; it does not prove authorship or ownership.

## Expected Invocation

```powershell
npx tsx tools/agent/authority-and-contracts/artifact-maintenance-path.ts "<artifact-path>"
```

Optional parameters:

- `--producer "<tool-id-or-script>"`: provide a suspected producer.
- `--source "<path>"`: provide a suspected source input.
- `--json`: emit machine-readable output.

## Output

Expected output includes maintenance classification, confidence, evidence, likely producer or source input, direct-edit safety, freshness risk, downstream consumers, and suggested maintenance path.

## Does Not

This tool does not prove who authored an artifact, decide semantic authority, regenerate outputs, or prevent a maintainer from choosing a manual override.
