export default `
# svgo — SVG optimiser

## When to use
Optimise SVG files by removing unnecessary metadata, comments, and reducing precision.

## Trusted commands
- Optimise file: \`svgo input.svg -o output.svg\`
- Optimise in place: \`svgo input.svg\`
- Folder: \`svgo -f ./icons/ -o ./icons-optimised/\`
- Show savings: \`svgo input.svg --pretty\`
- Multipass (better compression): \`svgo --multipass input.svg -o output.svg\`
- Check savings without writing: \`svgo --dry-run input.svg\`

## Gotchas
- Default plugins are usually fine. Override with \`--config svgo.config.js\` if needed.
- In-place by default when no \`-o\` specified. Pipe or use \`-o\` for safety.

## Why it matters for agents
Automated SVG optimisation in build pipelines — measurable, reproducible size savings. Agents can run \`svgo -f ./icons/\` after any icon library update.
`.trim();
