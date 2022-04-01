const addResourcesToCache = async (resources) => {
    const cache = await caches.open("v1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
      console.log(event)
    event.waitUntil(
      addResourcesToCache([
        "/",
        "/index.html",
        "/style.css",
        "/logo192.png",
        "/logo512.png",
        "/favicon.ico",
        "/manifest.json",
      ])
    );
  });
  self.addEventListener('activate', (event) => {
    console.log('Service worker activate event!');
  });
  
  // When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
  self.addEventListener('fetch', (event) => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      }),
    );
  });