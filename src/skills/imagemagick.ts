export default `
# ImageMagick (magick) — Image transforms

## When to use
Resize, crop, convert, and manipulate images from the command line.

## Trusted commands
- Convert format: \`magick input.png output.jpg\`
- Resize: \`magick input.jpg -resize 800x600 output.jpg\`
- Resize to width (maintain aspect): \`magick input.jpg -resize 800x output.jpg\`
- Generate thumbnail: \`magick input.jpg -thumbnail 200x200^ -gravity center -extent 200x200 thumb.jpg\`
- Get dimensions: \`magick identify -format '%wx%h' input.jpg\`
- Batch convert: \`magick mogrify -format webp *.png\`

## Safety rules
- \`magick mogrify\` modifies files in place. Use \`magick convert\` (or just \`magick in out\`) for safe transforms.

## Gotchas
- The binary is \`magick\` (ImageMagick 7). Older versions used \`convert\`.
`.trim();
