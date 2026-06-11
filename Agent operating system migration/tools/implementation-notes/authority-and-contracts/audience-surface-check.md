# Tool Implementation Note: Audience Surface Check

## Intended Functionality

Classify the intended audience of maintained content and flag likely audience drift, such as agent-critical guidance living only in README prose or human-only explanation living in runtime instruction files.

## Suggested I/O

Input:

- file path
- optional line range
- optional intended audience
- optional `--json`

Output:

- likely audience classification
- confidence
- audience-drift findings
- suspected agent-critical rules in human-facing docs
- suspected human explanation in runtime prompts
- suggested target surface type

## Feasibility Reasoning

High feasibility for path-based classification and known surface types.

Medium feasibility for detecting agent-critical guidance from language patterns. The tool should identify likely issues, not rewrite or decide final placement.

## Proposed Implementation Path

1. Classify file role by path, filename, extension, and known Agent OS folders.
2. Scan content for normative language, instruction verbs, product copy cues, generated markers, and migration-only phrasing.
3. Compare detected content type with expected audience for the file role.
4. Emit findings with confidence, line references, and suggested target surface.
