export default `
# act — Run GitHub Actions locally

## When to use
Test GitHub Actions workflows without pushing. Runs workflows in Docker containers locally.

## Trusted commands
- List available workflows: \`act -l\`
- Run default workflow: \`act\`
- Run specific event: \`act push\`
- Run specific job: \`act -j build\`
- Dry run: \`act -n\`

## Gotchas
- Requires Docker to be running.
- Not all GitHub Actions features are supported locally (secrets, some contexts).
- Use \`-n\` (dry run) first to see what would happen.
`.trim();
