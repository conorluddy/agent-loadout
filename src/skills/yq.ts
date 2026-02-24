export default `
# yq — YAML processor

## When to use
Same as jq but for YAML files. Query, filter, and transform YAML.

## Trusted commands
- Read field: \`yq '.spec.replicas' file.yaml\`
- Convert YAML to JSON: \`yq -o json file.yaml\`
- Convert JSON to YAML: \`yq -P file.json\`
- Update in place: \`yq -i '.version = "2.0"' file.yaml\`
- Merge files: \`yq eval-all 'select(fi == 0) * select(fi == 1)' a.yaml b.yaml\`

## Gotchas
- There are multiple tools called yq. This refers to the Go version (mikefarah/yq), installed via brew.
- Use \`-i\` carefully — it modifies files in place.
`.trim();
