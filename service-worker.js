{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const CACHE_NAME = 'support-buddy-v1';\
const urlsToCache = [\
  '/',\
  '/index.html',\
  '/manifest.json',\
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js',\
  'https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder@1.3.3/dist/universal-sentence-encoder.min.js'\
];\
\
// Install event - cache resources\
self.addEventListener('install', event => \{\
  event.waitUntil(\
    caches.open(CACHE_NAME)\
      .then(cache => cache.addAll(urlsToCache))\
  );\
  self.skipWaiting();\
\});\
\
// Activate event - clean old caches\
self.addEventListener('activate', event => \{\
  event.waitUntil(\
    caches.keys().then(cacheNames => \{\
      return Promise.all(\
        cacheNames.filter(cacheName => \{\
          return cacheName !== CACHE_NAME;\
        \}).map(cacheName => \{\
          return caches.delete(cacheName);\
        \})\
      );\
    \})\
  );\
  self.clients.claim();\
\});\
\
// Fetch event - serve from cache when offline\
self.addEventListener('fetch', event => \{\
  event.respondWith(\
    caches.match(event.request)\
      .then(response => \{\
        // Cache hit - return response\
        if (response) \{\
          return response;\
        \}\
        return fetch(event.request);\
      \}\
    ).catch(() => \{\
      // Offline fallback\
      return caches.match('/index.html');\
    \})\
  );\
\});}