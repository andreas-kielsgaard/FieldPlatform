# Agent-Driven Documentation Note

## Purpose

This note is maintained by agents during the migration. It records documentation requirements discovered while executing prompts.

Agents should update this note only from context already encountered during the current prompt. Do not read extra files solely to update this note.

## Current Documentation Requirements

### README Boundary

README files should be treated as human-facing documentation. Agent-critical behavior must be represented in the corresponding agent instruction surface before agents rely on it.

### Task-Mode Documentation

The task-mode README content was moved into migration documentation as human-facing material. Agent-facing task-mode behavior should remain in `task-mode-map.md` and the individual task-mode `.instructions.md` files.

### Task-Mode Usage Instructions

The migrated instruction draft should stay small and route agents into task-mode usage rather than carrying every task-mode procedure inline. The task-mode layer now has a dedicated `task-mode-usage.instructions.md` file for agent-facing mode entry, context-loading, mode declaration, and completion behavior.

During migration, the proposed future `AGENTS.md` content is stored as `Agent operating system migration/Agent OS/migration_agents.md` so it is not automatically ingested as active instructions.

### Task-Mode Selection Layering

The intended chain is `AGENTS.md` for global context, `task-mode-usage.instructions.md` for consuming the task-mode layer, `task-mode-map.md` for selecting primary and secondary modes, and individual mode files for mode-specific requirements. Human documentation should explain this chain without requiring readers to front-load every mode file.

### Tool Placeholder Documentation

Tool semantic docs now refer to Stratum 1 builder scripts and Stratum 2 operator scripts when a check or lookup is script-backed. Human-facing documentation should clarify that active Stratum 1 and 2 entries need a map row, semantic file, and executable script, while proposed future tools should remain proposal notes until implemented.

### Tooling Map And Tool Instructions

The agent OS now separates index discovery, deterministic tool discovery, and tool execution. Mode files, structural-maintenance behaviors, and skills refer to logical tool IDs. Logical tool IDs resolve through `Agent OS/prompt-files/tools/tool-map.md`; Stratum 1 substrates resolve through `Agent OS/prompt-files/tools/index-map.md`.

This makes tool support a maintained OS surface: adding a new mode, behavior, or skill tool requirement should be treated as a human-owned maintenance action that verifies the relevant map row, semantic file, script, expected capability, and output boundary.

Human documentation should explain the grouped tool structure: `Agent OS/prompt-files/tools/index-map.md` owns Stratum 1 index discovery, `Agent OS/prompt-files/tools/tool-map.md` owns Stratum 2 operator discovery, `Agent OS/prompt-files/tools/indexes/*.md` and `Agent OS/prompt-files/tools/operators/*.md` own semantic contracts, and `Agent OS/tool-implementations/indexes/*.ts` plus `Agent OS/tool-implementations/operators/*.ts` own execution.

Human documentation should explain that active tool contract changes are not autonomously maintained by agents. Agents may identify tool gaps or improvement proposals during reflective work, but active changes to index rows, tool rows, semantic files, scripts, or tool maintenance rules require a human-initiated Agent OS maintenance task.

### Tool Implementation Modularity

Human documentation should explain that `Agent OS/tool-implementations/_lib/` is shared implementation support, not a central tool registry. Shared modules should exist only around real reusable mechanics such as CLI parsing, file walking, git access, JSON stability, artifact classification, index runner behavior, query runner behavior, and reusable source scanners.

Each Stratum 1 builder script should own its own `IndexDefinition`, including index ID, producer, artifact path, source inputs, coverage, and known blind spots. Each Stratum 2 operator script should own its own operator ID and index substrates. This keeps tool identity and capability close to the executable entrypoint, while `_lib` supplies mechanics.

Record-building logic should live in focused modules under `Agent OS/tool-implementations/_lib/records/` rather than in a single prompt-era runtime file. If a future helper is shared only because two tools happen to live in the same prompt or migration batch, it should stay local until a real shared surface emerges.

### Tool And Skill Strata

The migrated scaffold now uses a bootloader-oriented tool and skill model rather than a single peer tool registry. Human documentation should explain that the proposed migrated `AGENTS.md` is currently stored as `Agent operating system migration/Agent OS/migration_agents.md` and acts as an Agent OS bootloader: it keeps compact maps available, then starts execution through `task-mode-usage.instructions.md`.

Human documentation should describe the four operational strata:

- Stratum 1 indexes are generated or maintained evidence substrates described by `Agent OS/prompt-files/tools/index-map.md`, with semantic files under `Agent OS/prompt-files/tools/indexes/`, builder scripts under `Agent OS/tool-implementations/indexes/`, and JSON artifacts under `Agent OS/tool-maintained-files/indexes/`.
- Stratum 2 tools are deterministic query handles described by `Agent OS/prompt-files/tools/tool-map.md`, with semantic files under `Agent OS/prompt-files/tools/operators/` and executable scripts under `Agent OS/tool-implementations/operators/`.
- Stratum 3 skills are aggregator routines for bounded multi-tool evidence packets.
- Stratum 4 skills are reasoning workflow guides that help agents decide how to use evidence without delegating semantic judgment to tools.

