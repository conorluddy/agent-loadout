import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Sans, IBM_Plex_Mono, Bebas_Neue } from "next/font/google"
import { SmoothScroll } from "@/components/smooth-scroll"
import "./globals.css"

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
})
const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
})
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" })

const siteUrl = "https://conorluddy.github.io/AgentLoadout"

export const metadata: Metadata = {
  title: "Agent Loadout — One Command to Arm Your Terminal",
  description:
    "Install a curated set of 50+ terminal tools for agentic coding workflows. One command. macOS, Linux, and Windows.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Agent Loadout — One Command to Arm Your Terminal",
    description: "Install 50+ curated terminal tools for agentic coding. One command.",
    url: siteUrl,
    siteName: "Agent Loadout",
    images: [{ url: "/agentloadout.png", width: 1536, height: 1024, alt: "Agent Loadout" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Loadout — One Command to Arm Your Terminal",
    description: "Install 50+ curated terminal tools for agentic coding. One command.",
    images: ["/agentloadout.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
