import { checkbox, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { PRESETS, TOOLS, getToolsByPreset } from "./catalog.js";
import type { PresetId, Tool } from "./catalog.js";
import type { PlatformInfo } from "./platform.js";
import type { InstallPlan } from "./resolve.js";
import { verifyTools } from "./verify.js";

export async function selectPresets(): Promise<PresetId[]> {
  return checkbox({
    message: "Which presets do you want to install?",
    choices: PRESETS.map((p) => ({
      name: `${p.name} — ${p.description}`,
      value: p.id,
      checked: p.defaultOn,
    })),
  });
}

export async function selectTools(presetIds: PresetId[]): Promise<Tool[]> {
  const available = presetIds.flatMap(getToolsByPreset);

  // Quick check which tools are already installed
  const status = await verifyTools(available);
  const installedIds = new Set(
    status.filter((r) => r.installed).map((r) => r.id),
  );

  const selectedIds = await checkbox({
    message: "Toggle individual tools (all selected by default)",
    choices: available.map((t) => {
      const badge = installedIds.has(t.id)
        ? chalk.green(" (installed)")
        : "";
      return {
        name: `${t.name}${badge} — ${chalk.dim(t.description)}`,
        value: t.id,
        checked: true,
      };
    }),
  });

  return TOOLS.filter((t) => selectedIds.includes(t.id));
}

export function printPreview(
  tools: Tool[],
  plan: InstallPlan,
  platformInfo: PlatformInfo,
): void {
  const platformLabel = chalk.cyan(platformInfo.platform);
  const archLabel = chalk.dim(platformInfo.arch);
  console.log(`\nPlatform: ${platformLabel} ${archLabel}`);

  if (plan.skipped.length > 0) {
    console.log(chalk.yellow(`\nSkipped (${plan.skipped.length} tools unavailable on this platform):`));
    for (const { tool, reason } of plan.skipped) {
      console.log(chalk.dim(`  • ${tool.name} — ${reason}`));
    }
  }

  // Group resolved by method
  const groups = new Map<string, string[]>();
  for (const { method, package: pkg } of plan.resolved) {
    const list = groups.get(method) ?? [];
    list.push(pkg);
    groups.set(method, list);
  }

  if (groups.size === 0) {
    console.log(chalk.dim("\nNothing to install."));
    return;
  }

  console.log();
  for (const [method, packages] of groups) {
    const label = chalk.bold(`${method}:`);
    console.log(label);
    const preview = getInstallPreview(method, packages);
    console.log(chalk.dim(`  ${preview}`));
    console.log();
  }
}

function getInstallPreview(method: string, packages: string[]): string {
  switch (method) {
    case "brew": return `brew bundle --file ~/.agent-loadout/Brewfile`;
    case "npm": return `npm install -g ${packages.join(" ")}`;
    case "apt": return `sudo apt-get install -y ${packages.join(" ")}`;
    case "scoop": return `scoop install ${packages.join(" ")}`;
    case "cargo": return `cargo install ${packages.join(" ")}`;
    default: return packages.join(" ");
  }
}

export async function confirmInstall(): Promise<boolean> {
  return confirm({ message: "Install now?", default: true });
}
