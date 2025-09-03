import { defineConfig } from 'vite'

export default defineConfig({
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
})
