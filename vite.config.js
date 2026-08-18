import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import { fileURLToPath, URL } from 'node:url';

// Public routes for sitemap generation (excluding '/' which is added by default)
const dynamicRoutes = ['/features', '/about', '/contact', '/privacy', '/terms'];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://livantaa.com',
      dynamicRoutes,
      exclude: ['/admin', '/admin/*'],
      robots: [
        { userAgent: '*', allow: '/', disallow: ['/admin/', '/admin/*'] },
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@pages':      fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@layouts':    fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@assets':     fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@hooks':      fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@services':   fileURLToPath(new URL('./src/services', import.meta.url)),
      '@utils':      fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@constants':  fileURLToPath(new URL('./src/constants', import.meta.url)),
      '@styles':     fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@contexts':   fileURLToPath(new URL('./src/contexts', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/Livantaa/api': {
        target: 'http://localhost',
        changeOrigin: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Performance: chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          seo: ['react-helmet-async'],
        },
      },
    },
  },
});
