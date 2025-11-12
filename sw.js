// 最简单 Service Worker
self.addEventListener('install', e => {
  console.log('SW installed');
});

self.addEventListener('fetch', e => {
  // 网络优先
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
