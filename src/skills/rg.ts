export default `
# ripgrep (rg) — Fast code search

## When to use
Search file contents across a codebase. Faster than grep, respects .gitignore by default.

## Trusted commands
- Search for a pattern: \`rg "pattern" path/\`
- Fixed string (no regex): \`rg -F "exact string"\`
- File type filter: \`rg "pattern" -t ts\` (ts, js, py, rust, go, etc.)
- Glob filter: \`rg "pattern" -g '*.tsx'\`
- Show context lines: \`rg "pattern" -C 3\`
- Files only (no content): \`rg -l "pattern"\`
- Count matches: \`rg -c "pattern"\`
- Case insensitive: \`rg -i "pattern"\`

## Output format
\`file:line:column:matched_text\` — one match per line, stable and parseable.

## Gotchas
- Skips hidden files and .gitignore'd paths by default. Use \`--hidden\` or \`--no-ignore\` to include them.
- For literal dots, brackets etc. in patterns, use \`-F\` (fixed string) to avoid regex escaping issues.
`.trim();
