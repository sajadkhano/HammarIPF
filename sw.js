var CACHE='hammar-scada-v1';
var FILES=['/','/index.html','/styles.css','/core.js','/charts.js','/manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}))});
self.addEventListener('fetch',function(e){e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request).then(function(res){var rc=res.clone();caches.open(CACHE).then(function(c){c.put(e.request,rc)});return res})}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}))});
