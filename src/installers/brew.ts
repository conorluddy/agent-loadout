import { writeFile } from "node:fs/promises";
import { execa } from "execa";
import chalk from "chalk";
import { paths, ensureDir } from "../paths.js";
import type { ResolvedInstall } from "../resolve.js";

export async function checkBrewInstalled(): Promise<boolean> {
  try {
    await execa("brew", ["--version"]);
    return true;
  } catch {
    return false;
  }
}

export function generateBrewfile(packages: ResolvedInstall[]): string {
  if (packages.length === 0) return "";
  return packages.map((r) => `brew "${r.package}"`).join("\n") + "\n";
}

export async function writeBrewfile(content: string): Promise<void> {
  await ensureDir();
  await writeFile(paths.brewfile!, content);
}

export async function runBrewBundle(): Promise<void> {
  try {
    await execa("brew", ["bundle", "--file", paths.brewfile!], {
      stdio: "inherit",
    });
  } catch {
    console.log(
      chalk.yellow(
        "\n  Some brew packages may have failed. Run 'brew bundle --file ~/.agent-loadout/Brewfile' to retry.",
      ),
    );
  }
}

export async function runBrewInstall(packages: ResolvedInstall[]): Promise<void> {
  if (packages.length === 0) return;
  const brewfile = generateBrewfile(packages);
  await writeBrewfile(brewfile);
  await runBrewBundle();
}
