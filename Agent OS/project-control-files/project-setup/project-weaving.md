# Project Weaving

## Purpose

Explain how the base Agent OS is applied to the Field Platform scaffold.

## Operating Pattern

The base Agent OS owns global routing, task modes, structural maintenance, skills, tools, generated evidence, and cue-based runtime behavior.

The Field Platform project setup layer owns project-specific decisions that future agents must preserve while building product code:

- accepted stack and workspace shape
- product identity and MVP proof
- domain authority separations
- data-model and schema rails
- testing and deployment rails
- generated project evidence expectations

For Field Platform architecture, schema, feature, boundary, testing, deployment, or structural-maintenance work, load `project-control-files/project-setup-map.md`, then load only the `project-setup/` file that matches the concern.

## Authority Boundary

Use this order for project-specific setup questions:

1. Explicit user request.
2. Root migration safety instructions while staged.
3. `agent-os-bootloader.md` bootloader behavior.
4. `project-control-files/project-setup-map.md` and selected `project-setup/` setup files.
5. Existing project-control files.
6. Source, tests, generated evidence, and tool output.

Generated indexes and scripts provide evidence. They do not decide product authority, ownership, domain meaning, or architectural fit.
