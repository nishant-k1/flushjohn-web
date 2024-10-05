const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.flushjohn.com", // your CloudFront distribution URL
        port: "", // leave empty for default HTTPS port
        pathname: "/**", // Allows all images in the root and any nested directories
      },
    ],
  },
  async headers() {
    return [
      {
        // Adding another rule for images in the root of your CloudFront
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*", // Ensure the 'source' is defined
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
