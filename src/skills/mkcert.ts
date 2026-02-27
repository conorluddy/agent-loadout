export default `
# mkcert — Local HTTPS certificates

## When to use
Generate locally-trusted HTTPS certificates for development. No more "insecure" warnings.

## Trusted commands
- First-time setup: \`mkcert -install\` (installs local CA)
- Generate cert: \`mkcert localhost 127.0.0.1 ::1\`
- Generate for custom domain: \`mkcert "myapp.local" "*.myapp.local"\`
- Custom output paths: \`mkcert -cert-file cert.pem -key-file key.pem localhost\`
- Wildcard + Docker/VM: \`mkcert -install && mkcert "*.local" localhost 127.0.0.1\`

## Gotchas
- \`mkcert -install\` only needs to run once per machine.
- Output is two files: cert.pem and key.pem. Point your dev server at them.

## Why it matters for agents
Enables local HTTPS in one command — no CA setup complexity. Agents scaffolding full-stack dev environments can run \`mkcert -install && mkcert localhost\` to get HTTPS working immediately.
`.trim();
