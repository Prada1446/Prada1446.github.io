/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Berlaku untuk semua halaman
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
