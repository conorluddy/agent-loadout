export default `
# xh — Friendly HTTP client

## When to use
Send HTTP requests from the terminal. Cleaner syntax than curl, JSON-first, coloured output.

## Trusted commands
- GET request: \`xh get httpbin.org/json\`
- POST JSON body: \`xh post httpbin.org/post name=Alice age:=30\`
- Set headers: \`xh get api.example.com Authorization:"Bearer $TOKEN"\`
- Force JSON output: \`xh --json get api.example.com\`
- Follow redirects: \`xh --follow get example.com\`
- Save response to file: \`xh get example.com/file.zip > file.zip\`
- Show request/response headers: \`xh --print=hHbB get httpbin.org/get\`
- Fail on 4xx/5xx: \`xh --check-status get api.example.com\`
- Response body only: \`xh -b get api.example.com\`
- Headers only: \`xh -h get api.example.com\`
- Download file: \`xh --download get example.com/file.zip\`

## Output format
HTTP response body to stdout by default, pretty-printed and syntax-highlighted. Use \`-b\` for body only, \`-h\` for headers only. \`--print=hHbB\` controls what is shown (h=response headers, H=request headers, b=response body, B=request body). JSON bodies are pretty-printed automatically.

## Why it matters for agents
Cleaner than curl for API testing — \`key=value\` JSON syntax removes quoting complexity. \`--check-status\` makes error handling trivial: non-zero exit on any 4xx/5xx.

## Gotchas
- \`key=value\` sends as JSON string; \`key:=value\` sends raw JSON (numbers, bools, arrays).
- Defaults to HTTPS if scheme is omitted.
`.trim();
