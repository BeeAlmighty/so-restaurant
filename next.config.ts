import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Photos are vendored to /public/img; the optimizer's remote fetch times out in this environment.
  images: { unoptimized: true },
}

export default nextConfig
