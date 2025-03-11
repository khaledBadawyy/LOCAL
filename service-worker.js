const CACHE_NAME = "namaa-cache-v1"; // اسم الكاش مع الإصدار
const urlsToCache = [
  "/",
  "index.html",
  "src/output.css",
  "app.js",
  "newpage.html",
  "manifest.json",
  "icon-192x192.png",
  "icon-512x512.png",
];

// 🟢 تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🟢 جلب البيانات من الكاش أولاً ثم الشبكة عند الضرورة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 🟢 تحديث الكاش عند وجود إصدار جديد
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
