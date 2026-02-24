export type InstallMethod = "brew" | "npm";

export type Tool = {
  id: string;
  name: string;
  package: string;
  installMethod: InstallMethod;
  verify: string;
  description: string;
  preset: PresetId;
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

export const TOOLS: Tool[] = [
  // ── Core ──────────────────────────────────────────────
  {
    id: "rg",
    name: "ripgrep",
    package: "ripgrep",
    installMethod: "brew",
    verify: "rg --version",
    description: "Fast code search",
    preset: "core",
  },
  {
    id: "fd",
    name: "fd",
    package: "fd",
    installMethod: "brew",
    verify: "fd --version",
    description: "Fast file finder",
    preset: "core",
  },
  {
    id: "jq",
    name: "jq",
    package: "jq",
    installMethod: "brew",
    verify: "jq --version",
    description: "JSON processor",
    preset: "core",
  },
  {
    id: "yq",
    name: "yq",
    package: "yq",
    installMethod: "brew",
    verify: "yq --version",
    description: "YAML processor",
    preset: "core",
  },
  {
    id: "bat",
    name: "bat",
    package: "bat",
    installMethod: "brew",
    verify: "bat --version",
    description: "Cat with syntax highlighting",
    preset: "core",
  },
  {
    id: "tree",
    name: "tree",
    package: "tree",
    installMethod: "brew",
    verify: "tree --version",
    description: "Directory structure viewer",
    preset: "core",
  },
  {
    id: "gh",
    name: "GitHub CLI",
    package: "gh",
    installMethod: "brew",
    verify: "gh --version",
    description: "GitHub CLI for PRs, issues, releases",
    preset: "core",
  },
  {
    id: "fzf",
    name: "fzf",
    package: "fzf",
    installMethod: "brew",
    verify: "fzf --version",
    description: "Fuzzy finder",
    preset: "core",
  },

  // ── Agent ─────────────────────────────────────────────
  {
    id: "shellcheck",
    name: "shellcheck",
    package: "shellcheck",
    installMethod: "brew",
    verify: "shellcheck --version",
    description: "Static analysis for shell scripts",
    preset: "agent",
  },
  {
    id: "ast-grep",
    name: "ast-grep",
    package: "ast-grep",
    installMethod: "brew",
    verify: "sg --version",
    description: "Structural code search/replace",
    preset: "agent",
  },
  {
    id: "just",
    name: "just",
    package: "just",
    installMethod: "brew",
    verify: "just --version",
    description: "Command runner (agent-readable task menu)",
    preset: "agent",
  },
  {
    id: "grex",
    name: "grex",
    package: "grex",
    installMethod: "brew",
    verify: "grex --version",
    description: "Generate regex from examples",
    preset: "agent",
  },
  {
    id: "knip",
    name: "knip",
    package: "knip",
    installMethod: "npm",
    verify: "knip --version",
    description: "Find unused code/deps in TS/JS",
    preset: "agent",
  },
  {
    id: "sd",
    name: "sd",
    package: "sd",
    installMethod: "brew",
    verify: "sd --version",
    description: "Simpler sed replacement",
    preset: "agent",
  },
  {
    id: "hyperfine",
    name: "hyperfine",
    package: "hyperfine",
    installMethod: "brew",
    verify: "hyperfine --version",
    description: "CLI benchmarking",
    preset: "agent",
  },
  {
    id: "tokei",
    name: "tokei",
    package: "tokei",
    installMethod: "brew",
    verify: "tokei --version",
    description: "Code statistics",
    preset: "agent",
  },

  // ── Media ─────────────────────────────────────────────
  {
    id: "ffmpeg",
    name: "ffmpeg",
    package: "ffmpeg",
    installMethod: "brew",
    verify: "ffmpeg -version",
    description: "Audio/video Swiss army knife",
    preset: "media",
  },
  {
    id: "exiftool",
    name: "exiftool",
    package: "exiftool",
    installMethod: "brew",
    verify: "exiftool -ver",
    description: "Image/media metadata",
    preset: "media",
  },
  {
    id: "imagemagick",
    name: "ImageMagick",
    package: "imagemagick",
    installMethod: "brew",
    verify: "magick -version",
    description: "Image transforms",
    preset: "media",
  },
  {
    id: "svgo",
    name: "svgo",
    package: "svgo",
    installMethod: "npm",
    verify: "svgo --version",
    description: "SVG optimiser",
    preset: "media",
  },

  // ── DX ────────────────────────────────────────────────
  {
    id: "eza",
    name: "eza",
    package: "eza",
    installMethod: "brew",
    verify: "eza --version",
    description: "Modern ls replacement",
    preset: "dx",
  },
  {
    id: "zoxide",
    name: "zoxide",
    package: "zoxide",
    installMethod: "brew",
    verify: "zoxide --version",
    description: "Smarter cd",
    preset: "dx",
  },
  {
    id: "delta",
    name: "delta",
    package: "git-delta",
    installMethod: "brew",
    verify: "delta --version",
    description: "Better git diffs",
    preset: "dx",
  },
  {
    id: "glow",
    name: "glow",
    package: "glow",
    installMethod: "brew",
    verify: "glow --version",
    description: "Terminal markdown renderer",
    preset: "dx",
  },
  {
    id: "mise",
    name: "mise",
    package: "mise",
    installMethod: "brew",
    verify: "mise --version",
    description: "Runtime version manager",
    preset: "dx",
  },
  {
    id: "watchexec",
    name: "watchexec",
    package: "watchexec",
    installMethod: "brew",
    verify: "watchexec --version",
    description: "Run commands on file change",
    preset: "dx",
  },
  {
    id: "mkcert",
    name: "mkcert",
    package: "mkcert",
    installMethod: "brew",
    verify: "mkcert --version",
    description: "Local HTTPS certs",
    preset: "dx",
  },

  // ── Security ──────────────────────────────────────────
  {
    id: "trivy",
    name: "trivy",
    package: "trivy",
    installMethod: "brew",
    verify: "trivy --version",
    description: "Vulnerability scanner",
    preset: "security",
  },
  {
    id: "act",
    name: "act",
    package: "act",
    installMethod: "brew",
    verify: "act --version",
    description: "Run GitHub Actions locally",
    preset: "security",
  },
];

export function getToolsByPreset(presetId: PresetId): Tool[] {
  return TOOLS.filter((t) => t.preset === presetId);
}

export function getToolsByIds(ids: string[]): Tool[] {
  return TOOLS.filter((t) => ids.includes(t.id));
}
