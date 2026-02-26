export default `
# age — Simple file encryption

## When to use
Encrypt and decrypt files with a passphrase or public key. Modern replacement for GPG — much simpler API.

## Trusted commands
- Encrypt with passphrase: \`age -p -o secret.age secret.txt\`
- Decrypt: \`age -d -o secret.txt secret.age\`
- Generate key pair: \`age-keygen -o key.txt\`
- Encrypt to recipient: \`age -r age1... -o secret.age secret.txt\`
- Encrypt to multiple recipients: \`age -r age1... -r age1... -o secret.age secret.txt\`
- Pipe: \`echo "secret" | age -p > encrypted.age\`

## Why it matters for agents
When agents handle .env files, API keys, or sensitive configs, age provides simple encrypt/decrypt without GPG complexity.

## Gotchas
- Passphrase mode (\`-p\`) prompts interactively. For scripting, pipe passphrase or use recipient mode.
- Output file must be specified with \`-o\` (doesn't overwrite input).
- age-keygen outputs private key to file, prints public key to stderr.
`.trim();
