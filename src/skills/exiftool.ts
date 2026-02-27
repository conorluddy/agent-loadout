export default `
# exiftool — Image/media metadata

## When to use
Read, write, and strip metadata (EXIF, IPTC, XMP) from images and media files.

## Trusted commands
- Read all metadata: \`exiftool file.jpg\`
- Read as JSON: \`exiftool -json file.jpg\`
- Read specific fields: \`exiftool -Make -Model -DateTimeOriginal file.jpg\`
- Strip GPS data: \`exiftool -gps:all= file.jpg\`
- Strip all metadata: \`exiftool -all= file.jpg\`
- Rename by date: \`exiftool '-FileName<DateTimeOriginal' -d '%Y%m%d_%H%M%S.%%e' dir/\`
- Batch read: \`exiftool -json dir/\`

## Safety rules
- exiftool creates backup files (.jpg_original) by default when modifying. Use \`-overwrite_original\` only when sure.

## Gotchas
- Field names are case-insensitive.
- Use \`-json\` for structured output.

## Why it matters for agents
\`-json\` output enables structured metadata extraction from any media file — agents can batch-read EXIF data, filter by GPS coordinates, or rename files by capture date programmatically.
`.trim();
