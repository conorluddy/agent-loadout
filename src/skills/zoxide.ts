export default `
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
`.trim();
