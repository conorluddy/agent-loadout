import type { ResolvedInstall } from "../resolve.js";

export type InstallerFn = (packages: ResolvedInstall[]) => Promise<void>;
