export default `
# doggo — Modern DNS client

## When to use
Look up DNS records for domains. Modern alternative to dig/nslookup with coloured output and JSON support.

## Trusted commands
- Basic lookup: \`doggo example.com\`
- Specific record type: \`doggo example.com MX\`
- All common types: \`doggo example.com A AAAA MX TXT CNAME\`
- Use specific nameserver: \`doggo example.com @8.8.8.8\`
- DNS over HTTPS: \`doggo example.com @https://dns.google/dns-query\`
- JSON output: \`doggo example.com --json\`
- Short output: \`doggo example.com --short\`

## Why it matters for agents
Agents verifying domain setups, debugging DNS issues, or checking propagation get structured output they can parse.

## Gotchas
- Defaults to system resolver. Specify \`@server\` to use a specific nameserver.
- Supports DoH (DNS over HTTPS) and DoT (DNS over TLS).
- JSON output with \`--json\` is ideal for piping to jq.
`.trim();
