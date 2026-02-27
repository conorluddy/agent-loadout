export default `
# glow — Terminal markdown renderer

## When to use
Render markdown files beautifully in the terminal. Great for reading READMEs, docs, changelogs.

## Trusted commands
- Render file: \`glow README.md\`
- Render with pager: \`glow -p README.md\`
- Render from stdin: \`cat CHANGELOG.md | glow\`
- Disable pager: \`glow --no-pager README.md\`
- Fixed width: \`glow --width 100 README.md\`

## Why it matters for agents
Renders markdown cleanly in terminal output — useful for displaying skill files, changelogs, or generated docs to users without raw markdown symbols.
`.trim();
