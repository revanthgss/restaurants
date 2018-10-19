const staticCacheName = 'mws-restaurant-v1';
const cacheAssets = [
    './',
    './index.html',
    './restaurant.html',
    './js/main.js',
    './js/dbhelper.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './data/restaurants.json',
    './img/1_1x.jpg',
    './img/2_1x.jpg',
    './img/3_1x.jpg',
    './img/4_1x.jpg',
    './img/5_1x.jpg',
    './img/6_1x.jpg',
    './img/7_1x.jpg',
    './img/8_1x.jpg',
    './img/9_1x.jpg',
    './img/10_1x.jpg',
]
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(cacheAssets);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});