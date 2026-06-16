import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const stagingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const agentOsRoot = path.join(stagingRoot, "Agent OS");
const projectIndexDir = path.join(agentOsRoot, "tool-maintained-files", "project-indexes");
const projectIndexRelativeDir = "Agent OS/tool-maintained-files/project-indexes";
const generatedAt = new Date().toISOString();

const args = parseArgs(process.argv.slice(2));
const checkOnly = Boolean(args.flags.check);
const jsonOutput = Boolean(args.flags.json);

const agentOsIndexes = runAgentOsIndexes();
const projectIndexes = runProjectIndexes();
const failed = agentOsIndexes.exitCode !== 0 || projectIndexes.failed;
const stale = agentOsIndexes.stale || projectIndexes.stale;

const result = {
  tool: "field-platform-agent-index",
  check: checkOnly,
  wrote: !checkOnly,
  generatedAt,
  agentOsIndexes,
  projectIndexes,
};

if (jsonOutput) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  printHumanResult(result);
}

if (failed || (checkOnly && stale)) {
  process.exit(failed ? 1 : 2);
}

function runAgentOsIndexes() {
  const scriptPath = path.join(
    agentOsRoot,
    "tool-implementations",
    "indexes",
    "build-all-indexes.ts",
  );
  const tsxCliPath = path.join(stagingRoot, "node_modules", "tsx", "dist", "cli.mjs");
  const commandArgs = [tsxCliPath, scriptPath, "--root", agentOsRoot, "--json"];

  if (checkOnly) {
    commandArgs.push("--check");
  }

  const run = spawnSync(process.execPath, commandArgs, {
    cwd: stagingRoot,
    encoding: "utf8",
    shell: false,
  });
  const parsed = parseJsonObject(run.stdout);

  return {
    command:
      "node node_modules/tsx/dist/cli.mjs Agent OS/tool-implementations/indexes/build-all-indexes.ts",
    exitCode: run.status ?? 1,
    stale: Boolean(parsed?.stale),
    recordCount: Number(parsed?.recordCount ?? 0),
    results: Array.isArray(parsed?.results) ? parsed.results : [],
    stdout: parsed ? undefined : trimForReport(run.stdout),
    stderr: trimForReport(run.error?.message ?? run.stderr),
  };
}

function runProjectIndexes() {
  const files = collectProjectFiles();
  const artifacts = buildProjectArtifacts(files);
  const results = [];
  let stale = false;
  let failed = false;

  for (const artifact of artifacts) {
    const absolutePath = path.join(projectIndexDir, `${artifact.indexId}.json`);
    const existing = readJsonIfExists(absolutePath);
    const artifactStale = stableStringify(existing) !== stableStringify(artifact);
    stale ||= artifactStale;

    if (!checkOnly) {
      mkdirSync(projectIndexDir, { recursive: true });
      writeFileSync(absolutePath, `${JSON.stringify(artifact, null, 2)}\n`, "utf8");
    } else if (!existing) {
      failed = true;
    }

    results.push({
      indexId: artifact.indexId,
      artifactPath: normalizePath(path.relative(stagingRoot, absolutePath)),
      recordCount: artifact.recordCount,
      stale: artifactStale,
      exists: Boolean(existing),
    });
  }

  return {
    check: checkOnly,
    wrote: !checkOnly,
    stale,
    failed,
    artifactDir: projectIndexRelativeDir,
    recordCount: artifacts.reduce((sum, artifact) => sum + artifact.recordCount, 0),
    results,
  };
}

