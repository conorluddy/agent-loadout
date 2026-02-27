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
- Disable pager for scripts: \`bat --paging=never file.ts\`

## Why it matters for agents
\`-l\` flag lets agents force syntax for stdin — useful for highlighting API responses or generated content piped through bat.

## Gotchas
- On Debian/Ubuntu the binary is \`batcat\`, not \`bat\`. Use \`alias bat=batcat\` or install via cargo.
- Use \`--paging=never\` in scripts to suppress the interactive pager.
`.trim();
