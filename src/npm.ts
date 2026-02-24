import { execa } from "execa";
import chalk from "chalk";
import type { Tool } from "./catalog.js";

export async function checkNpmInstalled(): Promise<boolean> {
  try {
    await execa("npm", ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export function getNpmTools(tools: Tool[]): Tool[] {
  return tools.filter((t) => t.installMethod === "npm");
}

export function getNpmInstallCommand(tools: Tool[]): string[] {
  const npmTools = getNpmTools(tools);
  if (npmTools.length === 0) return [];
  return npmTools.map((t) => t.package);
}

export async function runNpmInstall(packages: string[]): Promise<boolean> {
  if (packages.length === 0) return true;
  try {
    await execa("npm", ["install", "-g", ...packages], { stdio: "inherit" });
    return true;
  } catch {
    console.log(
      chalk.yellow(
        `\n  npm install failed. Try manually: npm install -g ${packages.join(" ")}`,
      ),
    );
    return false;
  }
}
