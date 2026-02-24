import { writeFile } from "node:fs/promises";
import { execa } from "execa";
import chalk from "chalk";
import { paths, ensureDir } from "./paths.js";
import type { Tool } from "./catalog.js";

export async function checkBrewInstalled(): Promise<boolean> {
  try {
    await execa("brew", ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export function generateBrewfile(tools: Tool[]): string {
  const brewTools = tools.filter((t) => t.installMethod === "brew");
  if (brewTools.length === 0) return "";

  const lines = brewTools.map((t) => `brew "${t.package}"`);
  return lines.join("\n") + "\n";
}

export async function writeBrewfile(content: string): Promise<void> {
  await ensureDir();
  await writeFile(paths.brewfile, content);
}

export async function runBrewBundle(): Promise<boolean> {
  try {
    await execa("brew", ["bundle", "--file", paths.brewfile, "--no-lock"], {
      stdio: "inherit",
    });
    return true;
  } catch {
    console.log(
      chalk.yellow(
        "\n  Some brew packages may have failed to install. Run 'brew bundle --file ~/.agent-starter/Brewfile' to retry.",
      ),
    );
    return false;
  }
}
