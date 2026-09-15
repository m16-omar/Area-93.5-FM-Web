import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://city1051fm.cloud',
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: 'https://city1051fm.cloud',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})


