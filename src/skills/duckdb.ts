export default `
# duckdb — SQL analytics on files

## When to use
Query CSV, JSON, Parquet, or Excel files with SQL. No database setup, no import step — just point and query.

## Trusted commands
- Query a CSV: \`duckdb -c "SELECT * FROM 'data.csv' LIMIT 10"\`
- Aggregate: \`duckdb -c "SELECT col, COUNT(*) FROM 'data.csv' GROUP BY col"\`
- Query JSON: \`duckdb -c "SELECT * FROM read_json_auto('data.json')"\`
- Query Parquet: \`duckdb -c "SELECT * FROM 'data.parquet'"\`
- Join files: \`duckdb -c "SELECT a.*, b.name FROM 'users.csv' a JOIN 'orders.csv' b ON a.id = b.user_id"\`
- Export result: \`duckdb -c "COPY (SELECT * FROM 'data.csv') TO 'out.parquet' (FORMAT PARQUET)"\`
- Interactive REPL: \`duckdb\`

## Why it matters for agents
When an agent encounters a data file, duckdb lets it explore and answer questions via SQL instead of writing custom Python/JS parsing code. Massive time saver for any data task.

## Gotchas
- Auto-detects CSV headers and types. Use \`read_csv('file.csv', header=false)\` to disable.
- For one-off queries, use \`-c\`. For multiple, use the REPL or a .sql file.
- Outputs to stdout in table format by default. Use \`-csv\` or \`-json\` for machine-readable output.
`.trim();
