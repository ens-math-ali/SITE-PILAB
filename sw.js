const CACHE_NAME = 'pilab-v5';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/semestres.html',
  '/unites.html',
  '/pdf.html',
  '/contact.html',
  '/css/style.css',
  '/js/main.js',
  '/js/pdfGridLoader.js',
  '/images/favicon.svg',
  '/images/logo.svg',
  '/images/pilab.png',
  '/images/moon.svg',
  '/images/sun.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                // To avoid caching too many pdfs and bursting limit, we can skip pdf caching or cache them dynamically
                if (!event.request.url.includes('.pdf')) {
                    cache.put(event.request, responseToCache);
                }
              });
            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
