import { homedir } from "node:os";
import { join } from "node:path";
import { mkdir } from "node:fs/promises";

const BASE_DIR = join(homedir(), ".agent-starter");
const SKILLS_DIR = join(homedir(), ".claude", "skills");

export const paths = {
  base: BASE_DIR,
  receipt: join(BASE_DIR, "receipt.json"),
  brewfile: join(BASE_DIR, "Brewfile"),
  skills: SKILLS_DIR,
};

export async function ensureDir(): Promise<void> {
  await mkdir(paths.base, { recursive: true });
}

export async function ensureSkillsDir(): Promise<void> {
  await mkdir(paths.skills, { recursive: true });
}
