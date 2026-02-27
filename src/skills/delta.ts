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

## Why it matters for agents
Makes \`git diff\` and \`git log -p\` output readable — useful when agents are reviewing code changes or summarising commits for users.
`.trim();
