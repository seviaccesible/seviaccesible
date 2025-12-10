const CACHE_NAME = 'seviaccesible-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
  // Añade aquí rutas descargables si las tienes como archivos estáticos
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'document' || event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => response || fetch(event.request))
        .catch(() => caches.match('/'))
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
