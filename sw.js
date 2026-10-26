/* Service worker: rende l'app utilizzabile anche con poca o nessuna rete (richiede HTTPS, es. GitHub Pages).
   - Guscio dell'app e Leaflet: cache, aggiornati in background quando c'è rete.
   - Tessere mappa e foto: salvate man mano che le visualizzi. */
const CACHE = "london-trip-2026-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // API dinamiche (meteo, Wikipedia, ricerca luoghi): sempre in rete, l'app gestisce l'errore
  if (/open-meteo\.com|nominatim\.openstreetmap\.org|wikipedia\.org\/api/.test(url.host + url.pathname)) return;
  // Dati propri e librerie: prima la cache, poi aggiorna in background
  const cacheable = url.origin === location.origin || /cdnjs\.cloudflare\.com|tile\.openstreetmap\.org|upload\.wikimedia\.org/.test(url.host);
  if (!cacheable) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req, { ignoreSearch: url.origin === location.origin });
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone()); return res; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const res = await net;
    return res || (req.mode === "navigate" ? cache.match("index.html") : Response.error());
  }));
});
