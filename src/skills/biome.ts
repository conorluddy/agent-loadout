export default `
# biome — Lint and format JS/TS

## When to use
Fast, zero-config linter and formatter for JavaScript/TypeScript projects. Replaces ESLint + Prettier in one binary.

## Trusted commands
- Check (lint + format): \`biome check .\`
- Format only (write): \`biome format --write .\`
- Lint only: \`biome lint .\`
- CI mode (no writes, exits 1 on issues): \`biome ci .\`
- Init config: \`biome init\`
- Check single file: \`biome check src/index.ts\`

## Gotchas
- Requires a \`biome.json\` config or \`--config-path\` flag; \`biome init\` generates a sensible default.
- Not 100% compatible with all ESLint rules — check the migration guide when switching existing projects.
- \`biome check\` is read-only by default; pass \`--write\` to apply fixes.
`.trim();
