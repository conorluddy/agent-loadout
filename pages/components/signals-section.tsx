"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const presets = [
  {
    id: "core",
    title: "Core",
    count: 9,
    default: true,
    description: "The essentials. ripgrep, fd, jq, yq, bat, tree, GitHub CLI, fzf, and xh. Fastest code search, JSON/YAML slicing, and HTTP from the terminal.",
    tools: ["ripgrep", "fd", "jq", "yq", "bat", "tree", "gh", "fzf", "xh"],
  },
  {
    id: "agent",
    title: "Agent",
    count: 16,
    default: true,
    description: "Tools that make AI agents genuinely more capable. AST-level search, static analysis, benchmarking, linting, and structured code operations.",
    tools: ["shellcheck", "ast-grep", "just", "grex", "knip", "sd", "hyperfine", "tokei", "tldr", "biome", "difftastic", "pandoc", "duckdb", "htmlq", "typos", "gum"],
  },
  {
    id: "media",
    title: "Media",
    count: 4,
    default: false,
    description: "Audio, video, and image processing from the command line. ffmpeg, exiftool, ImageMagick, and SVG optimization.",
    tools: ["ffmpeg", "exiftool", "imagemagick", "svgo"],
  },
  {
    id: "dx",
    title: "DX",
    count: 15,
    default: false,
    description: "Developer experience tools. Modern replacements for ls, cd, ps, du, and git diff. Runtime management, file watching, and local HTTPS.",
    tools: ["eza", "zoxide", "delta", "glow", "mise", "watchexec", "mkcert", "lazygit", "dust", "bottom", "direnv", "procs", "uv", "hexyl", "taplo"],
  },
  {
    id: "security",
    title: "Security",
    count: 6,
    default: false,
    description: "Vulnerability scanning, secret detection, local CI testing, static analysis, file encryption, and DNS inspection.",
    tools: ["trivy", "act", "gitleaks", "semgrep", "age", "doggo"],
  },
]

export function SignalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || !cursorRef.current) return

    const section = sectionRef.current
    const cursor = cursorRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power3.out",
      })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    section.addEventListener("mousemove", handleMouseMove)
    section.addEventListener("mouseenter", handleMouseEnter)
    section.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      section.removeEventListener("mousemove", handleMouseMove)
      section.removeEventListener("mouseenter", handleMouseEnter)
      section.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="presets" ref={sectionRef} className="relative py-32 pl-6 md:pl-28">
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50",
          "w-12 h-12 rounded-full border-2 border-accent bg-accent",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Section header */}
      <div ref={headerRef} className="mb-16 pr-6 md:pr-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / Presets</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">CHOOSE YOUR LOADOUT</h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={cardsRef}
        className="flex gap-8 overflow-x-auto pb-8 pr-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {presets.map((preset, index) => (
          <PresetCard key={preset.id} preset={preset} index={index} />
        ))}
      </div>
    </section>
  )
}

function PresetCard({
  preset,
  index,
}: {
  preset: {
    id: string
    title: string
    count: number
    default: boolean
    description: string
    tools: string[]
  }
  index: number
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-80",
        "transition-transform duration-500 ease-out",
        "hover:-translate-y-2",
      )}
    >
      <div className="relative bg-card border border-border/50 md:border-t md:border-l md:border-r-0 md:border-b-0 p-8">
        <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />

        <div className="flex items-baseline justify-between mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            No. {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn(
            "font-mono text-[10px] uppercase tracking-widest px-2 py-0.5",
            preset.default
              ? "text-accent border border-accent/30 bg-accent/5"
              : "text-muted-foreground/60"
          )}>
            {preset.default ? "On by default" : "Optional"}
          </span>
        </div>

        <h3 className="font-[var(--font-bebas)] text-4xl tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
          {preset.title}
        </h3>

        <span className="font-mono text-xs text-accent">{preset.count} tools</span>

        <div className="w-12 h-px bg-accent/60 my-6 group-hover:w-full transition-all duration-500" />

        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">{preset.description}</p>

        {/* Tool tags */}
        <div className="flex flex-wrap gap-1.5">
          {preset.tools.slice(0, 6).map((tool) => (
            <span
              key={tool}
              className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60 border border-border/30 px-2 py-0.5"
            >
              {tool}
            </span>
          ))}
          {preset.tools.length > 6 && (
            <span className="font-mono text-[9px] uppercase tracking-wider text-accent/60 px-2 py-0.5">
              +{preset.tools.length - 6} more
            </span>
          )}
        </div>

        <div className="absolute bottom-0 right-0 w-6 h-6 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-background rotate-45 translate-x-4 translate-y-4 border-t border-l border-border/30" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 translate-x-1 translate-y-1 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </article>
  )
}
