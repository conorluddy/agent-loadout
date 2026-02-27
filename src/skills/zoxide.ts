export default `
# zoxide — Smarter cd

## When to use
Jump to frequently used directories without typing full paths. Learns from your usage.

## Trusted commands
- Jump: \`z partial-dirname\`
- Interactive jump (requires fzf): \`zi\`
- Resolve best match (no cd): \`zoxide query <term>\`
- List all known paths with scores: \`zoxide query --list\`
- Add path manually: \`zoxide add /path/to/dir\`
- Remove a path: \`zoxide remove /path/to/dir\`

## Output format
\`z\` emits nothing — it just changes the shell directory. \`zoxide query <term>\` prints the best-match absolute path as a plain string to stdout. \`zoxide query --list\` prints tab-separated score + path pairs, sorted by frecency.

## Why it matters for agents
\`zoxide query <term>\` returns the best-match absolute path without navigating — use it for path resolution when you know a partial name but not the full path. Avoids hardcoding paths that differ between machines.

## Gotchas
- Must be initialised in shell config: \`eval "$(zoxide init zsh)"\` in ~/.zshrc. Without this, \`z\` is unavailable.
- Frecency scores update on each \`z\` usage — a new directory won't rank highly until visited repeatedly.
- \`zi\` is interactive (TUI with fzf) — use \`zoxide query\` for non-interactive scripting.
- Shell integration required: zoxide works by hooking into \`cd\`; doesn't affect subshells unless initialised there too.
`.trim();
