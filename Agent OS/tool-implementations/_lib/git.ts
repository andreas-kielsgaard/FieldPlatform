import { execFileSync } from "node:child_process";

export function gitSha(root: string): string | null {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

export function gitLines(root: string, args: string[]): string[] {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] })
      .split(/\r?\n/)
      .map((line) => line.trimEnd())
      .filter(Boolean);
  } catch {
    return [];
  }
}
