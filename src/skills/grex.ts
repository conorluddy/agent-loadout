export default `
# grex — Generate regex from examples

## When to use
Generate a regular expression from a set of example strings. Useful when you know what you want to match but not the pattern.

## Trusted commands
- Generate regex: \`grex "foo-123" "bar-456" "baz-789"\`
- With anchors: \`grex --with-anchors "foo-123" "bar-456"\`
- Case insensitive: \`grex --ignore-case "Foo" "FOO" "foo"\`
- Verbose regex: \`grex --verbose "foo-123" "bar-456"\`

## Gotchas
- Output is a raw regex string — pipe directly into \`rg\`, \`sd\`, or save to a variable.

## Why it matters for agents
Lets agents generate correct regex from test cases rather than hallucinating patterns — eliminates a whole class of regex bugs.
`.trim();
