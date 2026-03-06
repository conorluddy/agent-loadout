"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const changelog = [
  {
    version: "v1.2.0",
    date: "2026-03-06",
    headline: "14 new tools, persona sections, health metadata",
    details:
      "64 tools total. d2, pngquant, oxipng, gron, lychee, vale. Multi-persona website section. Per-tool GitHub stats and links.",
  },
  {
    version: "v1.1.0",
    date: "2026-03-06",
    headline: "8 design & creative tools, design preset",
    details:
      "58 tools total. svgo, resvg, chafa, pastel, vips, oha, fx, csview, asciinema. New design preset.",
  },
  {
    version: "v1.0.3",
    date: "2026-02-28",
    headline: "Skill files improved to 9.5/10 quality",
    details:
      "All 50 skill files rewritten with trusted commands, gotchas, and agent tips.",
  },
  {
    version: "v1.0.0",
    date: "2026-02-25",
    headline: "Initial release",
    details:
      "50 curated tools across 5 presets. Cross-platform (macOS, Linux, Windows). Skill file generation.",
  },
]

export function ChangelogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const entriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (entriesRef.current) {
        const rows = entriesRef.current.querySelectorAll(":scope > div")
        gsap.from(rows, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: entriesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="changelog"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          05 / Changelog
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          RELEASES
        </h2>
      </div>

      {/* Timeline */}
      <div ref={entriesRef} className="space-y-0 border border-border/30">
        {changelog.map((entry) => (
          <div
            key={entry.version}
            className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 px-5 py-5 border-b border-border/20 last:border-b-0 hover:bg-accent/5 transition-colors duration-200"
          >
            <span className="font-[var(--font-bebas)] text-lg text-accent shrink-0 tracking-wide">
              {entry.version}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest shrink-0">
              {entry.date}
            </span>
            <span className="font-mono text-xs text-foreground">
              {entry.headline}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/60 leading-relaxed md:ml-auto md:text-right md:max-w-[40%]">
              {entry.details}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
