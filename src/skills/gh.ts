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

## Output format
Supports \`--json\` on most commands for structured output. E.g. \`gh pr list --json number,title,state\`.

## Gotchas
- Requires authentication: \`gh auth login\`
- \`gh api\` is very powerful for anything not covered by built-in commands.
`.trim();
