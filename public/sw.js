import { registerRoute }                                 from 'workbox-routing';
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import * as navigationPreload                            from 'workbox-navigation-preload';

registerRoute(
    ({ request }) => request.destination === 'font',
    new StaleWhileRevalidate({ cacheName: 'fonts' }),
);

registerRoute(
    ({ request }) => request.destination === 'image',
    new StaleWhileRevalidate({ cacheName: 'image' }),
);

registerRoute(
    ({ url }) => url.host === 'raw.githubusercontent.com',
    new CacheFirst({ cacheName: 'github' }),
);

const CACHE_NAME        = 'offline-html';
const FALLBACK_HTML_URL = '/offline.html';

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.add(FALLBACK_HTML_URL)),
    );
});


navigationPreload.enable();

const networkOnly       = new NetworkOnly();
const navigationHandler = async (params) => {
    try {
        // Attempt a network request.
        return await networkOnly.handle(params);
    } catch (error) {
        // If it fails, return the cached HTML.
        return caches.match(FALLBACK_HTML_URL, {
            cacheName: CACHE_NAME,
        });
    }
};

// Register this strategy to handle all document.
registerRoute(
    ({ request }) => request.destination === 'document',
    navigationHandler,
);

