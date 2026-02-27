import type { Platform, PackageManager } from "./platform.js";

export type PlatformInstall = {
  method: PackageManager;
  package: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  preset: PresetId;
  /** string = same command on every platform */
  verify: string | Partial<Record<Platform, string>>;
  /** null = unavailable on this platform; array = try in order, first available manager wins */
  install: Record<Platform, PlatformInstall[] | null>;
  /** intent-matching keywords for agent discovery (4–8 phrases) */
  tags?: string[];
  /** ids of complementary tools */
  seeAlso?: string[];
};

export type PresetId = "core" | "agent" | "media" | "dx" | "security";

export type Preset = {
  id: PresetId;
  name: string;
  description: string;
  defaultOn: boolean;
};

export const PRESETS: Preset[] = [
  {
    id: "core",
    name: "Core",
    description: "Fundamentals every terminal should have",
    defaultOn: true,
  },
  {
    id: "agent",
    name: "Agent",
    description: "Tools that specifically improve LLM workflows",
    defaultOn: true,
  },
  {
    id: "media",
    name: "Media",
    description: "Image, audio, and video pipeline tools",
    defaultOn: false,
  },
  {
    id: "dx",
    name: "DX",
    description: "Developer experience and quality of life",
    defaultOn: false,
  },
  {
    id: "security",
    name: "Security",
    description: "Scanning and CI hygiene",
    defaultOn: false,
  },
];

// === FACTORY HELPERS ===

/** Same package name on brew (mac), apt (linux), scoop (win) */
function universal(pkg: string): Record<Platform, PlatformInstall[]> {
  return {
    darwin: [{ method: "brew", package: pkg }],
    linux: [{ method: "apt", package: pkg }],
    win32: [{ method: "scoop", package: pkg }],
  };
}

/** brew on mac, scoop on win, custom entries on linux */
function brewScoop(
  pkg: string,
  linux: PlatformInstall[] | null,
): Record<Platform, PlatformInstall[] | null> {
  return {
    darwin: [{ method: "brew", package: pkg }],
    linux,
    win32: [{ method: "scoop", package: pkg }],
  };
}

/** brew on mac, scoop on win, apt then cargo fallback on linux */
function brewScoopAptCargo(
  pkg: string,
  aptPkg: string,
  cargoPkg: string,
): Record<Platform, PlatformInstall[]> {
  return {
    darwin: [{ method: "brew", package: pkg }],
    linux: [
      { method: "apt", package: aptPkg },
      { method: "cargo", package: cargoPkg },
    ],
    win32: [{ method: "scoop", package: pkg }],
  };
}

/** brew on mac, scoop on win, cargo fallback on linux */
function brewScoopCargo(
  pkg: string,
  cargoPkg: string,
): Record<Platform, PlatformInstall[]> {
  return {
    darwin: [{ method: "brew", package: pkg }],
    linux: [{ method: "cargo", package: cargoPkg }],
    win32: [{ method: "scoop", package: pkg }],
  };
}

/** npm everywhere */
function npmAll(pkg: string): Record<Platform, PlatformInstall[]> {
  return {
    darwin: [{ method: "npm", package: pkg }],
    linux: [{ method: "npm", package: pkg }],
    win32: [{ method: "npm", package: pkg }],
  };
}

// === TOOL CATALOG ===

