import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   server: {
    allowedHosts: ['bd1fb86b3846.ngrok-free.app']
  },
  plugins: [
    react(),
     tailwindcss(),
  ],
})
