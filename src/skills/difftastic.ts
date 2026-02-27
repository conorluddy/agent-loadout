export default `
# difftastic (difft) — Structural/AST diff

## When to use
Compare files by syntax tree, not line-by-line. Understands code structure so renaming a variable shows intent, not noise.

## Trusted commands
- Diff two files: \`difft old.ts new.ts\`
- Use as git diff driver: \`GIT_EXTERNAL_DIFF=difft git diff\`
- Set as permanent git difftool: \`git config --global diff.external difft\`
- Diff staged changes: \`GIT_EXTERNAL_DIFF=difft git diff --cached\`
- Plain text mode (no syntax): \`difft --display side-by-side-show-both old.txt new.txt\`

## Output format
Side-by-side ANSI diff to stdout. Not machine-parseable — designed for human review only. Falls back to line-by-line diff for unsupported file types. Terminal width determines column widths.

## Gotchas
- Supports most languages automatically via file extension detection.
- Output is always side-by-side; pipe width matters — use a wide terminal.
- Falls back to line-diff for unsupported file types.
- Not suitable for programmatic diffing — use \`git diff --unified\` for machine-parseable output.

## Why it matters for agents
Understands code structure — avoids false-positive diffs from formatting changes. Agents using \`GIT_EXTERNAL_DIFF=difft git diff\` get semantic change summaries, not noise.
`.trim();
