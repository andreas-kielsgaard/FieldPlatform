import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const stagingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function appendWindowsDockerPaths() {
  if (process.platform !== "win32") {
    return;
  }

  const localAppData = process.env.LOCALAPPDATA;
  const userProfile = process.env.USERPROFILE;
  const candidates = [
    "C:\\Program Files\\Docker\\Docker\\resources\\bin",
    localAppData &&
      path.join(
        localAppData,
        "Microsoft",
        "WinGet",
        "Packages",
        "Docker.DockerCLI_Microsoft.Winget.Source_8wekyb3d8bbwe",
        "docker",
      ),
    localAppData &&
      path.join(
        localAppData,
        "Microsoft",
        "WinGet",
        "Packages",
        "Docker.DockerCompose_Microsoft.Winget.Source_8wekyb3d8bbwe",
      ),
    userProfile && path.join(userProfile, ".docker", "cli-plugins"),
  ].filter(Boolean);

  const currentPath = process.env.Path ?? process.env.PATH ?? "";
  const nextPath = [...new Set([...currentPath.split(";").filter(Boolean), ...candidates])].join(
    ";",
  );
  process.env.Path = nextPath;
  process.env.PATH = nextPath;
}

function run(command, args, timeoutMs = 60_000) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: stagingRoot,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      child.kill();
      resolve({ code: 1, stdout, stderr: `Command timed out after ${timeoutMs}ms.` });
    }, timeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (code) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timer);
      resolve({ code: code ?? 1, stdout, stderr });
    });
    child.on("error", (error) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timer);
      resolve({ code: 1, stdout, stderr: error.message });
    });
  });
}

function runShell(commandLine, timeoutMs = 60_000) {
  if (process.platform === "win32") {
    return run("cmd.exe", ["/d", "/s", "/c", commandLine], timeoutMs);
  }

  return run("sh", ["-lc", commandLine], timeoutMs);
}

async function requireStep(label, command, args, timeoutMs) {
  const result = await run(command, args, timeoutMs);
  if (result.code !== 0) {
    const output = [result.stdout.trim(), result.stderr.trim()].filter(Boolean).join("\n");
    throw new Error(`${label} failed.\n${output}`);
  }

  const output = result.stdout.trim();
  if (output) {
    console.log(output);
  }

  return result;
}

async function requireShellStep(label, commandLine, timeoutMs) {
  const result = await runShell(commandLine, timeoutMs);
  if (result.code !== 0) {
    const output = [result.stdout.trim(), result.stderr.trim()].filter(Boolean).join("\n");
    throw new Error(`${label} failed.\n${output}`);
  }

  const output = result.stdout.trim();
  if (output) {
    console.log(output);
  }

  return result;
}

async function getWindowsVirtualizationDiagnostics() {
  if (process.platform !== "win32") {
    return "";
  }

  const processor = await run("powershell.exe", [
    "-NoProfile",
    "-Command",
    "Get-CimInstance Win32_Processor | Select-Object Name,VirtualizationFirmwareEnabled,SecondLevelAddressTranslationExtensions,VMMonitorModeExtensions | Format-List",
  ]);
  const wsl = await run("wsl.exe", ["--status"], 15_000);

  return [
    "Windows virtualization diagnostics:",
    processor.stdout.trim() || processor.stderr.trim(),
    wsl.stdout.trim() || wsl.stderr.trim(),
  ]
    .filter(Boolean)
    .join("\n");
}

async function waitForPostgres() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const result = await run("docker", [
      "compose",
      "exec",
      "-T",
      "postgres",
      "pg_isready",
      "-U",
      "field_platform",
      "-d",
      "field_platform",
    ]);

    if (result.code === 0) {
      console.log("Postgres is ready.");
      return;
    }

    process.stdout.write(`Waiting for Postgres (${attempt}/30)...\n`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  throw new Error("Postgres did not become ready within 60 seconds.");
}

async function main() {
  try {
    appendWindowsDockerPaths();
    await requireStep("Docker CLI check", "docker", ["--version"]);
    await requireStep("Docker Compose check", "docker", ["compose", "version"]);
    await requireStep("Docker daemon check", "docker", ["info"], 30_000);
    await requireStep("Postgres compose startup", "docker", ["compose", "up", "-d", "postgres"]);
    await waitForPostgres();
    await requireShellStep("Drizzle migration", "corepack pnpm --filter web db:migrate", 120_000);
    await requireStep("Compose status", "docker", ["compose", "ps"]);
    console.log("Phase 5 verification passed.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    const diagnostics = await getWindowsVirtualizationDiagnostics();
    if (diagnostics) {
      console.error(diagnostics);
    }
    console.error(
      [
        "Phase 5 still needs a running Docker engine.",
        "On Windows, first run tools/scripts/repair-wsl-docker-and-verify-phase5-admin.bat as Administrator to check WSL features, update WSL, restart Docker Desktop, and rerun this verification.",
        "If Docker Desktop still reports virtualization support is not detected after that repair path, check HP BIOS virtualization settings, nested virtualization if this is a VM, or enterprise/App Control policy.",
        "After the daemon is running, rerun: corepack pnpm phase5:verify",
      ].join("\n"),
    );
    process.exitCode = 1;
  }
}

await main();
