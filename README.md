# agent-loadout

> One command to load out your terminal for agentic coding.

```sh
npx agent-loadout
```

<img width="1536" height="1024" alt="One command to load out your terminal for agentic coding." src="https://github.com/user-attachments/assets/7490564f-0e24-479e-b8d8-1fb0bb468267" />


## Why this exists

AI coding agents are only as good as the tools on the machine. A fresh macOS, Linux, or Windows install has few of them. `agent-loadout` installs a curated set of 50 terminal tools — the ones that actually matter for agentic workflows.

Pick presets, toggle individual tools, and get a verified installation with skill files your agent can read.

## Tool catalog

### Core (9 tools) — on by default

| Tool | Package | Description |
|------|---------|-------------|
| [ripgrep](https://github.com/BurntSushi/ripgrep) | `ripgrep` | Fast code search |
| [fd](https://github.com/sharkdp/fd) | `fd` | Fast file finder |
| [jq](https://github.com/jqlang/jq) | `jq` | JSON processor |
| [yq](https://github.com/mikefarah/yq) | `yq` | YAML processor |
| [bat](https://github.com/sharkdp/bat) | `bat` | Cat with syntax highlighting |
| [tree](https://en.wikipedia.org/wiki/Tree_(command)) | `tree` | Directory structure viewer |
| [GitHub CLI](https://cli.github.com) | `gh` | PRs, issues, releases from the terminal |
| [fzf](https://github.com/junegunn/fzf) | `fzf` | Fuzzy finder |
| [xh](https://github.com/ducaale/xh) | `xh` | Friendly HTTP client |

### Agent (16 tools) — on by default

| Tool | Package | Description |
|------|---------|-------------|
| [shellcheck](https://github.com/koalaman/shellcheck) | `shellcheck` | Static analysis for shell scripts |
| [ast-grep](https://github.com/ast-grep/ast-grep) | `ast-grep` | Structural code search/replace |
| [just](https://github.com/casey/just) | `just` | Command runner (agent-readable task menu) |
| [grex](https://github.com/pemistahl/grex) | `grex` | Generate regex from examples |
| [knip](https://github.com/webpro-nl/knip) | `knip` | Find unused code/deps in TS/JS |
| [sd](https://github.com/chmln/sd) | `sd` | Simpler sed replacement |
| [hyperfine](https://github.com/sharkdp/hyperfine) | `hyperfine` | CLI benchmarking |
| [tokei](https://github.com/XAMPPRocky/tokei) | `tokei` | Code statistics |
| [tldr](https://github.com/tldr-pages/tldr) | `tldr` | Quick man page summaries |
| [biome](https://github.com/biomejs/biome) | `biome` | Lint + format JS/TS |
| [difftastic](https://github.com/Wilfred/difftastic) | `difftastic` | Structural/AST diff |
| [pandoc](https://github.com/jgm/pandoc) | `pandoc` | Universal document converter |
| [duckdb](https://github.com/duckdb/duckdb) | `duckdb` | SQL analytics on CSV/JSON/Parquet files |
| [htmlq](https://github.com/mgdm/htmlq) | `htmlq` | Extract content from HTML using CSS selectors |
| [typos](https://github.com/crate-ci/typos) | `typos-cli` | Source code spell checker |
| [gum](https://github.com/charmbracelet/gum) | `gum` | Interactive UI components for shell scripts |

### Media (4 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [ffmpeg](https://ffmpeg.org) | `ffmpeg` | Audio/video Swiss army knife |
| [exiftool](https://exiftool.org) | `exiftool` | Image/media metadata |
| [ImageMagick](https://imagemagick.org) | `imagemagick` | Image transforms |
| [svgo](https://github.com/svg/svgo) | `svgo` | SVG optimiser |

### DX (15 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [eza](https://github.com/eza-community/eza) | `eza` | Modern ls replacement |
| [zoxide](https://github.com/ajeetdsouza/zoxide) | `zoxide` | Smarter cd |
| [delta](https://github.com/dandavison/delta) | `git-delta` | Better git diffs |
| [glow](https://github.com/charmbracelet/glow) | `glow` | Terminal markdown renderer |
| [mise](https://github.com/jdx/mise) | `mise` | Runtime version manager |
| [watchexec](https://github.com/watchexec/watchexec) | `watchexec` | Run commands on file change |
| [mkcert](https://github.com/FiloSottile/mkcert) | `mkcert` | Local HTTPS certs |
| [lazygit](https://github.com/jesseduffield/lazygit) | `lazygit` | TUI git client |
| [dust](https://github.com/bootandy/dust) | `dust` | Disk usage tree |
| [bottom](https://github.com/ClementTsang/bottom) | `bottom` | System monitor TUI |
| [direnv](https://github.com/direnv/direnv) | `direnv` | Auto-load env vars per directory |
| [procs](https://github.com/dalance/procs) | `procs` | Modern ps replacement with search |
| [uv](https://github.com/astral-sh/uv) | `uv` | Fast Python package and env manager |
| [hexyl](https://github.com/sharkdp/hexyl) | `hexyl` | Hex viewer with colour coding |
| [taplo](https://github.com/tamasfe/taplo) | `taplo` | TOML toolkit (lint, format, query) |

### Security (6 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [trivy](https://github.com/aquasecurity/trivy) | `trivy` | Vulnerability scanner |
| [act](https://github.com/nektos/act) | `act` | Run GitHub Actions locally |
| [gitleaks](https://github.com/gitleaks/gitleaks) | `gitleaks` | Secrets scanner |
| [semgrep](https://github.com/returntocorp/semgrep) | `semgrep` | Multi-language static analysis |
| [age](https://github.com/FiloSottile/age) | `age` | Simple file encryption |
| [doggo](https://github.com/mr-karan/doggo) | `doggo` | Modern DNS client with JSON output |

## How it works

1. **Choose presets** — Core and Agent are on by default; toggle Media, DX, Security
2. **Toggle tools** — Deselect anything you don't want
3. **Preview** — See the exact install commands before anything runs (brew/apt/scoop/cargo/npm per platform)
4. **Install** — Runs the right installer for your OS automatically
5. **Verify** — Checks every tool is actually working
6. **Persist** — Writes a receipt and skill files your AI agent can read

## Commands

```sh
# Interactive install (default)
npx agent-loadout

# Install specific presets (dry run)
npx agent-loadout install --preset core agent

# Install specific presets (actually run it)
npx agent-loadout install --preset core agent --apply

# Install everything
npx agent-loadout install --all --apply

# Install specific tools by ID
npx agent-loadout install --tool pandoc duckdb --apply

# Install everything except specific tools
npx agent-loadout install --all --skip lazygit bottom --apply

# Check what's installed
npx agent-loadout verify
npx agent-loadout verify --json

# List the full catalog
npx agent-loadout list
npx agent-loadout list --json

# Print a generated Brewfile (macOS only)
npx agent-loadout list --brewfile
```

## Brewfile alternative (macOS)

Don't want the CLI? Copy the [Brewfile](./Brewfile) (macOS only, auto-generated from the catalog) and run:

```sh
brew bundle
```

## Skills

When you install tools, `agent-loadout` writes skill files to multiple locations:

- `~/.claude/skills/` — for Claude Code
- `~/.agent-loadout/skills/` — generic copy for other agents

Each skill is a focused playbook — what the tool does, trusted commands, gotchas — so your AI agent knows how to use it effectively.

## Requirements

- Node.js 20+ (for `npx`)
- **macOS** — [Homebrew](https://brew.sh) required
- **Linux** — `apt-get` recommended; `cargo` used as fallback for Rust tools
- **Windows** — [Scoop](https://scoop.sh) recommended

A small number of tools are macOS/Windows-only and will be shown as skipped on platforms where no package exists.

## Contributing

1. Fork and clone
2. `pnpm install`
3. `pnpm dev -- list` to run locally
4. Add tools in `src/catalog.ts` (per-platform install maps), add a skill file in `src/skills/`
5. `pnpm typecheck` before submitting

### Releasing

```sh
# Create a GitHub release — CI publishes to npm automatically
gh release create v0.2.0 --generate-notes

# The release workflow:
# extracts version from tag → syncs package.json → typecheck → build → npm publish
```

Requires `NPM_TOKEN` secret set in the repository settings.

## License

MIT
