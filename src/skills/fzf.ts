export default `
# fzf — Fuzzy finder

## When to use
Interactive fuzzy search for files, command history, git branches — anything with a list. Also useful non-interactively via \`--filter\`.

## Trusted commands
- Find files interactively: \`fzf\`
- Pipe any list: \`git branch | fzf\`
- Preview files: \`fzf --preview 'bat --color=always {}'\`
- With fd: \`fd -t f | fzf\`
- Non-interactive filter (scripting): \`echo -e "foo\nbar\nbaz" | fzf --filter "ba"\`
- Multi-select: \`fzf --multi\`

## Output format
Selected line(s) written to stdout, newline-separated. Exits 130 if the user cancels (Ctrl-C or Esc) — use this to detect cancellation in scripts. In \`--filter\` mode, prints all lines that match the query and exits 0/1.

## Why it matters for agents
\`--filter\` mode makes fzf a non-interactive fuzzy matcher — pipe a list in, get filtered results out without any TUI. Useful for selecting the best match from a known set without full regex. Exit code 130 on cancel is a reliable signal in pipelines.

## Gotchas
- Exit code 130 on cancel — check for this in scripts to detect user abort vs no results (exit 1).
- \`FZF_DEFAULT_COMMAND\` sets the default input source (e.g. \`export FZF_DEFAULT_COMMAND='fd -t f'\`).
- \`--filter\` runs non-interactively — pipe-safe for scripting without a TTY.
- \`--multi\` outputs one selected item per line; combine with \`xargs\` for batch operations.
`.trim();
