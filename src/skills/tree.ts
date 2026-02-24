export default `
# tree — Directory structure viewer

## When to use
Visualise directory structure as a tree. Useful for understanding project layout.

## Trusted commands
- Current directory: \`tree\`
- With depth limit: \`tree -L 2\`
- Show only directories: \`tree -d\`
- Ignore patterns: \`tree -I 'node_modules|dist'\`
- With file sizes: \`tree -sh\`
`.trim();
