// Service Worker for FlushJohn Website
// Cache strategy for better performance and offline experience

const CACHE_NAME = "flushjohn-v1.0.0";
const STATIC_CACHE = "flushjohn-static-v1.0.0";

// Files to cache immediately
const STATIC_ASSETS = [
  "/",
  "/porta-potty-rental",
  "/rental-products",
  "/quote",
  "/contact",
  "/offline.html",
  // Add critical CSS and JS files here
];

// Dynamic cache patterns
const CACHE_PATTERNS = {
  images: /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i,
  fonts: /\.(woff|woff2|ttf|eot)$/i,
  api: /\/api\//,
  static: /\/_next\/static\//,
};

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {

        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {

        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {

              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {

        return self.clients.claim();
      })
  );
});

// Fetch event - handle requests with cache strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Handle different types of requests
  if (CACHE_PATTERNS.static.test(url.pathname)) {
    // Static files - Cache First
    event.respondWith(cacheFirst(request, CACHE_NAME));
  } else if (
    CACHE_PATTERNS.images.test(url.pathname) ||
    CACHE_PATTERNS.fonts.test(url.pathname)
  ) {
    // Images and fonts - Cache First
    event.respondWith(cacheFirst(request, CACHE_NAME));
  } else if (CACHE_PATTERNS.api.test(url.pathname)) {
    // API calls - Network First
    event.respondWith(networkFirst(request, CACHE_NAME));
  } else if (url.origin === self.location.origin) {
    // Same origin - Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
  }
});

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {

    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => {
      // Network failed, return cached version if available
      return cachedResponse;
    });

  return cachedResponse || fetchPromise;
}

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "quote-submission") {
    event.waitUntil(handleQuoteSync());
  }
});

async function handleQuoteSync() {
  // Handle offline form submissions when back online

  // Implementation would depend on your form handling strategy
}

// Push notifications (if needed in future)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey,
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.openWindow("/"));
});
