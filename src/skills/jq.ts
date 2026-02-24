export default `
# jq — JSON processor

## When to use
Filter, transform, and extract data from JSON. Essential for working with API responses and config files.

## Trusted commands
- Pretty print: \`cat file.json | jq .\`
- Extract field: \`jq '.fieldName'\`
- Pick multiple fields: \`jq '{id, name, status}'\`
- Map over array: \`jq '[.items[] | {id, name}]'\`
- Count array: \`jq '.items | length'\`
- Filter: \`jq '.items[] | select(.status == "active")'\`
- Default for missing: \`jq '.name // "unknown"'\`
- Validate JSON (fail on error): \`jq -e .\`

## Gotchas
- Use \`-e\` flag to get non-zero exit code on null/false results.
- Use \`-r\` for raw string output (no quotes).
- Missing fields return null, not an error. Use \`//\` for defaults.
`.trim();
