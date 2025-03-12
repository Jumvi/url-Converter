import { defineConfig } from 'vite'
import { getDirname } from '@poppinss/utils'
import { resolve } from 'node:path'
import adonis from '@adonisjs/vite/client'

const __dirname = getDirname(import.meta.url)

export default defineConfig({
  plugins: [
    adonis({
      entrypoints: ['resources/css/app.css', 'resources/js/app.js'],
      reload: ['resources/views/**/*.edge']
    })
  ],
  build: {
    manifest: true,
    outDir: 'public/assets'
  },
  resolve: {
    alias: {
      '~/': resolve(__dirname, './resources')
    }
  }
})
