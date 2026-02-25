import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        programming: resolve(__dirname, 'src/programming.html'),
        web: resolve(__dirname, 'src/web.html'),
        design: resolve(__dirname, 'src/design.html'),
      }
    }
  },
  plugins: [react()],
})
