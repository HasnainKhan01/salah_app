const CACHE_NAME = 'salah-app-v1';
const urlsToCache = [
    '/salah_app/',
    '/salah_app/index.html',
    '/salah_app/styles.css',
    '/salah_app/script.js',
    '/salah_app/manifest.json'
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
            .then(response => response || fetch(event.request))
    );
});