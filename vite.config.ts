import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
const storybookConfigExists = existsSync(path.join(dirname, '.storybook', 'main.ts'));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            if (id.includes('react-icons')) {
              return 'react-icons';
            }
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-core';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    target: 'es2015',
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: []
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // Test configuration only included in development (not in production builds)
  // Storybook test config is loaded separately via vitest.config.ts for local development
});