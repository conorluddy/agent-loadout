export default `
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
- Configured via \`~/.gitconfig\` (not CLI flags at runtime) — add \`[delta]\` section with options like \`side-by-side = true\`, \`line-numbers = true\`.
- Enable with \`git config --global core.pager delta\` — without this, delta is not invoked automatically.

## Why it matters for agents
Makes \`git diff\` and \`git log -p\` output readable — useful when agents are reviewing code changes or summarising commits for users.
`.trim();
