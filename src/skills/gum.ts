export default `
# gum — Interactive UI components for shell scripts

## When to use
Add interactive prompts, spinners, confirmations, file pickers, and styled text to shell scripts without complex TUI code.

## Trusted commands
- Confirm (y/n): \`gum confirm "Deploy to production?"\`
- Choose from list: \`gum choose "option1" "option2" "option3"\`
- Text input: \`gum input --placeholder "Enter name"\`
- Multi-line input: \`gum write --placeholder "Description"\`
- Spinner while running: \`gum spin --title "Building..." -- make build\`
- Filter list (fuzzy): \`echo "a\\nb\\nc" | gum filter\`
- Styled text: \`gum style --foreground 212 --bold "Done!"\`
- File picker: \`gum file .\`

## Why it matters for agents
When agents create shell scripts or automation, gum adds polished interactivity with single commands. No dependency on dialog, whiptail, or complex TUI libraries.

## Gotchas
- Each command returns the selected/entered value to stdout — capture with \`$(gum ...)\`.
- Part of the Charm ecosystem (same as glow, lazygit).
- \`gum confirm\` returns exit code 0 (yes) or 1 (no).
`.trim();
