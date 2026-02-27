export default `
# lazygit — TUI git client

## When to use
Interactive terminal UI for git — stage hunks, commit, branch, rebase, and push without typing git commands.

## Trusted commands
- Open in current repo: \`lazygit\`
- Open for a specific path: \`lazygit -p /path/to/repo\`

## Key bindings (inside lazygit)
- \`?\` — show full keybinding help
- \`space\` — stage/unstage file or hunk
- \`c\` — commit staged changes
- \`P\` — push
- \`p\` — pull
- \`b\` — branch panel; \`n\` to create, \`space\` to checkout
- \`R\` — interactive rebase
- \`q\` — quit

## Gotchas
- Requires git to be installed (it's a UI wrapper, not a replacement).
- Config lives at \`~/.config/lazygit/config.yml\`.
- Mouse support is on by default — click panels to navigate.

## Why it matters for agents
Note: interactive TUI only — not suitable for agent automation. For scripted git operations use \`git\` CLI directly; for GitHub automation use \`gh\`.
`.trim();
