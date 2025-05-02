self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('password-generator-cache').then((cache) => {
            return cache.addAll([
                '/password-gen/',  
                '/password-gen/index.html',  
                '/password-gen/style.css',
                '/password-gen/script.js',
                '/password-gen/assets/icons/icon-192x192.png',
                '/password-gen/assets/icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
