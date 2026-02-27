export default `
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
- Machine-readable tree: \`eza --tree --json\`

## Output format
Plain text with aligned columns by default. \`--json\` emits a structured JSON tree of file entries with name, path, type, size, and permissions. \`--git\` adds a column showing each file's git status (untracked, modified, staged).

## Why it matters for agents
\`eza --tree --json\` provides a structured file tree without spawning \`find\` or parsing \`ls\` output — agents can parse it directly to navigate unfamiliar repos. \`--git\` flag surfaces repo status per-file without running \`git status\`.

## Gotchas
- Binary is named \`eza\`, not \`ls\` — aliasing \`ls=eza\` is common but optional.
- \`--icons\` requires a Nerd Font in your terminal; omit it in CI or non-Nerd-Font sessions.
- \`--git\` is noticeably slow on large repos (it calls libgit2 per entry) — avoid in hot loops.
`.trim();
