import { execa } from "execa";
import chalk from "chalk";
import type { ResolvedInstall } from "../resolve.js";

export async function runNpmInstall(packages: ResolvedInstall[]): Promise<void> {
  if (packages.length === 0) return;
  const pkgNames = packages.map((r) => r.package);
  try {
    await execa("npm", ["install", "-g", ...pkgNames], { stdio: "inherit" });
  } catch {
    console.log(
      chalk.yellow(
        `\n  npm install failed. Try manually: npm install -g ${pkgNames.join(" ")}`,
      ),
    );
  }
}
