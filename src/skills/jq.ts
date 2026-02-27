export default `
# jq — JSON processor

## When to use
Filter, transform, and extract data from JSON. Essential for working with API responses and config files.

## Trusted commands
- Pretty print: \`jq . file.json\`
- Extract field: \`jq '.fieldName' file.json\`
- Pick multiple fields: \`jq '{id, name, status}'\`
- Map over array: \`jq '[.items[] | {id, name}]'\`
- Count array: \`jq '.items | length'\`
- Filter: \`jq '.items[] | select(.status == "active")'\`
- Default for missing: \`jq '.name // "unknown"'\`
- Validate JSON (fail on error): \`jq -e . file.json\`

## Output format
Pretty-printed JSON by default. Use \`-r\` for raw strings (no quotes). Use \`-c\` for compact single-line JSON. \`-e\` / \`--exit-status\` exits non-zero on null or false output.

## Why it matters for agents
The standard tool for parsing API responses and config files in shell pipelines. \`-e\` flag makes null checks composable: \`jq -e '.token' response.json || exit 1\`.

## Gotchas
- Use \`-r\` for raw string output (no quotes) — required when passing jq output to other commands.
- Missing fields return null, not an error. Use \`//\` for defaults: \`.name // "unknown"\`.
- Use \`-e\` to get non-zero exit code on null/false results — essential for conditional pipelines.
`.trim();
