export default `
# bat — Cat with syntax highlighting

## When to use
View file contents with syntax highlighting, line numbers, and git diff indicators.

## Trusted commands
- View file: \`bat file.ts\`
- Plain output (no decorations): \`bat --plain file.ts\`
- Show line range: \`bat -r 10:20 file.ts\`
- Force language: \`bat -l json file.txt\`
- Use as pager for other commands: \`command | bat -l json\`
`.trim();
