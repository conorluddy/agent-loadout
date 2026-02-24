export default `
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
`.trim();
