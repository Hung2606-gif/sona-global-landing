/**
 * SONA-GLOBAL SERVICE WORKER
 * Aggressive caching for better performance
 */

const CACHE_NAME = 'sona-global-v1.0';
const STATIC_CACHE = 'sona-static-v1.0';
const DYNAMIC_CACHE = 'sona-dynamic-v1.0';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  './',
  './index.html',
  './ai-apps.html',
  './mobile-apps.html',
  './ecosystem.html',
  './styles.css',
  './premium-visuals.css',
  './performance.css',
  './app.js',
  './visuals.js',
  './performance-optimizer.js',
  './footer.css'
];

// Images and media to cache on demand
const CACHEABLE_EXTENSIONS = [
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg',
  '.css', '.js', '.json', '.woff2', '.woff'
];

// ============================================
// INSTALL EVENT - Cache critical resources
// ============================================
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Static assets cached');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(error => {
        console.error('❌ Failed to cache static assets:', error);
      })
  );
});

// ============================================
// ACTIVATE EVENT - Clean old caches
// ============================================
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete old cache versions
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activated');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// ============================================
// FETCH EVENT - Intelligent caching strategy
// ============================================
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external domains (fonts, APIs, etc.)
  if (url.origin !== location.origin) {
    return handleExternalRequest(event);
  }
  
  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    event.respondWith(handleStaticAsset(request));
  } else if (isImageRequest(request.url)) {
    event.respondWith(handleImageRequest(request));
  } else if (isHTMLRequest(request)) {
    event.respondWith(handleHTMLRequest(request));
  } else {
    event.respondWith(handleGenericRequest(request));
  }
});

// ============================================
// CACHING STRATEGIES
// ============================================

// Cache First - For static assets (CSS, JS)
async function handleStaticAsset(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Failed to fetch static asset:', error);
    return new Response('Asset not available', { status: 503 });
  }
}

// Cache First with fallback - For images
async function handleImageRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      // Only cache if image is reasonably sized (< 5MB)
      if (networkResponse.headers.get('content-length') < 5000000) {
        cache.put(request, networkResponse.clone());
      }
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Failed to fetch image:', error);
    // Return placeholder or fallback image
    return new Response('Image not available', { status: 503 });
  }
}

// Network First with cache fallback - For HTML pages
async function handleHTMLRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    console.log('Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to index.html for SPA routing
    return caches.match('./index.html');
  }
}

// Generic caching strategy
async function handleGenericRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok && isCacheable(request.url)) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Resource not available', { status: 503 });
  }
}

// Handle external requests (fonts, CDN resources)
function handleExternalRequest(event) {
  // For external resources, just pass through with short cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const cache = caches.open(DYNAMIC_CACHE);
          cache.then(c => c.put(event.request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function isStaticAsset(url) {
  return url.includes('.css') || 
         url.includes('.js') || 
         url.includes('.json');
}

function isImageRequest(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

function isHTMLRequest(request) {
  return request.headers.get('accept').includes('text/html');
}

function isCacheable(url) {
  return CACHEABLE_EXTENSIONS.some(ext => url.includes(ext));
}

// ============================================
// BACKGROUND SYNC (Future enhancement)
// ============================================
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions, analytics, etc.
  console.log('🔄 Background sync triggered');
}

// ============================================
// PUSH NOTIFICATIONS (Future enhancement)
// ============================================
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: './media/icon-192.png',
    badge: './media/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || './'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// ============================================
// CACHE MANAGEMENT
// ============================================

// Periodically clean up old cache entries
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCacheEntries();
  }
});

async function cleanOldCacheEntries() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
  
  for (const request of requests) {
    const response = await cache.match(request);
    const dateHeader = response.headers.get('date');
    
    if (dateHeader) {
      const age = now - new Date(dateHeader).getTime();
      if (age > maxAge) {
        await cache.delete(request);
        console.log('🗑️ Cleaned old cache entry:', request.url);
      }
    }
  }
}

// Monitor cache size and clean if too large
async function maintainCacheSize() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  const MAX_ENTRIES = 100;
  
  if (requests.length > MAX_ENTRIES) {
    // Remove oldest entries
    const sortedRequests = requests.sort((a, b) => {
      // Sort by URL as proxy for age (not perfect but simple)
      return a.url.localeCompare(b.url);
    });
    
    const entriesToRemove = sortedRequests.slice(0, requests.length - MAX_ENTRIES);
    
    for (const request of entriesToRemove) {
      await cache.delete(request);
    }
    
    console.log(`🧹 Cleaned ${entriesToRemove.length} cache entries`);
  }
}

// Run maintenance periodically
setInterval(maintainCacheSize, 60 * 60 * 1000); // Every hour

console.log('🚀 SONA-GLOBAL Service Worker loaded');