import { HeroSection } from "@/components/hero-section"
import { SignalsSection } from "@/components/signals-section"
import { WorkSection } from "@/components/work-section"
import { PersonasSection } from "@/components/personas-section"
import { PrinciplesSection } from "@/components/principles-section"
import { ChangelogSection } from "@/components/changelog-section"
import { ColophonSection } from "@/components/colophon-section"
import { SideNav } from "@/components/side-nav"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Agent Loadout",
  description: "Install a curated set of 64 terminal tools for agentic coding workflows. One command. macOS, Linux, and Windows.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: ["macOS", "Linux", "Windows"],
  url: "https://conorluddy.github.io/AgentLoadout",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Conor Luddy", url: "https://github.com/conorluddy" },
  codeRepository: "https://github.com/conorluddy/AgentLoadout",
  license: "https://opensource.org/licenses/MIT",
}

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <SignalsSection />
        <WorkSection />
        <PersonasSection />
        <PrinciplesSection />
        <ChangelogSection />
        <ColophonSection />
      </div>
    </main>
  )
}
