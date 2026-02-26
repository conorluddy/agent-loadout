export default `
# direnv — Auto-load env vars per directory

## When to use
Automatically load and unload environment variables when entering/leaving a directory. Each project gets its own env without polluting your shell.

## Trusted commands
- Allow current .envrc: \`direnv allow\`
- Block current .envrc: \`direnv deny\`
- Edit .envrc: \`direnv edit .\`
- Check status: \`direnv status\`
- Reload: \`direnv reload\`

## Common .envrc patterns
- Set vars: \`export API_KEY=xxx\`
- Add to PATH: \`PATH_add ./bin\`
- Use a specific Node version: \`use node 20\` (with mise/nvm layout)
- Load .env file: \`dotenv\`

## Gotchas
- Requires shell hook — add \`eval "$(direnv hook zsh)"\` to .zshrc (or bash equivalent).
- New .envrc files must be explicitly allowed with \`direnv allow\` (security feature).
- Changes to .envrc require re-allowing.
`.trim();
