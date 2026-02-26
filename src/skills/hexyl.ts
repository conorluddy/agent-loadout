export default `
# hexyl — Hex viewer

## When to use
Inspect binary files, check file headers/magic bytes, debug encoding issues, or examine corrupted data.

## Trusted commands
- View file: \`hexyl file.bin\`
- First N bytes: \`hexyl -n 256 file.bin\`
- Skip to offset: \`hexyl -s 0x100 file.bin\`
- Pipe from stdin: \`echo "hello" | hexyl\`
- Specific range: \`hexyl -r 0x10..0x20 file.bin\`

## Why it matters for agents
Agents encountering unknown binary files can quickly identify format (via magic bytes), spot encoding issues, or verify file integrity.

## Gotchas
- Output is always to stdout — not interactive/scrollable. Pipe to \`less -R\` for large files.
- Colour codes bytes by type: NULL, ASCII printable, ASCII whitespace, non-ASCII.
`.trim();
