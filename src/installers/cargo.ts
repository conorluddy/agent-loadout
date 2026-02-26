import { execa } from "execa";
import chalk from "chalk";
import type { ResolvedInstall } from "../resolve.js";

export async function runCargoInstall(packages: ResolvedInstall[]): Promise<void> {
  if (packages.length === 0) return;
  console.log(chalk.dim("  Note: cargo installs compile from source — this may take a while."));
  for (const { package: pkg } of packages) {
    try {
      await execa("cargo", ["install", pkg], { stdio: "inherit" });
    } catch {
      console.log(
        chalk.yellow(`\n  cargo install ${pkg} failed. Try manually: cargo install ${pkg}`),
      );
    }
  }
}
