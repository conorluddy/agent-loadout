export default `
# tokei — Code statistics

## When to use
Get a quick overview of a codebase: languages, lines of code, comments, blanks.

## Trusted commands
- Current directory: \`tokei\`
- Specific path: \`tokei src/\`
- JSON output: \`tokei --output json\`
- Sort by lines: \`tokei --sort lines\`
- Exclude dirs: \`tokei --output json --exclude node_modules,dist src/\`
- Filter languages: \`tokei --languages TypeScript,Rust\`
- Per-file breakdown: \`tokei --files src/\`

## Output format
Table with language, files, lines, code, comments, blanks.
Use \`--output json\` for structured output.

## Why it matters for agents
Gives agents a language/complexity map before large refactors — quickly understand the scale and dominant languages of an unfamiliar codebase.
`.trim();
