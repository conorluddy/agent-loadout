export default `
# gitleaks — Secrets scanner

## When to use
Detect hardcoded secrets (API keys, tokens, passwords) in git repos before they reach remote.

## Trusted commands
- Scan entire repo history: \`gitleaks detect\`
- Scan only staged changes (pre-commit): \`gitleaks protect --staged\`
- Scan a specific path: \`gitleaks detect --source /path/to/repo\`
- Output as JSON: \`gitleaks detect --report-format json --report-path leaks.json\`
- Verbose (show findings inline): \`gitleaks detect -v\`

## CI usage
Add to a pre-commit hook or CI step:
\`\`\`sh
gitleaks protect --staged   # pre-commit hook
gitleaks detect             # CI full scan
\`\`\`

## Why it matters for agents
Agents editing configuration files or adding credentials must scan before committing. Exit code 1 on findings makes it trivially composable as a pre-commit gate.

## Gotchas
- Findings include file, line, rule, and matched secret fragment — review before dismissing.
- Use a \`.gitleaksignore\` file to whitelist known false positives.
- Does not redact secrets from history — use \`git filter-repo\` to remove them.
- Returns exit code 1 if leaks found, 0 if clean — use directly in CI pipelines.
- Custom rules: \`gitleaks detect --config custom-rules.toml --report-format json\`
`.trim();
