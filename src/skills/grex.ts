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
- Output is a regex string, not a replacement. Useful as input for rg, sd, or code.
`.trim();
