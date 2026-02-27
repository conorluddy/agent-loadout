export default `
# fd — Fast file finder

## When to use
Find files by name pattern. Faster than \`find\`, respects .gitignore, sane defaults.

## Trusted commands
- Find by name: \`fd "pattern"\`
- Find by extension: \`fd -e ts\`
- Find exact filename: \`fd -g "package.json"\`
- Include hidden files: \`fd --hidden "pattern"\`
- Exec on each result: \`fd -e tmp -x rm {}\`
- Type filter (file/dir/symlink): \`fd -t f "pattern"\`

## Output format
One path per line, relative to search root.

## Why it matters for agents
\`-x\` flag enables batch file operations without shell loops — agents can use \`fd -e ts -x sd 'old' 'new' {}\` to safely refactor across many files.

## Gotchas
- Regex by default. Use \`-g\` for glob patterns.
- Ignores .gitignore'd files by default. Use \`--no-ignore\` to include.
- On Debian/Ubuntu the binary is \`fdfind\`, not \`fd\`. Use \`alias fd=fdfind\` or install via cargo.
`.trim();