Human documentation should explain that `Agent OS/prompt-files/tools/tool-usage.instructions.md` and `Agent OS/prompt-files/skills/skill-usage.instructions.md` are bootloader slices. They introduce activation boundaries, context-budget traps, and semantic-delegation limits without requiring agents to load every skill or tool file by default.

Human documentation should note that old peer-tool IDs such as direct usage, impact, check, and source-map tool names have been retired from active scaffold references. The new active maps should be presented as the discovery surfaces: `skill-map.md`, `index-map.md`, and `tool-map.md`.

Human documentation should distinguish generated evidence from reporting truth. `change-index.json` is a current working-tree evidence surface and may intentionally summarize only current in-scope paths; git status remains the authoritative source for the full migration diff, including deletions of retired tool surfaces.

### Agent OS Initiation And Cue-Based Runtime

Human documentation should explain that Agent OS has a firm initiation step followed by cue-based runtime behavior. Initiation means loading the introductory bootloader, compact task-mode, behavior, lens, skill, index, and tool maps, then entering task-mode usage. Generated JSON indexes should remain query surfaces, not boot-time prompt context.

Phase A adds `Agent OS/tool-maintained-files/indexes/index-manifest.json` as the generated index artifact that is safe for mandatory boot context. Human documentation should explain that the manifest gives compact awareness of index tiers, freshness, size, record count, content hash, producer, schema version, source revision, and suggested first operator, while raw index record arrays remain query-only.

Documentation should distinguish `index-manifest` from the evidence indexes it summarizes. The manifest has a mandatory boot-context row for itself, boot-core rows for source orientation and trust cues, strong-cue rows for likely shared-surface checks, and specialized-cue rows for narrow evidence needs. Its self-row intentionally omits a self content hash to avoid self-referential freshness churn.

Cursor-style Phase A documentation should be limited to local manifest substrate metadata and query guidance. Embeddings, FAISS, vector search, MPC, and shared semantic search infrastructure remain deferred topics rather than current Agent OS behavior.

Phase B adds deterministic index-maintenance metadata to every generated index artifact. Human documentation should explain that schema v2 index artifacts include builder-owned maintenance commands, record-count shards, per-shard hashes, and semantic-support status. These fields are generated by the index runner and summarized by `index-manifest`; humans should not hand-maintain them.

Human documentation should describe `build-all-indexes` as the deterministic maintenance path for refreshing or checking the full index set and manifest together. Agents may use manifest cues to notice stale, missing, or legacy metadata, but remediation should route through the relevant builder or `build-all-indexes`, not manual metadata edits.

Semantic support is now represented as metadata readiness, not as generated embeddings or a vector store. Documentation should preserve the boundary: boot context may expose whether semantic retrieval support exists and how it would be deterministically maintained, while semantic chunks, embedding vectors, and vector-store payloads remain query-only future substrates.

Phase readiness documentation should define gates between Phase 1/2 metadata infrastructure, Phase 3 semantic candidate retrieval, and future Phase 4 semantic retrieval hardening. Phase 3 is active once boot manifest rows, map/semantic/script coverage, deterministic full-index maintenance, generated metadata checks, semantic chunk generation, and query-only activation boundaries are stable.

Phase B cleanup established `build-all-indexes` as an explicit index-maintenance command with its own semantic contract, and moved active index membership into a shared catalog used by both the manifest builder and full-index maintenance helper. Human documentation should explain that Phase 3 semantic builders stay out of full-index maintenance until deliberately promoted into that active catalog.

Phase 3 start adds a separate semantic-layer contract rather than folding fuzzy retrieval into the active index catalog. Human documentation should explain that `Agent OS/prompt-files/tools/semantic-map.md` is compact boot-readable awareness, while `tool-maintained-files/semantic/semantic-chunk-index.json` is a query-only generated artifact refreshed by `tool-implementations/semantic/build-semantic-chunk-index.ts`. The initial `semantic-candidate-query` operator returns lexical candidate chunks with explicit no-embedding/no-vector warnings; candidates need follow-up source reads or exact operators before semantic conclusions.

Documentation should also describe `agent-os-contract-check` as the residual-risk guard for Agent OS maintenance. It verifies that active index, tool, and semantic-layer rows have matching semantic files, scripts, and generated artifacts, and that reserved embedding/vector surfaces remain reserved until deliberately implemented. This check is structural alignment evidence, not proof that the prompts or generated records are semantically correct.

Phase 4 documentation should treat embeddings, vector stores, semantic artifact sharding, freshness policy, and query-ranking evaluation as hardening work behind the existing semantic map and `semantic-candidate-query` interface unless the user explicitly changes the Agent OS IDs. Phase 4 should also clarify which expensive semantic artifacts are maintained by `build-all-indexes`, which stay separate, and what stale-payload warning operators should emit before agents rely on semantic absence.

