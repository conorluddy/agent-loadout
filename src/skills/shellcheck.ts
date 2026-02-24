export default `
# shellcheck — Static analysis for shell scripts

## When to use
Lint shell scripts (bash, sh, dash) for common mistakes: quoting issues, unset variables, deprecated syntax, portability problems. Agents frequently generate shell scripts — shellcheck catches errors before they run.

## Trusted commands
- Check a script: \`shellcheck script.sh\`
- Check with specific shell: \`shellcheck --shell=bash script.sh\`
- JSON output: \`shellcheck --format=json script.sh\`
- GCC-style output: \`shellcheck --format=gcc script.sh\`
- Exclude specific rules: \`shellcheck --exclude=SC2034 script.sh\`
- Check from stdin: \`echo '#!/bin/bash' | shellcheck -\`

## Output format
Default output is human-readable with line numbers and fix suggestions. Use \`--format=json\` for structured output.

## Gotchas
- Scripts need a shebang (\`#!/bin/bash\`) or use \`--shell=\` flag.
- SC codes (e.g. SC2086) link to detailed wiki explanations.
`.trim();
