/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/mastry.github.io',
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
