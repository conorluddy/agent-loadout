export default `
# procs — Modern ps replacement

## When to use
List and search running processes with structured, colourful output. Replacement for \`ps aux | grep\`.

## Trusted commands
- List all processes: \`procs\`
- Search by name: \`procs node\`
- Tree view: \`procs --tree\`
- Watch mode: \`procs --watch\`
- Sort by CPU: \`procs --sortd cpu\`
- Sort by memory: \`procs --sortd mem\`

## Why it matters for agents
Agents diagnosing "port in use" or runaway process issues get structured output without pipe chains.

## Gotchas
- Output is human-readable by default. For scripting, pipe through \`--color=never\` or use standard \`ps\` + jq.
- Search matches against command name and full command line.
`.trim();
