import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { viteMockServe } from 'vite-plugin-mock'

// // https://vitejs.dev/config/
export default defineConfig({
  base: '/morpho/',
  plugins: [
    vue(),
    tailwindcss(),
    viteMockServe({
      mockPath: './mock',
      enable: true,
      logger: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
