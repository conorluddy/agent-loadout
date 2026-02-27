# agent-loadout

CLI that installs and verifies a curated set of terminal tools for agentic coding workflows.

## Architecture

```
src/
  index.ts        CLI entry point (commander). Wires commands: install, verify, list.
  catalog.ts      Tool + preset definitions. Single source of truth for all 50 tools.
  brew.ts         Generates Brewfile, runs `brew bundle`.
  npm.ts          Handles `npm install -g` for npm-only tools (knip, svgo).
  verify.ts       Runs each tool's verify command, reports installed/missing.
  skills.ts       Imports skill modules, writes per-tool .md files + SKILL.md TOC.
  skills/         One .ts file per tool, each exports a markdown skill string.
  receipt.ts      Reads/writes ~/.agent-loadout/receipt.json (what was installed).
  paths.ts        Central path constants (~/.agent-loadout/, ~/.claude/skills/agent-loadout/).
  ui.ts           Interactive prompts (inquirer) and preview formatting.
```

**Data flow:** `catalog.ts` defines tools → user selects via `ui.ts` → `brew.ts`/`npm.ts` install → `verify.ts` checks → `skills.ts` + `receipt.ts` persist results.

## Conventions

- **ESM-only** (`"type": "module"`, `.js` extensions in imports)
- **Strict TypeScript** — `tsc --noEmit` for typechecking, `tsup` for bundling
- **execa with array form** — never shell-interpolated strings
- **chalk** for terminal colours
- **commander** for CLI parsing

## Local dev

```sh
pnpm install
pnpm dev -- list            # run any command via tsx
pnpm dev -- install --all   # dry-run (no --apply)
pnpm typecheck              # tsc --noEmit
pnpm build                  # tsup → dist/
```

## How to add a tool

1. Add entry to `TOOLS` array in `catalog.ts` (id, name, package, installMethod, verify command, description, preset)
2. Add a new file `src/skills/{id}.ts` exporting a default markdown string, then import it in `skills.ts`
3. Add the corresponding `brew "package"` line to the root `Brewfile` under the right preset section
4. Run `pnpm dev -- verify` to confirm the verify command works

## How to add a preset

1. Add preset id to the `PresetId` union in `catalog.ts`
2. Add preset object to `PRESETS` array (id, name, description, defaultOn)
3. Add a section comment in `Brewfile`
4. Assign tools to the new preset

## Security model

`catalog.ts` is the trust boundary. Every tool must be explicitly listed with a known package name and verify command. No arbitrary install targets — users only choose from the curated catalog.

## What NOT to do

- Don't add tools without a verify command
- Don't use `execa` with `shell: true` or string commands
- Don't write to paths outside `~/.agent-loadout/` and `~/.claude/skills/agent-loadout/`
- Don't import from `dist/` — always import from `./module.js`
