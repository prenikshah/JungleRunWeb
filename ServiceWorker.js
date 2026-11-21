const cacheName = "psgaming-JungleRun-0.1";
const contentToCache = [
    "Build/4e71ad2078ecfbac868d26bee44c30f3.loader.js",
    "Build/7ea6583c85d2d24dae9df77a99689a6d.framework.js.unityweb",
    "Build/03e0b5b252767c1c75ad0ebb9a9bbe13.data.unityweb",
    "Build/795b96745531b061f14d82e049ade5ef.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
