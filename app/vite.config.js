import { defineConfig } from 'vite'
import reactSwc from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [reactSwc()],

  // Configuration serveur de développement
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Proxy pour le développement local
    proxy: {
      '/api': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // Configuration de build pour la production
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

})

