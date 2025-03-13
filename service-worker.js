const CACHE_NAME = "namaa-cache-v2";
const urlsToCache = [
  "/LOCAL/index.html",
  "/LOCAL/app.js",
  "/LOCAL/manifest.json",
  "/LOCAL/icon-192x192.png",
  "/LOCAL/icon-512x512.png",
  "/LOCAL/src/output.css",
  "/LOCAL/src/alpine.js",
  "/LOCAL/src/aos.css",
  "/LOCAL/service-worker.js",
];

// Install Service Worker and store files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) => {
          return fetch(url).then((response) => {
            if (!response.ok) {
              throw new Error(`error (not-found) ${url}: ${response.status}`);
            }
            return cache.add(url);
          });
        })
      ).catch((error) => {
        console.error("Shell in adding files to cache", error);
      });
    })
  );
});

//   Fetch data from cache first and then network if necessary
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch((error) => {
          console.error("Failed to fetch data:", error);
        })
      );
    })
  );
});

//   Update cache when there is a new version
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});
