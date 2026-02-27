export default `
# glow — Terminal markdown renderer

## When to use
Render markdown files beautifully in the terminal. Great for reading READMEs, docs, changelogs.

## Trusted commands
- Render file: \`glow README.md\`
- Render with pager: \`glow -p README.md\`
- Render from stdin: \`glow -\`
- Disable pager: \`glow --no-pager README.md\`
- Fixed width: \`glow --width 100 README.md\`
- Plain output (no ANSI): \`glow --style=ascii README.md\`

## Output format
ANSI-formatted markdown to stdout by default — colours, bold, tables rendered for terminal display. Use \`--style=ascii\` to strip ANSI codes for piping into other tools or log capture. Activates a pager automatically for long content.

## Why it matters for agents
Renders markdown cleanly in terminal output — useful for displaying skill files, changelogs, or generated docs to users without raw markdown symbols. \`--style=ascii\` makes output safe to capture or pipe.

## Gotchas
- Pager activates by default for long content — use \`--no-pager\` in scripts to avoid blocking on stdin.
- Output wraps at terminal width; use \`--width\` to control line length in narrow terminals.
- Requires markdown-formatted input — feeding plain text will render as-is with no improvement.
`.trim();