Phase 4 should be validated against contra-indicators before implementation. It should not add large semantic payloads, embedding vectors, vector indexes, raw chunk records, or broad result sets to mandatory boot context. It should not make semantic retrieval a default step for ordinary tasks when exact indexes, bounded slices, or already-loaded context are cheaper. It should not let vector similarity decide authority, ownership, audience, abstraction fit, or whether two concepts mean the same thing. Any embedding or vector layer should clue likely candidates and uncertainty, then route agents back to source reads, exact operators, modes, behaviors, lenses, or skills for judgment.

Phase 4 documentation should preserve the insight driving the current semantics: Agent OS initiates firmly but operates by cues after initiation. New semantic infrastructure is acceptable when it lowers context cost, improves recall, or exposes uncertainty without increasing boot load or procedural compulsion. If a proposed Phase 4 feature requires agents to load more by default, treat tool output as semantic truth, or maintain expensive metadata manually, it should be rejected or redesigned.

Phase 4 implementation adds semantic hardening without expanding boot payloads. Human documentation should explain that `semantic-candidate-query` now reports semantic artifact contract warnings and local Agent OS semantic-input freshness warnings, while `agent-os-contract-check` validates the semantic chunk artifact shape. This keeps semantic retrieval as candidate evidence and makes stale or malformed payloads visible before agents rely on absence.

Before application architecture and technology choices begin, human documentation should describe an Agent OS pre-development hardening gate. The gate should confirm that the bootloader and maps are stable, contract checks pass, generated artifacts are portable enough for committed use, volatile indexes such as working-tree change indexes have an explicit commit policy, technology choices are represented as decision surfaces rather than accidental defaults, and app-code intelligence upgrades are deferred until real product substrate exists.

Human documentation should distinguish local generated-index truth from committed generated-index truth. During local work, generated artifacts should represent the current local repository state. When generated artifacts are included in a commit, they should represent the source structure being committed, and `change-index` should use committed-baseline/commit-view behavior when local dirtiness would otherwise be captured in history. If local uncommitted work remains after committing, documentation should cue agents to refresh the local generated view again.

Human documentation should explain that generated Agent OS artifacts use paths relative to the Agent OS root rather than machine-specific absolute paths. Agents should run tools from the Agent OS root or pass `--root` after directory restructuring, and `agent-os-contract-check` should be described as the deterministic guard against structured absolute-path leaks in tool-maintained JSON.

Human documentation should make clear that `project-control-files/technology-architecture-map.md` is provisional. It records architectural pre-decisions and defaults to support deliberate setup, but it should not be read as final technology selection while relevant architecture choices remain open.

Pre-development documentation should explain that readiness is partly deterministic and partly semantic. Deterministic checks can verify Agent OS contract alignment, generated artifact portability, index freshness, and JSON validity. Semantic readiness still belongs to project-control guidance around unresolved choices, development environment setup, and the right timing for application-specific index/tool hardening.

Embeddings and vector stores should be documented as deferred pre-development work unless architecture choices settle enough to define provider/model, local versus remote execution, vector-store lifecycle, privacy, cache/commit policy, refresh cost, and usefulness triggers. Until then, the supported semantic retrieval path remains lexical semantic chunks plus exact indexes and bounded source reads.

Development notes should capture deferred hardening actions with right-timedness triggers rather than treating them as backlog trivia. AST/LSP-backed indexing belongs after TypeScript workspace and product source exist; test relevance mapping belongs after runner, route, package, and fixture conventions exist; route/component/schema/accessor index hardening belongs after those application surfaces are real; dependency-boundary enforcement belongs after package boundaries are accepted; public tool or MCP integration belongs after local deterministic evidence paths prove their value.

Public tool-integration research should be documented as a backend hardening roadmap behind stable Agent OS IDs, not as authority to add new boot mandates. Exact search, AST/LSP providers, vector stores, and shared search services should be framed as possible substrates for existing indexes, operators, and skills unless a later human-initiated Agent OS maintenance task changes the maps.

Documentation should translate research phrases like "mandated minimum toolchain" into the current Agent OS language: firm initiation loads the bootloader, compact maps, and `index-manifest`; after that, boot-core indexes, skills, and operators are strong cues or evidence aids, not forced execution paths.

After initiation, task modes, behaviors, lenses, skills, tools, report fields, and memory updates should be described as cues rather than mandatory checklists. The Agent OS should help agents notice likely context, evidence, risks, and maintenance surfaces while leaving proportional judgment with the agent.

Documentation should preserve the one hard runtime gate: agents must not autonomously rewrite Agent OS global routing, task modes, structural-maintenance behaviors, lenses, skills, tool contracts, indexes, or tool-maintenance rules unless the user explicitly asked for Agent OS maintenance. Outside that gate, missing guidance should be recorded as a proposal or migration note.

