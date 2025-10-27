import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false, // Reduce bundle size
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Aggressive optimization for production
    if (!dev && !isServer) {
      // Enhanced tree shaking and size optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      config.optimization.providedExports = true;
      config.optimization.moduleIds = "deterministic";
      config.optimization.chunkIds = "deterministic";

      // Reduce bundle size with aggressive splitting
      config.optimization.splitChunks.maxAsyncRequests = 20;
      config.optimization.splitChunks.maxInitialRequests = 25;
      config.optimization.splitChunks.minSize = 20000;
      config.optimization.splitChunks.maxSize = 244000;

      // Better minification
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;

      // Remove unused CSS and JS
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: false,
          vendors: false,

          // React and core libraries
          react: {
            name: "react",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
          },

          // MUI components
          mui: {
            name: "mui",
            chunks: "all",
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            priority: 35,
            enforce: true,
          },

          // Other vendor libraries
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            maxSize: 200000,
          },

          // Common app code
          common: {
            name: "common",
            chunks: "all",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };

      // Remove moment.js locales (if used)
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );

      // Dead code elimination
      config.plugins.push(
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production"),
          __DEV__: false,
        })
      );
    }

    return config;
  },
  experimental: {
    scrollRestoration: true,
    // Enable HTTP/2 multiplexing when supported
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  serverExternalPackages: ["nodemailer"],
  // Enable HTTP/2 and modern protocols - requires HTTPS deployment
  // HTTP/2 is automatic on platforms like Vercel, Netlify
  // For custom server, configure nginx (see nginx.conf)
  httpAgentOptions: {
    keepAlive: true,
    // Use modern HTTP/2 when available
    // maxSockets: 50, // Allows multiplexing
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.flushjohn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "s3-media0.fl.yelpcdn.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico)$)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400"
                : "no-store, must-revalidate",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Accept-CH",
            value: "DPR, Viewport-Width, Width",
          },
          {
            key: "Critical-CH",
            value: "DPR, Viewport-Width, Width",
          },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Content-Security-Policy",
                  value:
                    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.flushjohn.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.flushjohn.com; font-src 'self' https://fonts.gstatic.com https://cdn.flushjohn.com; img-src 'self' data: https: blob: https://images.unsplash.com; connect-src 'self' https://www.google-analytics.com https://api.flushjohn.com wss://api.flushjohn.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests;",
                },
              ]
            : []),
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
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

export default withBundleAnalyzer(nextConfig);
