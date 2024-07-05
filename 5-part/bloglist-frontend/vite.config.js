import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },  
  },
  test: {
    environment: 'jsdom',
    // With globals: true, there is no need to import keywords such as describe, test and expect into the tests
    globals: true,
    setupFiles: './testSetup.js', 
  }
})
