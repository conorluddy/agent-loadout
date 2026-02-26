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
  },
  {
    id: "jq",
    name: "jq",
    description: "JSON processor",
    preset: "core",
    verify: "jq --version",
    install: universal("jq"),
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
  },
  {
    id: "tree",
    name: "tree",
    description: "Directory structure viewer",
    preset: "core",
    verify: "tree --version",
    install: universal("tree"),
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
  },
  {
    id: "fzf",
    name: "fzf",
    description: "Fuzzy finder",
    preset: "core",
    verify: "fzf --version",
    install: universal("fzf"),
  },
  {
    id: "xh",
    name: "xh",
    description: "Friendly HTTP client",
    preset: "core",
    verify: "xh --version",
    install: brewScoopCargo("xh", "xh"),
  },

  // ── Agent ─────────────────────────────────────────────
  {
    id: "shellcheck",
    name: "shellcheck",
    description: "Static analysis for shell scripts",
    preset: "agent",
    verify: "shellcheck --version",
    install: universal("shellcheck"),
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
  },
  {
    id: "just",
    name: "just",
    description: "Command runner (agent-readable task menu)",
    preset: "agent",
    verify: "just --version",
    install: brewScoopCargo("just", "just"),
  },
  {
    id: "grex",
    name: "grex",
    description: "Generate regex from examples",
    preset: "agent",
    verify: "grex --version",
    install: brewScoopCargo("grex", "grex"),
  },
  {
    id: "knip",
    name: "knip",
    description: "Find unused code/deps in TS/JS",
    preset: "agent",
    verify: "knip --version",
    install: npmAll("knip"),
  },
  {
    id: "sd",
    name: "sd",
    description: "Simpler sed replacement",
    preset: "agent",
    verify: "sd --version",
    install: brewScoopCargo("sd", "sd"),
  },
  {
    id: "hyperfine",
    name: "hyperfine",
    description: "CLI benchmarking",
    preset: "agent",
    verify: "hyperfine --version",
    install: brewScoopAptCargo("hyperfine", "hyperfine", "hyperfine"),
  },
  {
    id: "tokei",
    name: "tokei",
    description: "Code statistics",
    preset: "agent",
    verify: "tokei --version",
    install: brewScoopCargo("tokei", "tokei"),
  },
  {
    id: "tldr",
    name: "tldr",
    description: "Quick man page summaries",
    preset: "agent",
    verify: "tldr --version",
    install: universal("tldr"),
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
  },
  {
    id: "difftastic",
    name: "difftastic",
    description: "Structural/AST diff",
    preset: "agent",
    verify: "difft --version",
    install: brewScoopCargo("difftastic", "difftastic"),
  },
  {
    id: "pandoc",
    name: "pandoc",
    description: "Universal document converter",
    preset: "agent",
    verify: "pandoc --version",
    install: universal("pandoc"),
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
  },
  {
    id: "htmlq",
    name: "htmlq",
    description: "Extract content from HTML using CSS selectors",
    preset: "agent",
    verify: "htmlq --version",
    install: brewScoopCargo("htmlq", "htmlq"),
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
  },

  // ── Media ─────────────────────────────────────────────
  {
    id: "ffmpeg",
    name: "ffmpeg",
    description: "Audio/video Swiss army knife",
    preset: "media",
    verify: "ffmpeg -version",
    install: universal("ffmpeg"),
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
  },
  {
    id: "imagemagick",
    name: "ImageMagick",
    description: "Image transforms",
    preset: "media",
    verify: "magick -version",
    install: universal("imagemagick"),
  },
  {
    id: "svgo",
    name: "svgo",
    description: "SVG optimiser",
    preset: "media",
    verify: "svgo --version",
    install: npmAll("svgo"),
  },

  // ── DX ────────────────────────────────────────────────
  {
    id: "eza",
    name: "eza",
    description: "Modern ls replacement",
    preset: "dx",
    verify: "eza --version",
    install: brewScoopCargo("eza", "eza"),
  },
  {
    id: "zoxide",
    name: "zoxide",
    description: "Smarter cd",
    preset: "dx",
    verify: "zoxide --version",
    install: brewScoopCargo("zoxide", "zoxide"),
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
  },
  {
    id: "watchexec",
    name: "watchexec",
    description: "Run commands on file change",
    preset: "dx",
    verify: "watchexec --version",
    install: brewScoopCargo("watchexec", "watchexec"),
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
  },
  {
    id: "dust",
    name: "dust",
    description: "Disk usage tree",
    preset: "dx",
    verify: "dust --version",
    install: brewScoopCargo("dust", "du-dust"),
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
  },
  {
    id: "direnv",
    name: "direnv",
    description: "Auto-load env vars per directory",
    preset: "dx",
    verify: "direnv version",
    install: universal("direnv"),
  },
  {
    id: "procs",
    name: "procs",
    description: "Modern ps replacement with search",
    preset: "dx",
    verify: "procs --version",
    install: brewScoopCargo("procs", "procs"),
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
  },
  {
    id: "hexyl",
    name: "hexyl",
    description: "Hex viewer with colour coding",
    preset: "dx",
    verify: "hexyl --version",
    install: brewScoopCargo("hexyl", "hexyl"),
  },
  {
    id: "taplo",
    name: "taplo",
    description: "TOML toolkit (lint, format, query)",
    preset: "dx",
    verify: "taplo --version",
    install: brewScoopCargo("taplo", "taplo-cli"),
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
