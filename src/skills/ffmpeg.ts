export default `
# ffmpeg — Audio/video Swiss army knife

## When to use
Transcode, trim, concatenate, normalise audio, extract streams, generate waveforms — anything media.

## Trusted commands
- Inspect media: \`ffprobe -hide_banner -of json -show_format -show_streams file.mp4\`
- Convert format: \`ffmpeg -i input.wav output.mp3\`
- Trim: \`ffmpeg -i input.mp4 -ss 00:01:00 -t 00:00:30 -c copy output.mp4\`
- Extract audio: \`ffmpeg -i video.mp4 -vn -acodec copy audio.aac\`
- Normalise loudness: \`ffmpeg -i input.wav -af loudnorm=I=-16 output.wav\`
- Resize video: \`ffmpeg -i input.mp4 -vf scale=1280:720 output.mp4\`
- Generate waveform: \`ffmpeg -i audio.wav -filter_complex showwavespic=s=1920x200 waveform.png\`

## Safety rules
- Never overwrite input files. Always write to a different output path.
- Use \`-n\` flag to skip if output exists (never overwrite silently).
- Always inspect with \`ffprobe\` before transcoding to understand the source.

## Gotchas
- Argument order matters: input flags before \`-i\`, output flags after.
- \`-c copy\` copies streams without re-encoding (fast, lossless).
- ffprobe is installed alongside ffmpeg.
`.trim();
