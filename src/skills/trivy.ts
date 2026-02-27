export default `
# trivy — Vulnerability scanner

## When to use
Scan filesystems, container images, and code repos for known vulnerabilities.

## Trusted commands
- Scan current directory: \`trivy fs .\`
- Scan with JSON output: \`trivy fs --format json .\`
- Scan a container image: \`trivy image myapp:latest\`
- Only critical/high: \`trivy fs --severity CRITICAL,HIGH .\`
- Scan for secrets: \`trivy fs --scanners secret .\`
- CI gate (fail on findings): \`trivy fs --severity CRITICAL,HIGH --exit-code 1 --no-progress .\`
- Offline (skip DB update): \`trivy fs --skip-update --format json .\`

## Why it matters for agents
Gives agents a security gate before deployments. \`--format json --exit-code 1\` creates a composable CI step — agents can parse findings and summarise critical vulnerabilities.

## Gotchas
- First run downloads a vulnerability database (can be slow).
- Use \`--format json\` for structured output.
- Use \`--exit-code 1\` to fail CI pipelines on findings; omit for reporting-only mode.
- \`--no-progress\` keeps CI logs clean.
`.trim();
