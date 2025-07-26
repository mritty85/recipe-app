const CACHE_NAME = 'recipe-app-v3';
const IMAGE_CACHE_NAME = 'recipe-images-v1';
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
    const url = new URL(event.request.url);
    
    // Handle image requests differently for better caching
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(IMAGE_CACHE_NAME).then(cache => {
                return cache.match(event.request).then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(fetchResponse => {
                        // Only cache successful image responses
                        if (fetchResponse.ok) {
                            cache.put(event.request, fetchResponse.clone());
                        }
                        return fetchResponse;
                    }).catch(() => {
                        // Return a placeholder if image fails to load
                        return new Response('', { status: 404 });
                    });
                });
            })
        );
    } else {
        // Handle other requests normally
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});