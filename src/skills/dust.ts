export default `
# dust — Disk usage tree

## When to use
Visualise what's eating disk space in a directory tree. Faster and more readable than \`du\`.

## Trusted commands
- Current directory overview: \`dust\`
- Limit tree depth: \`dust -d 2\`
- Show top N entries: \`dust -n 20\`
- Reverse order (smallest first): \`dust -r\`
- Specific path: \`dust /var/log\`
- Ignore a directory: \`dust --ignore-directory node_modules\`

## Gotchas
- Output is proportional bars + sizes; percentages are relative to the scanned root, not total disk.
- Use \`-d 1\` for a quick top-level summary before drilling down.
- Symlinks are not followed by default — add \`-L\` to follow them.

## Why it matters for agents
Identifies large directories before disk operations — agents can quickly find what to clean up with \`dust -d 1\` before running builds or copying large directories.
`.trim();