function buildProjectArtifacts(files) {
  const definitions = [
    {
      indexId: "source-directory-map",
      sourceInputs: ["repository file tree, excluding generated, archived, and dependency outputs"],
      coverage: "Directory-level source orientation for the Field Platform repository root.",
      records: buildSourceDirectoryRecords(files),
    },
    {
      indexId: "route-map",
      sourceInputs: ["apps/web/app/routes.ts"],
      coverage: "React Router framework route config, route paths, params, and route modules.",
      records: buildRouteRecords(),
    },
    {
      indexId: "module-map",
      sourceInputs: ["apps/web/src/modules/*"],
      coverage: "Module folders, public entrypoints, known layers, and module-local files.",
      records: buildModuleRecords(files),
    },
    {
      indexId: "dependency-map",
      sourceInputs: ["TypeScript and JavaScript import/export statements in project source"],
      coverage: "Static import, export-from, dynamic import, and require edges.",
      records: buildDependencyRecords(files),
    },
    {
      indexId: "schema-map",
      sourceInputs: ["Drizzle schema files and Zod contract files"],
      coverage: "Drizzle table/enum/relation declarations and Zod schema declarations.",
      records: buildSchemaRecords(files),
    },
    {
      indexId: "migration-map",
      sourceInputs: ["apps/web/drizzle"],
      coverage: "Generated Drizzle SQL migrations and migration metadata files.",
      records: buildMigrationRecords(files),
    },
    {
      indexId: "component-story-map",
      sourceInputs: ["React component and Storybook story files"],
      coverage: "Exported React components, semantic UI primitives, and story exports.",
      records: buildComponentStoryRecords(files),
    },
    {
      indexId: "test-map",
      sourceInputs: ["Vitest and Playwright test files"],
      coverage: "Test files, suites, cases, and likely subject paths.",
      records: buildTestRecords(files),
    },
    {
      indexId: "env-config-map",
      sourceInputs: ["environment, package, app, tool, Docker, and workspace config files"],
      coverage: "Environment keys, scripts, services, and project configuration surfaces.",
      records: buildEnvConfigRecords(files),
    },
  ];

  const artifacts = definitions.map((definition) => makeArtifact(definition));
  const manifest = makeArtifact({
    indexId: "project-index-manifest",
    sourceInputs: ["project structural index artifacts"],
    coverage: "Compact summary of generated project structural indexes.",
    records: artifacts.map((artifact) => ({
      indexId: artifact.indexId,
      artifactPath: artifact.artifactPath,
      recordCount: artifact.recordCount,
      sha256: hashComparable(artifact),
      sourceInputs: artifact.sourceInputs,
      coverage: artifact.coverage,
      refreshCommand: "corepack pnpm agent:index",
      checkCommand: "corepack pnpm agent:index:check",
    })),
  });

  return [manifest, ...artifacts];
}

function makeArtifact({ indexId, sourceInputs, coverage, records }) {
  return {
    artifactId: indexId,
    indexId,
    generated: true,
    schemaVersion: 1,
    generatedAt,
    sourceRoot: ".",
    pathReference: "Record paths are relative to the Field Platform repository root.",
    sourceState: "working-tree",
    producer: "tools/agent-tools/src/index.mjs",
    artifactPath: `${projectIndexRelativeDir}/${indexId}.json`,
    sourceInputs,
    freshnessPolicy:
      "Refresh before relying on absence, broad project impact, route/module/schema coverage, or setup evidence.",
    coverage,
    knownBlindSpots: [
      "Project structural indexes are lightweight evidence and do not replace source reads.",
      "Static import parsing does not fully resolve package exports or runtime dependency injection.",
    ],
    maintenance: {
      metadataVersion: 1,
      maintainedBy: "tools/agent-tools/src/index.mjs",
      manualMaintenance: false,
      refreshCommand: "corepack pnpm agent:index",
      checkCommand: "corepack pnpm agent:index:check",
    },
    recordCount: records.length,
    records,
  };
}

function collectProjectFiles() {
  const records = [];

  function walk(current) {
    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolutePath = path.join(current, entry.name);
      const relativePath = normalizePath(path.relative(stagingRoot, absolutePath));

      if (entry.isDirectory()) {
        if (!shouldSkipDirectory(relativePath, entry.name)) {
          walk(absolutePath);
        }
        continue;
      }

      if (!entry.isFile() || !isTextFile(relativePath)) {
        continue;
      }

      const content = safeRead(absolutePath);
      records.push({
        path: relativePath,
        name: entry.name,
        ext: path.extname(entry.name).toLowerCase(),
        size: statSync(absolutePath).size,
        content,
        lines: content.split(/\r?\n/),
      });
    }
  }

  walk(stagingRoot);
  return records.sort((a, b) => a.path.localeCompare(b.path));
}

function shouldSkipDirectory(relativePath, name) {
  const skippedNames = new Set([
    ".git",
    ".pnpm-store",
    ".react-router",
    ".turbo",
    ".vite",
    "Archive",
    "build",
    "coverage",
    "dist",
    "node_modules",
    "out",
    "playwright-report",
    "storybook-static",
    "test-results",
  ]);

  if (skippedNames.has(name)) {
    return true;
  }

  return (
    relativePath === "Agent OS/tool-maintained-files/indexes" ||
    relativePath === "Agent OS/tool-maintained-files/project-indexes" ||
    relativePath === "Agent OS/tool-maintained-files/semantic"
  );
}

function isTextFile(filePath) {
  return /\.(cjs|css|html|js|json|jsx|md|mjs|sql|ts|tsx|txt|yaml|yml)$/.test(filePath);
}

