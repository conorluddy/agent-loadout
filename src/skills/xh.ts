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

## Gotchas
- \`key=value\` sends as JSON string; \`key:=value\` sends raw JSON (numbers, bools, arrays).
- Defaults to HTTPS if scheme is omitted.
- Use \`--check-status\` to exit non-zero on 4xx/5xx responses.
`.trim();