### Agent OS Map And Generated Source Discovery

Human documentation should describe `Agent OS/prompt-files/agent-os-map.md` as the lightweight Agent OS orientation router. It points to task modes, structural maintenance, project control, tools, ledgers, tool-maintained indexes, and memory surfaces; it is not a source-tree index and should not become a broad semantic map.

Human documentation should distinguish the Agent OS map from generated source-tree discovery. Source-tree directory data now lives in `Agent OS/tool-maintained-files/indexes/path-index.json`, is refreshed by `build-path-index`, and is queried through `path-query` with a bounded scope. The generated path index contains navigation data such as directory and file names, not file contents or semantic authority.

### Tool-Maintained Index Access APIs

Tool-maintained indexes should be documented as generated lookup artifacts accessed through matching builders and query operators. Query tools should return bounded slices with freshness and uncertainty notes. Builder tools should refresh generated artifacts or report that refresh is unavailable.

Human documentation should explain that generated indexes are not default orientation files for task modes. Manual authority surfaces such as `domain-glossary.md`, `known-debt.md`, `experiments.md`, `design-system-map.md`, and `project-control-files/technology-architecture-map.md` remain appropriate direct reads when selected modes require them.

The retired generated-index documentation folder and the related generated-index review notes were archived under `Migration notes/archive/generated-indexes/`. Human documentation should not present that archive as an active Agent OS runtime surface.

Future documentation should preserve the open design question around generated, manual, and hybrid maps, including whether any generated index should keep a curated memory snippet and how tooling would protect that curated content.

### Agent OS Folder Structure

Human documentation should explain that the target scaffold now lives under `Agent operating system migration/Agent OS/` during migration.

- `migration_agents.md` is the proposed migrated bootloader.
- `prompt-files/` contains persistent agent instruction files, including task modes, structural-maintenance behaviors, lenses, skills, tools, the Agent OS map, and the task-mode, behavior, lens, skill, index, and tool maps.
- `project-control-files/` contains project-control maps, currently `technology-architecture-map.md`.
- `tool-implementations/` contains executable tool code and shared runtime support.
- `tool-maintained-files/` contains generated or tool-owned artifacts such as indexes.
- `output-files/` contains run outputs such as reports and logs.

### Prompt File Memory Surfaces

Human documentation should explain the top-level `Agent OS/prompt-files/*.md` files and sibling subfolders as standing agent memory surfaces, not as files an agent should load by default. They should be presented by role: ledgers, checklists, structural-maintenance guidance, task modes, skills, tools, and memory maps.

Documentation should clarify that task modes and structural-maintenance behaviors route agents into the relevant root maps only when a task touches that surface. Root maps should stay concise and update-rule driven so they remain usable as living memory rather than becoming long narrative documentation.

Documentation should distinguish project-specific setup under `project-control-files/`, tool-maintained indexes under `tool-maintained-files/indexes/`, ledgers such as `known-debt.md` and `experiments.md`, deferred logging strategy, and procedural review surfaces such as `review-checklist.md` and `change-impact-checklists.md`.

Human documentation should distinguish root files that contain reasoning guidance from root files that primarily contain structured lookup data. Structured maps should justify timely access by the surface they map, such as routes, schemas, accessors, components, tests, or permissions. They should not grow into broad reasoning prompts when a tool or behavior file can own that reasoning.

### Test Selection And Test Indexing

Human-facing documentation should explain that the Agent OS is intended to support targeted verification, not a default habit of running every available test for every task.

The testing layer should describe how unit tests, integration tests, visual checks, smoke checks, and other verification surfaces map back to the code, routes, components, schemas, accessors, fixtures, and flows they exercise. Agents should use that map to choose a minimal credible verification set based on changed surfaces, risk, and task mode, while still escalating to broader suites when shared infrastructure, cross-cutting behavior, or uncertainty justifies it.

Documentation should also clarify when updating tests is appropriate: tests may change when intended behavior changes, when coverage is missing for a bug or new behavior, when fixtures or contracts are renamed, or when tests encode obsolete implementation details. Tests should not be weakened merely to make a change pass; behavioral changes should be surfaced in the completion report.

Human-facing documentation should also treat tests as maintained artifacts with lifecycle responsibilities. Agents need guidance for selecting tests by changed surface and risk, preserving behavioral signal, maintaining fixtures/scenarios/snapshots alongside tests, and deciding when to add, update, rename, prune, or replace tests without turning test changes into hidden product changes.

Documentation should separate deterministic test relevance from test execution exhaustivity. The Agent OS should aim to calculate potentially regressed areas from changed files and diffs, then map those areas to relevant test surfaces through generated indexes, contracts, imports, routes, schemas, fixtures, and test references. Agent reasoning should handle ambiguous or unindexed cases, not be the primary mechanism for guessing relevant tests.