export const TOOLS: Tool[] = [
  // ── Core ──────────────────────────────────────────────
  {
    id: "rg",
    name: "ripgrep",
    description: "Fast code search",
    preset: "core",
    verify: "rg --version",
    install: brewScoopAptCargo("ripgrep", "ripgrep", "ripgrep"),
    tags: ["search", "grep", "find text", "code search", "pattern match", "codebase search"],
    seeAlso: ["fd", "bat", "ast-grep"],
  },
  {
    id: "fd",
    name: "fd",
    description: "Fast file finder",
    preset: "core",
    verify: { darwin: "fd --version", linux: "fdfind --version", win32: "fd --version" },
    install: {
      darwin: [{ method: "brew", package: "fd" }],
      linux: [{ method: "apt", package: "fd-find" }, { method: "cargo", package: "fd-find" }],
      win32: [{ method: "scoop", package: "fd" }],
    },
    tags: ["find files", "file search", "locate files", "glob", "directory search"],
    seeAlso: ["rg", "fzf", "eza"],
  },
  {
    id: "jq",
    name: "jq",
    description: "JSON processor",
    preset: "core",
    verify: "jq --version",
    install: universal("jq"),
    tags: ["json", "parse json", "filter json", "api response", "json transform"],
    seeAlso: ["yq", "duckdb", "xh"],
  },
  {
    id: "yq",
    name: "yq",
    description: "YAML processor",
    preset: "core",
    verify: "yq --version",
    install: {
      darwin: [{ method: "brew", package: "yq" }],
      // TODO: gh-release installer — no apt/cargo package; scoop has it
      linux: null,
      win32: [{ method: "scoop", package: "yq" }],
    },
    tags: ["yaml", "parse yaml", "yaml transform", "config files", "toml"],
    seeAlso: ["jq", "taplo"],
  },
  {
    id: "bat",
    name: "bat",
    description: "Cat with syntax highlighting",
    preset: "core",
    verify: "bat --version",
    install: {
      darwin: [{ method: "brew", package: "bat" }],
      linux: [
        { method: "apt", package: "bat" },
        { method: "cargo", package: "bat" },
      ],
      win32: [{ method: "scoop", package: "bat" }],
    },
    tags: ["view file", "syntax highlighting", "cat", "preview code", "pager"],
    seeAlso: ["rg", "delta", "glow"],
  },
  {
    id: "tree",
    name: "tree",
    description: "Directory structure viewer",
    preset: "core",
    verify: "tree --version",
    install: universal("tree"),
    tags: ["directory tree", "folder structure", "list files", "project layout"],
    seeAlso: ["eza", "fd", "dust"],
  },
  {
    id: "gh",
    name: "GitHub CLI",
    description: "GitHub CLI for PRs, issues, releases",
    preset: "core",
    verify: "gh --version",
    install: {
      darwin: [{ method: "brew", package: "gh" }],
      linux: [{ method: "apt", package: "gh" }],
      win32: [{ method: "scoop", package: "gh" }],
    },
    tags: ["github", "pull request", "pr", "issues", "ci status", "releases", "repo management"],
    seeAlso: ["lazygit", "act", "gitleaks"],
  },
  {
    id: "fzf",
    name: "fzf",
    description: "Fuzzy finder",
    preset: "core",
    verify: "fzf --version",
    install: universal("fzf"),
    tags: ["fuzzy find", "interactive search", "pick file", "filter list", "autocomplete"],
    seeAlso: ["fd", "rg", "zoxide"],
  },
  {
    id: "xh",
    name: "xh",
    description: "Friendly HTTP client",
    preset: "core",
    verify: "xh --version",
    install: brewScoopCargo("xh", "xh"),
    tags: ["http request", "api call", "curl", "rest", "post request", "http testing"],
    seeAlso: ["jq", "htmlq"],
  },

  // ── Agent ─────────────────────────────────────────────
  {
    id: "shellcheck",
    name: "shellcheck",
    description: "Static analysis for shell scripts",
    preset: "agent",
    verify: "shellcheck --version",
    install: universal("shellcheck"),
    tags: ["shell script", "bash lint", "script error", "sh validation", "bash debug"],
    seeAlso: ["sd", "just"],
  },
  {
    id: "ast-grep",
    name: "ast-grep",
    description: "Structural code search/replace",
    preset: "agent",
    verify: "sg --version",
    install: {
      darwin: [{ method: "brew", package: "ast-grep" }],
      linux: [{ method: "cargo", package: "ast-grep" }],
      win32: [{ method: "scoop", package: "ast-grep" }],
    },
    tags: ["structural search", "code pattern", "ast", "refactor", "codemod", "syntax-aware"],
    seeAlso: ["rg", "sd", "biome"],
  },
  {
    id: "just",
    name: "just",
    description: "Command runner (agent-readable task menu)",
    preset: "agent",
    verify: "just --version",
    install: brewScoopCargo("just", "just"),
    tags: ["task runner", "commands menu", "build tasks", "makefile", "recipe", "run scripts"],
    seeAlso: ["watchexec", "shellcheck"],
  },
  {
    id: "grex",
    name: "grex",
    description: "Generate regex from examples",
    preset: "agent",
    verify: "grex --version",
    install: brewScoopCargo("grex", "grex"),
    tags: ["regex", "generate regex", "pattern from examples", "regular expression", "infer pattern"],
    seeAlso: ["sd", "rg"],
  },
  {
    id: "knip",
    name: "knip",
    description: "Find unused code/deps in TS/JS",
    preset: "agent",
    verify: "knip --version",
    install: npmAll("knip"),
    tags: ["unused code", "dead code", "unused imports", "ts cleanup", "dependency audit"],
    seeAlso: ["biome", "tokei"],
  },
  {
    id: "sd",
    name: "sd",
    description: "Simpler sed replacement",
    preset: "agent",
    verify: "sd --version",
    install: brewScoopCargo("sd", "sd"),
    tags: ["find replace", "text substitution", "sed", "regex replace", "bulk edit"],
    seeAlso: ["rg", "ast-grep", "grex"],
  },
  {
    id: "hyperfine",
    name: "hyperfine",
    description: "CLI benchmarking",
    preset: "agent",
    verify: "hyperfine --version",
    install: brewScoopAptCargo("hyperfine", "hyperfine", "hyperfine"),
    tags: ["benchmark", "performance test", "timing", "compare commands", "profiling"],
    seeAlso: ["tokei", "btm"],
  },
  {
    id: "tokei",
    name: "tokei",
    description: "Code statistics",
    preset: "agent",
    verify: "tokei --version",
    install: brewScoopCargo("tokei", "tokei"),
    tags: ["code stats", "line count", "language breakdown", "codebase size", "loc"],
    seeAlso: ["hyperfine", "knip", "dust"],
  },
  {
    id: "tldr",
    name: "tldr",
    description: "Quick man page summaries",
    preset: "agent",
    verify: "tldr --version",
    install: universal("tldr"),
    tags: ["man page", "command help", "usage examples", "quick reference", "cheatsheet"],
    seeAlso: ["bat", "glow"],
  },
  {
    id: "biome",
    name: "biome",
    description: "Lint + format JS/TS",
    preset: "agent",
    verify: "biome --version",
    install: {
      darwin: [{ method: "brew", package: "biome" }],
      linux: [{ method: "npm", package: "@biomejs/biome" }],
      win32: [{ method: "npm", package: "@biomejs/biome" }],
    },
    tags: ["lint", "format", "typescript", "javascript", "code style", "prettier alternative"],
    seeAlso: ["knip", "ast-grep", "typos"],
  },
  {
    id: "difftastic",
    name: "difftastic",
    description: "Structural/AST diff",
    preset: "agent",
    verify: "difft --version",
    install: brewScoopCargo("difftastic", "difftastic"),
    tags: ["diff", "compare files", "git diff", "structural diff", "ast diff"],
    seeAlso: ["delta", "ast-grep"],
  },
  {
    id: "pandoc",
    name: "pandoc",
    description: "Universal document converter",
    preset: "agent",
    verify: "pandoc --version",
    install: universal("pandoc"),
    tags: ["convert document", "markdown to pdf", "docx", "format conversion", "export"],
    seeAlso: ["glow", "bat"],
  },
  {
    id: "duckdb",
    name: "duckdb",
    description: "SQL analytics on CSV/JSON/Parquet files",
    preset: "agent",
    verify: "duckdb --version",
    install: {
      darwin: [{ method: "brew", package: "duckdb" }],
      // TODO: gh-release installer — no reliable apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "duckdb" }],
    },
    tags: ["sql", "csv", "parquet", "analytics", "query data", "data analysis"],
    seeAlso: ["jq", "yq", "htmlq"],
  },
  {
    id: "htmlq",
    name: "htmlq",
    description: "Extract content from HTML using CSS selectors",
    preset: "agent",
    verify: "htmlq --version",
    install: brewScoopCargo("htmlq", "htmlq"),
    tags: ["html", "css selector", "scrape", "extract html", "parse html", "web"],
    seeAlso: ["xh", "jq", "duckdb"],
  },
  {
    id: "typos",
    name: "typos",
    description: "Source code spell checker",
    preset: "agent",
    verify: "typos --version",
    install: {
      darwin: [{ method: "brew", package: "typos-cli" }],
      linux: [{ method: "cargo", package: "typos-cli" }],
      win32: [{ method: "scoop", package: "typos" }],
    },
    tags: ["spell check", "typo", "source code spelling", "writing quality", "documentation"],
    seeAlso: ["biome", "shellcheck"],
  },
  {
    id: "gum",
    name: "gum",
    description: "Interactive UI components for shell scripts",
    preset: "agent",
    verify: "gum --version",
    install: {
      darwin: [{ method: "brew", package: "gum" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "gum" }],
    },
    tags: ["interactive shell", "tui prompt", "user input", "shell script ui", "confirm dialog"],
    seeAlso: ["fzf", "just"],
  },

  // ── Media ─────────────────────────────────────────────
  {
    id: "ffmpeg",
    name: "ffmpeg",
    description: "Audio/video Swiss army knife",
    preset: "media",
    verify: "ffmpeg -version",
    install: universal("ffmpeg"),
    tags: ["video convert", "audio convert", "transcode", "encode", "media processing", "extract audio"],
    seeAlso: ["imagemagick", "exiftool"],
  },
  {
    id: "exiftool",
    name: "exiftool",
    description: "Image/media metadata",
    preset: "media",
    verify: "exiftool -ver",
    install: {
      darwin: [{ method: "brew", package: "exiftool" }],
      linux: [{ method: "apt", package: "libimage-exiftool-perl" }],
      win32: [{ method: "scoop", package: "exiftool" }],
    },
    tags: ["image metadata", "exif", "photo info", "media tags", "strip metadata"],
    seeAlso: ["imagemagick", "ffmpeg"],
  },
  {
    id: "imagemagick",
    name: "ImageMagick",
    description: "Image transforms",
    preset: "media",
    verify: "magick -version",
    install: universal("imagemagick"),
    tags: ["image resize", "image convert", "image transform", "thumbnail", "crop image"],
    seeAlso: ["exiftool", "svgo", "ffmpeg"],
  },
  {
    id: "svgo",
    name: "svgo",
    description: "SVG optimiser",
    preset: "media",
    verify: "svgo --version",
    install: npmAll("svgo"),
    tags: ["svg optimize", "svg compress", "vector graphics", "svg minify", "icon optimize"],
    seeAlso: ["imagemagick"],
  },

  // ── DX ────────────────────────────────────────────────
  {
    id: "eza",
    name: "eza",
    description: "Modern ls replacement",
    preset: "dx",
    verify: "eza --version",
    install: brewScoopCargo("eza", "eza"),
    tags: ["list files", "ls", "directory listing", "file icons", "tree view"],
    seeAlso: ["tree", "fd", "dust"],
  },
  {
    id: "zoxide",
    name: "zoxide",
    description: "Smarter cd",
    preset: "dx",
    verify: "zoxide --version",
    install: brewScoopCargo("zoxide", "zoxide"),
    tags: ["cd", "directory jump", "smart navigation", "recent dirs", "z command"],
    seeAlso: ["fzf", "eza"],
  },
  {
    id: "delta",
    name: "delta",
    description: "Better git diffs",
    preset: "dx",
    verify: "delta --version",
    install: {
      darwin: [{ method: "brew", package: "git-delta" }],
      linux: [{ method: "cargo", package: "git-delta" }],
      win32: [{ method: "scoop", package: "delta" }],
    },
    tags: ["git diff", "diff viewer", "side by side diff", "code review", "syntax diff"],
    seeAlso: ["difftastic", "lazygit", "bat"],
  },
  {
    id: "glow",
    name: "glow",
    description: "Terminal markdown renderer",
    preset: "dx",
    verify: "glow --version",
    install: {
      darwin: [{ method: "brew", package: "glow" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "glow" }],
    },
    tags: ["render markdown", "markdown preview", "terminal markdown", "readme viewer"],
    seeAlso: ["bat", "pandoc", "tldr"],
  },
  {
    id: "mise",
    name: "mise",
    description: "Runtime version manager",
    preset: "dx",
    verify: "mise --version",
    install: {
      darwin: [{ method: "brew", package: "mise" }],
      // TODO: gh-release installer — curl script install preferred on Linux
      linux: null,
      win32: [{ method: "scoop", package: "mise" }],
    },
    tags: ["runtime version", "node version", "python version", "version manager", "toolchain"],
    seeAlso: ["uv", "direnv"],
  },
  {
    id: "watchexec",
    name: "watchexec",
    description: "Run commands on file change",
    preset: "dx",
    verify: "watchexec --version",
    install: brewScoopCargo("watchexec", "watchexec"),
    tags: ["watch files", "run on change", "live reload", "file watcher", "auto restart"],
    seeAlso: ["just", "mise"],
  },
  {
    id: "mkcert",
    name: "mkcert",
    description: "Local HTTPS certs",
    preset: "dx",
    verify: "mkcert --version",
    install: {
      darwin: [{ method: "brew", package: "mkcert" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "mkcert" }],
    },
    tags: ["https", "local ssl", "dev certificate", "tls", "self signed"],
    seeAlso: ["age", "trivy"],
  },
  {
    id: "lazygit",
    name: "lazygit",
    description: "TUI git client",
    preset: "dx",
    verify: "lazygit --version",
    install: {
      darwin: [{ method: "brew", package: "lazygit" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "lazygit" }],
    },
    tags: ["git tui", "git interface", "stage commits", "git visual", "interactive git"],
    seeAlso: ["gh", "delta", "difftastic"],
  },
  {
    id: "dust",
    name: "dust",
    description: "Disk usage tree",
    preset: "dx",
    verify: "dust --version",
    install: brewScoopCargo("dust", "du-dust"),
    tags: ["disk usage", "disk space", "folder size", "storage", "du"],
    seeAlso: ["eza", "tree", "btm"],
  },
  {
    id: "btm",
    name: "bottom",
    description: "System monitor TUI",
    preset: "dx",
    verify: "btm --version",
    install: {
      darwin: [{ method: "brew", package: "bottom" }],
      linux: [{ method: "cargo", package: "bottom" }],
      win32: [{ method: "scoop", package: "bottom" }],
    },
    tags: ["system monitor", "cpu usage", "memory", "processes", "resource monitor"],
    seeAlso: ["procs", "dust", "hyperfine"],
  },
  {
    id: "direnv",
    name: "direnv",
    description: "Auto-load env vars per directory",
    preset: "dx",
    verify: "direnv version",
    install: universal("direnv"),
    tags: ["environment variables", "env vars", ".env", "per-project env", "dotenv"],
    seeAlso: ["mise", "uv"],
  },
  {
    id: "procs",
    name: "procs",
    description: "Modern ps replacement with search",
    preset: "dx",
    verify: "procs --version",
    install: brewScoopCargo("procs", "procs"),
    tags: ["process list", "ps", "running processes", "process search", "pid"],
    seeAlso: ["btm", "dust"],
  },
  {
    id: "uv",
    name: "uv",
    description: "Fast Python package and env manager",
    preset: "dx",
    verify: "uv --version",
    install: {
      darwin: [{ method: "brew", package: "uv" }],
      linux: [{ method: "cargo", package: "uv" }],
      win32: [{ method: "scoop", package: "uv" }],
    },
    tags: ["python", "pip", "python package", "virtualenv", "python environment"],
    seeAlso: ["mise", "direnv"],
  },
  {
    id: "hexyl",
    name: "hexyl",
    description: "Hex viewer with colour coding",
    preset: "dx",
    verify: "hexyl --version",
    install: brewScoopCargo("hexyl", "hexyl"),
    tags: ["hex dump", "binary file", "byte inspection", "hex view", "binary analysis"],
    seeAlso: ["bat", "exiftool"],
  },
  {
    id: "taplo",
    name: "taplo",
    description: "TOML toolkit (lint, format, query)",
    preset: "dx",
    verify: "taplo --version",
    install: brewScoopCargo("taplo", "taplo-cli"),
    tags: ["toml", "toml lint", "toml format", "config validation", "cargo toml"],
    seeAlso: ["yq", "biome"],
  },

  // ── Security ──────────────────────────────────────────
  {
    id: "trivy",
    name: "trivy",
    description: "Vulnerability scanner",
    preset: "security",
    verify: "trivy --version",
    install: {
      darwin: [{ method: "brew", package: "trivy" }],
      linux: [{ method: "apt", package: "trivy" }],
      win32: [{ method: "scoop", package: "trivy" }],
    },
    tags: ["vulnerability scan", "cve", "docker scan", "dependency scan", "security audit"],
    seeAlso: ["semgrep", "gitleaks", "act"],
  },
  {
    id: "act",
    name: "act",
    description: "Run GitHub Actions locally",
    preset: "security",
    verify: "act --version",
    install: {
      darwin: [{ method: "brew", package: "act" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "act" }],
    },
    tags: ["github actions", "local ci", "workflow test", "ci debug", "actions runner"],
    seeAlso: ["gh", "trivy"],
  },
  {
    id: "gitleaks",
    name: "gitleaks",
    description: "Secrets scanner",
    preset: "security",
    verify: "gitleaks version",
    install: {
      darwin: [{ method: "brew", package: "gitleaks" }],
      // TODO: gh-release installer — no apt/cargo package
      linux: null,
      win32: [{ method: "scoop", package: "gitleaks" }],
    },
    tags: ["secret scan", "api key leak", "credentials", "git history scan", "sensitive data"],
    seeAlso: ["trivy", "semgrep", "gh"],
  },
  {
    id: "semgrep",
    name: "semgrep",
    description: "Multi-language static analysis",
    preset: "security",
    verify: "semgrep --version",
    install: {
      darwin: [{ method: "brew", package: "semgrep" }],
      linux: [{ method: "apt", package: "semgrep" }],
      win32: null, // not available on Windows
    },
    tags: ["static analysis", "security scan", "code pattern", "sast", "vulnerability detection"],
    seeAlso: ["trivy", "gitleaks", "shellcheck"],
  },
  {
    id: "age",
    name: "age",
    description: "Simple file encryption",
    preset: "security",
    verify: "age --version",
    install: {
      darwin: [{ method: "brew", package: "age" }],
      linux: [{ method: "apt", package: "age" }, { method: "cargo", package: "rage" }],
      win32: [{ method: "scoop", package: "age" }],
    },
    tags: ["encrypt", "decrypt", "file encryption", "secrets", "pgp alternative"],
    seeAlso: ["gitleaks", "mkcert"],
  },
  {
    id: "doggo",
    name: "doggo",
    description: "Modern DNS client with JSON output",
    preset: "security",
    verify: "doggo --version",
    install: {
      darwin: [{ method: "brew", package: "doggo" }],
      // TODO: gh-release installer — no apt package; cargo crate not maintained
      linux: null,
      win32: [{ method: "scoop", package: "doggo" }],
    },
    tags: ["dns", "dns lookup", "dns query", "nameserver", "network debug"],
    seeAlso: ["xh", "trivy"],
  },
];

