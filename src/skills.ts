import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { paths, ensureSkillsDir } from "./paths.js";
import type { Tool } from "./catalog.js";

const PREFIX = "agent-starter-kit";

function skillPath(toolId: string): string {
  return join(paths.skills, `${PREFIX}-${toolId}.md`);
}

export async function writeSkills(tools: Tool[]): Promise<number> {
  await ensureSkillsDir();
  let written = 0;
  for (const tool of tools) {
    const content = SKILL_CONTENT[tool.id];
    if (!content) continue;
    await writeFile(skillPath(tool.id), content.trim() + "\n");
    written++;
  }
  return written;
}

// ── Skill content per tool ──────────────────────────────
// Each skill is a focused playbook: what the tool does, trusted commands, gotchas.

const SKILL_CONTENT: Record<string, string> = {
  rg: `
# ripgrep (rg) — Fast code search

## When to use
Search file contents across a codebase. Faster than grep, respects .gitignore by default.

## Trusted commands
- Search for a pattern: \`rg "pattern" path/\`
- Fixed string (no regex): \`rg -F "exact string"\`
- File type filter: \`rg "pattern" -t ts\` (ts, js, py, rust, go, etc.)
- Glob filter: \`rg "pattern" -g '*.tsx'\`
- Show context lines: \`rg "pattern" -C 3\`
- Files only (no content): \`rg -l "pattern"\`
- Count matches: \`rg -c "pattern"\`
- Case insensitive: \`rg -i "pattern"\`

## Output format
\`file:line:column:matched_text\` — one match per line, stable and parseable.

## Gotchas
- Skips hidden files and .gitignore'd paths by default. Use \`--hidden\` or \`--no-ignore\` to include them.
- For literal dots, brackets etc. in patterns, use \`-F\` (fixed string) to avoid regex escaping issues.
`,

  fd: `
# fd — Fast file finder

## When to use
Find files by name pattern. Faster than \`find\`, respects .gitignore, sane defaults.

## Trusted commands
- Find by name: \`fd "pattern"\`
- Find by extension: \`fd -e ts\`
- Find exact filename: \`fd -g "package.json"\`
- Include hidden files: \`fd --hidden "pattern"\`
- Exec on each result: \`fd -e tmp -x rm {}\`
- Type filter (file/dir/symlink): \`fd -t f "pattern"\`

## Output format
One path per line, relative to search root.

## Gotchas
- Regex by default. Use \`-g\` for glob patterns.
- Ignores .gitignore'd files by default. Use \`--no-ignore\` to include.
`,

  jq: `
# jq — JSON processor

## When to use
Filter, transform, and extract data from JSON. Essential for working with API responses and config files.

## Trusted commands
- Pretty print: \`cat file.json | jq .\`
- Extract field: \`jq '.fieldName'\`
- Pick multiple fields: \`jq '{id, name, status}'\`
- Map over array: \`jq '[.items[] | {id, name}]'\`
- Count array: \`jq '.items | length'\`
- Filter: \`jq '.items[] | select(.status == "active")'\`
- Default for missing: \`jq '.name // "unknown"'\`
- Validate JSON (fail on error): \`jq -e .\`

## Gotchas
- Use \`-e\` flag to get non-zero exit code on null/false results.
- Use \`-r\` for raw string output (no quotes).
- Missing fields return null, not an error. Use \`//\` for defaults.
`,

  yq: `
# yq — YAML processor

## When to use
Same as jq but for YAML files. Query, filter, and transform YAML.

## Trusted commands
- Read field: \`yq '.spec.replicas' file.yaml\`
- Convert YAML to JSON: \`yq -o json file.yaml\`
- Convert JSON to YAML: \`yq -P file.json\`
- Update in place: \`yq -i '.version = "2.0"' file.yaml\`
- Merge files: \`yq eval-all 'select(fi == 0) * select(fi == 1)' a.yaml b.yaml\`

## Gotchas
- There are multiple tools called yq. This refers to the Go version (mikefarah/yq), installed via brew.
- Use \`-i\` carefully — it modifies files in place.
`,

  bat: `
# bat — Cat with syntax highlighting

## When to use
View file contents with syntax highlighting, line numbers, and git diff indicators.

## Trusted commands
- View file: \`bat file.ts\`
- Plain output (no decorations): \`bat --plain file.ts\`
- Show line range: \`bat -r 10:20 file.ts\`
- Force language: \`bat -l json file.txt\`
- Use as pager for other commands: \`command | bat -l json\`
`,

  gh: `
# GitHub CLI (gh) — GitHub from the terminal

## When to use
Create PRs, manage issues, check CI status, manage releases — all without leaving the terminal.

## Trusted commands
- Create PR: \`gh pr create --title "title" --body "body"\`
- View PR: \`gh pr view 123\`
- List PRs: \`gh pr list\`
- Check CI status: \`gh pr checks 123\`
- Create issue: \`gh issue create --title "title" --body "body"\`
- List issues: \`gh issue list\`
- View repo: \`gh repo view\`
- API calls: \`gh api repos/owner/repo/pulls/123/comments\`
- Clone: \`gh repo clone owner/repo\`

## Output format
Supports \`--json\` on most commands for structured output. E.g. \`gh pr list --json number,title,state\`.

## Gotchas
- Requires authentication: \`gh auth login\`
- \`gh api\` is very powerful for anything not covered by built-in commands.
`,

  shellcheck: `
# shellcheck — Static analysis for shell scripts

## When to use
Lint shell scripts (bash, sh, dash) for common mistakes: quoting issues, unset variables, deprecated syntax, portability problems. Agents frequently generate shell scripts — shellcheck catches errors before they run.

## Trusted commands
- Check a script: \`shellcheck script.sh\`
- Check with specific shell: \`shellcheck --shell=bash script.sh\`
- JSON output: \`shellcheck --format=json script.sh\`
- GCC-style output: \`shellcheck --format=gcc script.sh\`
- Exclude specific rules: \`shellcheck --exclude=SC2034 script.sh\`
- Check from stdin: \`echo '#!/bin/bash' | shellcheck -\`

## Output format
Default output is human-readable with line numbers and fix suggestions. Use \`--format=json\` for structured output.

## Gotchas
- Scripts need a shebang (\`#!/bin/bash\`) or use \`--shell=\` flag.
- SC codes (e.g. SC2086) link to detailed wiki explanations.
`,

  "ast-grep": `
# ast-grep (sg) — Structural code search/replace

## When to use
Search and replace code using syntax tree patterns instead of regex. Far safer for refactors because it understands code structure.

## Trusted commands
- Search for pattern: \`sg --pattern 'console.log($ARG)' --lang ts\`
- Search in directory: \`sg --pattern 'useEffect($FN, [])' --lang tsx src/\`
- Replace: \`sg --pattern 'console.log($ARG)' --rewrite 'logger.info($ARG)' --lang ts\`
- Interactive replace: \`sg --pattern '$X' --rewrite '$Y' --lang ts --interactive\`

## When to prefer over regex
- Renaming function calls or method calls
- Finding patterns that span multiple lines
- Replacing with structural awareness (e.g. moving arguments)
- Any refactor where brackets/nesting matters

## Gotchas
- The binary is called \`sg\`, not \`ast-grep\`.
- \`$ARG\` is a metavariable that matches any single node. \`$$$ARGS\` matches multiple.
- Always specify \`--lang\` for predictable results.
`,

  just: `
# just — Command runner

## When to use
Define and run project commands via a \`justfile\`. Like \`make\` but modern, with better syntax and no tab issues.

## Trusted commands
- List available recipes: \`just --list\`
- Run a recipe: \`just recipe-name\`
- Run with args: \`just deploy staging\`
- Dry run (show commands): \`just --dry-run recipe-name\`
- Choose recipe interactively: \`just --choose\` (requires fzf)

## Why it matters for agents
A justfile is an agent-readable task menu. \`just --list\` gives the agent a complete map of available project commands.

## Gotchas
- Uses spaces for indentation (not tabs like Makefile).
- Recipes are independent by default (no implicit dependencies like make).
`,

  grex: `
# grex — Generate regex from examples

## When to use
Generate a regular expression from a set of example strings. Useful when you know what you want to match but not the pattern.

## Trusted commands
- Generate regex: \`grex "foo-123" "bar-456" "baz-789"\`
- With anchors: \`grex --with-anchors "foo-123" "bar-456"\`
- Case insensitive: \`grex --ignore-case "Foo" "FOO" "foo"\`
- Verbose regex: \`grex --verbose "foo-123" "bar-456"\`

## Gotchas
- Output is a regex string, not a replacement. Useful as input for rg, sd, or code.
`,

  knip: `
# knip — Find unused code/deps in TS/JS

## When to use
Detect unused files, exports, dependencies, and types in TypeScript/JavaScript projects. Run at project root.

## Trusted commands
- Full scan: \`knip\`
- Unused files only: \`knip --include files\`
- Unused exports only: \`knip --include exports\`
- Unused deps only: \`knip --include dependencies\`
- JSON output: \`knip --reporter json\`

## Gotchas
- Must be run at project root (where package.json lives).
- May need a knip.json config for monorepos or non-standard project structures.
- Some frameworks have plugins (Next.js, Remix, etc.) — check docs if results seem wrong.
`,

  sd: `
# sd — Simpler sed

## When to use
Find and replace in files. Like sed but with intuitive syntax — no escaping nightmares.

## Trusted commands
- Replace in file: \`sd 'old' 'new' file.ts\`
- Preview changes: \`sd -p 'old' 'new' file.ts\`
- Regex replace: \`sd 'v(\\d+)' 'version-$1' file.txt\`
- Replace across files (with fd): \`fd -e ts -x sd 'old' 'new' {}\`

## Gotchas
- Uses regex by default. Use \`-F\` for fixed/literal strings.
- Modifies files in place when given a filename. Use \`-p\` to preview first.
`,

  hyperfine: `
# hyperfine — CLI benchmarking

## When to use
Benchmark commands to compare performance. Runs commands multiple times and reports stats.

## Trusted commands
- Benchmark single command: \`hyperfine 'command'\`
- Compare two commands: \`hyperfine 'command-a' 'command-b'\`
- With warmup: \`hyperfine --warmup 3 'command'\`
- Export results: \`hyperfine --export-json results.json 'command'\`
- Min runs: \`hyperfine --min-runs 20 'command'\`

## Gotchas
- Wrap commands in quotes.
- Use \`--warmup\` for commands that benefit from caching.
`,

  tokei: `
# tokei — Code statistics

## When to use
Get a quick overview of a codebase: languages, lines of code, comments, blanks.

## Trusted commands
- Current directory: \`tokei\`
- Specific path: \`tokei src/\`
- JSON output: \`tokei --output json\`
- Sort by lines: \`tokei --sort lines\`

## Output format
Table with language, files, lines, code, comments, blanks.
Use \`--output json\` for structured output.
`,

  ffmpeg: `
# ffmpeg — Audio/video Swiss army knife

## When to use
Transcode, trim, concatenate, normalise audio, extract streams, generate waveforms — anything media.

## Trusted commands
- Inspect media: \`ffprobe -hide_banner -of json -show_format -show_streams file.mp4\`
- Convert format: \`ffmpeg -i input.wav output.mp3\`
- Trim: \`ffmpeg -i input.mp4 -ss 00:01:00 -t 00:00:30 -c copy output.mp4\`
- Extract audio: \`ffmpeg -i video.mp4 -vn -acodec copy audio.aac\`
- Normalise loudness: \`ffmpeg -i input.wav -af loudnorm=I=-16 output.wav\`
- Resize video: \`ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4\`
- Generate waveform: \`ffmpeg -i audio.wav -filter_complex showwavespic=s=1920x200 waveform.png\`

## Safety rules
- Never overwrite input files. Always write to a different output path.
- Use \`-n\` flag to skip if output exists (never overwrite silently).
- Always inspect with \`ffprobe\` before transcoding to understand the source.

## Gotchas
- Argument order matters: input flags before \`-i\`, output flags after.
- \`-c copy\` copies streams without re-encoding (fast, lossless).
- ffprobe is installed alongside ffmpeg.
`,

  exiftool: `
# exiftool — Image/media metadata

## When to use
Read, write, and strip metadata (EXIF, IPTC, XMP) from images and media files.

## Trusted commands
- Read all metadata: \`exiftool file.jpg\`
- Read as JSON: \`exiftool -json file.jpg\`
- Read specific fields: \`exiftool -Make -Model -DateTimeOriginal file.jpg\`
- Strip GPS data: \`exiftool -gps:all= file.jpg\`
- Strip all metadata: \`exiftool -all= file.jpg\`
- Rename by date: \`exiftool '-FileName<DateTimeOriginal' -d '%Y%m%d_%H%M%S.%%e' dir/\`
- Batch read: \`exiftool -json dir/\`

## Safety rules
- exiftool creates backup files (.jpg_original) by default when modifying. Use \`-overwrite_original\` only when sure.

## Gotchas
- Field names are case-insensitive.
- Use \`-json\` for structured output.
`,

  imagemagick: `
# ImageMagick (magick) — Image transforms

## When to use
Resize, crop, convert, and manipulate images from the command line.

## Trusted commands
- Convert format: \`magick input.png output.jpg\`
- Resize: \`magick input.jpg -resize 800x600 output.jpg\`
- Resize to width (maintain aspect): \`magick input.jpg -resize 800x output.jpg\`
- Generate thumbnail: \`magick input.jpg -thumbnail 200x200^ -gravity center -extent 200x200 thumb.jpg\`
- Get dimensions: \`magick identify -format '%wx%h' input.jpg\`
- Batch convert: \`magick mogrify -format webp *.png\`

## Safety rules
- \`magick mogrify\` modifies files in place. Use \`magick convert\` (or just \`magick in out\`) for safe transforms.

## Gotchas
- The binary is \`magick\` (ImageMagick 7). Older versions used \`convert\`.
`,

  eza: `
# eza — Modern ls replacement

## When to use
List files with better defaults: colours, git status, icons, tree view built in.

## Trusted commands
- List: \`eza\`
- Long format: \`eza -l\`
- With git status: \`eza -l --git\`
- Tree view: \`eza --tree\`
- Tree with depth limit: \`eza --tree --level 2\`
- All files (including hidden): \`eza -la\`
`,

  delta: `
# delta — Better git diffs

## When to use
Syntax-highlighted, side-by-side diffs. Configure as your git pager for automatic use.

## Setup
Add to ~/.gitconfig:
\`\`\`
[core]
  pager = delta
[interactive]
  diffFilter = delta --color-only
\`\`\`

## Trusted commands
- View diff: \`git diff\` (uses delta automatically once configured)
- Side by side: set \`delta --side-by-side\` in config

## Gotchas
- The brew package is called \`git-delta\`, but the binary is \`delta\`.
`,

  mise: `
# mise — Runtime version manager

## When to use
Manage Node, Python, Ruby, Go (etc.) versions per project. Replaces nvm, pyenv, rbenv, asdf.

## Trusted commands
- List available tools: \`mise ls-remote node\`
- Install a version: \`mise install node@20\`
- Use in current dir: \`mise use node@20\`
- Check current: \`mise current\`
- Install all from config: \`mise install\`
- Trust a config file: \`mise trust\`

## Config
Uses \`.mise.toml\` or \`.tool-versions\` in project root. This ensures deterministic versions for all contributors.

## Gotchas
- Run \`mise activate zsh\` (or bash/fish) in your shell profile for automatic version switching.
`,

  trivy: `
# trivy — Vulnerability scanner

## When to use
Scan filesystems, container images, and code repos for known vulnerabilities.

## Trusted commands
- Scan current directory: \`trivy fs .\`
- Scan with JSON output: \`trivy fs --format json .\`
- Scan a container image: \`trivy image myapp:latest\`
- Only critical/high: \`trivy fs --severity CRITICAL,HIGH .\`
- Scan for secrets: \`trivy fs --scanners secret .\`

## Gotchas
- First run downloads a vulnerability database (can be slow).
- Use \`--format json\` for structured output.
`,

  act: `
# act — Run GitHub Actions locally

## When to use
Test GitHub Actions workflows without pushing. Runs workflows in Docker containers locally.

## Trusted commands
- List available workflows: \`act -l\`
- Run default workflow: \`act\`
- Run specific event: \`act push\`
- Run specific job: \`act -j build\`
- Dry run: \`act -n\`

## Gotchas
- Requires Docker to be running.
- Not all GitHub Actions features are supported locally (secrets, some contexts).
- Use \`-n\` (dry run) first to see what would happen.
`,

  fzf: `
# fzf — Fuzzy finder

## When to use
Interactive fuzzy search for files, command history, git branches — anything with a list.

## Trusted commands
- Find files: \`fzf\`
- Pipe any list: \`git branch | fzf\`
- Preview files: \`fzf --preview 'bat --color=always {}'\`
- With fd: \`fd -t f | fzf\`

## Gotchas
- Primarily interactive — less useful for non-interactive agent workflows, but great when you're driving.
`,

  svgo: `
# svgo — SVG optimiser

## When to use
Optimise SVG files by removing unnecessary metadata, comments, and reducing precision.

## Trusted commands
- Optimise file: \`svgo input.svg -o output.svg\`
- Optimise in place: \`svgo input.svg\`
- Folder: \`svgo -f ./icons/ -o ./icons-optimised/\`
- Show savings: \`svgo input.svg --pretty\`

## Gotchas
- Default plugins are usually fine. Override with \`--config svgo.config.js\` if needed.
- In-place by default when no \`-o\` specified. Pipe or use \`-o\` for safety.
`,

  zoxide: `
# zoxide — Smarter cd

## When to use
Jump to frequently used directories without typing full paths. Learns from your usage.

## Setup
Add to ~/.zshrc: \`eval "$(zoxide init zsh)"\`
Then use \`z\` instead of \`cd\`: \`z projects\` jumps to your most-used match.

## Trusted commands
- Jump: \`z partial-dirname\`
- Interactive: \`zi\` (requires fzf)
- Add path manually: \`zoxide add /path/to/dir\`
- List known paths: \`zoxide query --list\`
`,

  glow: `
# glow — Terminal markdown renderer

## When to use
Render markdown files beautifully in the terminal. Great for reading READMEs, docs, changelogs.

## Trusted commands
- Render file: \`glow README.md\`
- Render with pager: \`glow -p README.md\`
- Render from stdin: \`cat CHANGELOG.md | glow\`
`,

  watchexec: `
# watchexec — Run commands on file change

## When to use
Watch files for changes and re-run a command. Language-agnostic alternative to nodemon.

## Trusted commands
- Watch and run: \`watchexec -e ts,tsx "pnpm typecheck"\`
- Watch specific path: \`watchexec -w src/ "pnpm test"\`
- Clear screen on change: \`watchexec --clear -e ts "pnpm typecheck"\`
- Restart long-running process: \`watchexec --restart -e ts "node server.js"\`

## Gotchas
- Use \`-e\` to filter by extension, \`-w\` to filter by directory.
- Use \`--restart\` for long-running processes (servers), otherwise it waits for completion.
`,

  mkcert: `
# mkcert — Local HTTPS certificates

## When to use
Generate locally-trusted HTTPS certificates for development. No more "insecure" warnings.

## Trusted commands
- First-time setup: \`mkcert -install\` (installs local CA)
- Generate cert: \`mkcert localhost 127.0.0.1 ::1\`
- Generate for custom domain: \`mkcert "myapp.local" "*.myapp.local"\`

## Gotchas
- \`mkcert -install\` only needs to run once per machine.
- Output is two files: cert.pem and key.pem. Point your dev server at them.
`,

  tree: `
# tree — Directory structure viewer

## When to use
Visualise directory structure as a tree. Useful for understanding project layout.

## Trusted commands
- Current directory: \`tree\`
- With depth limit: \`tree -L 2\`
- Show only directories: \`tree -d\`
- Ignore patterns: \`tree -I 'node_modules|dist'\`
- With file sizes: \`tree -sh\`
`,
};
