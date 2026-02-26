import { execa } from "execa";
import chalk from "chalk";
import type { ResolvedInstall } from "../resolve.js";

export async function runAptInstall(packages: ResolvedInstall[]): Promise<void> {
  if (packages.length === 0) return;
  const pkgNames = packages.map((r) => r.package);
  try {
    console.log(chalk.dim("  Running apt-get update..."));
    await execa("sudo", ["apt-get", "update", "-qq"], { stdio: "inherit" });
    await execa("sudo", ["apt-get", "install", "-y", "-qq", ...pkgNames], {
      stdio: "inherit",
    });
  } catch {
    console.log(
      chalk.yellow(
        `\n  apt install failed. Try manually: sudo apt-get install -y ${pkgNames.join(" ")}`,
      ),
    );
  }
}
