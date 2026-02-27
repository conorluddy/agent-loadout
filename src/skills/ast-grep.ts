export default `
# ast-grep (sg) — Structural code search/replace

## When to use
Search and replace code using syntax tree patterns instead of regex. Far safer for refactors because it understands code structure.

## Trusted commands
- Search for pattern: \`sg --pattern 'console.log($ARG)' --lang ts\`
- Search in directory: \`sg --pattern 'useEffect($FN, [])' --lang tsx src/\`
- Replace: \`sg --pattern 'console.log($ARG)' --rewrite 'logger.info($ARG)' --lang ts\`
- Interactive replace: \`sg --pattern '$X' --rewrite '$Y' --lang ts --interactive\`

## When to prefer over regex
- Renaming function calls or method calls
- Finding patterns that span multiple lines
- Replacing with structural awareness (e.g. moving arguments)
- Any refactor where brackets/nesting matters

## Output format
\`file:line:col: matched text\` format by default. \`--json\` emits structured match objects with file, range, metavariable bindings, and matched text — use for programmatic processing of results.

## Gotchas
- The binary is called \`sg\`, not \`ast-grep\`.
- \`$ARG\` is a metavariable that matches any single node. \`$$$ARGS\` matches multiple.
- Always specify \`--lang\` for predictable results.
`.trim();
