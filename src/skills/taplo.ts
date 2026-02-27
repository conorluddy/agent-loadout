export default `
# taplo — TOML toolkit

## When to use
Lint, format, and query TOML files. Completes the config format toolkit: jq (JSON) + yq (YAML) + taplo (TOML).

## Trusted commands
- Format a file: \`taplo fmt Cargo.toml\`
- Format all TOML: \`taplo fmt\`
- Check formatting: \`taplo fmt --check\`
- Lint: \`taplo lint Cargo.toml\`
- Get a value: \`taplo get -f pyproject.toml "project.name"\`

## Why it matters for agents
Agents editing Cargo.toml, pyproject.toml, or any .toml config can validate and format cleanly. Prevents syntax errors in config files.

## Gotchas
- Config via \`taplo.toml\` or \`.taplo.toml\` at project root.
- \`taplo get\` uses dot-notation paths for querying.
- Supports schema validation for known TOML formats (Cargo, pyproject, etc.).
- \`taplo fmt --check\` exits 1 on formatting diffs — CI-friendly.
- Use \`--colored=off\` for clean CI output.
`.trim();
