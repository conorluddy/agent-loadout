import { execa } from "execa";
import chalk from "chalk";
import type { Tool } from "./catalog.js";
import type { Platform } from "./platform.js";
import { getVerifyCommand } from "./resolve.js";

export type VerifyResult = {
  id: string;
  name: string;
  installed: boolean;
  version: string;
};

function getExtraPaths(platform: Platform): string {
  if (platform === "darwin") {
    return "/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin";
  }
  if (platform === "linux") {
    const home = process.env.HOME ?? "";
    return `${home}/.local/bin:${home}/.cargo/bin`;
  }
  if (platform === "win32") {
    const userProfile = process.env.USERPROFILE ?? "";
    return `${userProfile}\\scoop\\shims:${userProfile}\\.cargo\\bin`;
  }
  return "";
}

async function checkTool(tool: Tool, platform: Platform): Promise<VerifyResult> {
  try {
    const cmd = getVerifyCommand(tool, platform);
    const [bin, ...args] = cmd.split(" ");
    const extraPaths = getExtraPaths(platform);
    const pathSep = platform === "win32" ? ";" : ":";
    const env = {
      ...process.env,
      PATH: `${extraPaths}${pathSep}${process.env.PATH}`,
    };
    const result = await execa(bin, args, { timeout: 5000, env });
    const version = result.stdout.split("\n")[0].trim();
    return { id: tool.id, name: tool.name, installed: true, version };
  } catch {
    return { id: tool.id, name: tool.name, installed: false, version: "" };
  }
}

export async function verifyTools(
  tools: Tool[],
  platform: Platform = process.platform as Platform,
): Promise<VerifyResult[]> {
  return Promise.all(tools.map((t) => checkTool(t, platform)));
}

export function printVerifyResults(results: VerifyResult[]): void {
  const maxName = Math.max(...results.map((r) => r.name.length));

  for (const r of results) {
    const name = r.name.padEnd(maxName);
    if (r.installed) {
      console.log(`  ${chalk.green("✓")} ${name}  ${chalk.dim(r.version)}`);
    } else {
      console.log(`  ${chalk.red("✗")} ${name}  ${chalk.red("not found")}`);
    }
  }

  const installed = results.filter((r) => r.installed).length;
  const total = results.length;
  console.log();
  console.log(
    installed === total
      ? chalk.green(`  All ${total} tools installed.`)
      : chalk.yellow(`  ${installed}/${total} tools installed.`),
  );
}

export function verifyResultsToJson(
  results: VerifyResult[],
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const r of results) {
    if (r.installed) out[r.id] = r.version;
  }
  return out;
}
