export default `
# hyperfine — CLI benchmarking

## When to use
Benchmark commands to compare performance. Runs commands multiple times and reports stats.

## Trusted commands
- Benchmark single command: \`hyperfine 'command'\`
- Compare two commands: \`hyperfine 'command-a' 'command-b'\`
- With warmup: \`hyperfine --warmup 3 'command'\`
- Export results: \`hyperfine --export-json results.json 'command'\`
- Min runs: \`hyperfine --min-runs 20 'command'\`
- Non-interactive + export: \`hyperfine --style basic --export-json results.json 'cmd1' 'cmd2'\`
- With prepare step: \`hyperfine --prepare 'make clean' 'make build'\`

## Why it matters for agents
\`--export-json\` lets agents compare builds and commands quantitatively — structured results include mean, stddev, min, max per command.

## Gotchas
- Wrap commands in quotes.
- Use \`--warmup\` for commands that benefit from caching.
`.trim();