Documentation should also explain human-controlled verification profiles or exhaustivity budgets. Cheap scoped checks may be default-run because executing them is cheaper than deliberating, while broad or noisy suites may be relevant but intentionally deferred during larger refactors or exploratory flows. Completion reports should distinguish mapped relevant checks from checks actually run, checks deferred by policy, and residual risk.

### Technology Architecture And Structural Maintenance Documentation

Human-facing documentation should explain that `project-control-files/technology-architecture-map.md` is the project-specific high-level map for platform components, technology areas, directory ownership, source/generated boundaries, and interface expectations between independently maintained parts of the project.

Documentation should separately explain the structural-maintenance layer as the agent-facing operational layer for structural decisions at any granularity. Task modes classify work; structural maintenance guides decisions about where durable responsibilities belong, including placement, reuse, extension, extraction, centralization, movement, naming, promotion, demotion, deprecation, and trimming.

Human documentation should explain that `behavior-map.md` owns when agents ingest and use each structural-maintenance behavior. Individual behavior files own the selected behavior's reasoning procedure, evidence expectations, stop/escalation rules, memory updates, and completion output.

The structural-maintenance behavior files now use proposal templates rather than title-only scaffolds. Human documentation should avoid describing behavior files as selection maps; selection guidance belongs in `behavior-map.md`, while behavior files may still contain outcome guidance such as prefer, avoid, defer, extract, split, promote, or remove.

Human documentation should explain the intended runtime loading model: agents should not ingest all structural-maintenance behaviors or all lens files up front. The expected chain is structural-maintenance usage, behavior-map routing, selected behavior files, and only then supporting maps, tools, or full lens files when the selected behavior requires deeper clarification.

Human documentation should distinguish compact applied lens prompts from full lens reference files. Structural-maintenance behavior files now carry compact `Lens Prompts` for ordinary execution. Full lens files are reference and maintenance surfaces, opened when compact guidance is insufficient, a stop/escalation rule is unclear, lens guidance itself is being changed, or a deep review depends on the full lens definition.

Human documentation should explain that `behavior-map.md` is behavior selection and support metadata, not a procedure surface. Its tool IDs, indexes/maps, and likely memory updates are consulted after behavior selection, while selected behavior files provide the runtime procedure.

Human documentation should introduce primary and secondary structural-maintenance behaviors. A primary behavior is the structural decision currently being made; secondary behaviors are loaded only when applying the primary behavior reveals another structural decision or triggers a stop/escalation rule.

Human documentation should explain the integration boundary between task modes, structural maintenance, and tools. Task modes classify the work and its product/control-surface risks. Structural maintenance is entered when work requires deciding where durable behavior, state, effects, responsibilities, concepts, names, examples, checks, source-of-truth statements, or authority should live. Tooling is evidence support resolved through logical tool IDs, not procedural authority. Final documentation should avoid making task modes duplicate behavior-file reasoning or tool-instruction execution details.

Human documentation should clarify the term "structural maintenance." The layer applies to durable repository artifacts and source-of-truth surfaces, not only application source code. This may include code, tests, schemas, fixtures, generated indexes, agent instructions, maps, ledgers, tool contracts, and documentation when they function as maintained project structure.

Human documentation should also clarify that this layer is not limited to whole-file, directory, or cross-artifact moves. It applies to internal structural decisions inside existing artifacts when the edit changes where behavior, state, effects, responsibilities, concepts, names, examples, checks, or authority live. Examples include whether to add logic inside an existing component, extract a hook/helper, branch from a near match, split an overloaded mode file, or move a rule from local prose into an agent-facing instruction.

Human documentation should explain structural-maintenance lenses as portable reasoning frames, not task modes, checklists, tools, or maps. Lenses narrow attention around distinctions such as intent, ownership, boundary, reuse, near-match similarity, duplication, naming, data/state/effects, contract, authority, audience, blast radius, lifecycle, and memory.

Human documentation should explain the contract lens as protecting the promises a maintained element makes to consumers. It is relevant for internal processing changes as well as public interface changes: agents should preserve existing I/O, side effects, errors, ordering, timing, compatibility, and behavior expectations, or handle consumer migration explicitly. Documentation should also connect contract reasoning to test reconsideration, especially whether unit tests or contract tests cover the changed internal path and consumer-visible expectations.

Human documentation should explain the authority and audience lenses together. Authority decides which artifact is allowed to define a rule or expectation; audience decides who should consume the content. README files may explain the Agent OS for humans, but agent-critical behavior belongs in agent-facing instructions, maps, behaviors, task modes, or tool contracts.

Human documentation should not present provenance as an active lens unless it is later approved. The current migration reasoning treats broad provenance as too difficult to operate reliably because artifacts may not encode whether they are human-authored, agent-authored, generated, tool-maintained, or manually patched. The useful operational concern is maintenance path: whether a maintained artifact should be edited directly, updated through a source input, regenerated, or maintained through a tool contract.

