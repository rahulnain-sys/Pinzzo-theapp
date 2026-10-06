import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

// Every HTML page of the site must be listed here to be included in the build
const pages = ['index', 'privacy-policy', 'terms', 'refund-policy', 'shipping-policy'];

export default defineConfig({
  base: './', // relative paths so dist/ works from any folder or host
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(p => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