function buildSourceDirectoryRecords(files) {
  const directories = new Map();
  ensureDirectoryRecord(directories, ".");

  for (const file of files) {
    const segments = file.path.split("/");
    const fileName = segments.pop();
    let current = ".";

    for (const segment of segments) {
      const parent = current;
      current = current === "." ? segment : `${current}/${segment}`;
      ensureDirectoryRecord(directories, parent).childDirs.add(current);
      ensureDirectoryRecord(directories, current);
    }

    if (fileName) {
      ensureDirectoryRecord(directories, current).files.push(fileName);
    }
  }

  return Array.from(directories.entries())
    .map(([directory, record]) => ({
      directory,
      area: directory === "." ? "." : directory.split("/")[0],
      fileCount: record.files.length,
      files: [...new Set(record.files)].sort(),
      childDirs: [...record.childDirs].sort(),
    }))
    .sort((a, b) => a.directory.localeCompare(b.directory));
}

function ensureDirectoryRecord(directories, directory) {
  if (!directories.has(directory)) {
    directories.set(directory, { files: [], childDirs: new Set() });
  }
  return directories.get(directory);
}

function buildRouteRecords() {
  const routeConfigPath = "apps/web/app/routes.ts";
  const absolutePath = path.join(stagingRoot, routeConfigPath);
  const content = safeRead(absolutePath);
  const records = [];

  for (const match of content.matchAll(/\bindex\(\s*["']([^"']+)["']\s*\)/g)) {
    records.push(routeRecord("/", match[1], routeConfigPath));
  }

  for (const match of content.matchAll(/\broute\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g)) {
    records.push(routeRecord(match[1], match[2], routeConfigPath));
  }

  return records.sort((a, b) => a.route.localeCompare(b.route));
}

