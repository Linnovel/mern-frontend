import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000"
      }
    },
    port: process.env.PORT || 4173,  // Asegúrate de que Vite use el puerto proporcionado por Render.
  }
})
