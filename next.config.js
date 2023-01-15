/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/mastry',
  reactStrictMode: true,
  swcMinify: true,

  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
