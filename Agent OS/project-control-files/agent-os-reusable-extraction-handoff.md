# Agent OS Reusable Extraction Handoff

## Purpose

Capture what Field Platform's current Agent OS installation should contribute to a future reusable Agent OS repository extraction task.

This is a handoff only. Do not use it as a generic installer, a separate-repo change request, or permission to generalize Field Platform-specific project decisions.

## Current Reference-Installation State

Field Platform demonstrates a working local installation with:

- a bootloader-driven attention system for task modes, structural-maintenance behaviors, lenses, skills, and tool routing;
- a project-control routing map that keeps Agent OS guidance separate from human-owned project decisions;
- adapter-neutral `agent-os context` command wording, JSON envelopes, and schema registry surfaces;
- a Field Platform context adapter config that declares source groups, generated/archive policy, capabilities, and evidence producers;
- `evidenceProducers.dependencyCruiser` as a toggleable adapter producer;
- dependency-cruiser evidence implemented under `tools/agent-tools/src/context/evidence-producers/dependency-cruiser`.

Do not generalize from Field Platform:

- app source roots, package layout, domain vocabulary, project decisions, generated-output paths, archive rules, or validation scripts;
- React, TypeScript, pnpm, dependency-cruiser, or monorepo assumptions as mandatory Agent OS requirements;
- current local command names as the final reusable repository interface without a separate contract decision.

## Proposed Reusable Agent OS Layers

- Core: bootloader, attention-system maps, task modes, behaviors, lenses, skills, execution guidance, and evidence-vs-authority rules.
- Adapters: per-repository configuration for source groups, source policy, generated/archive exclusions, capabilities, and enabled evidence producers.
- Plugins/evidence producers: optional deterministic evidence integrations with explicit config, output metadata, and disabled/unavailable behavior.
- Install instructions: implementation-agent guidance for placing core files, creating an adapter, wiring scripts, and choosing only supported plugins.

## Concrete Extraction Candidates

- Bootloader and attention system: `agent-os-bootloader.md`, execution instructions, maps, task modes, behaviors, lenses, and skills.
- Project-control routing pattern: `project-setup-map.md` as a local router into project-owned decisions and source/config authority.
- Context command envelope/schema registry: reusable command-envelope and schema-registry pattern without changing current JSON shape.
- Adapter config contract: adapter ID, repo identity, source groups, source policy, generated/archive flags, capabilities, and evidence producer toggles.
- Evidence producer contract/pattern: deterministic producer inputs, source-policy boundaries, status metadata, unavailable/disabled behavior, and schema validation.
- Dependency-cruiser producer: first plugin example, kept optional and configured by adapter roots/config rather than core assumptions.

## Field Platform-Specific Material To Keep Local

- Source roots such as `apps/web/app`, `apps/web/src`, and `tools/agent-tools/src`.
- Human-owned project decisions under repository-root `project-decisions/**`.
- Package scripts, command composition, and local validation profile.
- pnpm, React, TypeScript, Drizzle, Biome, and web-app assumptions.
- Dependency-cruiser roots, `dependency-cruiser.config.cjs`, and boundary rules.
- Generated/archive policy details for React Router output, builds, reports, coverage, and `Archive/`.

## Target-Repo Implications

- Convivial Medicine should be the Python/FastAPI/data-pipeline portability test for adapter and plugin assumptions.
- Personal Finance Orchestrator should be the greenfield install test for implementation-agent instructions.
- Job App should be the messy/adoption-mode test after the first two targets, because its adoption complexity is second priority.

## First Reusable Repo Implementation Sequence

1. Create the reusable Agent OS repository structure.
2. Migrate or copy reusable core docs from the Field Platform installation.
3. Define the adapter contract before adding more project adapters.
4. Define the plugin/evidence producer contract before expanding producer inventory.
5. Write install instructions for an implementation agent, including what remains project-local.
6. Validate against the first target repositories, but do not try to support every target repo in the first pass.
