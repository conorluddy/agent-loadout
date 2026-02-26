import type { Tool } from "./catalog.js";
import type { Platform, PackageManager, PlatformInfo } from "./platform.js";

export type ResolvedInstall = {
  tool: Tool;
  method: PackageManager;
  package: string;
};

export type SkippedTool = {
  tool: Tool;
  reason: string;
};

export type InstallPlan = {
  resolved: ResolvedInstall[];
  skipped: SkippedTool[];
};

export function resolveInstallPlan(tools: Tool[], info: PlatformInfo): InstallPlan {
  const resolved: ResolvedInstall[] = [];
  const skipped: SkippedTool[] = [];

  for (const tool of tools) {
    const platformInstalls = tool.install[info.platform];

    if (platformInstalls === null) {
      skipped.push({ tool, reason: "not available on this platform" });
      continue;
    }

    const match = platformInstalls.find((pi) => info.available.includes(pi.method));
    if (!match) {
      const required = platformInstalls.map((pi) => pi.method).join(" or ");
      skipped.push({ tool, reason: `requires ${required}` });
      continue;
    }

    resolved.push({ tool, method: match.method, package: match.package });
  }

  return { resolved, skipped };
}

export function groupByMethod(
  resolved: ResolvedInstall[],
): Map<PackageManager, ResolvedInstall[]> {
  const groups = new Map<PackageManager, ResolvedInstall[]>();
  for (const item of resolved) {
    const group = groups.get(item.method) ?? [];
    group.push(item);
    groups.set(item.method, group);
  }
  return groups;
}

// Convenience: get just the platform-resolved verify command
export function getVerifyCommand(tool: Tool, platform: Platform): string {
  const v = tool.verify;
  if (typeof v === "string") return v;
  return v[platform] ?? v.darwin ?? Object.values(v)[0] ?? "";
}
