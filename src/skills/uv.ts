export default `
# uv — Fast Python package and env manager

## When to use
Manage Python virtual environments and install packages. 10-100x faster than pip. Drop-in replacement for pip, pip-tools, and virtualenv.

## Trusted commands
- Create venv: \`uv venv\`
- Install package: \`uv pip install requests\`
- Install from requirements: \`uv pip install -r requirements.txt\`
- Compile requirements (lock): \`uv pip compile requirements.in -o requirements.txt\`
- Run a script with deps: \`uv run --with requests script.py\`
- Init a new project: \`uv init my-project\`
- Add dependency: \`uv add requests\`
- Sync project: \`uv sync\`

## Why it matters for agents
When agents set up Python projects or install dependencies, uv makes it near-instant. No waiting for pip's dependency resolver.

## Gotchas
- Creates \`.venv/\` by default (same as standard venv).
- \`uv pip\` commands are pip-compatible — same flags and syntax.
- \`uv run\` can run scripts with inline dependencies without a project.
`.trim();
