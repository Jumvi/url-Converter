import { defineConfig } from 'vite'
import adonisjs from '@adonisjs/vite/client'

export default defineConfig({
  plugins: [
    adonisjs({
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],
      reload: ['resources/views/**/*.edge'],
    }),
  ],
  build: {
    outDir: 'public/build',
    assetsDir: '.',
    manifest: true,
    rollupOptions: {
      input: {
        app: 'resources/js/app.js',
      },
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  server: {
    hmr: {
      host: 'localhost',
    },
  },
})
