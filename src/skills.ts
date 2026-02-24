import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { paths, ensureSkillsDir } from "./paths.js";
import type { Tool } from "./catalog.js";

import rg from "./skills/rg.js";
import fd from "./skills/fd.js";
import jq from "./skills/jq.js";
import yq from "./skills/yq.js";
import bat from "./skills/bat.js";
import tree from "./skills/tree.js";
import gh from "./skills/gh.js";
import fzf from "./skills/fzf.js";
import shellcheck from "./skills/shellcheck.js";
import astGrep from "./skills/ast-grep.js";
import just from "./skills/just.js";
import grex from "./skills/grex.js";
import knip from "./skills/knip.js";
import sd from "./skills/sd.js";
import hyperfine from "./skills/hyperfine.js";
import tokei from "./skills/tokei.js";
import ffmpeg from "./skills/ffmpeg.js";
import exiftool from "./skills/exiftool.js";
import imagemagick from "./skills/imagemagick.js";
import svgo from "./skills/svgo.js";
import eza from "./skills/eza.js";
import zoxide from "./skills/zoxide.js";
import delta from "./skills/delta.js";
import glow from "./skills/glow.js";
import mise from "./skills/mise.js";
import watchexec from "./skills/watchexec.js";
import mkcert from "./skills/mkcert.js";
import trivy from "./skills/trivy.js";
import act from "./skills/act.js";
import xh from "./skills/xh.js";
import tldr from "./skills/tldr.js";
import biome from "./skills/biome.js";
import difftastic from "./skills/difftastic.js";
import lazygit from "./skills/lazygit.js";
import dust from "./skills/dust.js";
import btm from "./skills/btm.js";
import gitleaks from "./skills/gitleaks.js";

const PREFIX = "agent-loadout";

// ── Skill registry ──────────────────────────────────────
const SKILL_CONTENT: Record<string, string> = {
  rg,
  fd,
  jq,
  yq,
  bat,
  tree,
  gh,
  fzf,
  shellcheck,
  "ast-grep": astGrep,
  just,
  grex,
  knip,
  sd,
  hyperfine,
  tokei,
  ffmpeg,
  exiftool,
  imagemagick,
  svgo,
  eza,
  zoxide,
  delta,
  glow,
  mise,
  watchexec,
  mkcert,
  trivy,
  act,
  xh,
  tldr,
  biome,
  difftastic,
  lazygit,
  dust,
  btm,
  gitleaks,
};

function skillPath(toolId: string): string {
  return join(paths.skills, `${PREFIX}-${toolId}.md`);
}

export async function writeSkills(tools: Tool[]): Promise<number> {
  await ensureSkillsDir();
  let written = 0;
  for (const tool of tools) {
    const content = SKILL_CONTENT[tool.id];
    if (!content) continue;
    await writeFile(skillPath(tool.id), content + "\n");
    written++;
  }
  return written;
}