function routeRecord(routePath, moduleSpecifier, routeConfigPath) {
  const route = `/${routePath}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
  const modulePath = normalizePath(
    path.posix.join("apps/web/app", moduleSpecifier.replace(/^[.]\//, "")),
  );
  const params = [...route.matchAll(/:([A-Za-z0-9_]+)/g)].map((match) => match[1]);

  return {
    route,
    module: modulePath,
    source: routeConfigPath,
    params,
    family: route === "/" ? "root" : route.split("/").filter(Boolean)[0],
  };
}

function buildModuleRecords(files) {
  const modulesRoot = path.join(stagingRoot, "apps", "web", "src", "modules");
  if (!existsSync(modulesRoot)) {
    return [];
  }

  return readdirSync(modulesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const modulePath = `apps/web/src/modules/${entry.name}`;
      const moduleFiles = files.filter((file) => file.path.startsWith(`${modulePath}/`));
      const indexPath = `${modulePath}/index.ts`;
      const indexFile = moduleFiles.find((file) => file.path === indexPath);
      const layers = ["application", "contracts", "domain", "persistence", "ui"].filter((layer) =>
        moduleFiles.some((file) => file.path.startsWith(`${modulePath}/${layer}/`)),
      );

      return {
        module: entry.name,
        path: modulePath,
        publicEntrypoint: indexPath,
        publicEntrypointExists: Boolean(indexFile),
        layers,
        fileCount: moduleFiles.length,
        exports: indexFile ? exportedNames(indexFile.content) : [],
      };
    })
    .sort((a, b) => a.module.localeCompare(b.module));
}

function buildDependencyRecords(files) {
  const importPatterns = [
    /\bimport\s+(?:type\s+)?(?:[^"']+\s+from\s+)?["']([^"']+)["']/g,
    /\bexport\s+[^"']+\s+from\s+["']([^"']+)["']/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
  ];
  const records = [];

  for (const file of files.filter((entry) => isCodeFile(entry.path))) {
    file.lines.forEach((line, index) => {
      for (const pattern of importPatterns) {
        for (const match of line.matchAll(pattern)) {
          records.push({
            importer: file.path,
            imported: match[1],
            resolved: resolveImport(file.path, match[1]),
            line: index + 1,
            kind: match[0].trim().startsWith("require") ? "require" : "import",
            importerArea: areaOf(file.path),
          });
        }
      }
    });
  }

  return records;
}

function buildSchemaRecords(files) {
  const records = [];

  for (const file of files) {
    if (file.path.startsWith("apps/web/src/shared/db/schema/") && file.path.endsWith(".ts")) {
      for (const match of file.content.matchAll(
        /export const (\w+) = (pgTable|pgEnum)\(\s*["']([^"']+)["']/g,
      )) {
        records.push({
          file: file.path,
          exportName: match[1],
          kind: match[2] === "pgTable" ? "drizzle-table" : "drizzle-enum",
          dbName: match[3],
        });
      }

      for (const match of file.content.matchAll(/export const (\w+) = relations\((\w+)/g)) {
        records.push({
          file: file.path,
          exportName: match[1],
          kind: "drizzle-relations",
          source: match[2],
        });
      }
    }

    if (isContractFile(file.path)) {
      for (const match of file.content.matchAll(/export const (\w+Schema) = z[.]/g)) {
        records.push({
          file: file.path,
          exportName: match[1],
          kind: "zod-schema",
        });
      }
    }
  }

  return records.sort((a, b) =>
    `${a.file}:${a.exportName}`.localeCompare(`${b.file}:${b.exportName}`),
  );
}

function buildMigrationRecords(files) {
  const migrationFiles = files.filter(
    (file) =>
      file.path.startsWith("apps/web/drizzle/") && file.path !== "apps/web/drizzle/.gitkeep",
  );

  return migrationFiles.map((file) => {
    if (file.path.endsWith(".sql")) {
      return {
        file: file.path,
        kind: "sql-migration",
        createsTables: matches(file.content, /CREATE TABLE "([^"]+)"/g),
        createsEnums: matches(file.content, /CREATE TYPE "public"[.]"([^"]+)"/g),
        createsIndexes: matches(file.content, /CREATE (?:UNIQUE )?INDEX "([^"]+)"/g),
      };
    }

    return {
      file: file.path,
      kind: file.path.endsWith(".json") ? "drizzle-metadata" : "migration-artifact",
      size: file.size,
    };
  });
}

function buildComponentStoryRecords(files) {
  const records = [];

  for (const file of files.filter((entry) => entry.path.endsWith(".tsx"))) {
    const exported = exportedNames(file.content);
    const isStory = file.path.includes(".stories.");
    const isUi = file.path.includes("/ui/") || file.path.includes("\\ui\\");

    if (!isStory && !isUi) {
      continue;
    }

    records.push({
      file: file.path,
      kind: isStory ? "storybook-story" : "react-component-source",
      exports: exported,
      storyTitle: firstMatch(file.content, /title:\s*["']([^"']+)["']/),
    });
  }

  return records.sort((a, b) => a.file.localeCompare(b.file));
}

function buildTestRecords(files) {
  return files
    .filter((file) => /\.(test|spec)\.[jt]sx?$/.test(file.path))
    .map((file) => ({
      file: file.path,
      kind: file.path.includes("/e2e/") ? "playwright" : "vitest",
      suites: matches(file.content, /\bdescribe\(\s*["']([^"']+)["']/g),
      cases: [
        ...matches(file.content, /\bit\(\s*["']([^"']+)["']/g),
        ...matches(file.content, /\btest\(\s*["']([^"']+)["']/g),
      ],
      imports: matches(
        file.content,
        /\bimport\s+(?:type\s+)?(?:[^"']+\s+from\s+)?["']([^"']+)["']/g,
      ),
    }))
    .sort((a, b) => a.file.localeCompare(b.file));
}

function buildEnvConfigRecords(files) {
  return files
    .filter((file) => isConfigSurface(file.path))
    .map((file) => {
      const record = {
        file: file.path,
        kind: configKind(file.path),
        keys: [],
        scripts: [],
        services: [],
      };

      if (file.path.endsWith(".env.example")) {
        record.keys = matches(file.content, /^([A-Z0-9_]+)=/gm);
      }

      if (file.name === "package.json") {
        const parsed = parseJsonObject(file.content);
        record.scripts = Object.keys(parsed?.scripts ?? {}).sort();
      }

      if (file.path.endsWith("docker-compose.yml")) {
        record.services = matches(file.content, /^ {2}([A-Za-z0-9_-]+):$/gm);
      }

      return record;
    })
    .sort((a, b) => a.file.localeCompare(b.file));
}

function isConfigSurface(filePath) {
  return (
    filePath === ".env.example" ||
    filePath === "biome.json" ||
    filePath === "dependency-cruiser.config.cjs" ||
    filePath === "docker-compose.yml" ||
    filePath === "knip.json" ||
    filePath === "package.json" ||
    filePath === "pnpm-workspace.yaml" ||
    filePath === "tsconfig.base.json" ||
    filePath === "tsconfig.depcruise.json" ||
    filePath.startsWith(".github/") ||
    filePath.startsWith("apps/web/.storybook/") ||
    (filePath.startsWith("apps/web/") &&
      /config[.](ts|js)$|package[.]json|tsconfig[.]json$/.test(filePath)) ||
    filePath.startsWith("tools/agent-tools/package.json")
  );
}

function configKind(filePath) {
  if (filePath.endsWith(".env.example")) {
    return "env-template";
  }
  if (filePath.endsWith("package.json")) {
    return "package-manifest";
  }
  if (filePath.endsWith("docker-compose.yml")) {
    return "docker-compose";
  }
  if (filePath.includes(".storybook")) {
    return "storybook-config";
  }
  if (filePath.startsWith(".github/")) {
    return "tool-adapter-config";
  }
  return "project-config";
}

function exportedNames(content) {
  const names = new Set();
  const patterns = [
    /export function ([A-Za-z0-9_]+)/g,
    /export const ([A-Za-z0-9_]+)/g,
    /export type ([A-Za-z0-9_]+)/g,
    /export interface ([A-Za-z0-9_]+)/g,
    /export class ([A-Za-z0-9_]+)/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      names.add(match[1]);
    }
  }

  return [...names].sort();
}

function resolveImport(importer, specifier) {
  if (specifier.startsWith("~/")) {
    return normalizePath(path.posix.join("apps/web/src", specifier.slice(2)));
  }

  if (specifier.startsWith(".")) {
    return normalizePath(
      path.posix.normalize(path.posix.join(path.posix.dirname(importer), specifier)),
    );
  }

  return specifier;
}

function isCodeFile(filePath) {
  return /\.(cjs|js|jsx|mjs|ts|tsx)$/.test(filePath);
}

function isContractFile(filePath) {
  return (
    filePath.startsWith("apps/web/src/shared/contracts/") ||
    /^apps\/web\/src\/modules\/[^/]+\/contracts\//.test(filePath)
  );
}

function areaOf(filePath) {
  if (filePath.startsWith("apps/web/app/")) {
    return "web-routes";
  }
  if (filePath.startsWith("apps/web/src/modules/")) {
    return "web-modules";
  }
  if (filePath.startsWith("apps/web/src/shared/")) {
    return "web-shared";
  }
  if (filePath.startsWith("Agent OS/")) {
    return "agent-os";
  }
  if (filePath.startsWith("tools/")) {
    return "tools";
  }
  return filePath.split("/")[0] || ".";
}

function matches(content, pattern) {
  return [...content.matchAll(pattern)].map((match) => match[1]).sort();
}

function firstMatch(content, pattern) {
  return content.match(pattern)?.[1] ?? null;
}

function parseArgs(argv) {
  const flags = {};
  const positional = [];

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }

    const withoutPrefix = value.slice(2);
    const eqIndex = withoutPrefix.indexOf("=");
    if (eqIndex >= 0) {
      flags[withoutPrefix.slice(0, eqIndex)] = withoutPrefix.slice(eqIndex + 1);
      continue;
    }

    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      flags[withoutPrefix] = next;
      index += 1;
    } else {
      flags[withoutPrefix] = true;
    }
  }

  return { flags, positional };
}

function readJsonIfExists(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }
  return parseJsonObject(safeRead(filePath));
}

function parseJsonObject(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function safeRead(filePath) {
  try {
    return readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function stableStringify(value) {
  return JSON.stringify(sortKeys(stripVolatile(value)));
}

function stripVolatile(value) {
  if (Array.isArray(value)) {
    return value.map(stripVolatile);
  }

  if (value && typeof value === "object") {
    const next = {};
    for (const [key, entry] of Object.entries(value)) {
      if (key === "generatedAt") {
        continue;
      }
      next[key] = stripVolatile(entry);
    }
    return next;
  }

  return value;
}

function sortKeys(value) {
  if (Array.isArray(value)) {
    return value.map(sortKeys);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, sortKeys(entry)]),
    );
  }

  return value;
}

function hashComparable(value) {
  return createHash("sha256").update(stableStringify(value)).digest("hex");
}

function normalizePath(value) {
  return value.replace(/\\/g, "/");
}

function trimForReport(value) {
  const text = String(value ?? "").trim();
  if (text.length <= 4000) {
    return text;
  }
  return `${text.slice(0, 4000)}...`;
}

function printHumanResult(value) {
  const action = value.check ? "checked" : "refreshed";
  process.stdout.write(`Agent OS indexes ${action}; stale: ${value.agentOsIndexes.stale}\n`);
  if (value.agentOsIndexes.stderr) {
    process.stdout.write(`Agent OS index stderr:\n${value.agentOsIndexes.stderr}\n`);
  }

  process.stdout.write(
    `Project indexes ${action}; stale: ${value.projectIndexes.stale}; records: ${value.projectIndexes.recordCount}\n`,
  );
  for (const entry of value.projectIndexes.results) {
    process.stdout.write(
      `- ${entry.indexId}: ${entry.recordCount} records (${entry.stale ? "stale" : "fresh"})\n`,
    );
  }
}
