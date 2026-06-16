# Component Conceptualization Review

## Status

Deferred.

## Note

The component registry assumes that "component" is a meaningful structural unit for the Agent OS. That is probably useful for UI work, but the concept may be underspecified.

Future review should decide whether the Agent OS distinguishes:

- visual primitives
- shared UI components
- page shells
- route-level surfaces
- product/domain components
- local page fragments
- generated examples or stories
- component-like non-UI artifacts

The current tooling and task modes may be underpowered if every reusable UI surface is treated as the same kind of component. Structural-maintenance behavior may need clearer language for when a UI fragment becomes a shared component, when it remains local, and when it belongs to a design-system primitive rather than a product surface.
