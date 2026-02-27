export default `
# tldr — Quick man page summaries

## When to use
Get practical, example-driven command summaries without reading full man pages.

## Trusted commands
- Look up a command: \`tldr rg\`
- Look up a subcommand: \`tldr git commit\`
- Update the local cache: \`tldr --update\`
- List all available pages: \`tldr --list\`
- Search for a topic: \`tldr --search "compress files"\`
- Raw output (no colour): \`tldr --raw rg\`

## Output format
Plain text formatted pages with ANSI colour codes. Use \`--raw\` or pipe through \`cat\` to strip colour. Each page is a short markdown document with a description and practical examples.

## Why it matters for agents
Faster lookup than man pages — community-maintained examples cover 90% of common usages in a scannable format. Use as the first-pass reference before falling back to \`--help\` or full man pages. \`--raw\` output is safe to include verbatim in agent context.

## Gotchas
- First run requires internet to fetch the page cache. Run \`tldr --update\` after install.
- Pages are community-written; they cover common usage, not edge cases — missing for obscure tools.
- \`tldr --update\` refreshes the local cache; stale caches may show outdated examples.
- Not every tool has a page — fall back to \`man\` or \`--help\` when missing.
`.trim();
