export default `
# knip — Find unused code/deps in TS/JS

## When to use
Detect unused files, exports, dependencies, and types in TypeScript/JavaScript projects. Run at project root.

## Trusted commands
- Full scan: \`knip\`
- Unused files only: \`knip --include files\`
- Unused exports only: \`knip --include exports\`
- Unused deps only: \`knip --include dependencies\`
- Machine-readable with scopes: \`knip --reporter json --include files,exports,dependencies\`

## Why it matters for agents
Identifies dead code before large refactors — agents can safely delete unused files and exports flagged by knip without breaking the build.

## Gotchas
- Must be run at project root (where package.json lives).
- May need a knip.json config for monorepos or non-standard project structures.
- Some frameworks have plugins (Next.js, Remix, etc.) — check docs if results seem wrong.
- Exits 1 if issues found — CI-friendly; pipe to \`jq\` to filter specific categories.
`.trim();
