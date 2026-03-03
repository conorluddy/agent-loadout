/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/AgentLoadout",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
