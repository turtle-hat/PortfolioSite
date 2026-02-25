import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "https://people.rit.edu/org7993/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        programming: resolve(__dirname, 'programming.html'),
        web: resolve(__dirname, 'web.html'),
        design: resolve(__dirname, 'design.html'),
      }
    }
  },
  plugins: [react()],
})
