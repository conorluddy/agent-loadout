export default `
# watchexec — Run commands on file change

## When to use
Watch files for changes and re-run a command. Language-agnostic alternative to nodemon.

## Trusted commands
- Watch and run: \`watchexec -e ts,tsx "pnpm typecheck"\`
- Watch specific path: \`watchexec -w src/ "pnpm test"\`
- Clear screen on change: \`watchexec --clear -e ts "pnpm typecheck"\`
- Restart long-running process: \`watchexec --restart -e ts "node server.js"\`

## Gotchas
- Use \`-e\` to filter by extension, \`-w\` to filter by directory.
- Use \`--restart\` for long-running processes (servers), otherwise it waits for completion.

## Why it matters for agents
Enables live-reload dev loops — agents can set up reactive pipelines (\`watchexec -e ts "pnpm typecheck"\`) and report on each change without polling.
`.trim();
