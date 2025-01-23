// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/public/assets/styles.css'],

  app: {
    head: {
      title: 'Synth Dashboard',
      meta: [
        { name: 'description', content: 'Dashboard' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },

  compatibilityDate: '2025-01-22',

  vite: {
    server: {
      hmr: {
        clientPort: 3000, // Ensure hot module reloading works in OBS
      },
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },

  devtools: {
    enabled: true, // Enable devtools for easier debugging
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000', // Adjust API base for production
    },
  },

  hooks: {
    'vite:extendConfig': (config, { isDev }) => {
      if (isDev) {
        config.server = config.server || {};
        config.server.watch = {
          usePolling: true, // Ensure changes are detected in OBS
        };
      }
    },
  },

  server: {
    port: 3000, // Ensure the Nuxt app is served on port 3000 for consistency
    host: '0.0.0.0', // Allow access from OBS or other devices
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  },

  build: {
    analyze: process.env.ANALYZE === 'true',
  },
});