Human documentation should note that the structural-maintenance behavior and lens inventory needs an artifact-agnostic review. The current set largely transfers beyond source code, but some behaviors and lenses still use code-shaped examples and may need either broader wording or additional support for instruction authority, map ownership, tool contracts, documentation-as-source-of-truth, generated indexes, examples, fixtures, and tests.

Lens documentation should emphasize that each lens has decision outputs, stop or escalation rules, cheap-pass rules, evidence expectations, and memory implications. This keeps lenses procedural rather than decorative.

The lens map should be documented as an inventory and maintenance surface, not a separate decision map. Structural-maintenance behavior files own compact runtime lens prompts, while full lens files remain reference and maintenance surfaces for deeper review or lens edits.

Human documentation should reflect the structural-maintenance folder shape: usage, `behavior-map.md`, and `lens-map.md` files at the structural-maintenance root, behavior modes under `behavior/`, and lens definitions under `lenses/`.

The structural-maintenance layer should be documented as progressive constraints rather than an exhaustive decision tree. Agents should classify the change, activate only relevant decision lenses, use tool/index evidence, preview blast radius before broad edits, and update memory only when durable structure, naming, boundaries, or exceptions change.

Human documentation should also distinguish query, preview, and apply expectations for future tools. Even when tool implementation is deferred, maintainers should understand that structural-maintenance decisions are intended to lean on bounded tool outputs rather than full-context prompt reasoning.

Human documentation should explain that the old proposal-only tool surface was retired. Active deterministic evidence now routes through Stratum 2 operator IDs, while operational routines such as contract impact, authority resolution, audience placement, and generated artifact maintenance route through skill IDs.

Human documentation should distinguish deterministic evidence tools from reasoning lenses. Tools can gather bounded facts such as consumers, references, generated-file markers, producer scripts, stale indexes, and test coverage. Lenses decide how those facts matter. Provenance-like concerns are currently represented by `artifact-query`, `generated-artifact-maintenance`, and authority/contract/lifecycle reasoning, rather than by a standalone provenance lens.

Human documentation should explain that active Stratum 1 and 2 implementations live under `Agent OS/tool-implementations/`. Historical implementation notes that do not match the active tool map should remain migration/archive material, not runtime agent instructions.

### Redundancy In Task-Mode Guidance

The task-mode usage file should avoid duplicating skill and tool requirements already owned by individual mode files. Cross-mode guidance should point agents to `Agent OS/prompt-files/skills/skill-map.md`, `Agent OS/prompt-files/tools/index-map.md`, and `Agent OS/prompt-files/tools/tool-map.md` for discovery rather than duplicating execution details.

The `Use This Mode When` and `Do Not Use This Mode When` sections were removed from individual mode files. `task-mode-map.md` owns selection; selected mode files own requirements.

### Prompt-End Reflection

Root migration instructions now require agents to reflect on agent-OS documentation needs at the end of each prompt and revise this note only where the current prompt changed or clarified those needs.

### Agent OS Reflective Maintenance Boundary

Human documentation should explain that Agent OS self-reflection is diagnostic by default, not permission for autonomous self-modification. Reflection can identify stale guidance, missing task modes, lens gaps, repeated correction patterns, tool-contract mismatches, generated-index freshness problems, or authority conflicts, but the ordinary output should be a migration note or proposal.

Changes to active Agent OS authority surfaces, including global routing, task modes, structural-maintenance behaviors, lenses, tool contracts, and generated-index maintenance rules, should require a human-initiated Agent OS maintenance task unless the user explicitly made that change part of the current request.

Documentation should distinguish routine project-memory updates made within an explicitly requested task from changes to the operating system's own rules. The former may be part of normal task completion when the selected mode requires it; the latter should pass through an explicit promotion gate.

### Decision-Readiness Documentation

When the Agent OS setup review shifts from framework hardening into project decisions, human documentation should present the remaining migration notes as a decision queue. It should distinguish notes that are framework blockers, notes that are policy choices before product development, notes that are right-timed after the application substrate exists, and notes that are historical because the active scaffold now covers them.

This queue should keep old scaffold paths and retired placeholder tool names out of runtime guidance. Historical notes can remain as migration evidence, but final documentation should translate their active decisions into current Agent OS paths, skill IDs, tool IDs, project-control files, and verification gates.

### Field Platform Development-Readiness Documentation

Human documentation should explain how Field Platform setup decisions move from provisional Agent OS project-control files into durable application-scaffold documentation. The current scaffold already exposes `Agent OS/project-control-files/technology-architecture-map.md` and `Agent OS/project-control-files/pre-development-readiness.md` as project-control surfaces, so implementation planning should avoid creating parallel authority under `docs/agent/project-setup/` without first deciding how that folder relates to those existing control files.

Once the Field Platform stack choices are accepted, documentation should cue agents to update the provisional technology architecture map before runtime scaffolding, then mirror or promote durable decisions into application documentation such as ADRs only after the application scaffold exists. Product rails such as field orientation, stewardship, reviewable relation claims, visibility/publication/review separation, account/profile separation, and ways-in should remain explicit project-control guidance until a more durable product-context authority is created.

