import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Tailwind compiles our CSS; singlefile inlines CSS+JS so dist/index.html works anywhere
export default defineConfig({
  plugins: [tailwindcss(), viteSingleFile()],
});
