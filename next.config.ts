/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Prada1446.github.io',
  assetPrefix: '/Prada1446.github.io/',
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; connect-src *;"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
