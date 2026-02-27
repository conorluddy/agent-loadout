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
- Pass secrets: \`act push --secret MY_TOKEN="value"\`
- List available jobs: \`act --list\`

## Gotchas
- Requires Docker to be running.
- Not all GitHub Actions features are supported locally (secrets, some contexts).
- Use \`-n\` (dry run) first to see what would happen.

## Why it matters for agents
Test CI workflows locally before pushing — saves agent roundtrips to GitHub. Agents can run \`act -n\` to validate workflow YAML without Docker overhead.
`.trim();
