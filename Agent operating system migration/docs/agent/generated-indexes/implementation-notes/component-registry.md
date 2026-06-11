# Generated Index Note: Component Registry

## Purpose

The component registry should index reusable UI components, primitives, variants, stories/examples, tests, consumers, and lifecycle status.

Its role in the Agent OS is to help agents reuse or extend existing UI surfaces without inventing duplicate components or treating local page markup as shared architecture too early.

## Expected Contents

- Component name.
- Canonical path.
- Component kind or layer.
- Purpose and ownership.
- Props/API summary.
- Variants.
- Stories/examples.
- Tests.
- Consumers.
- Lifecycle status.
- Extraction or retirement candidates.

## Maintained Or Accessed By

- `component-usage`
- `map-components`
- `find-similar-pattern`
- `contract-impact`
- `contract-test-coverage`
- `artifact-maintenance-path`

## Access Pattern

Agents should query by component, variant, consumer, or candidate pattern. Full ingestion should be avoided once the registry becomes real.

## Implementation Direction

Start with exported component discovery and usage search. Add story/test detection, prop extraction, visual primitive tagging, and lifecycle classification later.
