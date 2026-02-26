import { execa } from "execa";

export type Platform = "darwin" | "linux" | "win32";
export type PackageManager = "brew" | "npm" | "apt" | "cargo" | "scoop";

export type PlatformInfo = {
  platform: Platform;
  arch: "x64" | "arm64";
  available: PackageManager[];
};

async function hasCommand(cmd: string): Promise<boolean> {
  try {
    await execa(cmd, ["--version"], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

const CANDIDATES: Record<Platform, PackageManager[]> = {
  darwin: ["brew", "npm"],
  linux: ["apt", "npm", "cargo"],
  win32: ["scoop", "npm", "cargo"],
};

export async function detectPlatform(): Promise<PlatformInfo> {
  const platform = process.platform as Platform;
  const arch = process.arch === "arm64" ? "arm64" : "x64";
  const candidates = CANDIDATES[platform] ?? [];

  const checks = await Promise.all(
    candidates.map(async (mgr) => {
      const cmd = mgr === "apt" ? "apt-get" : mgr;
      const found = await hasCommand(cmd);
      return found ? mgr : null;
    }),
  );

  // npm is always available if we're running (Node required)
  const available = checks.filter((m): m is PackageManager => m !== null);
  if (!available.includes("npm")) available.push("npm");

  return { platform, arch, available };
}
