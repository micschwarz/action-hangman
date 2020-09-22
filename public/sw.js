import { registerRoute }                    from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

registerRoute(
    ({request}) => request.destination === 'font',
    new StaleWhileRevalidate({cacheName: 'fonts'})
)

registerRoute(
    ({request}) => request.destination === 'style',
    new StaleWhileRevalidate({cacheName: 'css'})
)

registerRoute(
    ({request}) => request.destination === 'script',
    new StaleWhileRevalidate({cacheName: 'js'})
)

registerRoute(
    ({request}) => request.destination === 'image',
    new StaleWhileRevalidate({cacheName: 'imagehttp://localhost:1234/'})
)

registerRoute(
    ({url}) => url.host === 'raw.githubusercontent.com',
    new CacheFirst({cacheName: 'github'})
)
