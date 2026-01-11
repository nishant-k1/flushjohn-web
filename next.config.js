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
  // Turbopack config (empty for now - webpack config handles production builds)
  turbopack: {},
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Aggressive optimization for production builds only
    // Note: This config only applies to production builds, not Turbopack dev mode
    if (!dev && !isServer) {
      // Enhanced tree shaking and size optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.innerGraph = true;
      config.optimization.providedExports = true;
      config.optimization.moduleIds = "deterministic";
      config.optimization.chunkIds = "deterministic";

      // Aggressive tree shaking for unused code elimination
      config.optimization.flagIncludedChunks = true;

      // Better minification with aggressive settings
      config.optimization.minimize = true;
      config.optimization.concatenateModules = true;
      config.optimization.mangleExports = true;
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
      config.optimization.mergeDuplicateChunks = true;

      // Remove unused CSS and JS - Optimized for better code splitting
      config.optimization.splitChunks = {
        chunks: "all",
        minSize: 20000,
        maxSize: 150000, // Reduced from 244KB to force more granular splitting
        maxAsyncRequests: 30,
        maxInitialRequests: 8, // Reduced from 30 to reduce initial bundle size
        cacheGroups: {
          default: false,
          vendors: false,

          // React and core libraries - highest priority (needed immediately)
          react: {
            name: "react",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },

          // Form libraries - separate chunk (loaded when forms render)
          formik: {
            name: "formik",
            chunks: "all",
            test: /[\\/]node_modules[\\/](formik|yup)[\\/]/,
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 150000,
          },

          // Date picker libraries - separate chunk (already lazy loaded in components)
          datepicker: {
            name: "datepicker",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react-datepicker|dayjs)[\\/]/,
            priority: 34,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 150000,
          },

          // Large vendor libraries - force smaller chunks (animations, utilities)
          largeVendor: {
            name: "large-vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/](framer-motion|date-fns|moment|lodash)[\\/]/,
            priority: 30,
            maxSize: 100000, // Reduced from 150KB for better splitting
            reuseExistingChunk: true,
          },

          // Socket.io and network libraries - separate chunk
          network: {
            name: "network",
            chunks: "all",
            test: /[\\/]node_modules[\\/](socket\.io-client|axios)[\\/]/,
            priority: 28,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 150000,
          },

          // Phone/input libraries - separate chunk
          inputs: {
            name: "inputs",
            chunks: "all",
            test: /[\\/]node_modules[\\/](react-phone-number-input|react-number-format)[\\/]/,
            priority: 27,
            enforce: true,
            reuseExistingChunk: true,
            maxSize: 150000,
          },

          // Other vendor libraries - split more granularly
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            maxSize: 150000, // Reduced from 200KB for better granularity
            reuseExistingChunk: true,
          },

          // Common app code
          common: {
            name: "common",
            chunks: "all",
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
            maxSize: 150000,
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
      bodySizeLimit: "2mb",
    },
    // Optimize CSS loading
    optimizeCss: true,
    // Enable modern JavaScript output
    esmExternals: true,
  },
  // Target modern browsers to reduce polyfills
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },
  // Modern browser support - reduces polyfills
  transpilePackages: [],
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
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
    // Prioritize AVIF (better compression) then WebP, fallback to original
    formats: ["image/avif", "image/webp"],
    // Optimized device sizes for responsive images - prioritize mobile sizes first
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimized image sizes for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    // Long cache TTL for optimized images
    minimumCacheTTL: 31536000,
    // Enable image optimization with better compression
    unoptimized: false,
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
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/_next/static/css/(.*\\.css)$",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
          },
        ],
      },
      {
        source: "/(.*\\.(?:jpg|jpeg|png|webp|avif|gif|svg|ico)$)",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=31536000, immutable, stale-while-revalidate=31536000",
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
                ? "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400"
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
                  value: (() => {
                    // Check if this is a Vercel deployment (preview, development, or production)
                    const isVercel =
                      process.env.VERCEL === "1" || process.env.VERCEL_ENV;
                    // Base CSP policy
                    let scriptSrc =
                      "'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://cdn.flushjohn.com https://connect.facebook.net";
                    let connectSrc =
                      "'self' https://www.google-analytics.com https://www.google.com https://googleads.g.doubleclick.net https://api.flushjohn.com wss://api.flushjohn.com https://connect.facebook.net https://www.google.com https://www.gstatic.com";
                    let frameSrc =
                      "'self' https://www.googletagmanager.com";

                    // Add Vercel Live scripts for Vercel deployments (preview/dev environments)
                    // Note: CSP doesn't support wildcards, so we allow the main domain
                    if (isVercel) {
                      scriptSrc += " https://vercel.live";
                      connectSrc += " https://vercel.live wss://vercel.live";
                      frameSrc += " https://vercel.live";
                    }

                    return `default-src 'self'; script-src ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.flushjohn.com; font-src 'self' https://fonts.gstatic.com https://cdn.flushjohn.com data:; img-src 'self' data: https: blob: https://images.unsplash.com; connect-src ${connectSrc}; frame-src ${frameSrc}; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests;`;
                  })(),
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
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "production"
                ? "public, max-age=31536000, immutable, stale-while-revalidate=31536000"
                : "no-store, must-revalidate",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