// === QUERY HELPERS ===

export function getToolsByPreset(presetId: PresetId): Tool[] {
  return TOOLS.filter((t) => t.preset === presetId);
}

export function getToolsByIds(ids: string[]): Tool[] {
  return TOOLS.filter((t) => ids.includes(t.id));
}

export function validateToolIds(ids: string[]): { valid: string[]; invalid: string[] } {
  const knownIds = new Set(TOOLS.map((t) => t.id));
  const valid: string[] = [];
  const invalid: string[] = [];
  for (const id of ids) {
    (knownIds.has(id) ? valid : invalid).push(id);
  }
  return { valid, invalid };
}

/** Generate root Brewfile content from darwin entries in the catalog. */
export function generateBrewfileFromCatalog(): string {
  const lines = [
    "# Auto-generated from catalog.ts — macOS only. Run: pnpm brewfile",
    "# Do not edit manually.",
    "",
  ];

  for (const preset of PRESETS) {
    const tools = getToolsByPreset(preset.id);
    const brewTools = tools.flatMap((t) => t.install.darwin ?? []).filter(
      (pi) => pi.method === "brew",
    );
    if (brewTools.length === 0) continue;

    lines.push(`# ${preset.name}`);
    for (const pi of brewTools) {
      lines.push(`brew "${pi.package}"`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
