import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdir, rm, writeFile, access } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { findToolsMissingSkills, writeSkills } from "./skills.js";
import type { Tool } from "./catalog.js";

// ── Fixtures ─────────────────────────────────────────────

const TMP = join(tmpdir(), `agent-loadout-test-${process.pid}`);
const SKILLS_DIR = join(TMP, "skills");

function skillFile(id: string): string {
  return join(SKILLS_DIR, `agent-loadout-${id}.md`);
}

function makeTool(id: string): Tool {
  return {
    id,
    name: id,
    description: `${id} test tool`,
    preset: "essentials",
    install: {},
    verify: { command: id, args: ["--version"] },
  } as unknown as Tool;
}

before(async () => {
  await mkdir(SKILLS_DIR, { recursive: true });
});

after(async () => {
  await rm(TMP, { recursive: true, force: true });
});

// ── findToolsMissingSkills ────────────────────────────────

describe("findToolsMissingSkills", () => {
  test("returns all ids when no skill files exist", async () => {
    const missing = await findToolsMissingSkills(["rg", "jq", "bat"], SKILLS_DIR);
    assert.deepEqual(missing, ["rg", "jq", "bat"]);
  });

  test("returns empty array when all skill files exist", async () => {
    await writeFile(skillFile("fd"), "# fd skill");
    await writeFile(skillFile("sd"), "# sd skill");

    const missing = await findToolsMissingSkills(["fd", "sd"], SKILLS_DIR);
    assert.deepEqual(missing, []);
  });

  test("returns only the ids whose files are absent", async () => {
    await writeFile(skillFile("gh"), "# gh skill");

    const missing = await findToolsMissingSkills(["gh", "fzf", "eza"], SKILLS_DIR);
    assert.deepEqual(missing, ["fzf", "eza"]);
  });

  test("returns empty array for empty input", async () => {
    const missing = await findToolsMissingSkills([], SKILLS_DIR);
    assert.deepEqual(missing, []);
  });

  test("runs checks in parallel without errors", async () => {
    const ids = Array.from({ length: 20 }, (_, i) => `tool-${i}`);
    // Write even-indexed ones
    await Promise.all(
      ids.filter((_, i) => i % 2 === 0).map((id) => writeFile(skillFile(id), `# ${id}`)),
    );

    const missing = await findToolsMissingSkills(ids, SKILLS_DIR);
    const expectedMissing = ids.filter((_, i) => i % 2 !== 0);
    assert.deepEqual(missing, expectedMissing);
  });
});

// ── writeSkills ───────────────────────────────────────────

describe("writeSkills (integration — uses real catalog content)", () => {
  test("writes known tools and returns correct count", async () => {
    // Use real catalog tools that have skill content registered
    const { TOOLS } = await import("./catalog.js");
    const { writeSkills: write } = await import("./skills.js");
    const { paths, ensureSkillDirs } = await import("./paths.js");

    // Grab 3 real tools
    const tools = TOOLS.slice(0, 3);
    // writeSkills targets real paths — just assert count is correct
    await ensureSkillDirs();
    const count = await write(tools);
    assert.equal(count, 3);

    // Verify files were written to the real claude skills dir
    for (const tool of tools) {
      await assert.doesNotReject(
        access(join(paths.skillTargets.claude, `agent-loadout-${tool.id}.md`)),
        `Expected skill file for ${tool.id}`,
      );
    }
  });

  test("skips tools with no registered skill content and still returns accurate count", async () => {
    const ghostTool = makeTool("nonexistent-tool-xyz");
    const { TOOLS } = await import("./catalog.js");
    const realTool = TOOLS[0];

    const { writeSkills: write } = await import("./skills.js");
    const { ensureSkillDirs } = await import("./paths.js");
    await ensureSkillDirs();

    const count = await write([ghostTool, realTool]);
    // Only the real tool has content, ghost is skipped
    assert.equal(count, 1);
  });
});
