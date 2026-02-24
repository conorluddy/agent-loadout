export default `
# glow — Terminal markdown renderer

## When to use
Render markdown files beautifully in the terminal. Great for reading READMEs, docs, changelogs.

## Trusted commands
- Render file: \`glow README.md\`
- Render with pager: \`glow -p README.md\`
- Render from stdin: \`cat CHANGELOG.md | glow\`
`.trim();
