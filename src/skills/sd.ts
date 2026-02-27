export default `
# sd — Simpler sed

## When to use
Find and replace in files. Like sed but with intuitive syntax — no escaping nightmares.

## Trusted commands
- Replace in file: \`sd 'old' 'new' file.ts\`
- Preview changes: \`sd -p 'old' 'new' file.ts\`
- Regex replace: \`sd 'v(\\d+)' 'version-$1' file.txt\`
- Replace across files (with fd): \`fd -e ts -x sd 'old' 'new' {}\`

## Gotchas
- Uses regex by default. Use \`-F\` for fixed/literal strings.
- Modifies files in place when given a filename. Use \`-p\` to preview first.

## Why it matters for agents
Safer than sed for multi-line replacements — predictable escaping without shell quoting nightmares. Combine with \`fd -x\` for safe bulk refactors across many files.
`.trim();
