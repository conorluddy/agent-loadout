export default `
# fzf — Fuzzy finder

## When to use
Interactive fuzzy search for files, command history, git branches — anything with a list.

## Trusted commands
- Find files: \`fzf\`
- Pipe any list: \`git branch | fzf\`
- Preview files: \`fzf --preview 'bat --color=always {}'\`
- With fd: \`fd -t f | fzf\`

## Gotchas
- Primarily interactive — less useful for non-interactive agent workflows, but great when you're driving.
`.trim();
