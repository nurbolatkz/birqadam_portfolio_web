import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: false,
    allowedHosts: ['birqadam.kz', 'localhost'],
    watch: {
      usePolling: true,
      interval: 1000,
    },
    hmr: {
      overlay: false
    }
  }
})
