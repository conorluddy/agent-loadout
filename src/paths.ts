import { homedir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

const BASE_DIR = join(homedir(), ".agent-loadout");
const GENERIC_SKILLS = join(BASE_DIR, "skills");

const SKILL_TARGETS: Record<string, string> = {
  claude: join(homedir(), ".claude", "skills"),
};

export const paths = {
  base: BASE_DIR,
  receipt: join(BASE_DIR, "receipt.json"),
  brewfile: join(BASE_DIR, "Brewfile"),
  skillTargets: SKILL_TARGETS,
  genericSkills: GENERIC_SKILLS,
};

export async function ensureDir(): Promise<void> {
  await mkdir(paths.base, { recursive: true });
}

export async function ensureSkillDirs(): Promise<void> {
  for (const dir of Object.values(paths.skillTargets)) {
    await mkdir(dir, { recursive: true });
  }
  await mkdir(paths.genericSkills, { recursive: true });
}
