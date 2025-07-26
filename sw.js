const CACHE_NAME = 'recipe-app-v2';
const urlsToCache = [
    '/recipe-app/',
    '/recipe-app/index.html',
    '/recipe-app/styles.css',
    '/recipe-app/app.js',
    '/recipe-app/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version or fetch from network
                return response || fetch(event.request);
            })
    );
});