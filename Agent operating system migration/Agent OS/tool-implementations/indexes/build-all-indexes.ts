import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { emit, parseArgs, resolveRoot } from "../_lib/cli.ts";
import { activeIndexBuildersInMaintenanceOrder } from "../_lib/index-catalog.ts";
import { normalizePath } from "../_lib/text-utils.ts";

const args = parseArgs(process.argv.slice(2));
const root = resolveRoot(args);
const checkOnly = Boolean(args.flags.check);
const localBuilderDir = path.dirname(fileURLToPath(import.meta.url));
const builders = activeIndexBuildersInMaintenanceOrder().map((builder) => `${builder}.ts`);

const results = builders.map((builder) => runBuilder(builder));
const stale = results.some((result) => result.stale === true);
const failed = results.some((result) => result.exitCode !== 0);

emit(
  {
    builder: "build-all-indexes",
    indexId: "all-indexes",
    artifactPath: "tool-maintained-files/indexes",
    check: checkOnly,
    stale,
    wrote: !checkOnly,
    recordCount: results.reduce((sum, result) => sum + Number(result.recordCount || 0), 0),
    generatedAt: new Date().toISOString(),
    results,
    warnings: failed ? ["One or more index builders failed."] : [],
  },
  args,
);

if (failed || (checkOnly && stale)) {
  process.exit(failed ? 1 : 2);
}

function runBuilder(builder: string): Record<string, unknown> {
  const scriptPath = path.join(localBuilderDir, builder);
  const builderArgs = ["--yes", "tsx", scriptPath, "--root", root, "--json"];
  if (checkOnly) {
    builderArgs.push("--check");
  }
  const command = process.platform === "win32" ? "cmd.exe" : "npx";
  const commandArgs = process.platform === "win32" ? ["/d", "/s", "/c", "npx", ...builderArgs] : builderArgs;

  try {
    const raw = execFileSync(command, commandArgs, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return {
      ...parsed,
      script: normalizePath(path.relative(root, scriptPath)),
      exitCode: 0,
    };
  } catch (error) {
    const failure = error as { status?: number; stdout?: string; stderr?: string; message?: string };
    return {
      builder: builder.replace(/\.ts$/, ""),
      script: normalizePath(path.relative(root, scriptPath)),
      exitCode: failure.status ?? 1,
      stdout: failure.stdout || "",
      stderr: failure.stderr || failure.message || "Unknown builder failure.",
    };
  }
}
