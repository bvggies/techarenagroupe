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
      external: (id) => {
        // Exclude Node.js modules and database files from browser bundle
        if (id.includes('pg') || id.includes('jsonwebtoken') || id.includes('bcryptjs') || 
            id.includes('drizzle-orm') || id.includes('drizzle-kit') || 
            id.includes('dotenv') || id.includes('src/db/') || id.includes('src/services/api.ts') ||
            id === 'crypto' || id === 'fs' || id === 'node:fs' || id === 'path' || id === 'node:path' ||
            id === 'os' || id === 'node:os' || id === 'net' || id === 'tls' || 
            id === 'stream' || id === 'util' || id === 'node:util' ||
            id === 'events' || id === 'node:events' || id === 'dns' || id === 'string_decoder') {
          return true;
        }
        return false;
      },
      output: {
        manualChunks(id) {
          // Skip Node.js modules
          if (id.includes('pg') || id.includes('jsonwebtoken') || id.includes('bcryptjs') || 
              id.includes('drizzle-orm') || id.includes('drizzle-kit')) {
            return;
          }
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
    exclude: ['pg', 'jsonwebtoken', 'bcryptjs', 'drizzle-orm', 'drizzle-kit', 'dotenv']
  },
  resolve: {
    alias: {
      // Prevent Node.js modules from being bundled
      'fs': false,
      'path': false,
      'os': false,
      'crypto': false,
      'net': false,
      'tls': false,
      'stream': false,
      'util': false,
      'events': false,
      'dns': false,
      'string_decoder': false,
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  // Test configuration only included in development (not in production builds)
  // Storybook test config is loaded separately via vitest.config.ts for local development
});