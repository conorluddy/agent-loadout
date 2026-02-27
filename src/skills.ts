import { access, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { paths, ensureSkillDirs } from "./paths.js";
import { PRESETS } from "./catalog.js";
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
import pandoc from "./skills/pandoc.js";
import duckdb from "./skills/duckdb.js";
import htmlq from "./skills/htmlq.js";
import typos from "./skills/typos.js";
import gum from "./skills/gum.js";
import direnv from "./skills/direnv.js";
import procs from "./skills/procs.js";
import uv from "./skills/uv.js";
import hexyl from "./skills/hexyl.js";
import taplo from "./skills/taplo.js";
import semgrep from "./skills/semgrep.js";
import age from "./skills/age.js";
import doggo from "./skills/doggo.js";

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
  pandoc,
  duckdb,
  htmlq,
  typos,
  gum,
  direnv,
  procs,
  uv,
  hexyl,
  taplo,
  semgrep,
  age,
  doggo,
};

function skillFilename(toolId: string): string {
  return `${toolId}.md`;
}

function buildFrontmatter(tool: Tool): string {
  const lines = [
    "---",
    `tool: ${tool.id}`,
    `name: ${tool.name}`,
    `description: ${tool.description}`,
    `category: ${tool.preset}`,
  ];
  if (tool.tags?.length) {
    lines.push(`tags: [${tool.tags.join(", ")}]`);
  }
  if (tool.seeAlso?.length) {
    lines.push(`see-also: [${tool.seeAlso.join(", ")}]`);
  }
  lines.push("source: agent-loadout", "---", "");
  return lines.join("\n");
}

export async function findToolsMissingSkills(
  toolIds: string[],
  dir = paths.skillTargets.claude,
): Promise<string[]> {
  const results = await Promise.all(
    toolIds.map(async (id) => {
      const filePath = join(dir, skillFilename(id));
      try {
        await access(filePath);
        return null;
      } catch {
        return id;
      }
    }),
  );
  return results.filter((id): id is string => id !== null);
}

function buildTOC(tools: Tool[]): string {
  const byPreset = new Map<string, Tool[]>();
  for (const tool of tools) {
    const group = byPreset.get(tool.preset) ?? [];
    group.push(tool);
    byPreset.set(tool.preset, group);
  }

  const allTags = tools.flatMap((t) => t.tags?.slice(0, 2) ?? []);
  const tagSummary = [...new Set(allTags)].slice(0, 8).join(", ");

  const sections = PRESETS.filter((p) => byPreset.has(p.id))
    .map((preset) => {
      const entries = (byPreset.get(preset.id) ?? [])
        .map((t) => {
          const uses = (t.tags ?? []).slice(0, 4).join(" · ");
          return `- **[${t.name}](./${skillFilename(t.id)})** — ${uses}`;
        })
        .join("\n");
      return `## ${preset.name}\n${entries}`;
    })
    .join("\n\n");

  return [
    "---",
    `description: "Installed CLI tools — ${tagSummary} and more. Read individual files for commands and agent tips."`,
    "source: agent-loadout",
    "---",
    "",
    "# Agent Loadout",
    "",
    sections,
    "",
  ].join("\n");
}

export async function writeSkills(tools: Tool[]): Promise<number> {
  await ensureSkillDirs();
  const allDirs = [...Object.values(paths.skillTargets), paths.genericSkills];
  let written = 0;

  for (const tool of tools) {
    const content = SKILL_CONTENT[tool.id];
    if (!content) continue;
    const filename = skillFilename(tool.id);
    const frontmatter = buildFrontmatter(tool);
    for (const dir of allDirs) {
      await writeFile(join(dir, filename), frontmatter + content + "\n");
    }
    written++;
  }

  // Write TOC last so it reflects exactly what was written
  const toc = buildTOC(tools.filter((t) => SKILL_CONTENT[t.id]));
  for (const dir of allDirs) {
    await writeFile(join(dir, "SKILL.md"), toc);
  }

  return written;
}
