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

## Gotchas
- Wrap commands in quotes.
- Use \`--warmup\` for commands that benefit from caching.
`.trim();
