import { execa } from "execa";
import type { Tool } from "./catalog.js";

export function getNpmTools(tools: Tool[]): Tool[] {
  return tools.filter((t) => t.installMethod === "npm");
}

export function getNpmInstallCommand(tools: Tool[]): string[] {
  const npmTools = getNpmTools(tools);
  if (npmTools.length === 0) return [];
  return npmTools.map((t) => t.package);
}

export async function runNpmInstall(packages: string[]): Promise<void> {
  if (packages.length === 0) return;
  await execa("npm", ["install", "-g", ...packages], { stdio: "inherit" });
}
