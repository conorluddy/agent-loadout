export default `
# htmlq — jq for HTML

## When to use
Extract content from HTML files or piped HTML using CSS selectors. Like jq but for HTML/web content.

## Trusted commands
- Extract by selector: \`cat page.html | htmlq '.article-title'\`
- Get attribute: \`cat page.html | htmlq 'a' --attribute href\`
- Text only (strip tags): \`cat page.html | htmlq '.content' --text\`
- Pipe from curl: \`curl -s https://example.com | htmlq 'h1'\`
- Multiple selectors: \`cat page.html | htmlq 'h1, h2, h3'\`
- Pretty print: \`cat page.html | htmlq --pretty 'body'\`

## Why it matters for agents
When agents fetch web content or work with HTML files, htmlq extracts exactly what's needed without writing a parser.

## Gotchas
- Reads from stdin — always pipe input to it.
- CSS selectors only (not XPath).
- Use \`--text\` to get text content without HTML tags.
`.trim();
