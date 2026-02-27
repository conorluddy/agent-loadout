export default `
# typos — Source code spell checker

## When to use
Find and fix typos in source code, comments, docs, filenames, and variable names. Runs in milliseconds across entire codebases.

## Trusted commands
- Check current directory: \`typos\`
- Check specific path: \`typos src/\`
- Auto-fix typos: \`typos --write-changes\`
- Diff mode (show what would change): \`typos --diff\`
- Check specific file types: \`typos --type rust src/\`
- Ignore a word: add to \`_typos.toml\`: \`[default.extend-words]\` → \`teh = "teh"\`

## Output format
\`file:line:col: "typo" -> "correction"\` per finding to stdout. \`--format json\` emits structured output with file, line, column, typo, and correction fields — parse with \`jq\` for batch processing. Exits 1 if typos found.

## Why it matters for agents
Agents generate a lot of code. Running typos as a final pass catches misspellings in variable names, comments, and docs that slip past linters.

## Gotchas
- Configure exceptions in \`_typos.toml\` or \`.typos.toml\` at project root.
- Understands common programming conventions (camelCase, snake_case, etc.).
- Very fast — designed to run on every commit.
`.trim();
