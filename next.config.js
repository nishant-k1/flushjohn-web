const withImages = require('next-images');
/** @type {import('next').NextConfig} */

module.exports = withImages({
  reactStrictMode: true,
  esModule: false,
  async headers() {
    return [
      {
        source: '/(.*)\\.(jpg|jpeg|png|gif|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
});
