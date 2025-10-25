/* sw.js — GPL-3.0-or-later */
const CACHE = "wx-app-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png"
];

self.addEventListener("install", (e)=>{
  e.waitUntil((async()=>{
    const c = await caches.open(CACHE);
    await c.addAll(APP_SHELL);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (e)=>{
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k=>k===CACHE?null:caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (e)=>{
  const url = new URL(e.request.url);
  if(e.request.method !== "GET") return;
  if(url.origin === "https://api.brightsky.dev"){
    e.respondWith((async()=>{
      const cache = await caches.open(CACHE);
      const cached = await cache.match(e.request);
      const fetchPromise = fetch(e.request).then(res=>{
        if(res.ok) cache.put(e.request, res.clone());
        return res;
      }).catch(()=>cached||Response.error());
      return cached || fetchPromise;
    })());
    return;
  }
  if(url.origin === self.location.origin){
    e.respondWith((async()=>{
      const cached = await caches.match(e.request);
      if(cached) return cached;
      const res = await fetch(e.request);
      if(res.ok){
        const cache = await caches.open(CACHE);
        cache.put(e.request, res.clone());
      }
      return res;
    })());
  }
});
