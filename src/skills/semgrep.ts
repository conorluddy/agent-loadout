export default `
# semgrep — Multi-language static analysis

## When to use
Scan code for security vulnerabilities, bugs, and anti-patterns across 30+ languages. Write custom rules or use community rulesets.

## Trusted commands
- Scan with auto rules: \`semgrep scan --config auto\`
- Scan specific directory: \`semgrep scan --config auto src/\`
- Security-focused scan: \`semgrep scan --config p/security-audit\`
- OWASP top 10: \`semgrep scan --config p/owasp-top-ten\`
- Specific language: \`semgrep scan --config p/typescript\`
- Scan single file: \`semgrep scan --config auto path/to/file.ts\`
- JSON output: \`semgrep scan --config auto --json\`

## Output format
Text findings to stdout with file, line, rule ID, and matched code snippet. \`--json\` emits structured match objects with file, line range, severity, rule metadata, and matched text — pipe to \`jq\` for filtering.

## Why it matters for agents
Agents can run security and quality scans before committing code. Much broader language coverage than shellcheck or biome alone.

## Gotchas
- First run downloads rules (needs internet). Subsequent runs use cache.
- \`--config auto\` selects rules based on detected languages.
- Community rules at semgrep.dev/explore — use \`--config p/RULESET\` to reference them.
- Can write custom rules in YAML for project-specific patterns.
`.trim();
