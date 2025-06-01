import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5177,
    strictPort: true, // Falla si el puerto está en uso en lugar de buscar otro
    open: true // Abre automáticamente el navegador al iniciar
  }
})
