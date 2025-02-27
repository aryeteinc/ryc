// Service Worker para Rodriguez y Carvajal
const CACHE_NAME = 'ryc-cache-v1';

// Recursos que se cachearán durante la instalación
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/nosotros',
  '/favicon.ico',
  // Añadir aquí otros recursos críticos
];

// Instalar el service worker y precachear los recursos esenciales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Abriendo caché');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Limpiar caches antiguas durante la activación
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia de caché: Network first, falling back to cache
self.addEventListener('fetch', event => {
  // Solo manejamos solicitudes GET
  if (event.request.method !== 'GET') return;
  
  // Ignoramos solicitudes a la API
  if (event.request.url.includes('/api/')) return;
  
  // Estrategia para imágenes: Cache first, falling back to network
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Si está en caché, la devolvemos inmediatamente
            return cachedResponse;
          }
          
          // Si no está en caché, la buscamos en la red
          return fetch(event.request)
            .then(networkResponse => {
              // Clonamos la respuesta porque solo se puede usar una vez
              const clonedResponse = networkResponse.clone();
              
              // Guardamos en caché para futuras solicitudes
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, clonedResponse));
              
              return networkResponse;
            });
        })
    );
    return;
  }
  
  // Para otros recursos: Network first, falling back to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Si la respuesta es válida, la clonamos y guardamos en caché
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clonedResponse));
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos desde la caché
        return caches.match(event.request);
      })
  );
});

// Evento para manejar mensajes desde la aplicación
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
