export default `
# pandoc — Universal document converter

## When to use
Convert between document formats: markdown, HTML, PDF, docx, LaTeX, RST, EPUB, and dozens more. The single tool for any "convert X to Y" task.

## Trusted commands
- Markdown to HTML: \`pandoc input.md -o output.html\`
- Markdown to PDF: \`pandoc input.md -o output.pdf\` (requires LaTeX or --pdf-engine=weasyprint)
- Markdown to docx: \`pandoc input.md -o output.docx\`
- HTML to markdown: \`pandoc input.html -o output.md\`
- With standalone template: \`pandoc input.md -s -o output.html\`
- Custom CSS: \`pandoc input.md -s --css=style.css -o output.html\`
- List supported formats: \`pandoc --list-input-formats\` / \`pandoc --list-output-formats\`

## Why it matters for agents
Agents frequently need to transform content between formats for delivery. Pandoc handles the conversion so the agent focuses on content.

## Gotchas
- PDF output requires a PDF engine (wkhtmltopdf, weasyprint, or LaTeX). Use \`--pdf-engine=weasyprint\` if LaTeX isn't installed.
- Output format is inferred from the file extension.
- Use \`-s\` (standalone) for complete documents with headers, not fragments.
`.trim();
