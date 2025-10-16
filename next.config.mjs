/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**', 
      },
      {
        protocol: 'http',
        hostname: 'localhost:3008',
        pathname: '/**', 
      },
    ],
  },
}

export default nextConfig
