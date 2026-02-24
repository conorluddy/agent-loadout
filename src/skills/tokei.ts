export default `
# tokei — Code statistics

## When to use
Get a quick overview of a codebase: languages, lines of code, comments, blanks.

## Trusted commands
- Current directory: \`tokei\`
- Specific path: \`tokei src/\`
- JSON output: \`tokei --output json\`
- Sort by lines: \`tokei --sort lines\`

## Output format
Table with language, files, lines, code, comments, blanks.
Use \`--output json\` for structured output.
`.trim();
