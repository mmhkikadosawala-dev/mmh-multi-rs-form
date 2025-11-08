// src/service-worker.js
/* eslint-disable no-restricted-globals */

// Import Workbox utilities (Workbox is included via react-scripts)
import { precacheAndRoute } from 'workbox-precaching';

// Precache the auto-generated manifest (fixes the build error)
precacheAndRoute(self.__WB_MANIFEST);

// Your custom cache name and additional URLs to cache (e.g., external favicon)
const CACHE_NAME = 'mmh-rs-form-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://mailer-assets.makemyhouse.com/icon-images/logo-one-signal.png',
];

// Install event: Cache your custom URLs
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event: Serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});