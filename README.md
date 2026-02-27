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
| [ripgrep](https://github.com/BurntSushi/ripgrep) | `ripgrep` | Fastest code search available — 10-100x faster than grep. Agents use it constantly to locate symbols, patterns, and references across large codebases without reading every file. Respects `.gitignore` by default, so results are always relevant. |
| [fd](https://github.com/sharkdp/fd) | `fd` | Modern `find` replacement that's faster and has sane defaults. Agents use it to enumerate files by name, extension, or pattern without learning arcane `find` flags. Output is clean and scriptable. |
| [jq](https://github.com/jqlang/jq) | `jq` | The standard tool for slicing and transforming JSON from APIs, config files, and CLI output. Agents can pipe any JSON through `jq` to extract exactly the field they need without writing a script. Supports complex queries, filters, and reshaping in a single expression. |
| [yq](https://github.com/mikefarah/yq) | `yq` | Does for YAML what `jq` does for JSON — reads, writes, and transforms YAML/TOML/XML. Agents working with CI configs, Kubernetes manifests, or any config-heavy repo rely on it to make targeted edits without touching surrounding structure. |
| [bat](https://github.com/sharkdp/bat) | `bat` | `cat` with syntax highlighting, line numbers, and git diff markers. Agents use it to display file contents with context, making it easier to reason about where to make changes. Particularly useful when presenting code to users. |
| [tree](https://en.wikipedia.org/wiki/Tree_(command)) | `tree` | Prints a directory as an ASCII tree — one of the most token-efficient ways for an agent to understand project structure. Faster than listing files recursively, and the output maps directly to mental models of a codebase. |
| [GitHub CLI](https://cli.github.com) | `gh` | Full GitHub API access from the terminal — PRs, issues, releases, workflows, and more. Agents use it to open PRs, check CI status, comment on issues, and create releases without leaving the shell. |
| [fzf](https://github.com/junegunn/fzf) | `fzf` | Interactive fuzzy finder that makes any list selectable. Agents can pipe file lists, git branches, or command history through `fzf` to let users pick without building custom UI. Also integrates directly into shell history and file completion. |
| [xh](https://github.com/ducaale/xh) | `xh` | Friendly, fast HTTP client with sensible defaults and coloured output. Agents use it to hit REST APIs, test webhooks, or inspect responses without curl's verbose flag soup. JSON bodies are handled cleanly. |

### Agent (16 tools) — on by default

| Tool | Package | Description |
|------|---------|-------------|
| [shellcheck](https://github.com/koalaman/shellcheck) | `shellcheck` | Static analyser for bash/sh scripts that catches bugs, bad practices, and portability issues before they run. Agents generating shell scripts should run every script through shellcheck before presenting it to users. Output is structured and actionable. |
| [ast-grep](https://github.com/ast-grep/ast-grep) | `ast-grep` | Structural code search and replace using AST patterns rather than text. Agents can find all usages of a function, rename a method across a codebase, or enforce patterns in a way that text search cannot — without false positives from comments or strings. |
| [just](https://github.com/casey/just) | `just` | A `make` alternative with a clean, readable syntax that doubles as a project task menu. Agents can read a `Justfile` to understand what operations a project supports, then invoke them directly — no guessing at npm scripts or Makefile targets. |
| [grex](https://github.com/pemistahl/grex) | `grex` | Generates regex patterns from example strings you provide. Agents that need to write a regex can use grex to derive one from representative inputs rather than constructing it from scratch — useful for validation, parsing, and search patterns. |
| [knip](https://github.com/webpro-nl/knip) | `knip` | Finds unused exports, files, and dependencies in TypeScript/JavaScript projects. Agents doing cleanup or refactoring work use knip to identify dead code with precision before removing anything. Structured JSON output makes it easy to act on programmatically. |
| [sd](https://github.com/chmln/sd) | `sd` | Simpler, safer `sed` for find-and-replace across files. Agents prefer it over sed because the syntax is consistent across platforms and the substitution is literal by default — no surprise regex escaping. Supports regex when needed. |
| [hyperfine](https://github.com/sharkdp/hyperfine) | `hyperfine` | Benchmarking tool that runs commands repeatedly and reports statistical results. Agents can use it to objectively compare two implementations, measure the impact of a change, or verify a performance claim — results are clear and reproducible. |
| [tokei](https://github.com/XAMPPRocky/tokei) | `tokei` | Reports lines of code by language across a project. Agents use it to understand codebase composition at a glance — helpful when deciding where to focus, estimating scope, or understanding an unfamiliar repo. Fast enough to run on every task. |
| [tldr](https://github.com/tldr-pages/tldr) | `tldr` | Community-maintained cheat sheets for CLI tools, focused on practical examples rather than exhaustive flags. Agents use it to quickly look up the most common usage of any tool without reading full man pages. |
| [biome](https://github.com/biomejs/biome) | `biome` | Fast, zero-config linter and formatter for JavaScript and TypeScript. Agents can format and lint code in a single pass before committing, ensuring consistent output without needing ESLint and Prettier configured separately. |
| [difftastic](https://github.com/Wilfred/difftastic) | `difftastic` | Structural diff that compares files by AST rather than line-by-line. Agents reviewing changes get diffs that reflect actual code structure — moves and refactors show as such, rather than as unrelated deletions and additions. |
| [pandoc](https://github.com/jgm/pandoc) | `pandoc` | Converts documents between virtually any format — Markdown, HTML, PDF, DOCX, LaTeX, and more. Agents working with documentation, reports, or content pipelines use it to transform between formats without custom parsing code. |
| [duckdb](https://github.com/duckdb/duckdb) | `duckdb` | Embedded SQL engine that queries CSV, JSON, and Parquet files directly without a database server. Agents can run analytical queries on local data files in seconds — ideal for log analysis, data exploration, or transforming structured files. |
| [htmlq](https://github.com/mgdm/htmlq) | `htmlq` | Extracts content from HTML using CSS selectors, like `jq` for web pages. Agents scraping or parsing HTML output can pull out exactly the nodes they need without writing parser code or using a headless browser. |
| [typos](https://github.com/crate-ci/typos) | `typos-cli` | Source code spell checker that finds common typos in identifiers, comments, and strings. Agents can run it before committing to catch embarrassing mistakes — it understands code context and has a very low false-positive rate. |
| [gum](https://github.com/charmbracelet/gum) | `gum` | Provides beautiful, interactive UI primitives (prompts, spinners, filters) for shell scripts. Agents building automation scripts can use gum to add user-friendly prompts without depending on a full TUI framework. |

### Media (4 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [ffmpeg](https://ffmpeg.org) | `ffmpeg` | The industry-standard tool for audio and video processing — transcoding, trimming, extracting frames, converting formats, and more. Agents in media pipelines use it as the universal swiss army knife: if it involves a media file, ffmpeg can handle it. |
| [exiftool](https://exiftool.org) | `exiftool` | Reads and writes metadata from images, video, audio, and documents. Agents working with media files use it to inspect EXIF data, strip metadata for privacy, or batch-rename files based on capture date — all from a single consistent CLI. |
| [ImageMagick](https://imagemagick.org) | `imagemagick` | Comprehensive image manipulation — resize, crop, convert, annotate, composite. Agents can perform image transforms programmatically without opening a GUI, making it essential for thumbnail generation, format conversion, and batch image processing. |
| [svgo](https://github.com/svg/svgo) | `svgo` | Optimises SVG files by removing redundant data, comments, and inefficient structures. Agents working on web projects can run svgo on any SVG before committing to reduce file size — often 30-70% smaller with no visible quality loss. |

### DX (15 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [eza](https://github.com/eza-community/eza) | `eza` | Modern `ls` replacement with colour-coded output, git status integration, and tree view. Agents and users navigating a project directory get significantly more context per line than with plain `ls`. |
| [zoxide](https://github.com/ajeetdsouza/zoxide) | `zoxide` | Learns your most-used directories and lets you jump to them by partial name. Agents use it to navigate deep project trees with short commands — `z api` jumps straight to your API directory after the first visit. |
| [delta](https://github.com/dandavison/delta) | `git-delta` | Syntax-highlighted, side-by-side git diffs with line numbers. Makes reviewing changes faster and clearer — particularly useful when an agent is presenting a diff to a user for review before committing. |
| [glow](https://github.com/charmbracelet/glow) | `glow` | Renders Markdown beautifully in the terminal. Agents can use it to display README files, changelogs, or generated documentation in a readable format without opening a browser. |
| [mise](https://github.com/jdx/mise) | `mise` | Manages runtime versions (Node, Python, Ruby, Go, etc.) per project via `.mise.toml`. Agents working across multiple projects don't need to manually switch runtimes — mise activates the right version automatically when entering a directory. |
| [watchexec](https://github.com/watchexec/watchexec) | `watchexec` | Runs a command whenever files change. Agents can use it to keep tests, builds, or type-checkers running continuously in the background — reducing the feedback loop without needing a language-specific watcher. |
| [mkcert](https://github.com/FiloSottile/mkcert) | `mkcert` | Creates locally-trusted HTTPS certificates for development with zero configuration. Agents setting up local development environments can use it to enable HTTPS without browser warnings or complicated CA setup. |
| [lazygit](https://github.com/jesseduffield/lazygit) | `lazygit` | Full-featured TUI git client for staging, committing, branching, rebasing, and resolving conflicts interactively. Useful when a user needs to review or manage git state that would take many CLI commands to handle manually. |
| [dust](https://github.com/bootandy/dust) | `dust` | Visual disk usage tree that shows what's consuming space, sorted by size. Agents debugging storage issues or cleaning up large repos use it to identify the culprits in seconds — far clearer than `du -sh`. |
| [bottom](https://github.com/ClementTsang/bottom) | `bottom` | System resource monitor (CPU, memory, network, processes) as a TUI. Agents can use it to identify resource-hungry processes when debugging performance issues or investigating why a build is slow. |
| [direnv](https://github.com/direnv/direnv) | `direnv` | Loads and unloads environment variables automatically when entering/leaving a directory. Agents working across projects with different environment configs benefit from not needing to manually source `.env` files. |
| [procs](https://github.com/dalance/procs) | `procs` | Modern `ps` replacement with search, colour coding, and tree view. Agents can find and inspect running processes quickly — useful when checking if a dev server is running, debugging port conflicts, or identifying zombie processes. |
| [uv](https://github.com/astral-sh/uv) | `uv` | Extremely fast Python package installer and virtual environment manager. Agents working in Python projects can install dependencies in a fraction of the time pip takes — particularly noticeable in CI or when bootstrapping a new environment. |
| [hexyl](https://github.com/sharkdp/hexyl) | `hexyl` | Hex viewer with colour-coded output distinguishing printable characters, control codes, and null bytes. Agents debugging binary files, inspecting file headers, or understanding binary protocols use it to read raw file contents clearly. |
| [taplo](https://github.com/tamasfe/taplo) | `taplo` | TOML formatter, linter, and query tool. Agents working with Rust projects, `pyproject.toml`, or any TOML config can validate and format files consistently — important since TOML is sensitive to structure and easy to break manually. |

### Security (6 tools)

| Tool | Package | Description |
|------|---------|-------------|
| [trivy](https://github.com/aquasecurity/trivy) | `trivy` | Comprehensive vulnerability scanner for container images, filesystems, git repos, and IaC configs. Agents working on deployment or security reviews can run trivy against any artifact to surface known CVEs and misconfigurations before they ship. |
| [act](https://github.com/nektos/act) | `act` | Runs GitHub Actions workflows locally using Docker. Agents can test CI pipeline changes without pushing to GitHub — dramatically faster iteration on workflow files and a safe way to validate secrets handling. |
| [gitleaks](https://github.com/gitleaks/gitleaks) | `gitleaks` | Scans git history and working trees for accidentally committed secrets — API keys, tokens, credentials. Agents should run gitleaks before opening a PR on any repo that handles secrets, as a last line of defence. |
| [semgrep](https://github.com/returntocorp/semgrep) | `semgrep` | Multi-language static analysis using pattern rules — finds security bugs, anti-patterns, and policy violations. Agents doing code review or security audits can run semgrep with community rule sets to catch issues that simple text search misses. |
| [age](https://github.com/FiloSottile/age) | `age` | Simple, modern file encryption with a clean CLI. Agents handling sensitive files (secrets, credentials, backups) can encrypt them with age in one command — the format is well-specified and resistant to misuse by design. |
| [doggo](https://github.com/mr-karan/doggo) | `doggo` | Modern DNS lookup tool with JSON output and support for multiple DNS-over-HTTPS providers. Agents debugging connectivity issues, verifying DNS propagation, or inspecting DNS records get clean, structured output they can parse and act on. |

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