Development-readiness documentation should distinguish executable readiness from conceptual scaffold readiness for Phase 5 and beyond. The scaffold may define Docker/Postgres, Drizzle, auth, contract, Storybook, and test targets before the local machine can run every service; local prerequisites such as Docker availability should be called out explicitly before treating persistence work as ready to execute.

Documentation should also distinguish a passing boundary check from complete boundary-policy coverage. When dependency-cruiser is introduced, readiness notes should identify which intended import rules are enforced, which remain prose-only, and whether small negative fixtures or rule-validation examples are needed before relying on the check as architectural protection.

After Stage 4 hardening, human documentation should describe boundary enforcement as both live dependency-cruiser rules and a synthetic rule-validation script. The dependency check proves current source compliance; the synthetic validator proves selected forbidden and allowed import pairs still exercise the intended route, module-layer, UI, cross-module, unresolved-import, and Agent OS generated-artifact rules.

Phase 5-9 readiness documentation should distinguish project dependency readiness from machine prerequisite readiness. The npm workspace can have Drizzle, Auth.js, Storybook, Playwright, Testing Library, Tailwind, Radix, and related entrypoints installed while local Postgres execution is still blocked until Windows WSL/Docker prerequisites are installed from an elevated session and Docker Compose can start the PostgreSQL service.

After resolving the project-side Phase 5-9 gaps, human documentation should present these phases as scaffold-ready rather than feature-complete. The scaffold now has an initial Drizzle schema and generated migration, Auth.js boundary files, Zod contract surfaces, fixture validation, semantic UI primitives and Storybook stories, Vitest policy/domain tests, and Playwright public-orientation smoke tests. The remaining machine prerequisite is Docker engine availability: Docker CLI and Compose may be on PATH while Docker Desktop, WSL, and the daemon are still unavailable.

Phase 5 documentation should mention the staged closure commands: `corepack pnpm docker:install-prereqs:windows` is an Administrator-only Windows helper for enabling WSL2 prerequisites and installing Docker Desktop, while `tools/scripts/install-windows-docker-prereqs-admin.bat` is the double-click/right-click Administrator entrypoint for the same setup. `tools/scripts/repair-wsl-docker-and-verify-phase5-admin.bat` is the follow-up repair path that uses the corrected optional-feature check, updates WSL, confirms `hypervisorlaunchtype`, restarts WSL and Docker Desktop, waits for the daemon, and runs `corepack pnpm phase5:verify`. `tools/scripts/start-docker-and-verify-phase5.bat` remains a lighter post-restart runner. `corepack pnpm phase5:verify` checks Docker CLI, Compose, daemon availability, starts Postgres, waits for readiness, applies Drizzle migrations, and reports Compose status. Phase 5 should not be called fully executable until `phase5:verify` passes against a running Docker daemon.

The WSL/Docker repair BAT should remain a launcher over a PowerShell implementation when commands need PowerShell pipelines. Raw BAT/cmd execution can misparse commands such as `Select-String`, `Select-Object`, and `ForEach-Object`, producing misleading "not recognized" errors before the actual Docker or WSL diagnosis is reached.

The Docker Desktop installer can complete while Phase 5 still remains machine-blocked if WSL optional features, WSL version, Docker's WSL distro initialization, enterprise/App Control policy, BIOS virtualization, or nested virtualization are not aligned. `phase5:verify` should report Windows virtualization diagnostics when Docker daemon startup fails, but `Win32_Processor` virtualization fields can be inconclusive when Hyper-V/VBS is already active. Treat the corrected optional-feature check, `wsl --version`, `wsl --status`, `wsl -l -v`, `bcdedit` hypervisor launch type, Docker Desktop UI state, and `docker version` together before concluding that BIOS or host-VM nested virtualization is the blocker.

Phase 5 was finalized once Docker Desktop/WSL became operational and `corepack pnpm phase5:verify` passed against local PostgreSQL. Human documentation should note the PostgreSQL 18 Docker image volume convention: mount the named local volume at `/var/lib/postgresql`, not `/var/lib/postgresql/data`, so the image can create version-specific data directories such as `/var/lib/postgresql/18/docker`. A failed first boot with the old mount path may require resetting the initial local development volume before rerunning migrations.

Documentation should explain that Storybook for the Field Platform uses a dedicated Storybook Vite config, not the React Router app Vite config. This avoids pulling React Router framework plugins into component preview builds while preserving Tailwind and tsconfig path resolution for UI stories.

Final-phase readiness documentation should distinguish the staging workspace `agent:index` placeholder from the Agent OS index builder commands. Phase 10 should not be marked complete until the intended application/project-setup indexes have a real runnable entrypoint, the Agent OS `tsx`-based maintenance commands are executable in the prepared environment, and generated index freshness can be checked without relying on stale or pre-scaffold artifacts.

### Agent OS Activation Documentation

