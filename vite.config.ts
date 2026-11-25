import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { seoPlugin } from './vite-plugin-seo'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  build: {
    rollupOptions: {
      output: {
        // Bibliotecas em arquivos próprios: ficam em cache entre deploys
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
          'styled-components': ['styled-components'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@splidejs/react-splide': '@splidejs/react-splide',
      '@': path.resolve(__dirname, './src'),
    },
  },
})
