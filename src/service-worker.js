const CACHE_NAME = "namaa-cache-v2";
const urlsToCache = [
  "/index.html",
  "/app.js",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/src/output.css",
  // "/src/service-worker.js", // يمكنك إزالة هذا إذا لم يكن ضروريًا
];

// 🟢 تثبيت Service Worker وتخزين الملفات
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((error) => {
        console.error("فشل في إضافة الملفات إلى الكاش:", error); // إضافة معالجة الأخطاء
      });
    })
  );
});

// 🟢 جلب البيانات من الكاش أولاً ثم الشبكة عند الضرورة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch((error) => {
          console.error("فشل في جلب البيانات:", error); // إضافة معالجة الأخطاء
        })
      );
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