Human documentation should now explain that the root `AGENTS.md` delegates non-trivial work into `Agent operating system migration/Agent OS/migration_agents.md` while the migration remains staged. The root file still owns migration safety, branch/worktree protection, pre-migration boundaries, promotion gates, migration-note handling, and progress reporting.

Documentation should call out the path-resolution rule introduced during activation: paths inside `migration_agents.md` are resolved relative to `Agent operating system migration/Agent OS/` when agents load it through the repository root.

### Git Maintenance Automation

Daily git maintenance that commits and pushes work needs an explicit agent-facing routine, not only human-facing README guidance. The routine should cover branch verification, user-owned file protection, coherent commit slicing, no direct commits to `main`, relevant lightweight checks, push behavior, and completion reporting.

During migration, this automation guidance can live under `Migration notes/` as root coordination material. A later migration decision should decide whether recurring git maintenance belongs in the target agent operating system as a formal maintenance-and-governance task mode, a checklist, or a local automation-only instruction.

Commit-preparation documentation should explain how to separate real scaffold changes from generated or local noise. Large line counts may come from expected committed artifacts such as `pnpm-lock.yaml` and Drizzle migration metadata, while ignored local runtime artifacts such as `node_modules`, `.react-router`, `build`, `storybook-static`, Playwright reports, and test results should stay out of commits. User-owned local files such as `App.code-workspace` and external-agent scratch notes can be kept out of the commit with local Git excludes rather than by deleting or staging them.

### External-Agent Agent OS Handoff

Human documentation may need a compact external-agent handoff path for Agent OS discussion when the real scaffold has too many files for another agent's input window. Such a handoff should be clearly labeled as a condensed discussion artifact, not canonical source.

The handoff should preserve the split between root migration safety, the real Agent OS layout, bootloader behavior, task modes, structural maintenance, skills/tools/indexes, project-control rails, and source-file provenance. It should also state which generated artifacts and implementation files were intentionally omitted so external agents do not confuse compact summaries with source-of-truth behavior.

## Open Documentation Questions

- What final human-facing README structure should explain the agent operating system?
- Which target files should be considered authoritative for agent behavior versus explanatory for human maintainers?
- How should tool-generated or tool-maintained docs be described without making generated output look like semantic authority?
- How should human documentation describe the split between global routing in `AGENTS.md` and procedural detail in task-mode instruction files?
- How should human documentation describe the chain from skill/tool/index ID to `skill-map.md`, `index-map.md`, `tool-map.md`, semantic file, and executable script?
- How should human documentation introduce the root `Agent OS/prompt-files/*.md` files as selective memory surfaces without encouraging agents to load all maps for every task?
- How should human documentation introduce the difference between the technology architecture map and the structural-maintenance decision layer?
- How should human documentation explain the split between `prompt-files/agent-os-map.md` for Agent OS orientation, `project-control-files/technology-architecture-map.md` for project architecture setup, and `tool-maintained-files/indexes/path-index.json` plus `build-path-index`/`path-query` for source-tree discovery?
- How should human documentation explain progressive structural-maintenance constraints without encouraging agents to run every structural check for every small task?
- How should human documentation explain structural-maintenance lenses without making them sound like mandatory checklists for every change?
- After the new contract, authority, audience, and authority/contract behaviors are reviewed, do additional non-code maintained artifact concerns still require separate lenses or behaviors?
- Should provenance remain represented by `artifact-query`, `generated-artifact-maintenance`, and authority/contract/lifecycle reasoning, or should a separate provenance lens become necessary after more examples are available?
- What minimum evidence should `artifact-query` gather before agents treat an artifact as generated, tool-maintained, manually authoritative, stale, or unknown?
- Which structural-maintenance skills or deterministic tools should be presented as strong cues for specific behaviors, and what output schemas should their scripts enforce?
- How should human documentation explain the chain from structural-maintenance usage, to `behavior-map.md` behavior selection, to behavior-file procedure, to activated lenses?
- Should there be a dedicated Agent OS reflection or maintenance-proposal mode whose default output is a note, with active OS changes gated by a human-started maintenance task?
- Which project-memory updates may be performed as part of ordinary task completion, and which Agent OS rule changes must be proposed unless the user explicitly starts Agent OS maintenance?
- How should the testing map represent relationships between changed code and the smallest credible test set, while still identifying when broad regression suites are warranted?
- Should test selection and maintenance be documented as a generated test index, a dedicated agent-facing instruction file, or a combination of both?
- What deterministic tool or generated index should map changed files and diffs to potentially regressed areas, relevant test surfaces, and runnable commands?
- What verification profiles or exhaustivity budgets should humans be able to set so agents can balance speed, confidence, and resource cost without guessing undisclosed context?
- Should recurring git maintenance become part of the target agent operating system, or remain a local project automation outside the scaffold?
- Should generated indexes remain fully generated, become hybrid generated/manual artifacts, or move to direct query-only tooling, and would curated memory snippets be prudent?
