# Tool Implementation Note: Artifact Maintenance Path

## Intended Functionality

Classify a repository artifact's maintenance path using deterministic evidence. The tool should report whether an artifact appears manually authoritative, generated, indexed, derived, tool-maintained, stale, or unknown.

This is the provenance-shaped tool, but it should avoid authorship claims. Its purpose is to answer how an artifact should be maintained, not who created it.

## Suggested I/O

Input:

- artifact path
- optional suspected producer tool ID or script
- optional suspected source input path
- optional `--json`

Output:

- maintenance classification
- confidence
- evidence list
- likely producer or source input
- direct-edit safety: yes/no/uncertain
- freshness risk
- downstream consumers
- suggested maintenance path

## Feasibility Reasoning

High feasibility for visible evidence: generated headers, index directories, script references, tooling-map entries, tool instruction outputs, checksums/manifests, and conventional generated paths.

Medium feasibility for freshness and producer discovery because not all generated artifacts encode provenance.

The tool should prefer `unknown` over false certainty.

## Proposed Implementation Path

1. Inspect file content for generated markers, producer comments, checksums, and source references.
2. Search tool instruction files and tooling map entries for the artifact path or containing directory.
3. Search scripts for writes to the artifact path or directory.
4. Check structural index and generated-output conventions.
5. Optionally compare file modified time against source inputs when known.
6. Emit JSON with classification, confidence, evidence, and maintenance-path recommendation.
