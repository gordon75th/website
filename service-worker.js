const CACHE_NAME = "love-site-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/library.html",
  "/stars.html",
  "/css/style.css",
  "/manifest.json",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/notification.wav",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
