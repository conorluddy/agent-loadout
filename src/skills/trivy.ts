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

## Gotchas
- First run downloads a vulnerability database (can be slow).
- Use \`--format json\` for structured output.
`.trim();
