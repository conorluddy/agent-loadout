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
- JSON output: \`tree -J path/\`

## Why it matters for agents
\`-J\` gives a JSON file tree — lets agents understand project structure in one call without recursive \`ls\` loops.

## Gotchas
- Use \`--charset ascii\` for plain output in non-unicode terminals or CI logs.
- \`-J\` JSON output includes type, name, and children — structured project map in one call.
`.trim();
