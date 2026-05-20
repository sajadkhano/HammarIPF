var CACHE='hammar-scada-v3';
var FILES=['index.html','styles.css','login.css','core.js','charts.js','features.js','login.js','manifest.json','sw.js','icon-192.png','icon-512.png','شعار الجامعة.jpg'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('fetch',function(e){e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}))});
