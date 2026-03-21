/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:8003/:path*',
      },
      {
        source: '/clothes/:path*',
        destination: 'http://localhost:8002/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
