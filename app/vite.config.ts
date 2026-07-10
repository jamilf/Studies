import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project from /Studies/; CI sets CI=true, local dev does not.
  base: process.env.CI ? '/Studies/' : '/',
  plugins: [react(), tailwindcss()],
})
