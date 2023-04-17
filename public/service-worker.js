if (!self.define) {
  const s = (s) => {
      "require" !== s && (s += ".js");
      let e = Promise.resolve();
      return (
        t[s] ||
          (e = new Promise(async (e) => {
            if ("document" in self) {
              const t = document.createElement("script");
              (t.src = s), document.head.appendChild(t), (t.onload = e);
            } else importScripts(s), e();
          })),
        e.then(() => {
          if (!t[s]) throw new Error(`Module ${s} didn’t register its module`);
          return t[s];
        })
      );
    },
    e = (e, t) => {
      Promise.all(e.map(s)).then((s) => t(1 === s.length ? s[0] : s));
    },
    t = { require: Promise.resolve(e) };
  self.define = (e, n, r) => {
    t[e] ||
      (t[e] = Promise.resolve().then(() => {
        let t = {};
        const a = { uri: location.origin + e.slice(1) };
        return Promise.all(
          n.map((e) => {
            switch (e) {
              case "exports":
                return t;
              case "module":
                return a;
              default:
                return s(e);
            }
          })
        ).then((s) => {
          const e = r(...s);
          return t.default || (t.default = e), t;
        });
      }));
  };
}
define("./service-worker.js", ["./workbox-ea903bce"], function (s) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: "/_next/static/5TlrnFt7OTy0RTMOwsssm/_buildManifest.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/5TlrnFt7OTy0RTMOwsssm/_ssgManifest.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/1bfc9850-591c9c654a5034e8755b.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/215-4417beed6c315ddf79e3.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/228-92366395e18ba86c7fc6.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/35-d9d032ba9c7d38a9ada8.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/433-ff065efcc08a2031c6c6.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/545f34e4-47c6c15d7f8ab3cf5532.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/757-4111c460432f734ccffa.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/78e521c3-c1c04f4cb2406e845b09.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/838-7cf40612dde702e68de2.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/841-7a23174b2ac014f2d175.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/846-7bfe49534411e80ce411.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/d7eeaac4-afe3808e26eee48f33ce.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/de71a805-f7ae829a5669ed041827.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/framework-d0e869e1554b77acc695.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/main-dc60a88c4293a698e4f7.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/_app-266c0c86355323c90936.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/_error-6a66266ae18f324b21fb.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/contact-62798f209fce139d164b.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/disclaimer-444c3f291dd27b54f7bf.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/index-83478352dd371f853473.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/privacy-ea3a19da22e7c3e0a3de.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/products-7cf9d4eff375d32e3b44.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/quote-99eb3404b3dce89fc177.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/pages/terms-8b0890bb7d3f9a0662eb.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/chunks/webpack-21bdf7aeefbc4a0c3e41.js",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/08b4732a2040bc9b9845.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/0dbf908ac4f4e35a42c1.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/485e4265e595657afb06.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/4eb4619cf4bad7672731.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/5702c56da30178de0b6c.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/63f6be0a42612c5fa4d7.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/6704775ebe34e8696a03.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/86c5404608de002c6ee3.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/_next/static/css/b271a42d9eefa15cf2a2.css",
          revision: "5TlrnFt7OTy0RTMOwsssm",
        },
        {
          url: "/assets/VIP-Flush-1.svg",
          revision: "53a30b0d56439372b8ee7c1bd0ca44c7",
        },
        {
          url: "/assets/ada_blue.svg",
          revision: "72a05a9295239a0c02261415b9d8a202",
        },
        {
          url: "/assets/calendar.svg",
          revision: "5080c6e0266444edc607364a1d5e821e",
        },
        {
          url: "/assets/construction.svg",
          revision: "4fc891771525ca7a9719fe4728aa7a91",
        },
        {
          url: "/assets/event.svg",
          revision: "8fca32310ac7c2cc922cb2c8f481dd5c",
        },
        {
          url: "/assets/flushable.svg",
          revision: "d1376921549cee78af711c87abccaa2d",
        },
        {
          url: "/assets/hero2a.svg",
          revision: "9832dcadd21b97a0e35855bdd5ade41b",
        },
        {
          url: "/assets/hero5.svg",
          revision: "6a5d80c8605516e2a79067928f4361ba",
        },
        {
          url: "/assets/relief.svg",
          revision: "de59bd2a3de45137536150a01f24fd15",
        },
        {
          url: "/assets/renovation.svg",
          revision: "58ae7c189a88276efe0dae038e4e3d1a",
        },
        {
          url: "/assets/section1Bg.svg",
          revision: "10c62b03dcef57fd7cb2c848d540c76d",
        },
        {
          url: "/assets/sink.svg",
          revision: "e15ca3adfe25aa07f954c8cabf13d0a4",
        },
        {
          url: "/assets/sps_blue.svg",
          revision: "3a2b1c7411679d79068dff9aa898cd8a",
        },
        {
          url: "/assets/sps_#EF648A.svg",
          revision: "ef198c40225d0bd1382e03eb66833acc",
        },
        {
          url: "/assets/testimony.svg",
          revision: "c78b4e2b059794eb884d519f28c6e0db",
        },
        {
          url: "/assets/testimony1.svg",
          revision: "c78b4e2b059794eb884d519f28c6e0db",
        },
        {
          url: "/assets/testimony2.svg",
          revision: "efc6c1cce0ef1a138d628e13217313db",
        },
        {
          url: "/assets/tick.svg",
          revision: "dca31e3410496bb0b9367ddb2f3bc35d",
        },
        {
          url: "/reliable_portable_logo.svg",
          revision: "6326b5f9fd4727e00ff5661f9d93009c",
        },
        { url: "/favicon.ico", revision: "4757266090e4d1ba98c778610984719d" },
        {
          url: "/logo-black.svg",
          revision: "928e597f4b7f94e86637bd29f367c87f",
        },
        { url: "/manifest.json", revision: "4ed69daea3ec9378848402774e22c28c" },
        { url: "/sw.js", revision: "c6fe4689425c8a2056aab932a69e1639" },
        { url: "/sw.js.map", revision: "93de42d28f9debc82835dcee453940c9" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      "/",
      new s.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: e,
              event: t,
              state: n,
            }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:mp3|mp4)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-media-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        const e = s.pathname;
        return !e.startsWith("/api/auth/") && !!e.startsWith("/api/");
      },
      new s.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        return !s.pathname.startsWith("/api/");
      },
      new s.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
