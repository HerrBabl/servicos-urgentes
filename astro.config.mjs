// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        '3000-ihdpzfr77vkhle1vrsce2-6532622b.e2b.app',
        'servicos-urgentes-2.lindy.site'
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  }
});
