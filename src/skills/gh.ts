export default `
# GitHub CLI (gh) — GitHub from the terminal

## When to use
Create PRs, manage issues, check CI status, manage releases — all without leaving the terminal.

## Trusted commands
- Create PR: \`gh pr create --title "title" --body "body"\`
- View PR: \`gh pr view 123\`
- List PRs: \`gh pr list\`
- Check CI status: \`gh pr checks 123\`
- Create issue: \`gh issue create --title "title" --body "body"\`
- List issues: \`gh issue list\`
- View repo: \`gh repo view\`
- API calls: \`gh api repos/owner/repo/pulls/123/comments\`
- Clone: \`gh repo clone owner/repo\`
- List workflow runs: \`gh run list --json name,status,conclusion\`
- Watch a run live: \`gh run watch\`
- Cross-repo PR list: \`gh pr list -R owner/repo --json number,title,state\`

## Output format
Supports \`--json\` on most commands for structured output. E.g. \`gh pr list --json number,title,state\`.

## Why it matters for agents
\`--json\` on every command + \`gh api\` unlocks full GitHub automation without parsing HTML. Agents can open PRs, check CI, and comment on issues programmatically.

## Gotchas
- Requires authentication: \`gh auth login\`
- \`gh api\` is very powerful for anything not covered by built-in commands.
- In CI, set \`GH_TOKEN\` env var instead of running \`gh auth login\`.
`.trim();
