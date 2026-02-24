export default `
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
`.trim();
