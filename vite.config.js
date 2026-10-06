import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base './' = relative paths, so dist/ works from any folder or host
// Tailwind compiles our CSS; singlefile inlines CSS+JS into dist/index.html
export default defineConfig({
  base: './',
  plugins: [tailwindcss(), viteSingleFile()],
});
