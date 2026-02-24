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

## Gotchas
- First run requires internet to fetch the page cache. Run \`tldr --update\` after install.
- Not every obscure tool has a page — fall back to \`man\` or \`--help\` when missing.
- Pages are community-written; they cover common usage, not edge cases.
`.trim();
