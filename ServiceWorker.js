const cacheName = "psgaming-JungleRun-0.1";
const contentToCache = [
    "Build/b5542876e79cfc662713621276922f38.loader.js",
    "Build/7ea6583c85d2d24dae9df77a99689a6d.framework.js.unityweb",
    "Build/e91ca256513e93fe721a04c040c4da33.data.unityweb",
    "Build/a25dac57e9deae6c2375ad152739a165.wasm.unityweb",
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
