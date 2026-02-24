export default `
# svgo — SVG optimiser

## When to use
Optimise SVG files by removing unnecessary metadata, comments, and reducing precision.

## Trusted commands
- Optimise file: \`svgo input.svg -o output.svg\`
- Optimise in place: \`svgo input.svg\`
- Folder: \`svgo -f ./icons/ -o ./icons-optimised/\`
- Show savings: \`svgo input.svg --pretty\`

## Gotchas
- Default plugins are usually fine. Override with \`--config svgo.config.js\` if needed.
- In-place by default when no \`-o\` specified. Pipe or use \`-o\` for safety.
`.trim();
