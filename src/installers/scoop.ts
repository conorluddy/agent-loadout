import { execa } from "execa";
import chalk from "chalk";
import type { ResolvedInstall } from "../resolve.js";

// Packages that live in the extras bucket
const EXTRAS_PACKAGES = new Set([
  "lazygit",
  "delta",
  "bottom",
  "glow",
  "gum",
  "mkcert",
]);

export async function runScoopInstall(packages: ResolvedInstall[]): Promise<void> {
  if (packages.length === 0) return;

  const needsExtras = packages.some((r) => EXTRAS_PACKAGES.has(r.package));
  if (needsExtras) {
    try {
      await execa("scoop", ["bucket", "add", "extras"], { stdio: "inherit" });
    } catch {
      // bucket may already exist — not fatal
    }
  }

  const pkgNames = packages.map((r) => r.package);
  try {
    await execa("scoop", ["install", ...pkgNames], { stdio: "inherit" });
  } catch {
    console.log(
      chalk.yellow(
        `\n  scoop install failed. Try manually: scoop install ${pkgNames.join(" ")}`,
      ),
    );
  }
}
