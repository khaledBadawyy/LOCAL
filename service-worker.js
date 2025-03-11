const CACHE_NAME = "my-cache-v2";
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "newpage.html",
  "manifest.json",
  "icon-192x192.png",
  "icon-512x512.png",
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("Failed to cache files:", error);
      });
    })
  );
});

// استجابة الطلبات من الكاش
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch((error) => {
          console.error("Fetch failed:", error);
        })
      );
    })
  );
});

// تحديث الكاش عند تغيير الملفات
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
