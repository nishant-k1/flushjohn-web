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
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-store, must-revalidate", // Prevent caching in dev
          },
        ],
      },
      {
        source: "/assets/:path*", // Ensure the 'source' is defined
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable"
                : "no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
