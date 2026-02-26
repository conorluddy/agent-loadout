import chalk from "chalk";
import type { PackageManager } from "../platform.js";
import type { InstallPlan, ResolvedInstall } from "../resolve.js";
import type { InstallerFn } from "./types.js";
import { runBrewInstall } from "./brew.js";
import { runNpmInstall } from "./npm.js";
import { runAptInstall } from "./apt.js";
import { runScoopInstall } from "./scoop.js";
import { runCargoInstall } from "./cargo.js";

const INSTALLERS: Record<PackageManager, InstallerFn> = {
  brew: runBrewInstall,
  npm: runNpmInstall,
  apt: runAptInstall,
  scoop: runScoopInstall,
  cargo: runCargoInstall,
};

export function getInstallerFn(method: PackageManager): InstallerFn {
  return INSTALLERS[method];
}

export async function runInstallPlan(plan: InstallPlan): Promise<void> {
  const groups = new Map<PackageManager, ResolvedInstall[]>();
  for (const item of plan.resolved) {
    const group = groups.get(item.method) ?? [];
    group.push(item);
    groups.set(item.method, group);
  }

  for (const [method, packages] of groups) {
    console.log(chalk.bold(`\nInstalling via ${method}...`));
    await getInstallerFn(method)(packages);
  }
}
