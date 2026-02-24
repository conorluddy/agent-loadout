export default `
# bottom (btm) — System monitor

## When to use
Real-time TUI system monitor — CPU, memory, network, disk, and process list in one view.

## Trusted commands
- Open monitor: \`btm\`
- Basic mode (simpler layout): \`btm --basic\`
- Show all processes (no grouping): \`btm --process_command\`

## Key bindings (inside btm)
- \`?\` — show help overlay
- \`q\` / \`Ctrl+C\` — quit
- \`dd\` — kill selected process
- \`s\` — sort column selector
- \`/\` — filter processes by name
- \`Tab\` — switch between widgets
- \`e\` — expand focused widget to full screen

## Gotchas
- Config lives at \`~/.config/bottom/bottom.toml\` — customise colours and layout there.
- \`--basic\` mode is useful in constrained terminals or for quick checks.
`.trim();
