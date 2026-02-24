import { checkbox, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import { PRESETS, TOOLS, getToolsByPreset } from "./catalog.js";
import type { PresetId, Tool } from "./catalog.js";
import { generateBrewfile } from "./brew.js";
import { getNpmInstallCommand } from "./npm.js";

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

  const selectedIds = await checkbox({
    message: "Toggle individual tools (all selected by default)",
    choices: available.map((t) => ({
      name: `${t.name} — ${chalk.dim(t.description)}`,
      value: t.id,
      checked: true,
    })),
  });

  return TOOLS.filter((t) => selectedIds.includes(t.id));
}

export function printPreview(tools: Tool[]): void {
  const brewfile = generateBrewfile(tools);
  const npmPackages = getNpmInstallCommand(tools);

  console.log();
  if (brewfile) {
    console.log(chalk.bold("Brewfile:"));
    console.log(chalk.dim(brewfile));
    console.log(
      chalk.dim("  → brew bundle --file ~/.agent-starter/Brewfile --no-lock"),
    );
    console.log();
  }

  if (npmPackages.length > 0) {
    console.log(chalk.bold("npm globals:"));
    console.log(chalk.dim(`  → npm install -g ${npmPackages.join(" ")}`));
    console.log();
  }
}

export async function confirmInstall(): Promise<boolean> {
  return confirm({ message: "Install now?", default: true });
}
